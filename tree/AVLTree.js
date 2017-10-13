var AVLTree = (function () {
    function Node(element) {
        this.element = element;
        this.height = 0;
        this.left = null;
        this.right = null;
        this.count = 1;
    }
    
    function search(node, key, fn) {
        var elem = node.element;
        if (fn ? fn(elem, key) > 0 : elem > key) {
            return node.left ? search(node.left, key, fn) : null;
        } else if (fn ? fn(elem, key) < 0 : elem < key) {
            return node.right ? search(node.right, key, fn) : null;
        } else {
            return node.count ? elem : null;
        }
    }
    
    function AVLTree(arr, fn, fn2) {
        if (typeof arr === 'function') {
            fn2 = fn;
            fn = arr;
            arr = undefined;
        }
        this.insertfn = fn || null;
        this.searchfn = fn2 || null;
        this.top = null;
        if (arr) {
            for (var i = 0; i < arr.length; i++) {
                // this.insert(arr[i]);
            }
        }
    }
    
    AVLTree.prototype = {
        search: function(key, fn) {
            fn = fn || this.fn;
            return search(this.top, key, fn);
        },
    };
    
    return AVLTree;
})();

var a = {
    height: 0,
    element: {
        code: 1,
        word: 'hello',
    },
    count: 1,
    left: null,
    right: null,
};
var b = {
    height: 0,
    element: {
        code: 3,
        word: 'hi',
    },
    count: 1,
    left: null,
    right: null,
};
var c = {
    height: 1,
    element: {
        code: 2,
        word: 'good',
    },
    count: 1,
    left: a,
    right: b,
};
var tree = new AVLTree();
tree.top = c;
tree.search(3, (e, k) => e.code - k);
