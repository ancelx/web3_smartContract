// Import web3 library
const Web3 = require("web3");
// Import fs library for reading files
const fs = require("fs");
const { randomBytes, randomInt } = require("crypto");
// Read ABI JSON file
const abi = JSON.parse(fs.readFileSync("PurchaseOrderABI.json"));
// Read bytecode hex string file
const bytecode = fs.readFileSync("PurchaseOrderBytecode.txt", "utf8");
// Read contract address file
const address = fs.readFileSync("PurchaseOrderAddress.txt", "utf8");
// Create web3 instance and connect to Ganache
const web3 = new Web3("http://127.0.0.1:7545");
// Create contract instance using ABI and address
const contract = new web3.eth.Contract(abi, address);
// Get buyer's address from Ganache (first account)
web3.eth.getAccounts().then(accounts => {
  const buyer = accounts[0];
// Get seller's address from Ganache (second account)
  const seller = accounts[1];
// Get item name and price from constructor arguments
  const item = "item";
  const price = randomInt(1,900);
// Print purchase order details
  console.log("Purchase Order Details:");
  console.log("Buyer: " + buyer);
  console.log("Seller: " + seller);
  console.log("Item: " + item);
  console.log("Price: " + price + " wei");
// Call buy function using buyer's account and value equal to price
  contract.methods.buy().send({from: buyer, value: price})
    .then(receipt => {
      // Print transaction receipt
      console.log("Transaction Receipt:");
      console.log(receipt);
// Get purchased event from receipt logs
    
// Print event details
      console.log("Event Details:");
      console.log(receipt.returnValues);
    })
    .catch(error => {
      // Print error message
      console.error(error.message);
    });
});