// http://www.trans4mind.com/personal_development/JavaScript/Array2D.htm

function MultiArray(r,c) {
    var ma = new Array(r);
    for (i = 1; i <= r; i++) {
        ma[i] = new Array(c);
        for (j = 1; j <= c; j++) {
            ma[i][j] = 0;
        }
    }
    return ma;
}
