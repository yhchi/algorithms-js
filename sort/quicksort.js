var quicksort = (function () {
    function swap(arr, i, j) {
        var tmp;
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    
    function selectsort(arr, left, right, fn) {
        var pos;
        for (; left < right-1; left++) {
            pos = left;
            for (var i = left+1; i < right; i++) {
                if (fn ? fn(arr[pos], arr[i]) > 0 : arr[pos] > arr[i]) {
                    pos = i;
                }
            }
            if (pos !== left) {
                swap(arr, left, pos);
            }
        }
    }
    function partition(arr, left, right, fn) {
        var pivot = left + Math.floor((right-left)*Math.random());
        right--;
        while (left < right) {
            while (left < right &&
                      (fn ? fn(arr[left], arr[pivot]) <= 0 : arr[left] <= arr[pivot])
                  ) {
                left++;
            }
            while (left < right &&
                      (fn ? fn(arr[right], arr[pivot]) >= 0 : arr[right] >= arr[pivot])
                  ) {
                right--;
            }
            swap(arr, left, right);
        }
        if (pivot < left) {
            if (fn ? fn(arr[left], arr[pivot]) > 0 : arr[left] > arr[pivot])
                left--;
        }
        if (pivot > left) {
            if (fn ? fn(arr[left], arr[pivot]) < 0 : arr[left] < arr[pivot])
                left++;
        }
        swap(arr, left, pivot);
        
        return left;
    }
    function quicksort(arr, fn) {
        var stack = [-1, arr.length],
            tmp1, tmp2;
        while (stack.length > 1) {
            tmp1 = stack.pop();
            tmp2 = stack[stack.length-1];
            if (tmp1 - tmp2 < 10) {
                selectsort(arr, tmp2+1, tmp1, fn);
            } else {
                stack.push(partition(arr, tmp2+1, tmp1, fn));
                stack.push(tmp1);
            }
        }
        return arr;
    }
    
    return quicksort;
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
        quicksort(arr1, fn);
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
    console.log('正确, quicksort: '+time1/100+' arr.sort: '+time2/100);
}
