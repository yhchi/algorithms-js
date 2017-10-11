var heapsort = (function () {
    function heapadjust(arr, pos, len, fn) {
        var child = pos * 2 + 1,
            temp = arr[pos];
        while (child < len) {
            if (child+1 < len &&
                    (fn ? fn(arr[child+1], arr[child]) > 0 :arr[child+1] > arr[child])
               ) {
                child++;
            }
            if (fn ? fn(arr[child], temp) > 0 : arr[child] > temp) {
                arr[pos] = arr[child];
                arr[child] = temp;
                pos = child;
                child = pos * 2 + 1;
            } else {
                break;
            }
        }
    }
    
    function heapsort(arr, fn) {
        var len = arr.length,
            i = Math.floor((len-1)/2),
            temp;
        for (; i >= 0; i--) {
            heapadjust(arr, i, len, fn);
        }
        for (i = len-1; i > 0; i--) {
            temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapadjust(arr, 0, i, fn);
        }
        return arr;
    }
    
    return heapsort;
})();


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
        heapsort(arr1, fn);
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
    console.log('正确, heapsort: '+time1/100+' arr.sort: '+time2/100);
}
