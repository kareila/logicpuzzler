#!/usr/bin/perl

use warnings;
use strict;

use Dancer;
use Template;

set template => 'template_toolkit';
set logger   => 'console';
set log      => 'debug';
set port     => 8080;

my $puzdir = 'public';
my ( %puzzles, %solutions );

my $parse = sub {
    my ( $file ) = @_;
    open my $fh, $file or die "Couldn't open $file: $!";
    local $/ = undef; my $data = <$fh>; close $fh;
    my @lines = split /\n/, $data;
    my @result;
    foreach ( @lines ) {
        chomp;
        push @result, $_ if $_;  # omit blank lines
    }
    return \@result;
};

my $init = sub {
    opendir( my $dh, $puzdir ) or die "Puzzle directory not found: $!";
    my @puzfiles = grep { -f "$puzdir/$_" } readdir $dh ;
    closedir $dh;

    my ( %seenrows, %seencols );

    foreach ( @puzfiles ) {
        # don't allow spaces in filenames
        warn "Invalid puzzle file: $_\n" and next if /\s/;
        # filenames should be xxx_rows and xxx_cols
        if ( /_rows$/ ) {
            $seenrows{ substr($_, 0, $-[0]) } = $parse->( "$puzdir/$_" );
        } elsif ( /_cols$/ ) {
            $seencols{ substr($_, 0, $-[0]) } = $parse->( "$puzdir/$_" );
        } elsif ( /\.png$/ ) {
            $solutions{ substr($_, 0, $-[0]) } = $_;
        } else {
            warn "Invalid puzzle file: $_\n" unless /~$/; # hush emacs backups
        }
    }

    # make sure we have both rows and columns
    my %dupcols = %seencols;
    foreach my $p ( sort keys %seenrows ) {
        die "No columns found for $p\n" unless $seencols{$p};
        delete $dupcols{$p};
        $puzzles{$p} = [ $seenrows{$p}, $seencols{$p} ];
    }
    my @norows = sort keys %dupcols;
    die "No rows found for $norows[0]\n" if @norows;

    1; # %puzzles is now populated
};

$init->();

my $datasize = sub {
    # this will return [total, longest row/col]
    my ( $data ) = @_;
    my $total = 0;
    my $longest = 0;

    foreach ( @$data ) {
        # string of space separated numbers
        my @nums = split / /;
        my $len = scalar @nums;
        $longest = $len if $len > $longest;
        $total += $_ foreach @nums;
    }

    return [ $total, $longest ];
};

# function to pad rows/cols with empty space for display purposes
my $pad = sub {
    my ( $data ) = @_;
    my $longest = $datasize->( $data )->[1];
    my @cols;

    foreach ( @$data ) {
        my @nums = split / /;
        my @rev = reverse @nums;
        my $len = scalar @nums;
        my $numnulls = $longest - $len;
        if ( $numnulls ) {
            push @rev, '' foreach ( 1 .. $numnulls );
        }
        push @cols, [ reverse @rev ];
    }

    return \@cols;
};

# function to be called from puzzle template to find hints
my $hint = sub {
    my ( $nums, $space_available ) = @_;
    # remove padding
    my @nums = grep { /\d/ } @$nums;

    my $num_total = 0;
    $num_total += $_ foreach @nums;
    # don't forget minimum one space between each block
    my $num_spaces = scalar @nums - 1;

    # total space needed
    my $space_needed = $num_total + $num_spaces;

    # find largest number in set
    my @sort_nums = sort { $b <=> $a } @nums;
    my $num_max = $sort_nums[0];

    # if space available minus space needed is less than the largest number,
    # then we can show a hint for this line of clues
    return ( $space_available - $space_needed < $num_max ) ? 1 : 0;
};

any ['get', 'post'] => '/' => sub {
#    use Data::Dumper;
#    return Dumper $datasize->( $puzzles{'2016-02-01'}->[1] );

    my %params = params;
    my $given_puzzle = $params{puzzle};

    if ( $given_puzzle ) {
        my $puzdata = $puzzles{ $given_puzzle };
        if ( $puzdata ) {
            return template 'puzzle.tt', {
                puzzleid => $given_puzzle,
                rows     => $pad->( $puzdata->[0] ),
                cols     => $pad->( $puzdata->[1] ),
                rowcheck => $datasize->( $puzdata->[0] ),
                colcheck => $datasize->( $puzdata->[1] ),
                hint     => $hint,
            };
        } else {
            return "Puzzle not found: $given_puzzle\n";
        }
    }
    return template 'index.tt', {
        puzzles => [ sort keys %puzzles ],
        solutions => \%solutions,
    };

};

start;    # listens on http://localhost:3000/ by default
