export interface StriverProblem {
  id: number;
  title: string;
  difficulty: "Basic" | "Core" | "Advanced";
  leetcode?: string;
}

export interface StriverStep {
  id: number;
  title: string;
  description: string;
  topics: string[];
  problemCount: number;
  problems: StriverProblem[];
}

export const striverA2Z: StriverStep[] = [
  // =========================================================
  // STEP 1: Learn the Basics
  // =========================================================
  {
    id: 1,
    title: "Learn the Basics",
    description:
      "Build a strong foundation in programming, arrays, mathematics, and basic problem solving.",
    topics: [
      "Programming Basics",
      "Input / Output",
      "Time & Space Complexity",
      "Basic Maths",
      "Arrays Basics",
      "Basic Recursion",
    ],
    problemCount: 25,
    problems: [
      { id: 1, title: "Move Zeroes", difficulty: "Basic", leetcode: "https://leetcode.com/problems/move-zeroes/" },
      { id: 2, title: "Remove Duplicates from Sorted Array", difficulty: "Basic", leetcode: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
      { id: 3, title: "Missing Number", difficulty: "Basic", leetcode: "https://leetcode.com/problems/missing-number/" },
      { id: 4, title: "Find All Numbers Disappeared in an Array", difficulty: "Core", leetcode: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/" },
      { id: 5, title: "Contains Duplicate", difficulty: "Basic", leetcode: "https://leetcode.com/problems/contains-duplicate/" },
      { id: 6, title: "Reverse Integer", difficulty: "Basic", leetcode: "https://leetcode.com/problems/reverse-integer/" },
      { id: 7, title: "Palindrome Number", difficulty: "Basic", leetcode: "https://leetcode.com/problems/palindrome-number/" },
      { id: 8, title: "Power of Three", difficulty: "Basic", leetcode: "https://leetcode.com/problems/power-of-three/" },
      { id: 9, title: "Roman to Integer", difficulty: "Basic", leetcode: "https://leetcode.com/problems/roman-to-integer/" },
      { id: 10, title: "Excel Sheet Column Number", difficulty: "Basic", leetcode: "https://leetcode.com/problems/excel-sheet-column-number/" },
      { id: 11, title: "Count Primes", difficulty: "Core", leetcode: "https://leetcode.com/problems/count-primes/" },
      { id: 12, title: "Factorial Trailing Zeroes", difficulty: "Core", leetcode: "https://leetcode.com/problems/factorial-trailing-zeroes/" },
      { id: 13, title: "Plus One", difficulty: "Basic", leetcode: "https://leetcode.com/problems/plus-one/" },
      { id: 14, title: "Add Binary", difficulty: "Basic", leetcode: "https://leetcode.com/problems/add-binary/" },
      { id: 15, title: "Sqrt(x)", difficulty: "Basic", leetcode: "https://leetcode.com/problems/sqrtx/" },
      { id: 16, title: "Happy Number", difficulty: "Basic", leetcode: "https://leetcode.com/problems/happy-number/" },
      { id: 17, title: "Ugly Number", difficulty: "Basic", leetcode: "https://leetcode.com/problems/ugly-number/" },
      { id: 19, title: "Fibonacci Number", difficulty: "Basic", leetcode: "https://leetcode.com/problems/fibonacci-number/" },
    ],
  },

  // =========================================================
  // STEP 2: Sorting Techniques
  // =========================================================
  {
    id: 2,
    title: "Sorting Techniques",
    description:
      "Learn fundamental sorting algorithms and understand their time and space complexity.",
    topics: [
      "Selection Sort",
      "Bubble Sort",
      "Insertion Sort",
      "Merge Sort",
      "Quick Sort",
      "Recursive Bubble Sort",
      "Recursive Insertion Sort",
    ],
    problemCount: 11,
    problems: [
      { id: 1, title: "Sort an Array", difficulty: "Core", leetcode: "https://leetcode.com/problems/sort-an-array/" },
      { id: 2, title: "Sort Colors", difficulty: "Core", leetcode: "https://leetcode.com/problems/sort-colors/" },
      { id: 3, title: "Merge Sorted Array", difficulty: "Basic", leetcode: "https://leetcode.com/problems/merge-sorted-array/" },
      { id: 4, title: "Largest Number", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/largest-number/" },
    ],
  },

  // =========================================================
  // STEP 3: Arrays
  // =========================================================
  {
    id: 3,
    title: "Arrays",
    description:
      "Master array manipulation, hashing, subarrays, matrices, and important array algorithms.",
    topics: [
      "Easy Array Problems",
      "Medium Array Problems",
      "Hard Array Problems",
      "Kadane's Algorithm",
      "Hashing",
      "Matrix Problems",
    ],
    problemCount: 40,
    problems: [
      { id: 1, title: "Two Sum", difficulty: "Basic", leetcode: "https://leetcode.com/problems/two-sum/" },
      { id: 2, title: "Best Time to Buy and Sell Stock", difficulty: "Basic", leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      { id: 3, title: "Maximum Subarray", difficulty: "Core", leetcode: "https://leetcode.com/problems/maximum-subarray/" },
      { id: 4, title: "Majority Element", difficulty: "Core", leetcode: "https://leetcode.com/problems/majority-element/" },
      { id: 5, title: "Maximum Product Subarray", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/maximum-product-subarray/" },
      { id: 6, title: "Rotate Image", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/rotate-image/" },
      { id: 7, title: "Set Matrix Zeroes", difficulty: "Core", leetcode: "https://leetcode.com/problems/set-matrix-zeroes/" },
      { id: 8, title: "Pascal's Triangle", difficulty: "Basic", leetcode: "https://leetcode.com/problems/pascals-triangle/" },
      { id: 9, title: "Next Permutation", difficulty: "Core", leetcode: "https://leetcode.com/problems/next-permutation/" },
      { id: 10, title: "Longest Consecutive Sequence", difficulty: "Core", leetcode: "https://leetcode.com/problems/longest-consecutive-sequence/" },
      { id: 11, title: "Subarray Sum Equals K", difficulty: "Core", leetcode: "https://leetcode.com/problems/subarray-sum-equals-k/" },
      { id: 12, title: "Spiral Matrix", difficulty: "Core", leetcode: "https://leetcode.com/problems/spiral-matrix/" },
      { id: 13, title: "3Sum", difficulty: "Core", leetcode: "https://leetcode.com/problems/3sum/" },
      { id: 14, title: "4Sum", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/4sum/" },
      { id: 15, title: "Majority Element II", difficulty: "Core", leetcode: "https://leetcode.com/problems/majority-element-ii/" },
      { id: 16, title: "Merge Intervals", difficulty: "Core", leetcode: "https://leetcode.com/problems/merge-intervals/" },
      { id: 17, title: "Rotate Array", difficulty: "Basic", leetcode: "https://leetcode.com/problems/rotate-array/" },
      { id: 18, title: "Product of Array Except Self", difficulty: "Core", leetcode: "https://leetcode.com/problems/product-of-array-except-self/" },
      { id: 19, title: "Find the Duplicate Number", difficulty: "Core", leetcode: "https://leetcode.com/problems/find-the-duplicate-number/" },
      { id: 21, title: "Reverse Pairs", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/reverse-pairs/" },
      { id: 22, title: "Maximum Subarray Min Product", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/maximum-subarray-min-product/" },
      { id: 23, title: "Unique Paths", difficulty: "Core", leetcode: "https://leetcode.com/problems/unique-paths/" },
      { id: 25, title: "Rearrange Array Elements by Sign", difficulty: "Core", leetcode: "https://leetcode.com/problems/rearrange-array-elements-by-sign/" },
      { id: 29, title: "Intersection of Two Arrays II", difficulty: "Basic", leetcode: "https://leetcode.com/problems/intersection-of-two-arrays-ii/" },
      { id: 30, title: "Single Number", difficulty: "Basic", leetcode: "https://leetcode.com/problems/single-number/" },
      { id: 33, title: "Merge Overlapping Subintervals", difficulty: "Core", leetcode: "https://leetcode.com/problems/merge-intervals/" },
      { id: 34, title: "Max Consecutive Ones", difficulty: "Basic", leetcode: "https://leetcode.com/problems/max-consecutive-ones/" },
      { id: 35, title: "Search a 2D Matrix", difficulty: "Core", leetcode: "https://leetcode.com/problems/search-a-2d-matrix/" },
      { id: 37, title: "Search a 2D Matrix II", difficulty: "Core", leetcode: "https://leetcode.com/problems/search-a-2d-matrix-ii/" },
      { id: 38, title: "Sort Colors (Dutch National Flag)", difficulty: "Core", leetcode: "https://leetcode.com/problems/sort-colors/" },
      { id: 39, title: "Maximum Consecutive Ones III", difficulty: "Core", leetcode: "https://leetcode.com/problems/max-consecutive-ones-iii/" },
    ],
  },

  // =========================================================
  // STEP 4: Binary Search
  // =========================================================
  {
    id: 4,
    title: "Binary Search",
    description:
      "Learn binary search and its important variations including search on answers.",
    topics: [
      "Binary Search Basics",
      "Lower Bound",
      "Upper Bound",
      "Search on Answer",
      "Binary Search on Arrays",
      "Binary Search on 2D Arrays",
    ],
    problemCount: 32,
    problems: [
      { id: 1, title: "Binary Search", difficulty: "Basic", leetcode: "https://leetcode.com/problems/binary-search/" },
      { id: 2, title: "Search Insert Position", difficulty: "Basic", leetcode: "https://leetcode.com/problems/search-insert-position/" },
      { id: 3, title: "Find First and Last Position of Element in Sorted Array", difficulty: "Core", leetcode: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/" },
      { id: 4, title: "Search in Rotated Sorted Array", difficulty: "Core", leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
      { id: 5, title: "Find Minimum in Rotated Sorted Array", difficulty: "Core", leetcode: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
      { id: 6, title: "Median of Two Sorted Arrays", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
      { id: 7, title: "Search in Rotated Sorted Array II", difficulty: "Core", leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/" },
      { id: 8, title: "Find Peak Element", difficulty: "Core", leetcode: "https://leetcode.com/problems/find-peak-element/" },
      { id: 9, title: "Single Element in a Sorted Array", difficulty: "Core", leetcode: "https://leetcode.com/problems/single-element-in-a-sorted-array/" },
      { id: 10, title: "Koko Eating Bananas", difficulty: "Core", leetcode: "https://leetcode.com/problems/koko-eating-bananas/" },
      { id: 11, title: "Minimum Number of Days to Make m Bouquets", difficulty: "Core", leetcode: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/" },
      { id: 12, title: "Find the Smallest Divisor Given a Threshold", difficulty: "Core", leetcode: "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/" },
      { id: 13, title: "Capacity to Ship Packages Within D Days", difficulty: "Core", leetcode: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/" },
      { id: 15, title: "Split Array Largest Sum", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/split-array-largest-sum/" },
      { id: 17, title: "Square Root of a Number", difficulty: "Basic", leetcode: "https://leetcode.com/problems/sqrtx/" },
      { id: 23, title: "Search a 2D Matrix", difficulty: "Core", leetcode: "https://leetcode.com/problems/search-a-2d-matrix/" },
      { id: 24, title: "Search a 2D Matrix II", difficulty: "Core", leetcode: "https://leetcode.com/problems/search-a-2d-matrix-ii/" },
      { id: 25, title: "Find Peak Element II", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/find-a-peak-element-ii/" },
      { id: 31, title: "Magnetic Force Between Two Balls", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/magnetic-force-between-two-balls/" },
      { id: 32, title: "Kth Missing Positive Number", difficulty: "Basic", leetcode: "https://leetcode.com/problems/kth-missing-positive-number/" },
    ],
  },

  // =========================================================
  // STEP 5: Strings
  // =========================================================
  {
    id: 5,
    title: "Strings",
    description:
      "Solve string manipulation, frequency, palindrome, and pattern-based problems.",
    topics: [
      "Basic String Problems",
      "Character Frequency",
      "Palindromes",
      "String Manipulation",
      "Advanced String Problems",
    ],
    problemCount: 25,
    problems: [
      { id: 1, title: "Valid Palindrome", difficulty: "Basic", leetcode: "https://leetcode.com/problems/valid-palindrome/" },
      { id: 2, title: "Valid Anagram", difficulty: "Basic", leetcode: "https://leetcode.com/problems/valid-anagram/" },
      { id: 3, title: "Longest Common Prefix", difficulty: "Basic", leetcode: "https://leetcode.com/problems/longest-common-prefix/" },
      { id: 4, title: "Reverse Words in a String", difficulty: "Core", leetcode: "https://leetcode.com/problems/reverse-words-in-a-string/" },
      { id: 5, title: "Longest Palindromic Substring", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/longest-palindromic-substring/" },
      { id: 6, title: "String to Integer (atoi)", difficulty: "Core", leetcode: "https://leetcode.com/problems/string-to-integer-atoi/" },
      { id: 7, title: "Count and Say", difficulty: "Core", leetcode: "https://leetcode.com/problems/count-and-say/" },
      { id: 8, title: "Find the Index of the First Occurrence in a String", difficulty: "Basic", leetcode: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/" },
      { id: 9, title: "Rotate String", difficulty: "Basic", leetcode: "https://leetcode.com/problems/rotate-string/" },
      { id: 10, title: "Isomorphic Strings", difficulty: "Basic", leetcode: "https://leetcode.com/problems/isomorphic-strings/" },
      { id: 12, title: "Sort Characters By Frequency", difficulty: "Core", leetcode: "https://leetcode.com/problems/sort-characters-by-frequency/" },
      { id: 13, title: "Maximum Nesting Depth of the Parentheses", difficulty: "Basic", leetcode: "https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/" },
      { id: 14, title: "Roman to Integer", difficulty: "Basic", leetcode: "https://leetcode.com/problems/roman-to-integer/" },
      { id: 15, title: "Integer to Roman", difficulty: "Core", leetcode: "https://leetcode.com/problems/integer-to-roman/" },
      { id: 16, title: "Largest Odd Number in String", difficulty: "Basic", leetcode: "https://leetcode.com/problems/largest-odd-number-in-string/" },
      { id: 18, title: "Repeated String Match", difficulty: "Core", leetcode: "https://leetcode.com/problems/repeated-string-match/" },
      { id: 19, title: "Minimum Add to Make Parentheses Valid", difficulty: "Core", leetcode: "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/" },
      { id: 23, title: "KMP Algorithm / LPS Array", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/" },
      { id: 24, title: "Shortest Palindrome", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/shortest-palindrome/" },
      { id: 25, title: "Longest Happy Prefix", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/longest-happy-prefix/" },
    ],
  },

  // =========================================================
  // STEP 6: Linked List
  // =========================================================
  {
    id: 6,
    title: "Linked List",
    description:
      "Understand singly, doubly, circular linked lists and important pointer techniques.",
    topics: [
      "Singly Linked List",
      "Doubly Linked List",
      "Fast & Slow Pointer",
      "Reverse Linked List",
      "Linked List Operations",
    ],
    problemCount: 30,
    problems: [
      { id: 1, title: "Reverse Linked List", difficulty: "Basic", leetcode: "https://leetcode.com/problems/reverse-linked-list/" },
      { id: 2, title: "Middle of the Linked List", difficulty: "Basic", leetcode: "https://leetcode.com/problems/middle-of-the-linked-list/" },
      { id: 3, title: "Merge Two Sorted Lists", difficulty: "Basic", leetcode: "https://leetcode.com/problems/merge-two-sorted-lists/" },
      { id: 4, title: "Linked List Cycle", difficulty: "Core", leetcode: "https://leetcode.com/problems/linked-list-cycle/" },
      { id: 5, title: "Remove Nth Node From End of List", difficulty: "Core", leetcode: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
      { id: 6, title: "Merge k Sorted Lists", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/merge-k-sorted-lists/" },
      { id: 7, title: "Add Two Numbers", difficulty: "Core", leetcode: "https://leetcode.com/problems/add-two-numbers/" },
      { id: 8, title: "Linked List Cycle II", difficulty: "Core", leetcode: "https://leetcode.com/problems/linked-list-cycle-ii/" },
      { id: 9, title: "Palindrome Linked List", difficulty: "Core", leetcode: "https://leetcode.com/problems/palindrome-linked-list/" },
      { id: 10, title: "Intersection of Two Linked Lists", difficulty: "Core", leetcode: "https://leetcode.com/problems/intersection-of-two-linked-lists/" },
      { id: 11, title: "Delete Node in a Linked List", difficulty: "Basic", leetcode: "https://leetcode.com/problems/delete-node-in-a-linked-list/" },
      { id: 12, title: "Odd Even Linked List", difficulty: "Core", leetcode: "https://leetcode.com/problems/odd-even-linked-list/" },
      { id: 13, title: "Remove Duplicates from Sorted List", difficulty: "Basic", leetcode: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/" },
      { id: 14, title: "Sort List", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/sort-list/" },
      { id: 15, title: "Flatten a Multilevel Doubly Linked List", difficulty: "Core", leetcode: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/" },
      { id: 16, title: "Copy List with Random Pointer", difficulty: "Core", leetcode: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
      { id: 17, title: "Rotate List", difficulty: "Core", leetcode: "https://leetcode.com/problems/rotate-list/" },
      { id: 18, title: "Reverse Linked List II", difficulty: "Core", leetcode: "https://leetcode.com/problems/reverse-linked-list-ii/" },
      { id: 19, title: "Reverse Nodes in k-Group", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/reverse-nodes-in-k-group/" },
      { id: 21, title: "Design Linked List", difficulty: "Core", leetcode: "https://leetcode.com/problems/design-linked-list/" },
      { id: 22, title: "LRU Cache", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/lru-cache/" },
      { id: 23, title: "Swap Nodes in Pairs", difficulty: "Core", leetcode: "https://leetcode.com/problems/swap-nodes-in-pairs/" },
      { id: 24, title: "Remove Linked List Elements", difficulty: "Basic", leetcode: "https://leetcode.com/problems/remove-linked-list-elements/" },
      { id: 25, title: "Design Browser History", difficulty: "Core", leetcode: "https://leetcode.com/problems/design-browser-history/" },
    ],
  },

  // =========================================================
  // STEP 7: Recursion & Backtracking
  // =========================================================
  {
    id: 7,
    title: "Recursion & Backtracking",
    description:
      "Build strong recursive thinking and solve problems using recursion and backtracking.",
    topics: [
      "Recursion Basics",
      "Parameterised Recursion",
      "Functional Recursion",
      "Multiple Recursion Calls",
      "Backtracking",
    ],
    problemCount: 18,
    problems: [
      { id: 1, title: "Fibonacci Number", difficulty: "Basic", leetcode: "https://leetcode.com/problems/fibonacci-number/" },
      { id: 2, title: "Pow(x, n)", difficulty: "Core", leetcode: "https://leetcode.com/problems/powx-n/" },
      { id: 3, title: "Subsets", difficulty: "Core", leetcode: "https://leetcode.com/problems/subsets/" },
      { id: 4, title: "Permutations", difficulty: "Core", leetcode: "https://leetcode.com/problems/permutations/" },
      { id: 5, title: "Combination Sum", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/combination-sum/" },
      { id: 6, title: "Combination Sum II", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/combination-sum-ii/" },
      { id: 7, title: "Subsets II", difficulty: "Core", leetcode: "https://leetcode.com/problems/subsets-ii/" },
      { id: 8, title: "Letter Combinations of a Phone Number", difficulty: "Core", leetcode: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/" },
      { id: 9, title: "Palindrome Partitioning", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/palindrome-partitioning/" },
      { id: 10, title: "N-Queens", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/n-queens/" },
      { id: 11, title: "Sudoku Solver", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/sudoku-solver/" },
      { id: 12, title: "Word Search", difficulty: "Core", leetcode: "https://leetcode.com/problems/word-search/" },
      { id: 13, title: "Generate Parentheses", difficulty: "Core", leetcode: "https://leetcode.com/problems/generate-parentheses/" },
      { id: 14, title: "Permutation Sequence", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/permutation-sequence/" },
      { id: 15, title: "Count Good Numbers", difficulty: "Core", leetcode: "https://leetcode.com/problems/count-good-numbers/" },
      { id: 16, title: "Sort a Stack using Recursion", difficulty: "Core" },
      { id: 17, title: "Reverse a Stack using Recursion", difficulty: "Core" },
      { id: 18, title: "Expression Add Operators", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/expression-add-operators/" },
    ],
  },

  // =========================================================
  // STEP 8: Bit Manipulation
  // =========================================================
  {
    id: 8,
    title: "Bit Manipulation",
    description:
      "Learn bitwise operations and solve important bit manipulation problems.",
    topics: [
      "Bitwise Operators",
      "AND / OR / XOR",
      "Bit Checking",
      "Bit Counting",
      "Power of Two",
    ],
    problemCount: 11,
    problems: [
      { id: 1, title: "Single Number", difficulty: "Basic", leetcode: "https://leetcode.com/problems/single-number/" },
      { id: 2, title: "Number of 1 Bits", difficulty: "Basic", leetcode: "https://leetcode.com/problems/number-of-1-bits/" },
      { id: 3, title: "Counting Bits", difficulty: "Core", leetcode: "https://leetcode.com/problems/counting-bits/" },
      { id: 4, title: "Power of Two", difficulty: "Basic", leetcode: "https://leetcode.com/problems/power-of-two/" },
      { id: 5, title: "Reverse Bits", difficulty: "Core", leetcode: "https://leetcode.com/problems/reverse-bits/" },
      { id: 6, title: "Single Number II", difficulty: "Core", leetcode: "https://leetcode.com/problems/single-number-ii/" },
      { id: 7, title: "Single Number III", difficulty: "Core", leetcode: "https://leetcode.com/problems/single-number-iii/" },
      { id: 8, title: "XOR Queries of a Subarray", difficulty: "Core", leetcode: "https://leetcode.com/problems/xor-queries-of-a-subarray/" },
      { id: 9, title: "Divide Two Integers", difficulty: "Core", leetcode: "https://leetcode.com/problems/divide-two-integers/" },
      { id: 10, title: "Subsets (Bit Manipulation)", difficulty: "Core", leetcode: "https://leetcode.com/problems/subsets/" },
      { id: 11, title: "Minimum Bit Flips to Convert Number", difficulty: "Basic", leetcode: "https://leetcode.com/problems/minimum-bit-flips-to-convert-number/" },
    ],
  },

  // =========================================================
  // STEP 9: Stack & Queue
  // =========================================================
  {
    id: 9,
    title: "Stack & Queue",
    description:
      "Learn stack, queue, deque, monotonic stack, and priority queue concepts.",
    topics: [
      "Stack",
      "Queue",
      "Deque",
      "Monotonic Stack",
      "Priority Queue",
      "Stack & Queue Problems",
    ],
    problemCount: 18,
    problems: [
      { id: 1, title: "Valid Parentheses", difficulty: "Basic", leetcode: "https://leetcode.com/problems/valid-parentheses/" },
      { id: 2, title: "Min Stack", difficulty: "Core", leetcode: "https://leetcode.com/problems/min-stack/" },
      { id: 3, title: "Implement Queue using Stacks", difficulty: "Core", leetcode: "https://leetcode.com/problems/implement-queue-using-stacks/" },
      { id: 4, title: "Daily Temperatures", difficulty: "Core", leetcode: "https://leetcode.com/problems/daily-temperatures/" },
      { id: 5, title: "Largest Rectangle in Histogram", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
      { id: 6, title: "Implement Stack using Queues", difficulty: "Basic", leetcode: "https://leetcode.com/problems/implement-stack-using-queues/" },
      { id: 7, title: "Next Greater Element I", difficulty: "Basic", leetcode: "https://leetcode.com/problems/next-greater-element-i/" },
      { id: 8, title: "Next Greater Element II", difficulty: "Core", leetcode: "https://leetcode.com/problems/next-greater-element-ii/" },
      { id: 9, title: "Trapping Rain Water", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/trapping-rain-water/" },
      { id: 10, title: "Online Stock Span", difficulty: "Core", leetcode: "https://leetcode.com/problems/online-stock-span/" },
      { id: 11, title: "Sliding Window Maximum", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/sliding-window-maximum/" },
      { id: 12, title: "LFU Cache", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/lfu-cache/" },
      { id: 13, title: "LRU Cache", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/lru-cache/" },
      { id: 14, title: "Asteroid Collision", difficulty: "Core", leetcode: "https://leetcode.com/problems/asteroid-collision/" },
      { id: 15, title: "Sum of Subarray Minimums", difficulty: "Core", leetcode: "https://leetcode.com/problems/sum-of-subarray-minimums/" },
      { id: 16, title: "Sum of Subarray Ranges", difficulty: "Core", leetcode: "https://leetcode.com/problems/sum-of-subarray-ranges/" },
      { id: 17, title: "Remove K Digits", difficulty: "Core", leetcode: "https://leetcode.com/problems/remove-k-digits/" },
      { id: 18, title: "Maximal Rectangle", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/maximal-rectangle/" },
    ],
  },

  // =========================================================
  // STEP 10: Sliding Window & Two Pointer
  // =========================================================
  {
    id: 10,
    title: "Sliding Window & Two Pointer",
    description:
      "Master two important interview patterns used for arrays and strings.",
    topics: [
      "Two Pointer",
      "Sliding Window",
      "Fixed Window",
      "Variable Window",
      "Subarray Problems",
    ],
    problemCount: 16,
    problems: [
      { id: 1, title: "Two Sum II - Input Array Is Sorted", difficulty: "Basic", leetcode: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
      { id: 2, title: "Container With Most Water", difficulty: "Core", leetcode: "https://leetcode.com/problems/container-with-most-water/" },
      { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Core", leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { id: 4, title: "Minimum Size Subarray Sum", difficulty: "Core", leetcode: "https://leetcode.com/problems/minimum-size-subarray-sum/" },
      { id: 5, title: "Minimum Window Substring", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/minimum-window-substring/" },
      { id: 6, title: "Max Consecutive Ones III", difficulty: "Core", leetcode: "https://leetcode.com/problems/max-consecutive-ones-iii/" },
      { id: 7, title: "Fruit Into Baskets", difficulty: "Core", leetcode: "https://leetcode.com/problems/fruit-into-baskets/" },
      { id: 8, title: "Longest Repeating Character Replacement", difficulty: "Core", leetcode: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
      { id: 9, title: "Number of Substrings Containing All Three Characters", difficulty: "Core", leetcode: "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/" },
      { id: 10, title: "Binary Subarrays With Sum", difficulty: "Core", leetcode: "https://leetcode.com/problems/binary-subarrays-with-sum/" },
      { id: 11, title: "Count Number of Nice Subarrays", difficulty: "Core", leetcode: "https://leetcode.com/problems/count-number-of-nice-subarrays/" },
      { id: 12, title: "Subarrays with K Different Integers", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/subarrays-with-k-different-integers/" },
      { id: 13, title: "Trapping Rain Water", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/trapping-rain-water/" },
      { id: 14, title: "Maximum Points You Can Obtain from Cards", difficulty: "Core", leetcode: "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/" },
      { id: 15, title: "Max Consecutive Ones", difficulty: "Basic", leetcode: "https://leetcode.com/problems/max-consecutive-ones/" },
      { id: 16, title: "Longest Subarray of 1s After Deleting One Element", difficulty: "Core", leetcode: "https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/" },
    ],
  },

  // =========================================================
  // STEP 11: Heaps / Priority Queue
  // =========================================================
  {
    id: 11,
    title: "Heaps",
    description:
      "Understand heaps and priority queues for efficient problem solving.",
    topics: [
      "Min Heap",
      "Max Heap",
      "Priority Queue",
      "Kth Largest / Smallest",
      "Heap Problems",
    ],
    problemCount: 7,
    problems: [
      { id: 1, title: "Kth Largest Element in an Array", difficulty: "Core", leetcode: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
      { id: 2, title: "Kth Smallest Element in a Sorted Matrix", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/" },
      { id: 3, title: "Top K Frequent Elements", difficulty: "Core", leetcode: "https://leetcode.com/problems/top-k-frequent-elements/" },
      { id: 4, title: "Last Stone Weight", difficulty: "Basic", leetcode: "https://leetcode.com/problems/last-stone-weight/" },
      { id: 5, title: "Merge K Sorted Lists", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/merge-k-sorted-lists/" },
      { id: 6, title: "Find Median from Data Stream", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/find-median-from-data-stream/" },
      { id: 7, title: "Kth Largest Element in a Stream", difficulty: "Basic", leetcode: "https://leetcode.com/problems/kth-largest-element-in-a-stream/" },
    ],
  },

  // =========================================================
  // STEP 12: Greedy
  // =========================================================
  {
    id: 12,
    title: "Greedy",
    description:
      "Learn how to identify greedy choices and solve optimization problems.",
    topics: [
      "Greedy Basics",
      "Activity Selection",
      "Fractional Knapsack",
      "Scheduling",
      "Greedy Problems",
    ],
    problemCount: 11,
    problems: [
      { id: 1, title: "Assign Cookies", difficulty: "Basic", leetcode: "https://leetcode.com/problems/assign-cookies/" },
      { id: 2, title: "Jump Game", difficulty: "Core", leetcode: "https://leetcode.com/problems/jump-game/" },
      { id: 3, title: "Jump Game II", difficulty: "Core", leetcode: "https://leetcode.com/problems/jump-game-ii/" },
      { id: 4, title: "Gas Station", difficulty: "Core", leetcode: "https://leetcode.com/problems/gas-station/" },
      { id: 5, title: "Candy", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/candy/" },
      { id: 6, title: "Lemonade Change", difficulty: "Basic", leetcode: "https://leetcode.com/problems/lemonade-change/" },
      { id: 7, title: "Valid Parenthesis String", difficulty: "Core", leetcode: "https://leetcode.com/problems/valid-parenthesis-string/" },
      { id: 8, title: "Non-overlapping Intervals", difficulty: "Core", leetcode: "https://leetcode.com/problems/non-overlapping-intervals/" },
      { id: 9, title: "Insert Interval", difficulty: "Core", leetcode: "https://leetcode.com/problems/insert-interval/" },
      { id: 10, title: "Merge Intervals", difficulty: "Core", leetcode: "https://leetcode.com/problems/merge-intervals/" },
      { id: 11, title: "Minimum Number of Arrows to Burst Balloons", difficulty: "Core", leetcode: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/" },
    ],
  },

  // =========================================================
  // STEP 13: Binary Trees
  // =========================================================
  {
    id: 13,
    title: "Binary Trees",
    description:
      "Master tree traversal and important binary tree problems.",
    topics: [
      "Binary Tree Basics",
      "Preorder",
      "Inorder",
      "Postorder",
      "Level Order",
      "Tree Views",
      "Tree Problems",
    ],
    problemCount: 27,
    problems: [
      { id: 1, title: "Binary Tree Preorder Traversal", difficulty: "Basic", leetcode: "https://leetcode.com/problems/binary-tree-preorder-traversal/" },
      { id: 2, title: "Binary Tree Inorder Traversal", difficulty: "Basic", leetcode: "https://leetcode.com/problems/binary-tree-inorder-traversal/" },
      { id: 3, title: "Binary Tree Postorder Traversal", difficulty: "Basic", leetcode: "https://leetcode.com/problems/binary-tree-postorder-traversal/" },
      { id: 4, title: "Binary Tree Level Order Traversal", difficulty: "Core", leetcode: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
      { id: 5, title: "Maximum Depth of Binary Tree", difficulty: "Basic", leetcode: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
      { id: 6, title: "Diameter of Binary Tree", difficulty: "Core", leetcode: "https://leetcode.com/problems/diameter-of-binary-tree/" },
      { id: 7, title: "Lowest Common Ancestor of a Binary Tree", difficulty: "Core", leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/" },
      { id: 8, title: "Binary Tree Maximum Path Sum", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
      { id: 9, title: "Balanced Binary Tree", difficulty: "Basic", leetcode: "https://leetcode.com/problems/balanced-binary-tree/" },
      { id: 10, title: "Same Tree", difficulty: "Basic", leetcode: "https://leetcode.com/problems/same-tree/" },
      { id: 11, title: "Symmetric Tree", difficulty: "Basic", leetcode: "https://leetcode.com/problems/symmetric-tree/" },
      { id: 12, title: "Binary Tree Zigzag Level Order Traversal", difficulty: "Core", leetcode: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/" },
      { id: 13, title: "Vertical Order Traversal of a Binary Tree", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/" },
      { id: 14, title: "Binary Tree Right Side View", difficulty: "Core", leetcode: "https://leetcode.com/problems/binary-tree-right-side-view/" },
      { id: 15, title: "Flatten Binary Tree to Linked List", difficulty: "Core", leetcode: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/" },
      { id: 16, title: "Construct Binary Tree from Preorder and Inorder", difficulty: "Core", leetcode: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
      { id: 17, title: "Construct Binary Tree from Inorder and Postorder", difficulty: "Core", leetcode: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/" },
      { id: 18, title: "Serialize and Deserialize Binary Tree", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
      { id: 19, title: "Count Complete Tree Nodes", difficulty: "Core", leetcode: "https://leetcode.com/problems/count-complete-tree-nodes/" },
      { id: 20, title: "Path Sum", difficulty: "Basic", leetcode: "https://leetcode.com/problems/path-sum/" },
      { id: 21, title: "Path Sum II", difficulty: "Core", leetcode: "https://leetcode.com/problems/path-sum-ii/" },
      { id: 22, title: "Path Sum III", difficulty: "Core", leetcode: "https://leetcode.com/problems/path-sum-iii/" },
      { id: 23, title: "Sum Root to Leaf Numbers", difficulty: "Core", leetcode: "https://leetcode.com/problems/sum-root-to-leaf-numbers/" },
      { id: 24, title: "Invert Binary Tree", difficulty: "Basic", leetcode: "https://leetcode.com/problems/invert-binary-tree/" },
      { id: 25, title: "Populating Next Right Pointers", difficulty: "Core", leetcode: "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/" },
      { id: 26, title: "Maximum Width of Binary Tree", difficulty: "Core", leetcode: "https://leetcode.com/problems/maximum-width-of-binary-tree/" },
      { id: 27, title: "All Nodes Distance K in Binary Tree", difficulty: "Core", leetcode: "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/" },
    ],
  },

  // =========================================================
  // STEP 14: Binary Search Trees
  // =========================================================
  {
    id: 14,
    title: "Binary Search Tree",
    description:
      "Learn BST properties, operations, traversal, and interview problems.",
    topics: [
      "BST Basics",
      "Search",
      "Insertion",
      "Deletion",
      "BST Traversal",
      "BST Problems",
    ],
    problemCount: 20,
    problems: [
      { id: 1, title: "Search in a Binary Search Tree", difficulty: "Basic", leetcode: "https://leetcode.com/problems/search-in-a-binary-search-tree/" },
      { id: 2, title: "Insert into a Binary Search Tree", difficulty: "Basic", leetcode: "https://leetcode.com/problems/insert-into-a-binary-search-tree/" },
      { id: 3, title: "Validate Binary Search Tree", difficulty: "Core", leetcode: "https://leetcode.com/problems/validate-binary-search-tree/" },
      { id: 4, title: "Lowest Common Ancestor of a BST", difficulty: "Core", leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
      { id: 5, title: "Kth Smallest Element in a BST", difficulty: "Core", leetcode: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
      { id: 6, title: "Delete Node in a BST", difficulty: "Core", leetcode: "https://leetcode.com/problems/delete-node-in-a-bst/" },
      { id: 7, title: "Convert Sorted Array to BST", difficulty: "Basic", leetcode: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/" },
      { id: 8, title: "Inorder Successor in BST", difficulty: "Core", leetcode: "https://leetcode.com/problems/inorder-successor-in-bst/" },
      { id: 9, title: "Binary Search Tree Iterator", difficulty: "Core", leetcode: "https://leetcode.com/problems/binary-search-tree-iterator/" },
      { id: 10, title: "Two Sum IV - Input is a BST", difficulty: "Basic", leetcode: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/" },
      { id: 11, title: "Recover Binary Search Tree", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/recover-binary-search-tree/" },
      { id: 12, title: "Construct BST from Preorder Traversal", difficulty: "Core", leetcode: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/" },
      { id: 13, title: "Balance a Binary Search Tree", difficulty: "Core", leetcode: "https://leetcode.com/problems/balance-a-binary-search-tree/" },
    ],
  },

  // =========================================================
  // STEP 15: Graphs
  // =========================================================
  {
    id: 15,
    title: "Graphs",
    description:
      "Learn graph representation, traversal, cycle detection, shortest paths, and MST.",
    topics: [
      "Graph Representation",
      "BFS",
      "DFS",
      "Cycle Detection",
      "Topological Sort",
      "Shortest Path",
      "Minimum Spanning Tree",
    ],
    problemCount: 27,
    problems: [
      { id: 1, title: "Number of Islands", difficulty: "Core", leetcode: "https://leetcode.com/problems/number-of-islands/" },
      { id: 2, title: "Flood Fill", difficulty: "Basic", leetcode: "https://leetcode.com/problems/flood-fill/" },
      { id: 3, title: "Clone Graph", difficulty: "Core", leetcode: "https://leetcode.com/problems/clone-graph/" },
      { id: 4, title: "Course Schedule", difficulty: "Core", leetcode: "https://leetcode.com/problems/course-schedule/" },
      { id: 5, title: "Rotting Oranges", difficulty: "Core", leetcode: "https://leetcode.com/problems/rotting-oranges/" },
      { id: 6, title: "Network Delay Time", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/network-delay-time/" },
      { id: 7, title: "Cheapest Flights Within K Stops", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/cheapest-flights-within-k-stops/" },
      { id: 8, title: "Course Schedule II", difficulty: "Core", leetcode: "https://leetcode.com/problems/course-schedule-ii/" },
      { id: 9, title: "Number of Provinces", difficulty: "Core", leetcode: "https://leetcode.com/problems/number-of-provinces/" },
      { id: 10, title: "Surrounded Regions", difficulty: "Core", leetcode: "https://leetcode.com/problems/surrounded-regions/" },
      { id: 11, title: "Number of Enclaves", difficulty: "Core", leetcode: "https://leetcode.com/problems/number-of-enclaves/" },
      { id: 12, title: "Word Ladder", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/word-ladder/" },
      { id: 13, title: "Word Ladder II", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/word-ladder-ii/" },
      { id: 14, title: "Is Graph Bipartite", difficulty: "Core", leetcode: "https://leetcode.com/problems/is-graph-bipartite/" },
      { id: 15, title: "Number of Operations to Make Network Connected", difficulty: "Core", leetcode: "https://leetcode.com/problems/number-of-operations-to-make-network-connected/" },
      { id: 16, title: "Most Stones Removed with Same Row or Column", difficulty: "Core", leetcode: "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/" },
      { id: 17, title: "Accounts Merge", difficulty: "Core", leetcode: "https://leetcode.com/problems/accounts-merge/" },
      { id: 18, title: "Making a Large Island", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/making-a-large-island/" },
      { id: 19, title: "Swim in Rising Water", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/swim-in-rising-water/" },
      { id: 20, title: "Critical Connections in a Network", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/critical-connections-in-a-network/" },
      { id: 21, title: "Shortest Path in Binary Matrix", difficulty: "Core", leetcode: "https://leetcode.com/problems/shortest-path-in-binary-matrix/" },
      { id: 22, title: "Path with Minimum Effort", difficulty: "Core", leetcode: "https://leetcode.com/problems/path-with-minimum-effort/" },
      { id: 23, title: "Find the City With Smallest Number of Neighbors", difficulty: "Core", leetcode: "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/" },
      { id: 24, title: "Number of Ways to Arrive at Destination", difficulty: "Core", leetcode: "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/" },
      { id: 25, title: "Find Eventual Safe States", difficulty: "Core", leetcode: "https://leetcode.com/problems/find-eventual-safe-states/" },
      { id: 26, title: "01 Matrix", difficulty: "Core", leetcode: "https://leetcode.com/problems/01-matrix/" },
      { id: 27, title: "Pacific Atlantic Water Flow", difficulty: "Core", leetcode: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
    ],
  },

  // =========================================================
  // STEP 16: Dynamic Programming
  // =========================================================
  {
    id: 16,
    title: "Dynamic Programming",
    description:
      "Develop a systematic approach to solving dynamic programming problems.",
    topics: [
      "DP Basics",
      "Memoization",
      "Tabulation",
      "1D DP",
      "2D DP",
      "Knapsack",
      "Subsequence DP",
      "DP on Trees",
    ],
    problemCount: 41,
    problems: [
      { id: 1, title: "Climbing Stairs", difficulty: "Basic", leetcode: "https://leetcode.com/problems/climbing-stairs/" },
      { id: 2, title: "House Robber", difficulty: "Core", leetcode: "https://leetcode.com/problems/house-robber/" },
      { id: 3, title: "House Robber II", difficulty: "Core", leetcode: "https://leetcode.com/problems/house-robber-ii/" },
      { id: 4, title: "Coin Change", difficulty: "Core", leetcode: "https://leetcode.com/problems/coin-change/" },
      { id: 5, title: "Longest Increasing Subsequence", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/longest-increasing-subsequence/" },
      { id: 6, title: "Longest Common Subsequence", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/longest-common-subsequence/" },
      { id: 7, title: "01 Matrix", difficulty: "Core", leetcode: "https://leetcode.com/problems/01-matrix/" },
      { id: 8, title: "Unique Paths", difficulty: "Basic", leetcode: "https://leetcode.com/problems/unique-paths/" },
      { id: 9, title: "Unique Paths II", difficulty: "Core", leetcode: "https://leetcode.com/problems/unique-paths-ii/" },
      { id: 10, title: "Minimum Path Sum", difficulty: "Core", leetcode: "https://leetcode.com/problems/minimum-path-sum/" },
      { id: 11, title: "Triangle", difficulty: "Core", leetcode: "https://leetcode.com/problems/triangle/" },
      { id: 12, title: "Partition Equal Subset Sum", difficulty: "Core", leetcode: "https://leetcode.com/problems/partition-equal-subset-sum/" },
      { id: 13, title: "Coin Change II", difficulty: "Core", leetcode: "https://leetcode.com/problems/coin-change-ii/" },
      { id: 14, title: "Target Sum", difficulty: "Core", leetcode: "https://leetcode.com/problems/target-sum/" },
      { id: 15, title: "Edit Distance", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/edit-distance/" },
      { id: 16, title: "Wildcard Matching", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/wildcard-matching/" },
      { id: 17, title: "Distinct Subsequences", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/distinct-subsequences/" },
      { id: 18, title: "Best Time to Buy and Sell Stock II", difficulty: "Core", leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/" },
      { id: 19, title: "Best Time to Buy and Sell Stock III", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/" },
      { id: 20, title: "Best Time to Buy and Sell Stock IV", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/" },
      { id: 21, title: "Best Time to Buy and Sell Stock with Cooldown", difficulty: "Core", leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/" },
      { id: 22, title: "Best Time to Buy and Sell Stock with Transaction Fee", difficulty: "Core", leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/" },
      { id: 23, title: "Longest Palindromic Subsequence", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/longest-palindromic-subsequence/" },
      { id: 24, title: "Minimum Insertion Steps to Make a String Palindrome", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/" },
      { id: 25, title: "Delete Operation for Two Strings", difficulty: "Core", leetcode: "https://leetcode.com/problems/delete-operation-for-two-strings/" },
      { id: 26, title: "Shortest Common Supersequence", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/shortest-common-supersequence/" },
      { id: 27, title: "Longest String Chain", difficulty: "Core", leetcode: "https://leetcode.com/problems/longest-string-chain/" },
      { id: 28, title: "Number of Longest Increasing Subsequence", difficulty: "Core", leetcode: "https://leetcode.com/problems/number-of-longest-increasing-subsequence/" },
      { id: 29, title: "Minimum Cost to Cut a Stick", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/" },
      { id: 30, title: "Burst Balloons", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/burst-balloons/" },
      { id: 31, title: "Palindrome Partitioning II", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/palindrome-partitioning-ii/" },
      { id: 32, title: "Maximal Rectangle", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/maximal-rectangle/" },
      { id: 33, title: "Count Square Submatrices with All Ones", difficulty: "Core", leetcode: "https://leetcode.com/problems/count-square-submatrices-with-all-ones/" },
      { id: 34, title: "Frog Jump", difficulty: "Core", leetcode: "https://leetcode.com/problems/frog-jump/" },
      { id: 35, title: "Cherry Pickup II", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/cherry-pickup-ii/" },
      { id: 36, title: "Minimum Falling Path Sum", difficulty: "Core", leetcode: "https://leetcode.com/problems/minimum-falling-path-sum/" },
      { id: 37, title: "Interleaving String", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/interleaving-string/" },
      { id: 38, title: "Word Break", difficulty: "Core", leetcode: "https://leetcode.com/problems/word-break/" },
      { id: 39, title: "Decode Ways", difficulty: "Core", leetcode: "https://leetcode.com/problems/decode-ways/" },
      { id: 40, title: "Perfect Squares", difficulty: "Core", leetcode: "https://leetcode.com/problems/perfect-squares/" },
      { id: 41, title: "Largest Divisible Subset", difficulty: "Core", leetcode: "https://leetcode.com/problems/largest-divisible-subset/" },
    ],
  },

  // =========================================================
  // STEP 17: Tries
  // =========================================================
  {
    id: 17,
    title: "Tries",
    description:
      "Learn trie data structures and advanced prefix and string problems.",
    topics: [
      "Trie Basics",
      "Trie Insertion",
      "Trie Search",
      "Prefix Problems",
      "Advanced Trie Problems",
    ],
    problemCount: 9,
    problems: [
      { id: 1, title: "Implement Trie (Prefix Tree)", difficulty: "Core", leetcode: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
      { id: 2, title: "Design Add and Search Words Data Structure", difficulty: "Core", leetcode: "https://leetcode.com/problems/design-add-and-search-words-data-structure/" },
      { id: 3, title: "Word Search II", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/word-search-ii/" },
      { id: 4, title: "Replace Words", difficulty: "Core", leetcode: "https://leetcode.com/problems/replace-words/" },
      { id: 5, title: "Longest Word in Dictionary", difficulty: "Core", leetcode: "https://leetcode.com/problems/longest-word-in-dictionary/" },
      { id: 6, title: "Maximum XOR of Two Numbers in an Array", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/" },
      { id: 7, title: "Maximum XOR With an Element From Array", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/" },
      { id: 8, title: "Stream of Characters", difficulty: "Advanced", leetcode: "https://leetcode.com/problems/stream-of-characters/" },
      { id: 9, title: "Search Suggestions System", difficulty: "Core", leetcode: "https://leetcode.com/problems/search-suggestions-system/" },
    ],
  },
];