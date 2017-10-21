var AVLTree = (function () {
    function Node(element) {
        this.element = element;
        this.height = 0;
        this.left = null;
        this.right = null;
    }
    
    function search(node, key, fn) {
        if (!node)
            return null;
        var elem = node.element;
        if (fn ? fn(key, elem) < 0 : key < elem) {
            return node.left ? search(node.left, key, fn) : null;
        } else if (fn ? fn(key, elem) > 0 : key > elem) {
            return node.right ? search(node.right, key, fn) : null;
        } else {
            return elem;
        }
    }
    
    function height(node) {
        return node ? node.height : -1;
    }
    function rotateLeft(node) {
        var left = node.left;
        if (height(left.left) < height(left.right)) {
            left.height--;
            left.right.height++;
            node.left = left.right;
            left.right = node.left.left;
            node.left.left = left;
            left = node.left;
        }
        node.height--;
        node.left = left.right;
        left.right = node;
        return left;
    }
    function rotateRight(node) {
        var right = node.right;
        if (height(right.right) < height(right.left)) {
            right.height--;
            right.left.height++;
            node.right = right.left;
            right.left = node.right.right;
            node.right.right = right;
            right = node.right;
        }
        node.height--;
        node.right = right.left;
        right.left = node;
        return right;
    }
    
    function insert(node, element, fn) {
        var elem = node.element;
        if (fn ? fn(element, elem) < 0 : element < elem) {
            if (node.left) {
                node.left = insert(node.left, element, fn);
                if (height(node.left) - height(node.right) === 2) {
                    node = rotateLeft(node);
                } else if (node.left.height === node.height) {
                    node.height++;
                }
            } else {
                node.left = new Node(element);
                if (!node.right) {
                    node.height++;
                }
            }
        } else if (fn ? fn(element, elem) > 0 : element > elem) {
            if (node.right) {
                node.right = insert(node.right, element, fn);
                if (height(node.right) - height(node.left) === 2) {
                    node = rotateRight(node);
                } else if (node.right.height === node.height) {
                    node.height++;
                }
            } else {
                node.right = new Node(element);
                if (!node.left) {
                    node.height++;
                }
            }
        }
        return node;
    }
    
    function delMin(node) {
        if (node.left) {
            node.left = delMin(node.left);
            if (height(node.right) - height(node.left) === 2) {
                node.height--;
                node = rotateRight(node);
            } else if (height(node.right) === height(node.left) && node.height - height(node.left) === 2) {
                node.height--;
            }
        } else {
            node = node.right;
        }
        return node;
    }
    function delNode(node) {
        if (!node.left) {
            if (!node.right) {
                node = null;
            } else {
                node = node.right;
            }
        } else if (!node.right) {
            node = node.left;
        } else {
            var minNode = node.right;
            while(minNode.left) {
                minNode = minNode.left;
            }
            node.element = minNode.element;
            node.right = delMin(node.right);
            node.height = Math.max(height(node.left), height(node.right)) + 1;
        }
        return node;
    }
    function del(node, key, fn) {
        if (!node)
            return null;
        var elem = node.element;
        if (fn ? fn(key, elem) < 0 : key < elem) {
            if (node.left) {
                node.left = del(node.left, key, fn);
                if (height(node.right) - height(node.left) === 2) {
                    node.height--;
                    node = rotateRight(node);
                } else if (height(node.right) === height(node.left) && node.height - height(node.left) === 2) {
                    node.height--;
                }
            }
        } else if (fn ? fn(key, elem) > 0 : key > elem) {
            if (node.right) {
                node.right = del(node.right, key, fn);
                if (height(node.left) - height(node.right) === 2) {
                    node.height--;
                    node = rotateLeft(node);
                } else if (height(node.right) === height(node.left) && node.height - height(node.left) === 2) {
                    node.height--;
                }
            }
        } else {
            node = delNode(node);
        }
        return node;
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
                 this.insert(arr[i]);
            }
        }
    }
    
    AVLTree.prototype = {
        search: function(key, fn) {
            fn = fn || this.searchfn || this.insertfn;
            return search(this.top, key, fn);
        },
        insert: function(element) {
            if (this.top) {
                this.top = insert(this.top, element, this.insertfn);
            } else {
                this.top = new Node(element);
            }
        },
        delete: function(key, fn) {
            fn = fn || this.searchfn || this.insertfn;
            this.top = del(this.top, key, fn);
        }
    };
    
    return AVLTree;
})();

var tree = new AVLTree([{
        code: 1,
        word: 'hello',
    },{
        code: 3,
        word: 'hi',
    },{
        code: 2,
        word: 'good',
    }], (a, b) => a.code - b.code, (k, e) => k - e.code);
tree.search(3);
