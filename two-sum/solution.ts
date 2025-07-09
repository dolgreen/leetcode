// the simple solution  O(n^2)
function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}

// the simple solution after refactoring O(n^2)
function twoSumRefactor(nums: number[], target: number): number[] {
  let twoNumbers: number[] = [];
  nums.map((num, i) => {
    nums.map((num2, j) => {
      if (i === j) {
        return;
      }
      if (num + num2 === target) {
        twoNumbers = [i, j];
        return;
      }
    });
  });
  return twoNumbers;
}

// more complex solution  O(n)
function twoSumComplex(nums: number[], target: number): number[] {
  const map: Map<number, number> = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// more complex solution without hashmap (since its cheating) O(n log n)
function twoSumComplexNoMap(nums: number[], target: number): number[] {
  const arr = nums.map((num, idx) => ({ num, idx }));
  arr.sort((a, b) => a.num - b.num);
  for (let i = 0; i < arr.length; i++) {
    let left = 0,
      right = arr.length - 1;
    while (left <= right) {
      if (left === i) {
        left++;
        continue;
      }
      if (right === i) {
        right--;
        continue;
      }
      const sum = arr[i].num + arr[left].num;
      if (sum === target) {
        return [arr[i].idx, arr[left].idx];
      }

      sum < target ? left++ : right--;
    }
  }
  return [];
}
