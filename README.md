Logic Puzzler
=============

Once upon a time, like many geeks of a certain age, I owned a Palm Pilot.
And on this Palm Pilot was a game, which I believe was called Pictlogic or
Pictologic, that allowed one to use the Palm's notepad to import picture logic
puzzles (aka picross, griddlers, or nonograms) and solve them.

These days, there are several iOS and Android apps for solving these puzzles,
but none that let you import your own puzzles from other sources - so I set
out to write a web app that would let me accomplish that goal, and to learn
a little more about JavaScript in the process.

Because I am a Perl nerd, the core of this program is written in Perl using
the Dancer module (http://perldancer.org/).  To get it started, run `websrv.pl`
and point your browser at localhost:8080, or edit the script to use a port of
your choosing.  You will need to install the Dancer and Template modules from
CPAN if you don't already have them.


Changes
-------

### 8 Feb 2016

Initial public release.


Overview
--------

This distribution should contain the following files:

- `LICENSE`        (software license provided by Github)
- `README.md`      (these instructions)
- `public/`        (subdirectory for JS files and puzzle data)
- `views/`         (subdirectory for web page templates)
- `websrv.pl`      (server for web interface)

Running `websrv.pl` will start a daemon which listens for HTTP connections
on port 8080 and responds with a listing of all known puzzles.  The other
moving parts are the page templates in `views/`, which use Template Toolkit,
and the JavaScript files in `public/js/` which power the solution interface.


Usage
-----

Puzzles must be entered manually using a text editor, using the following format:

- `puzzlename_rows` containing the row data, one row per line
- `puzzlename_cols` containing the column data, one column per line
- `puzzlename.png` containing an image of the solved puzzle (optional)

On startup, the server script will search the `public` directory for files
following this format and warn if it finds any files that don't fit the
format.  Also, spaces are not allowed in puzzle data filenames.  Blank lines
in the data are OK; I always enter a blank line between each group of five
rows/columns, for easier error checking.  The server will refuse to display
a puzzle if the row clues and column clues don't add up to the same sum.

Selecting a puzzle link will load the interface for solving a puzzle.
Click on a square once to shade it, again to mark it as unused, and a
third time to clear it.  Using the right mouse button will cycle through
the states in the opposite order (X, shade, clear).  You can also toggle
shading on the clue numbers as you work the puzzle.  The checkboxes and
form buttons should be self-explanatory.

If you want to navigate away from the page, make sure you save your
progress first, or you will return to a blank puzzle!  Progress is
saved via browser cookies that expire after 30 days.


Bugs
----

No known bugs, just features I haven't added yet.  There's a limit to the
amount of data that can be stored in a single cookie, but I have saved
my progress on puzzles as large as 50x45 with no problems.


License
-------

This program is free software; you may redistribute it and/or modify it under
the same terms as Perl itself.  For more information about the Perl Artistic
License 2.0, visit <http://opensource.org/licenses/artistic-license-2.0>.


Disclaimers
-----------

This software is provided "as is" and any express or implied warranties,
including, but not limited to, the implied warranties of merchantability and
fitness for a particular purpose are disclaimed.


_kareila at dreamwidth dot org // 8 Feb 2016_
