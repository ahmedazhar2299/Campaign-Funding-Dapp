// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Adoption {
    address[16] public adopters;

    //Adopting a pet
    function adopt(uint petId) public returns (uint) {
        require(petId >= 0 && petId <= 15);
        adopters[petId] = msg.sender;
        return petId;
    }

    // Retrieving the adopters
    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }

    function leave(uint petId) public returns(uint) {
        require(adopters[petId] == msg.sender, 'Caller is Not The Owner');
        adopters[petId] = address(0);
        return petId;
    }
}
//comment