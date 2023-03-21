// SPDX-License-Identifier: GPL-3.0
// Specify compiler version
pragma solidity ^0.8.0;
// Define contract name
contract PurchaseOrder {
  // Declare state variables
  address public buyer;
  address public seller;
  string public item;
  uint256 public price;
  // Declare event
  event Purchased(address buyer, address seller, string item);
  // Define constructor function
  constructor(address _buyer, address _seller,
              string memory _item,
              uint256 _price) {
    // Assign values to state variables
    buyer = _buyer;
    seller = _seller;
    item = _item;
    price = _price;
  }
  // Define buy function
  function buy() public payable {
    // Check if sender is buyer
    require(msg.sender == buyer,
            "Only buyer can buy");
    // Check if value is equal to price
    require(msg.value == price,
            "Value must be equal to price");
    // Transfer value to seller
    payable(seller).transfer(msg.value);
    // Emit event
    emit Purchased(buyer,seller,item);
  }
}