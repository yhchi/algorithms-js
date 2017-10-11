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
    
    function insertion(arr, left, right, fn) {
        var pos = left+1,
            i, tmp;
        for (; pos < right; pos++) {
            i = pos;
            tmp = arr[pos];
            for (; i > left && (fn ? fn(arr[i-1], tmp) > 0 : arr[i-1]>tmp); i--) {
                arr[i] = arr[i-1];
            }
            if (i !== pos) {
                arr[i] = tmp;
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

exports = module.exports = quicksort;
