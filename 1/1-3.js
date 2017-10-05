/*
最多约数问题:
正整数 x 的约数是能整除 x 的正整数。正整数 x 的约数个数记为div(x)。
例如，1，2，5，10 都是正整数 10 的约数，且div(10)=4。
设 a 和 b 是 2 个正整数，a ≤ b，找到 a 和 b 之间约数个数最多的那个数的约数个数
*/

// 算法实现
function algorithm(a, b) {
    return Math.max(div(a), div(b));
}
// 求约数个数
function div(x) {
    var f = factorization(x),
        r = 1;
    for (var i = 0; i < f.length; i++) {
        r *= f[i][1] + 1;
    }
    return r;
}
// 因式分解, 可接受最大参数 2^53
function factorization(num) {
    var n = num,
        sqrt = Math.floor(Math.sqrt(n)),
        r = [],
        i = 6;
    function test(i) {
        var item = [i, 0]
        while (!(n%i)) {
            item[1]++;
            n /= i;
            sqrt = Math.floor(Math.sqrt(n));
        }
        if (item[1])
            r.push(item);
    }
    test(2);
    test(3);
    // 除 2、3 外质数只可能是 6n ± 1
    for (; i < sqrt; i+=6) {
        test(i-1);
        test(i+1);
    }
    if (n > 1) {
        r.push([n, 1]);
    }
    return r;
}
