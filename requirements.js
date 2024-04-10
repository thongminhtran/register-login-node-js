// Import libraries that you may need to use
var sqlite3 = require('sqlite3').verbose(); 
var request = require('request');

/**
1. Task Description:
 - Implement a Binary Search algorithm in JavaScript. 
 - Import an array from input.txt, perform the binary search, and save the result to output.txt 
 - Utilize SQLite for importing and storing the search results. (Good to have)

2. Requirements:
 - Binary Search Algorithm:
Implement binary search in JavaScript for a sorted array of integers.
Return the index of the target integer if found, else -1.

 - Input/Output Handling:
Read sorted integers from input.txt.
Write the result of the binary search to output.txt.

 - Database Interaction: (Good to have)
Store search results in a SQLite database.
Include columns for searched value and result.
 */

// Input:
// 1 3 5 7 9 11 13 15 17 19
// 9

// Output:
// 5

// Don't need to use sort algorithms for now as the data is already sorted
var bubbleSort = require('./sort-algorithms/bubble-sort'); 

// Please add your code here:
function binarySearch(arr, keyword) {}
function importData() {}
function storeData() {}

var inputArr = importData();
var key;  // The number you are going to search
var result = []; // result = binarySearch(inputArr, key)

storeData(result);
