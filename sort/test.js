var sort = {
    quicksort: require('./quicksort'),
    heapsort: require('./heapsort'),
    mergesort: require('./mergesort'),
};
var t1 = 0,
    t2 = 0,
    t3 = 0,
    n = 0;
function timeTest(size) {
    var arr1 = new Int16Array(size),
        arr2 = new Int16Array(size),
        arr3 = new Int16Array(size);
    for (var i = 0; i < size; i++) {
        arr1[i] = arr2[i] = arr3[i] = Math.random() * 2**16 - 2**15;
    }
    var t = new Date();
    sort.mergesort(arr1);
    t1 += new Date() - t;
    t = new Date();
    sort.heapsort(arr2);
    t2 += new Date() - t;
    t = new Date();
    sort.quicksort(arr3);
    t3 += new Date() - t;
    n++;
}

function test() {
    for (var i = 0; i < 10; i++) {
        timeTest(100000);
    }
    
    console.log('n: ' + n);
    console.log('归并排序: ' + t1/n + '\n堆排序: ' + t2/n + '\n快速排序: ' + t3/n);
    setTimeout(test, 1);
}

test();