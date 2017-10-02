/*
字典序问题:
在数据加密和数据压缩中常需要对特殊的字符串进行编码。给定的字母表A由26个小写字母组成。
该字母表产生的升序字符串中字母从左到右出现的次序与字母在字母表中出现的次序相同，且每个
字符最多出现1次。例如，a, b, ab, bc, xyz等字符串都是升序字符串。现在对字母表中产生
的所有长度不超过6的升序字符串，计算它在字典中的编码。对应表如下：
a---1   b---2   c---3   ......  z---26
ab--27  ac--28  ad--29  ......
*/

// 算法实现
function algorithm(str) {
    var code = 0,
        chars = [],
        len = str.length,
        i = 0;
    for (i = 0; i < len; i++) {
        chars[i] = str[i].charCodeAt() - 97;
        code += C(i, 26);
    }
    var n = 26;
    for (i = 0; i < len; i++) {
        code += C(len-i, n) - C(len-i, 26-chars[i]);
        n = 26 - chars[i] - 1;
    }
    
    return code;
}
// Arrangement 排列数, 虽然没啥用
function A(m, n) {
    var num = 1;
    for (var i = 0; i < m; i++) {
        num *= n-i;
    }
    return num;
}
// Combination 组合数
function C(m, n) {
    var num = 1;
    if (n - m < m) {
        m = n - m;
    }
    for (var i = 0; i < m; i++) {
        num *= n-i;
        num /= i+1;
    }
    return num;
}

// 测试算法正确性
function test() {
    var chars = ['a'], code = 1, len = 1, str;
    function next() {
        code++;
        if (chars[len-1] === 'z') {
            for (var i = len; i; i--) {
                if (i === 1) {
                    chars = 'abcdef'.split('');
                    chars.length = ++len;
                } else {
                    var char = nextChar(chars[i-2]);
                    if ( char !== chars[i-1] ) {
                        chars[i-2] = char;
                        for (i = i-1; i < len; i++) {
                            chars[i] = nextChar(chars[i-1]);
                        }
                        break;
                    }
                }
            }
        } else {
            chars[len-1] = nextChar(chars[len-1]);
        }
        str = chars.join('');
    }
    function nextChar(char) {
        return String.fromCharCode( char.charCodeAt()+1 );
    }
    do {
        next();
        if (code !== algorithm(str)) {
            console.log('错误: ' + str + '\n结果应为: ' + code + '\n错误结果: ' + algorithm(str));
            return;
        }
    } while (str != 'uvwxyz');
    
    console.log('正确');
}

test();
