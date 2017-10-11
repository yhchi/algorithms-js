var mergesort = (function(){
    function merge(source, target, left, mid, right, fn) {
        var p1 = left,
            p2 = mid + 1,
            len = right - left + 1,
            index = left,
            choose = false;
        
        while (p1 <= mid && p2 <= right) {
            choose = fn ? fn(source[p1], source[p2]) <= 0 : source[p1] <= source[p2];
            target[index++] = choose ? source[p1++] : source[p2++];
        }
        while (p1 <= mid) {
            target[index++] = source[p1++];
        }
        while (p2 <= right) {
            target[index++] = source[p2++];
        }
    }
    
    function mergesort(arr, fn) {
        var len = arr.length,
            arrA = arr,
            arrB = new Array(len),
            temp,
            left, right, mid;
        for (var i = 1; i < len; i *= 2) {
            left = 0;
            while (left + i < len) {
                mid = left + i - 1;
                right = mid + i < len ? mid + i : len - 1;
                merge(arrA, arrB, left, mid, right, fn);
                left = right + 1;
            }
            // 复制最后一段数据
            if (left < len) {
                merge(arrA, arrB, left, len-1, len-1, fn);
            }
            temp = arrA;
            arrA = arrB;
            arrB = temp;
        }
        if (arrA !== arr){
            for (var i = 0; i < len; i++) {
                arr[i] = arrA[i];
            }
        }
        return arr;
    }
    
    return mergesort;
})();

exports = module.exports = mergesort;
