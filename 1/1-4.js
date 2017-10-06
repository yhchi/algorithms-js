/*
金币阵列问题:
有m*n(1 ≤ m, n ≤ 100)枚金币在桌面上排成一个金币阵列。每一个金币
正面朝上，或背面朝上，分别用0和1表示。 金币阵列游戏的规则是：
（1）每次可将任一行金币翻过来放在原来的位置上；
（2）每次可任选2列，交换这2列金币的位置。
给定金币的初始状态和目标状态，计算按金币游戏规则，将金币阵列从初始状态
变换到目标状态所需的最少变换次数。如果不能按照变换规则将初始状态变换为
目标状态（即无解时）则输出 -1
*/

function algorithm(m1, m2) {
    var m,
        row = m1.length,
        col = m1[0].length,
        step1 = 0,
        step2 = Infinity,
        n1, n2,
        arr1 = [], arr2 = [],
        arr3, arr4;
    m1 = cpmatrix(m1);
    
    // 翻转 1 个数不正确的行
    for (var i = 0; i < row; i++) {
        n1 = count(m1[i]);
        n2 = count(m2[i]);
        if (n1 !== n2) {
            if (n1 + n2 === col) {
                overturn(m1[i]);
                step1++;
                arr1.push(i);
            } else {
                return -1;
            }
        } else {
            if (n1 + n2 === col) {
                arr2.push(i);
            } else {
                arr1.push(i);
            }
        }
    }
    // 翻转剩余明显不正确的行
    while (arr1.length) {
        arr3 = [];
        arr4 = [];
        for (var i = 0; i < arr2.length; i++) {
            var turned = false;
            for (var j = 0; j < arr1.length; j++) {
                n1 = count(xor(m1[arr1[j]], m1[arr2[i]]));
                n2 = count(xor(m2[arr1[j]], m2[arr2[i]]));
                if (n1 !== n2) {
                    if (n1 + n2 !== col || turned) {
                        return -1;
                    } else {
                        overturn(m1[arr2[i]]);
                        step1++;
                        turned = true;
                    }
                }
            }
            if (turned) {
                arr3.push(arr2[i]);
            } else {
                arr4.push(arr2[i]);
            }
        }
        arr1 = arr3;
        arr2 = arr4;
    }
    
    arr1 = new Array(row);
    for (var i = 0; i < arr2.length; i++) {
        arr1[arr2[i]] = true;
    }
    
    /*
      可能不止一个解, 遍历所有列, 找到最优解, 如:
          0 1     1 0
          0 1     1 0
          0 1 --> 1 0
          0 1     1 0
          0 1     1 0
      正确答案为 1, 而不是 5
    */
    var flag = false;   // 是否已经找到一个解
    for (var i = 0; i < col; i++) {
        m = cpmatrix(m1);
        n1 = 0;
        var ok = true;
        for (var j = 0; j < row; j++) {
            if (m2[j][0] !== m[j][i]) {
                if (arr1[j]) {
                    overturn(m[j]);
                    n1++;
                } else {
                    ok = false;
                    break;
                }
            }
        }
        if (!ok) {
            continue;
        }
        var r = colTrans(m, m2);
        if (r.ok) {
            n2 = n1 + r.step;
            if (!flag || n2 < step2) {
                flag = true;
                step2 = n2;
            }
        }
    }
    
    if (flag)
        return step1 + step2;
    
    return -1;
}

// 复制数组
function cparr(arr) {
    var r = [];
    for (var i = 0; i < arr.length; i++) {
        r[i] = arr[i];
    }
    return r;
}
// 复制二维数组
function cpmatrix(m) {
    var r = [];
    for (var i = 0; i < m.length; i++) {
        r[i] = cparr(m[i]);
    }
    return r;
}
// 0 1 翻转
function overturn(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i] ? 0 : 1;
    }
}
// 统计 1 的个数
function count(arr) {
    var n = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i])
            n++;
    }
    return n;
}
// 两个数组异或
function xor(arr1, arr2) {
    var r = [];
    for (var i = 0, len = Math.max(arr1.length, arr2.length); i < len; i++) {
        r[i] = (arr1[i] && arr2[i]) || (!arr1[i] && !arr2[i]) ? 0 : 1;
    }
    return r;
}
// 对比两列是否相同
function compareCol(m1, m2, col1, col2) {
    for (var i = 0; i < m1.length; i++) {
        if (m1[i][col1] !== m2[i][col2])
            return false;
    }
    return true;
}
// 交换两列
function swapCol(m, c1, c2) {
    var t;
    for (var i = 0; i < m.length; i++) {
        t = m[i][c1];
        m[i][c1] = m[i][c2];
        m[i][c2] = t;
    }
}
// 将 m1 列变换为 m2
function colTrans(m1, m2) {
    var col = m1[0].length,
        swaped = false;
        r = {
            ok: false,
            step: 0
        };
    for (var i = 0; i < col; i++) {
        swaped = false;
        for (var j = i; j < col; j++) {
            if (compareCol(m1, m2, j, i)) {
                if (j === i) {
                    swaped = true;
                } else if (compareCol(m1, m2, j, j)) {
                    /*
                      如果 m1 的第j列已经正确, 不要和第i列交换, 如:
                          2 4 1 3 3  --> 1 2 3 3 4
                          
                          1 0 0 0 0      0 1 0 0 0
                          0 1 1 1 1      1 0 1 1 1
                          1 1 1 0 0      1 1 0 0 1
                          1 1 0 0 0      0 1 0 0 1
                          0 1 1 0 0      1 0 0 0 1
                          
                      正确:           错误:
                          1 4 2 3 3       1 4 2 3 3
                          1 2 4 3 3       1 2 4 3 3
                          1 2 3 3 4       1 2 3 4 3
                                          1 2 3 3 4
                    */
                    continue;
                } else {
                    swaped = true;
                    swapCol(m1, i, j);
                    r.step++;
                }
                break;
            }
        }
        if (!swaped)
            return r;
    }
    r.ok = true;
    return r;
}
