class TreeNode{
    constructor(val, left, right){
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

function closestValue(root, target) {
    let closest = root.val; // Initialize closest to root's value
    
    while (root !== null) {
        // If the current value is closer to the target, update closest
        if (Math.abs(root.val - target) < Math.abs(closest - target)) {
            closest = root.val;
        }
        
        // If the target is smaller, move to the left child
        if (target < root.val) {
            root = root.left;
        }
        // If the target is greater, move to the right child
        else {
            root = root.right;
        }
    }
    
    return closest;
}

const buildTreeFromArray = (arr, index) => {
    if (index >= arr.length || arr[index] === null) {
        return null;
    }

    const root = new TreeNode(arr[index]);
    root.left =  buildTreeFromArray(arr, 2 * index + 1);
    root.right = buildTreeFromArray(arr, 2 * index + 2);
    return root;
}

const arr = [4, 2, 5, 1, 3], target = 3.714286
const root = buildTreeFromArray(arr, 0);
closestValue(root, target);
