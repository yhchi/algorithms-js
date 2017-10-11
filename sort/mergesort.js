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

// 测试正确性和时间
function test(size) {
    var time1 = 0, time2 = 0;
    size = size || 100;
    function fn(a, b) {
        return a-b;
    }
    for (var i = 0; i < 100; i++) {
        var arr1 = new Array(Math.floor(Math.random()*size+size/2)),
            arr2 = new Array(arr1.length),
            arr = new Array(arr1.length);
        for (var j = 0; j < arr1.length; j++) {
            arr[j] = arr1[j] = arr2[j] = Math.random()*1000-500;
        }
        var t = new Date();
        mergesort(arr1, fn);
        time1 += new Date() -t;
        t = new Date();
        arr2.sort(fn);
        time2 += new Date() -t;
        for (var j = 0; j < arr1.length; j++) {
            if (arr1[i] !== arr2[i]) {
                console.log('错误');
                return arr;
            }
        }
    }
    console.log('正确, mergesort: '+time1/100+' arr.sort: '+time2/100);
}
