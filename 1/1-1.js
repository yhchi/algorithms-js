/*
统计数字问题：
一本书的页码从自然数1开始计数，直到自然数n。书的页码按照通常的习惯编排，每个页码
都不包含多余的前导数字0。例如，第6页用数字6表示，而不是06或006等。数字计数问题要
求对给定书的总页码n，计算出书的全部页码中分别用到多少次数字0，1，2，...，9。
*/

// 算法实现, 返回一个长度为 10 的数组 arr, arr[i] 即为数字 i 用到的次数
function algorithm(page) {
    var arr = [];
    arr.length = 10;
    arr.fill(0);
    
    var s = page.toString(),
        l = s.length;
    arr[0] -= parseInt( '1'.repeat(l) );
    for (let n = l-1, first = parseInt(s[0]); n; n--) {
        for (let i = 0; i < 10; i++) {
            arr[i] += first * n * Math.pow(10, (n-1));
        }
        for (let i = 0; i < first; i++) {
            arr[i] += Math.pow(10, n);
        }
        s = s.substr(1);
        arr[first] += parseInt(s)+1;
        first = parseInt(s[0]);
    }
    for (let i = 0, j = parseInt(s)+1; i < j; i++) {
        arr[i] += 1;
    }
    return arr;
}

// 测试算法正确性
function test(page) {
    var arr = [], s;
    arr.length = 10;
    arr.fill(0);
    for (var i = 1; i <= page; i++) {
        s = i.toString();
        for (var j = 0, len = s.length; j < len; j++) {
            arr[ s[j] ]++;
        }
        if (arr.join() != algorithm(i).join()) {
            console.log('错误: page '+i+'\ntest: '+arr.join()+'\nalgorithm: '+algorithm(i).join());
            return false;
        }
    }
}

test(99999);