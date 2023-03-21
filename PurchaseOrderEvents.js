// Import web3 library
const Web3 = require("web3");
// Import fs library for reading files
const fs = require("fs");
// Read ABI JSON file
const abi = JSON.parse(fs.readFileSync("PurchaseOrderABI.json"));
// Read contract address file
const address = fs.readFileSync("PurchaseOrderAddress.txt", "utf8");
// Create web3 instance and connect to Ganache via WebSocket provider
const web3 = new Web3("ws://127.0.0.1:7545");
// Create contract instance using ABI and address
const contract = new web3.eth.Contract(abi, address);
// Define a callback function for Purchased event
const purchasedCallback = (error, result) => {
  if (error) {
    // Print error message
    console.error(error.message);
  } else {
    // Print event details
    console.log("Purchased Event:");
    console.log(result.returnValues);
  }
};
// Listen to Purchased event using events method and callback function
contract.events.Purchased({}, purchasedCallback);
// Listen to Purchased event using once method and callback function
contract.once("Purchased", {}, purchasedCallback);
// Listen to all events using allEvents method and callback function
contract.events.allEvents({}, purchasedCallback);
// Get past Purchased events using getPastEvents method and callback function
contract.getPastEvents("Purchased", {}, purchasedCallback);