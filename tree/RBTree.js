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
        if (!node)
            return;
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
    
    function rotateX(X) {
        var left = X.left,
            right = X.right;
        if (isRed(left)) {
            X.left = left.right;
            left.right = X;
            chmod(left);
            chmod(X);
            return left;
        } else {
            X.right = right.left;
            right.left = X;
            chmod(right);
            chmod(X);
            return right;
        }
    }
    function delRotRight(P) {
        var X = P.left,
            T = P.right;
        if (isRed(T.left)) {
            P.right = T.left;
            T.left = P.right.right;
            P.right.right = T;
            T = P.right;
        } else {
            chmod(T);
            chmod(T.right);
        }
        P.right = T.left;
        T.left = P;
        chmod(X);
        chmod(P);
        return T;
    }
    function delRotLeft(P) {
        var X = P.right,
            T = P.left;
        if (isRed(T.right)) {
            P.left = T.right;
            T.right = P.left.left;
            P.left.left = T;
            T = P.left;
        } else {
            chmod(T);
            chmod(T.left);
        }
        P.left = T.right;
        T.right = P;
        chmod(X);
        chmod(P);
        return T;
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
    
    function RBTree(arr, fn, fn2) {
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
        delete: function(key, fn) {
            this.__delete__(key, fn);
            if (isRed(this.top))
                this.top.red = false;
        },
        __delete__: function(key, fn) {
            fn = fn || this.searchfn;
            var find = null,
                X = this.top, P, GP,
                T, C, CT, Y;
            while (!find) {
                if (!X)
                    return;
                T = P ? (X === P.left ? P.right : P.left) : null;
                C = fn(key, X.element) < 0 ? X.left : X.right;
                CT = C === X.left ? X.right : X.left;
                if ((X.left && X.right) || (!X.left && !X.right)) {
                    if (isRed(C)) {
                        GP = P; P = X; X = C;
                        if (fn(key, P.element) == 0) {
                            find = P;
                        } else {
                            if (fn(key, X.element) == 0) {
                                find = X;
                            }
                            GP = P; P = X;
                            X = fn(key, X.element) < 0 ? X.left : X.right;
                        }
                        continue;
                    } else if (isRed(CT)) {
                        if (P) {
                            if (X === P.left)
                                P.left = rotateX(X);
                            else
                                P.right = rotateX(X);
                        } else {
                            this.top = rotateX(X);
                        }
                        GP = P; P = CT;
                    } else if (T && (isRed(T.left) || isRed(T.right))) {
                        Y = X === P.left ? delRotRight(P) : delRotLeft(P);
                        if (!GP) {
                            GP = this.top = Y;
                        } else if (P === GP.left) {
                            GP = GP.left = Y;
                        } else {
                            GP = GP.right = Y;
                        }
                    } else {
                        chmod(X);
                        chmod(T);
                        chmod(P);
                    }
                    if (fn(key, X.element) == 0)
                        find = X;
                    GP = P; P = X; X = C;
                } else if (fn(key, X.element) == 0) {
                    if (X.left) {
                        X.element = X.left.element;
                        X.left = null;
                    } else if (X.right) {
                        X.element = X.right.element;
                        X.right = null;
                    }
                    return;
                } else {
                    if (X.left && fn(key, X.left.element) == 0) {
                        X.left = null;
                    } else if (X.right && fn(key, X.right.element) == 0) {
                        X.right = null;
                    }
                    return;
                }
            }
            if (!X) {
                if (GP) {
                    if (P === GP.left)
                        GP.left = null;
                    else
                        GP.right = null;
                } else {
                    this.top = null;
                }
                return;
            }
            if (isRed(X)) {
                if (X.left) {
                    GP = P; P = X; X = X.left;
                } else {
                    P.element = X.element;
                    P.right = null;
                    return;
                }
            }
            while (1) {
                T = X === P.left ? P.right : P.left;
                if (!X.left && X.right) {
                    find.element = X.element;
                    X.element = X.right.element;
                    X.right = null;
                    return;
                } else if (X.left && !X.right) {
                    find.element = X.left.element;
                    X.left = null;
                    return;
                } else if (isRed(X.left)) {
                    GP = P; P = X; X = X.left;
                } else if (isRed(X.right)) {
                    GP = P;
                    if (X === P.left) {
                        P = P.left = rotateX(X);
                    } else {
                        P = P.right = rotateX(X);
                    }
                } else if (T && (isRed(T.left) || isRed(T.right))) {
                    Y = X === P.left ? delRotRight(P) : delRotLeft(P);
                    if (GP) {
                        if (P === GP.left)
                            GP.left = Y;
                        else
                            GP.right = Y;
                    } else {
                        this.top = Y;
                    }
                    GP = Y;
                } else {
                    chmod(X);
                    chmod(P);
                    chmod(T);
                }
                
                if (X.left) {
                    GP = P; P = X; X = X.left;
                } else {
                    if (X === P.left) {
                        P.left = null;
                    } else {
                        P.right = null;
                    }
                    find.element = X.element;
                    return;
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
    
    return RBTree;
})();