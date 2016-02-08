// http://www.thesitewizard.com/javascripts/cookies.shtml

// (ripped out code saved for future reference)
/*
function RemoveCookieValue(cookie, key) {
	if (cookie.length == 0) {
		return '';
	}
	var cookie_items = cookie.split(';');
	if (cookie_items == null) {
		return '';
	}
	for (i = 0; i < cookie_items.length; i++) {
		var c = cookie_items[i];
		var k = c.match( '^[\s]*([^=]+)' )[1];
		if ((k == "path") || (k == "max-age") || (k == key)) {
			cookie_items.splice(i,1);
		}
	}
	return cookie_items.join('; ');
}
*/

function SetCookieValue(key, val) {
	var lifespan = 60 * 60 * 24 * 30; // 30 days
	// if no val given, delete the cookie instead (using zero lifespan)
	if (val == null || val.length == 0) {
		lifespan = 0;
	}
    return key + '=' + val + '; path=/; max-age=' + lifespan;
}

function SaveArray(ma, pid) {
    var cookie_name = pid;
	var cookie_value = '';

    for (i = 1; i < ma.length; i++) {
        for (j = 1; j < ma[i].length; j++) {
            cookie_value = cookie_value + ma[i][j];
        }
    }
	return SetCookieValue(cookie_name, cookie_value);
}

function ReadArray(cookie, ma, pid) {
	if (cookie.length == 0) {
		return ma;
	}
	var cookie_name = pid;
	// maybe someone will explain someday why the backslash has to be escaped
	var cookie_value = cookie.match( '(^|;)[\\s]*' + cookie_name + '=([^;]*)' );
	if (cookie_value == null) {
		return ma;
	}
	var cookie_data = cookie_value[2].split('');
	var d = 0;
    for (i = 1; i < ma.length; i++) {
        for (j = 1; j < ma[i].length; j++) {
            ma[i][j] = parseInt(cookie_data[d]);
			d++;
        }
    }

    return ma;
}
