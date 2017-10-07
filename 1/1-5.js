/*
最大间隙问题:
给定 n 个实数，求这n个实数在数轴上相邻2个数之间的最大差值，设计解最大间隙问题的线性时间算法
*/

// 算法实现 (抽屉原理)
function algorithm(arr) {
    var drawer = getDrawer(arr),
        min = drawer.min,
        max = drawer.max,
        n = drawer.n;
    drawer = drawer.drawer;
    
    var result = drawer[1][1] - drawer[0][2];
    for (var i = 1; i < n; i++) {
        if (!drawer[i][0]) {
            var left = drawer[i-1][2];
            while (!drawer[i][0]) {i++;};
            var right = drawer[i][1];
            if (right-left > result)
                result = right - left;
        }
    }
    return result;
}
function getMin(arr) {
    var min = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min)
            min = arr[i];
    }
    return min;
}
function getMax(arr) {
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max)
            max = arr[i];
    }
    return max;
}
function getDrawer (arr) {
    var min = getMin(arr),
        max = getMax(arr),
        n = arr.length,
        range = max - min,
        gap = (max - min) / (n - 1),
        drawer = [];
    for (var i = 0; i < n; i++) {
        drawer[i] = [0, -Infinity, Infinity];
    }
    for (var i = 0; i < n; i++) {
        // (arr[i] - min) / gap 可能把 max 放错
        var index = Math.floor((arr[i] - min) / range * (n-1));
        if (!drawer[index][0]) {
            drawer[index][1] = drawer[index][2] = arr[i];
        } else if (arr[i] < drawer[index][1]) {
            drawer[index][1] = arr[i];
        } else if (arr[i] > drawer[index][2]) {
            drawer[index][2] = arr[i];
        }
        drawer[index][0]++;
    }
    return {
        drawer: drawer,
        min: min,
        max: max,
        range: range,
        gap: gap,
        n: n
    };
}
