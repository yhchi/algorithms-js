var shellsort = (function () {
    function sequence(len) {
        var seq = [1], item = 5, n = len/2;
        for (var i = 1; item < n; i++) {
            seq.push(item);
            item = 9*(Math.pow(4,i)-Math.pow(2,i))+1;
            if (item < n) {
                seq.push(item);
                item = Math.pow(4,i+2)-3*Math.pow(2,i+2)+1;
            }
        }
        return seq;
    }
    
    function shellsort(arr, fn) {
        var len = arr.length,
            seq = sequence(len),
            hk, pos, i;
        for (; seq.length;) {
            hk = seq.pop();
            for (pos = 0; pos < hk; pos++) {
                for (pos+=hk; pos < len; pos+=hk) {
                    i = pos;
                    tmp = arr[pos];
                    for (; i >= hk && (fn ? fn(arr[i-hk], tmp) > 0 : arr[i-hk]>tmp); i-=hk) {
                        arr[i] = arr[i-hk];
                    }
                    if (i !== pos) {
                        arr[i] = tmp;
                    }
                }
                pos %= hk;
            }
        }
        return arr;
    }
    
    return shellsort;
})();

exports = module.exports = shellsort;
