let inputValue = document.getElementById("input-value");
let addButton = document.getElementById("add");
let paragraph = document.getElementById("paragraph");

//objects with our numbers
let ones = {
  0: "",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

let tens = {
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
};

let prefixes = {
  2: "twenty",
  3: "thirty",
  4: "fourty",
  5: "fifty",
  6: "sixty",
  7: "seventy",
  8: "eighty",
  9: "ninety",
};

let suffixes = {
  1: "",
  2: "thousand",
  3: "million",
  4: "billion",
  5: "trillion",
};

//function to get a two digit number and return it as a text
let getTwoNumbers = (input) => {
  let currentNumText = "";
  //if input is smaller then 10, return the number corresponding to the input
  if (input < 10) {
    return ones[input];
  }
  //if the input is in the tens object or bigger than 10 return the number corresponding to the input
  if (input in tens) {
    currentNumText += tens[input];
  } else {
    //if the number is equal or above 20 then search in the prefix object and later add the correspondind number
    currentNumText += prefixes[input.toString().charAt(0)];
    if (input.toString().charAt(1) !== "0") {
      currentNumText += "-" + ones[input.toString().charAt(1)];
    }
  }
  return currentNumText;
};

//function to get a three digit number and return it as a text
let getThreeNumbers = (input) => {
  let currentNumText = "";
  currentNumText += ones[input.toString().charAt(0)];
  currentNumText += " hundred ";
  if (input.toString().charAt(1) !== "0") {
    //add the rest of the two digit number from the input
    currentNumText += getTwoNumbers(input.toString().substr(1));
  } else {
    //if the number has a 0 in the middle return the corresponding text
    currentNumText += "and " + ones[input.toString().charAt(2)];
  }
  return currentNumText;
};

//function to split the input
let splitNum = (input) => {
  let arr = [];
  let count = 0;
  let arrTwo = [];
  //split the input into seperate digits and reverse them
  let inputSplit = input.toString().split("").reverse();
  for (let i = 0; i < inputSplit.length; i++) {
    //add the numbers in front of the last digit
    arrTwo = inputSplit[i] + arrTwo.toString("");
    count++;
    //if the count number is divisible by three add the numbers in arr
    if (count % 3 == 0) {
      arr.unshift(arrTwo);
      //reset array
      arrTwo = [];
    }
  }
  //if there's more values in the array, where their count is not divisible by 3, add them to the array
  if (arrTwo.length != 0) {
    arr.unshift(arrTwo);
  }
  return arr;
};

//function to print out the results
let getNumbersInput = (input) => {
  let numText = "";
  //it the input is 0, more than the max number or a string throw an error
  if (input == 0 || input > 1000000000000 || isNaN(input)) {
    inputValue.value = "";
    throw new Error();
  }
  if (input < 100) {
    return getTwoNumbers(input);
  } else {
    //call the split numbers function
    let numArray = splitNum(input);
    //set the count to the length of the array, associates the proper suffix to each group of 3 digits
    let count = numArray.length;
    for (let i = 0; i < numArray.length; i++) {
      if (
        numArray[i].toString("") !== "000" &&
        numArray[i].toString().length == 3
      ) {
        //call the three digit func
        numText += getThreeNumbers(numArray[i]);
        //add the suffix
        numText += " " + suffixes[count] + " ";
      } else {
        //call the two digit func
        numText += getTwoNumbers(numArray[i]);
        numText += " " + suffixes[count] + " ";
      }
      //decrease the count by one
      count--;
    }
  }

  return numText;
};

addButton.addEventListener("click", () => {
  paragraph.innerHTML = getNumbersInput(inputValue.value);
  inputValue.value = "";
});
