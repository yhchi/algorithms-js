var LeftistHeap = (function () {
    function compare(a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }
    function Node(element) {
        this.element = element;
        this.npl = 0;
        this.left = null;
        this.right = null;
    }
    function getNpl(node) {
        return node ? node.npl : -1;
    }
    function merge(node1, node2, fn) {
        if (!node1 || !node2)
            return node1 || node2;
        var tmp;
        if (fn(node1.element, node2.element) > 0) {
            tmp = node1;
            node1 = node2;
            node2 = tmp;
        }
        node1.right = merge(node1.right, node2, fn);
        if (getNpl(node1.right) > getNpl(node1.left)) {
            tmp = node1.left;
            node1.left = node1.right;
            node1.right = tmp;
        }
        node1.npl = getNpl(node1.left) + 1;
        return node1;
    }
    
    function LDR(node, fn) {
        if (node.left)
            LDR(node.left, fn);
        fn(node.element, node);
        if (node.right)
            LDR(node.right, fn);
    }
    function DLR(node, fn) {
        fn(node.element, node);
        if (node.left)
            DLR(node.left, fn);
        if (node.right)
            DLR(node.right, fn);
    }
    function LRD(node, fn) {
        if (node.left)
            LRD(node.left, fn);
        if (node.right)
            LRD(node.right, fn);
        fn(node.element, node);
    }
    
    function LeftistHeap(arr, fn) {
        if (typeof arr === 'function') {
            fn = arr;
            arr = undefined;
        }
        this.fn = fn || compare;
        this.top = null;
        if (arr) {
            for (var i = 0; i < arr.length; i++) {
                 this.insert(arr[i]);
            }
        }
    }
    
    LeftistHeap.prototype = {
        merge: function(heap) {
            this.top = merge(this.top, heap.top, this.fn);
            heap.top = null;
        },
        insert: function(element) {
            var node = new Node(element);
            this.top = merge(this.top, node, this.fn);
        },
        delMin: function() {
            if (!this.top)
                return null;
            var top = this.top,
                elem = top.element;
            this.top = merge(top.left, top.right, this.fn);
            return elem;
        },
        // 中序遍历
        inorder: function(fn) {
            if (this.top)
                LDR(this.top, fn);
        },
        // 前序遍历 / 先根遍历
        preorder: function(fn) {
            if (this.top)
                DLR(this.top, fn);
        },
        // 后序遍历 / 后根遍历
        postorder: function(fn) {
            if (this.top)
                LRD(this.top, fn);
        },
    };
    
    return LeftistHeap;
})();