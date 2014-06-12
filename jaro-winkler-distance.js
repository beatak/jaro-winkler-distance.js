// require jQuery...
var jaro_winkler_distance = function(str1, str2) {
    var matchWindow, windowStart, windowEnd, numMatches, jaro,
        string1Matches = [],
        string2Matches = [],
        string1 = str1,
        string2 = str2,
        transpositions = 0,
        prefix = 0;

    if (str1.length > str2.length) {
        string1 = str2;
        string2 = str1;
    }
    
    matchWindow = ~~Math.max(0, string2.length / 2 - 1);

    $.each(string1, function (i, ch) {
        var loop_dir, j;
        // ch = string1[i];
        windowStart = Math.max(0, i - matchWindow);
        windowEnd   = Math.min(i + matchWindow + 1, string2.length);
        loop_dir    = windowStart <= windowEnd;

        loop:for ( j = windowStart;
                  (loop_dir) ? (j < windowEnd) : (j > windowEnd);
                  (loop_dir) ? ++j : --j) {
            if (string2Matches[j] === undefined && ch === string2[j]) {
                string1Matches[i] = ch;
                string2Matches[j] = string2[j];
                break loop;
            }
        }
    });

    string1Matches = string1Matches.join('');
    string2Matches = string2Matches.join('');
    numMatches     = string1Matches.length;
    if (!numMatches) {
        return 0;
    }

    $.each(string1Matches, function (i, ch) {
        if (ch !== string2Matches[i]) {
            transpositions++;
        }
    });

    $.each(string1, function(i, ch) {
        if (ch === string2[i]) {
            prefix++;
        } else {
            return false;
        }
    });

    jaro = ((numMatches / string1.length) + (numMatches / string2.length) + (numMatches - ~~(transpositions / 2)) / numMatches) / 3.0;
    return jaro + Math.min(prefix, 4) * 0.1 * (1 - jaro);
};
