// Implementation A: Using arithmetic sequence formula (Gauss's Formula)
// Time complexity: O(1), Space complexity: O(1)
// Most efficient approach - constant time and space
const sum_to_n_a = (n: number): number => {
  return Math.floor((n * (n + 1)) / 2);
};

// Implementation B: Using recursion with tail call optimization
// Time complexity: O(n), Space complexity: O(n)
// Note: TypeScript/JavaScript engines might not optimize tail calls
const sum_to_n_b = (n: number, acc: number = 0): number => {
  if (n <= 0) return acc;
  return sum_to_n_b(n - 1, acc + n);
};

// Implementation C: Using iteration
// Time complexity: O(n), Space complexity: O(1)
// More memory efficient than array methods, less than recursion
const sum_to_n_c = (n: number): number => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};
