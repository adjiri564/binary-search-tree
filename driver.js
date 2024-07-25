import {Tree, prettyPrint} from "./bst.js";

// Function to generate random numbers  
const generateRandomNumbers = (count, max) => {  
    const numbers = new Set();  
    while (numbers.size < count) {  
        numbers.add(Math.floor(Math.random() * max));  
    }  
    return Array.from(numbers);  
};  

// Create a binary search tree from random numbers  
let randomNumbers = generateRandomNumbers(10, 100);  
const bst = new Tree(randomNumbers);  

console.log("Original Binary Search Tree:");  
prettyPrint(bst.root);  

console.log("Is the tree balanced?", bst.isBalanced());  

// Print elements in various orders  
console.log("Level Order:");  
bst.levelOrder(node => console.log(node.data));  

console.log("In Order:");  
bst.inOrder(node => console.log(node.data));  

console.log("Pre Order:");  
bst.preOrder(node => console.log(node.data));  

console.log("Post Order:");  
bst.postOrder(node => console.log(node.data));  

// Unbalance the tree  
console.log("\nUnbalancing the tree by adding numbers > 100:");  
bst.insert(101);  
bst.insert(102);  
bst.insert(103);  
bst.insert(104);  
bst.insert(105);  
prettyPrint(bst.root);  
console.log("Is the tree balanced?", bst.isBalanced());  

// Rebalance the tree  
console.log("\nRebalancing the tree now...");  
bst.rebalance();  
prettyPrint(bst.root);  
console.log("Is the tree balanced?", bst.isBalanced());  

// Print elements in various orders again after rebalancing  
console.log("Level Order post-rebalance:");  
bst.levelOrder(node => console.log(node.data));  

console.log("In Order post-rebalance:");  
bst.inOrder(node => console.log(node.data));  

console.log("Pre Order post-rebalance:");  
bst.preOrder(node => console.log(node.data));  

console.log("Post Order post-rebalance:");  
bst.postOrder(node => console.log(node.data));