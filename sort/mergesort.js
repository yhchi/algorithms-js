var mergesort = (function(){
    function merge(arr, left, mid, right, source, fn) {
        var p1 = left,
            p2 = mid + 1,
            len = right - left + 1,
            index = source ? left : 0,
            temp = source ? arr : new Array(len),
            choose = false;
        source = source || arr;
        
        while (p1 <= mid && p2 <= right) {
            choose = fn ? fn(source[p1], source[p2]) < 0 : source[p1] <= source[p2];
            temp[index++] = choose ? source[p1++] : source[p2++];
        }
        while (p1 <= mid) {
            temp[index++] = source[p1++];
        }
        while (p2 <= right) {
            temp[index++] = source[p2++];
        }
        
        if (temp !== arr) {
            for (var i = 0; i < len; i++) {
                arr[left++] = temp[i];
            }
        }
    }
    
    function cycle(arr, sublen, source, fn) {
        var len = arr.length,
            left = 0,
            right,
            mid;
        while (left + sublen < len) {
            mid = left + sublen - 1;
            right = mid + sublen < len ? mid + sublen : len -1;
            merge(arr, left, mid, right, source, fn);
            left = right + 1;
        }
        if (source && sublen === 1 && len%2) {
            arr[len-1] = source[len-1];
        }
    }
    
    function mergesort(arr, fn, isnew) {
        if (typeof fn !== 'function') {
            isnew = fn ? true : false;
            fn = undefined;
        }
        var len = arr.length,
            result = isnew ? new Array(len) : arr,
            sublen = 1;
        if (isnew) {
            cycle(result, sublen, arr, fn);
            sublen = 2;
        }
        for (; sublen < len; sublen *= 2) {
            cycle(result, sublen, undefined, fn);
        }
        
        return result;
    }
    
    return mergesort;
})();

function timeTest(size, times) {
    times = times || 1;
    var timeall = 0,
        arr = new Array(size);
    for (var i = 0; i < times; i++) {
        for (var j = 0; j < arr.length; j++) {
            arr[j] = Math.random()*1000-500;
        }
        var t = new Date();
        mergesort(arr);
        timeall += new Date() - t;
    }
    console.log('规模: '+size+'\n平均时间: '+timeall/times);
}

function correctTest(size) {
    var time1 = 0, time2 = 0;
    size = size || 100;
    function fn(a, b) {
        return b-a;
    }
    for (var i = 0; i < 100; i++) {
        var arr = new Array(Math.floor(Math.random()*size+size/2));
        for (var j = 0; j < arr.length; j++) {
            arr[j] = Math.random()*1000-500;
        }
        var t = new Date();
        var result = mergesort(arr, fn, true);
        time1 += new Date() -t;
        t = new Date();
        arr.sort(fn);
        time2 += new Date() -t;
        for (var j = 0; j < arr.length; j++) {
            if (result[i] !== arr[i]) {
                console.log('错误');
                return;
            }
        }
    }
    console.log('正确, mergesort: '+time1/100+' arr.sort: '+time2/100);
}