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

exports = module.exports = heapsort;
