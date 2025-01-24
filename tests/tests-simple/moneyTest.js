import { formatCurrency } from "../../scripts/utils/money.js";

console.log("Running tests for formatCurrency...");

console.log("converts 1000 to $10.00");
if (formatCurrency(1000) === "$10.00") {
  console.log("Test passed!");
} else {
  console.error("Test failed!");
}

console.log("converts 0 to $0.00");
if (formatCurrency(0) === "$0.00") {
  console.log("Test passed!");
} else {
  console.error("Test failed!");
}

console.log("converts 2000.5 to $20.01");
if (formatCurrency(2000.5) === "$20.01") {
  console.log("Test passed!");
} else {
  console.error("Test failed!");
}

console.log("converts 2000.4 to $20.00");
if (formatCurrency(2000.4) === "$20.00") {
  console.log("Test passed!");
} else {
  console.error("Test failed!");
}

console.log("converts 123456 to $1234.56");
if (formatCurrency(123456) === "$1234.56") {
  console.log("Test passed!");
} else {
  console.error("Test failed!");
}
