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
    var row = m1.length,
        col = m1[0].length,
        m,
        minStep = Infinity,
        tempStep,
        found = false;
    
    // 假设 m1 的第i列对应 m2 的第0列
    for (var i = 0; i < col; i++) {
        m = cpmatrix(m1);
        tempStep = 0;
        for (var j = 0; j < row; j++) {
            if (m2[j][0] !== m[j][i]) {
                overturn(m[j]);
                tempStep++;
            }
        }
        
        var r = colTrans(m, m2);
        if (r.ok) {
            tempStep += r.step;
            if (tempStep < minStep) {
                found = true;
                minStep = tempStep;
            }
        }
    }
    
    if (found)
        return minStep;
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
        found = false;
        r = {
            ok: false,
            step: 0
        };
    for (var i = 0; i < col; i++) {
        found = false;
        for (var j = i; j < col; j++) {
            if (compareCol(m1, m2, j, i)) {
                if (j === i) {
                    found = true;
                } else if (compareCol(m1, m2, j, j)) {
                    continue;
                } else {
                    found = true;
                    swapCol(m1, i, j);
                    r.step++;
                }
                break;
            }
        }
        if (!found)
            return r;
    }
    r.ok = true;
    return r;
}
