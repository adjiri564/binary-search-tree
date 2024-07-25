class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(array){
        this.root = this.buildTree(array);
    }
    //A function to build a balance BST from array
    buildTree(array){
        //Remove duplicates and sort the array
        const uniqueSortedArray = [...new Set(array)].sort((a,b)=> a - b);
        return this.buildTreeFromSortedArray(uniqueSortedArray)
    }

    buildTreeFromSortedArray(array){
        if(array.length === 0) return null;
        const midIndex = Math.floor(array.length/2);
        const node = new Node(array[midIndex])

        //Recursively build left and right subtree
        node.left = this.buildTreeFromSortedArray(array.slice(0,midIndex));
        node.right = this.buildTreeFromSortedArray(array.slice(midIndex+1));

        return node;
    }
    //insert value into BST
    insert(value){
        this.root = this.insertRec(this.root, value);
    }
    insertRec(node, value){
        if(node === null){
            return new Node(value);
        }
        if(value < node.data){
                node.left = this.insertRec(node.left, value);
        }
        else if(value > node.data){
            node.right = this.insertRec(node.right, value);
        }
        return node;
    }
    //Delete value from BST
    deleteItem(value){
        this.root = this.deleteRec(this.root, value)
    }
    deleteRec(node, value){
        if(node === null){
            return node
        }
        if(value < node.data){
            node.left = this.deleteRec(node.left, value)
        } else if(value > node.data){
            node.right = this.deleteRec(node.right, value)
        } else {
            //Node with only one child or no child
            if(node.left === null){
                return node.right
            } else if(node.right === null){
                return node.left
            }
            //Node with two children: get the inorder successor
            const minLargeNode = this.findMin(node.right);
            node.data = minLargeNode.data //Copy the inorder successor's value
            node.right = this.deleteRec(node.right, minLargeNode.data) //Delete the inorder successor
        }
        return node;
    }
    findMin(node){
        while(node.left !== null){
            node = node.left
        }
        return node;
    }
    //Find node with given value
    find(value){
        return this.findRec(this.root, value);
    }
    findRec(node, value){
        if(node === null || node.data === value){
            return node;
        }
        if(value < node.data){
            return this.findRec(node.left, value);
        }
        return this.findRec(node.right, value);
    }
    //Level order traversal
    levelOrder(callback){
        if(!callback){
            throw new Error("Callback is required");
        }
        const queue = [this.root];
        while(queue.length > 0){
            const node = queue.shift();
            if(node){
                callback(node);
                queue.push(node.left);
                queue.push(node.right);
            }
        }
    }
    //Inoreder traversal
    inOrder(callback){
        if(!callback){
            throw new Error("Callback is required");
        }
        this.inOrderRec(this.root, callback);
    }
    inOrderRec(node, callback){
        if(node){
            this.inOrderRec(node.left, callback);
            callback(node);
            this.inOrderRec(node.right, callback);
        }
    }
    //Pre-order traversal
    preOrder(callback){
        if(!callback){
            throw new Error("Callback required");
        }
        this.preOderRec(this.root, callback);
    }
    preOderRec(node, callback){
        if(node){
            callback(node);
            this.preOderRec(node.left, callback);
            this.preOderRec(node.right, callback);
        }
    }
    //Post-order traversal
    postOrder(callback){
        if(!callback){
            throw new Error("Callback is required");
        }
        this.postOrderRec(this.root, callback);
    }
    postOrderRec(node, callback) {  
        if (node) {  
            this.postOrderRec(node.left, callback);  
            this.postOrderRec(node.right, callback);  
            callback(node);  
        }  
    } 
    // Calculate height of a node  
    height(node) {  
        if (node === null) {  
            return -1;  
        } // -1 returns zero for leaves  
        const leftHeight = this.height(node.left);  
        const rightHeight = this.height(node.right);  
        return Math.max(leftHeight, rightHeight) + 1;  
    }  
     // Calculate depth of a node  
    depth(node) {  
        let d = 0;  
        let current = this.root;  
        while (current && current !== node) {  
            if (node.data < current.data) {  
                current = current.left;  
            } else {  
                current = current.right;  
            }  
            d++;  
        }  
        return current ? d : -1; // Returns -1 if node is not found  
    }
    // Check if tree is balanced  
    isBalanced() {  
        return this.checkBalanced(this.root) !== -1;  
    }
    checkBalanced(node) {  
        if (node === null) {  
            return 0; // height of an empty tree  
        }  

        const leftHeight = this.checkBalanced(node.left);  
        const rightHeight = this.checkBalanced(node.right);  

        if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {  
            return -1; // Tree is unbalanced  
        }  

        return Math.max(leftHeight, rightHeight) + 1; // return height  
    }
    // Rebalance the tree  
    rebalance() {  
        const values = [];  
        this.inOrder((node) => values.push(node.data));  
        this.root = this.buildTree(values);  
    }  
}  


// Visualization function  
const prettyPrint = (node, prefix = "", isLeft = true) => {  
    if (node === null) {  
        return;  
    }  
    if (node.right !== null) {  
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);  
    }  
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);  
    if (node.left !== null) {  
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);  
    }  
}; 

export  {Tree, prettyPrint};
