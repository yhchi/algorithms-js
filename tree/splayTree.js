var SplayTree = (function() {
    function compare(a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }
    function Node(element) {
        this.element = element;
        this.left = null;
        this.right = null;
    }
    
    function getLeft(left) {
        while(left.right) {
            left = left.right;
        }
        return left;
    }
    function getRight(right) {
        while(right.left) {
            right = right.left;
        }
        return right;
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
    
    function SplayTree(arr, fn, fn2) {
        if (typeof arr === 'function') {
            fn2 = fn;
            fn = arr;
            arr = undefined;
        }
        this.insertfn = fn || compare;
        this.searchfn = fn2 || this.insertfn;
        this.top = null;
        if (arr) {
            for (var i = 0; i < arr.length; i++) {
                 this.insert(arr[i]);
            }
        }
    }
    
    SplayTree.prototype = {
        search(key, fn) {
            if (!this.top)
                return null;
            fn = fn || this.searchfn;
            var leftRoot = new Node(null),
                rightRoot = new Node(null),
                left = leftRoot,
                right = rightRoot;
            var P = this.top, X, C,
                relation, relation2;
            while (P) {
                relation = fn(key, P.element);
                X = relation < 0 ? P.left : P.right;
                if (relation == 0 || !X) {
                    left.right = P.left;
                    right.left = P.right;
                    P.left = leftRoot.right;
                    P.right = rightRoot.left;
                    this.top = P;
                    P = null;
                } else {
                    relation2 = fn(key, X.element);
                    C = relation2 < 0 ? X.left : X.right;
                    if (relation < 0) {
                        if (relation2 == 0 || !C || relation2 > 0) {
                            P.left = null;
                            right.left = P;
                            right = getRight(right);
                            P = X;
                        } else {
                            P.left = X.right;
                            X.left = null;
                            X.right = P;
                            right.left = X;
                            right = getRight(right);
                            P = C;
                        }
                    } else {
                        if (relation2 == 0 || !C || relation2 < 0) {
                            P.right = null;
                            left.right = P;
                            left = getLeft(left);
                            P = X;
                        } else {
                            P.right = X.left;
                            X.right = null;
                            X.left = P;
                            left.right = X;
                            left = getLeft(left);
                            P = C;
                        }
                    }
                }
            }
            return fn(key, this.top.element) == 0 ? this.top.element : null;
        },
        insert: function(element) {
            if (!this.top) {
                this.top = new Node(element, false);
            } else {
                this.search(element, this.insertfn);
                var relation = this.insertfn(element, this.top.element);
                if (relation == 0) {
                    this.top.element = element;
                } else {
                    var node = new Node(element);
                    if (relation < 0) {
                        node.left = this.top.left;
                        node.right = this.top;
                        this.top.left = null;
                    } else {
                        node.left = this.top;
                        node.right = this.top.right;
                        this.top.right = null;
                    }
                    this.top = node;
                }
            }
        },
        delete: function(key, fn) {
            fn = fn || this.searchfn;
            this.search(key, fn);
            var top = this.top,
                left = top.left,
                right = top.right,
                relation = fn(key, top.element);
            if (relation == 0) {
                if (!left) {
                    this.top = right;
                } else {
                    this.top = left;
                    this.search(key, fn);
                    this.top.right = right;
                }
            }
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
    
    return SplayTree;
})();


function splayTreeTest() {
    var tree = new SplayTree(),
        arr = [], str = '';
    for (var i = 0; i < 5000; i++) {
        var x = Math.floor(Math.random()*1000);
        if (Math.random() < 0.7) {
            tree.insert(x);
            if (arr.indexOf(x) < 0)
                arr.push(x);
            str += 'insert('+x+');\n';
        } else {
            tree.delete(x);
            var ind = arr.indexOf(x);
            if (ind >= 0)
                arr.splice(ind, 1);
            str += 'del('+x+');\n';
        }
    }
    var s1 = '', s2 = '';
    tree.inorder((elem)=>{s1+=elem+','});
    s2 = arr.sort((a,b)=>a-b).join(',')+',';
    if (s1 !== s2) {
        console.log(s1);
        console.log(s2);
        console.log(str);
    } else {
        console.log('正确');
    }
}