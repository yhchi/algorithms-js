var RBTree = (function () {
    function compare(a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }
    function Node(element, red) {
        this.element = element;
        this.red = red;
        this.left = null;
        this.right = null;
    }
    function isRed(node) {
        return node && node.red;
    }
    function chmod(node) {
        node.red = node.red ? false : true;
    }
    function rotateLeft(node) {
        var left = node.left;
        if (isRed(left.right)) {
            node.left = left.right;
            left.right = node.left.left;
            node.left.left = left;
            left = node.left;
        }
        node.left = left.right;
        left.right = node;
        chmod(left);
        chmod(node);
        return left;
    }
    function rotateRight(node) {
        var right = node.right;
        if (isRed(right.left)) {
            node.right = right.left;
            right.left = node.right.right;
            node.right.right = right;
            right = node.right;
        }
        node.right = right.left;
        right.left = node;
        chmod(right);
        chmod(node);
        return right;
    }
    function RBTree(arr, fn, fn2) {
        if (typeof arr === 'function') {
            fn2 = fn;
            fn = arr;
            arr = undefined;
        }
        this.insertfn = fn || compare;
        this.searchfn = fn2 || compare;
        this.top = null;
        if (arr) {
            for (var i = 0; i < arr.length; i++) {
                 this.insert(arr[i]);
            }
        }
    }
    
    RBTree.prototype = {
        insert: function(element) {
            if (!this.top) {
                this.top = new Node(element, false);
            } else {
                var X, P, GP, GGP;
                X = this.top;
                while (1) {
                    if (this.insertfn(element, X.element) != 0) {
                        if (isRed(X.left) && isRed(X.right)) {
                            chmod(X.left);
                            chmod(X.right);
                            if (P)
                                chmod(X);
                            if (isRed(P)) {
                                GP = this.insertfn(element, GP.element) < 0 ?
                                    rotateLeft(GP) : rotateRight(GP);
                                if (!GGP)
                                    this.top = GP;
                                else if (this.insertfn(element, GGP.element) < 0)
                                    GGP.left = GP;
                                else
                                    GGP.right = GP;
                                P = X;
                                X = this.insertfn(element, X.element) < 0 ?
                                    X.left : X.right;
                            }
                        } else if (this.insertfn(element, X.element) < 0) {
                            if (X.left) {
                                GGP = GP; GP = P; P = X; X = X.left;
                            } else {
                                X.left = new Node(element, true);
                                if (isRed(X)) {
                                    P = this.insertfn(element, P.element) < 0 ?
                                        rotateLeft(P) : rotateRight(P)
                                    if (GP) {
                                        if (this.insertfn(element, GP.element) < 0)
                                            GP.left = P;
                                        else
                                            GP.right = P;
                                    } else {
                                        this.top = P;
                                    }
                                }
                                break;
                            }
                        } else {
                            if (X.right) {
                                GGP = GP; GP = P; P = X; X = X.right;
                            } else {
                                X.right = new Node(element, true);
                                if (isRed(X)) {
                                    P = this.insertfn(element, P.element) < 0 ?
                                        rotateLeft(P) : rotateRight(P)
                                    if (GP) {
                                        if (this.insertfn(element, GP.element) < 0)
                                            GP.left = P;
                                        else
                                            GP.right = P;
                                    } else {
                                        this.top = P;
                                    }
                                }
                                break;
                            }
                        }
                    } else {
                        X.element = element;
                        break;
                    }
                }
            }
        },
    };
    
    return RBTree;
})();