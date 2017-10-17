// 推箱子

function sokoban(arr) {
    var n = arr.length, m = arr[0].length;
    var start, box, end;
    var i = 0, j
    for (; i < n; i++) {
        if (start && box && end)
            break;
        if ((j = arr[i].indexOf('S')) >= 0)
            start = i + ',' + j;
        if ((j = arr[i].indexOf('E')) >= 0)
            end = i + ',' + j;
        if ((j = arr[i].indexOf('0')) >= 0)
            box = i + ',' + j;
    }
    
    var list = [start+','+box],
        prevs = [null];
    var ok = false, n = 0;
    i = 0;
    j = 1;
    while (i !== j) {
        if (ok)
            break;
        for (; i < j; i++) {
            if (nextStep(list[i])) {
                ok = true;
                break;
            }
        }
        n++;
        i = j;
        j = list.length;
    }
    
    var result = [];
    if (ok) {
        for (i = 0, j = list.length-1; i < n; i++) {
            result.unshift(list[j]);
            j = prevs[j];
        }
    }
    return result;
    
    function nextStep(str) {
        var pos = str.split(','), result = [], str_ = '';
        for (var k = 0; k < 4; k++) {
            pos[k] = parseInt(pos[k]);
        }
        if (test(pos[0]-1, pos[1])) {
            if (pos[0]-1 === pos[2] && pos[1] === pos[3]) {
                if (test(pos[2]-1, pos[3])) {
                    add((pos[0]-1)+','+pos[1]+','+(pos[2]-1)+','+pos[3]);
                    if ((pos[2]-1)+','+pos[3] === end)
                        return true;
                }
            } else {
                add((pos[0]-1)+','+pos[1]+','+pos[2]+','+pos[3]);
            }
        }
        if (test(pos[0]+1, pos[1])) {
            if (pos[0]+1 === pos[2] && pos[1] === pos[3]) {
                if (test(pos[2]+1, pos[3])) {
                    add((pos[0]+1)+','+pos[1]+','+(pos[2]+1)+','+pos[3]);
                    if ((pos[2]+1)+','+pos[3] === end)
                        return true;
                }
            } else {
                add((pos[0]+1)+','+pos[1]+','+pos[2]+','+pos[3]);
            }
        }
        if (test(pos[0], pos[1]-1)) {
            if (pos[0] === pos[2] && pos[1]-1 === pos[3]) {
                if (test(pos[2], pos[3]-1)) {
                    add(pos[0]+','+(pos[1]-1)+','+pos[2]+','+(pos[3]-1));
                    if (pos[2]+','+(pos[3]-1) === end)
                        return true;
                }
            } else {
                add(pos[0]+','+(pos[1]-1)+','+pos[2]+','+pos[3]);
            }
        }
        if (test(pos[0], pos[1]+1)) {
            if (pos[0] === pos[2] && pos[1]+1 === pos[3]) {
                if (test(pos[2], pos[3]+1)) {
                    add(pos[0]+','+(pos[1]+1)+','+pos[2]+','+(pos[3]+1));
                    if (pos[2]+','+(pos[3]+1) === end)
                        return true;
                }
            } else {
                add(pos[0]+','+(pos[1]+1)+','+pos[2]+','+pos[3]);
            }
        }
    }
    function test(a, b) {
        return arr[a] && arr[a][b] && arr[a][b] !== '#';
    }
    function add(str) {
        list.push(str);
        prevs.push(i);
    }
}

var arr = [
    '.S#...E',
    '.#.0...',
    '.......'
]
console.log(sokoban(arr));