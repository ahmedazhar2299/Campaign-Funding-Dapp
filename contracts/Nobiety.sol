// SPDX-License-Identifier: Ahmed FAST-NU
pragma solidity ^0.8.0;

contract Nobiety {
    struct Campaign{
        string title;
        uint256 amount;
        string date;
        string url;
        string description;
        string status;
        uint256 raisedAmount;
        address owner;
    }
    Campaign[] public allCampaignList;
        constructor() {
    }
    
    event launchCampagin(Campaign indexed cam);
    event updateCampagin(Campaign indexed cam);

   function addCampaign(string memory _title, uint256 _amount, string memory _date, string memory _url, string memory _description) public {
        Campaign memory newCampaign = Campaign({
            title: _title,
            amount: _amount,
            date: _date,
            url: _url,
            description: _description,
            status : "Live",
            raisedAmount : 0.00,
            owner : msg.sender
        });
        allCampaignList.push(newCampaign);
        emit launchCampagin(newCampaign);
    }

    function getOwnerCampaignList() public view returns (Campaign[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < allCampaignList.length; i++) {
            if (allCampaignList[i].owner == msg.sender) {
                count++;
            }
        }
        Campaign[] memory temp = new Campaign[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < allCampaignList.length; i++) {
            if (allCampaignList[i].owner == msg.sender) {
                temp[j] = allCampaignList[i];
                j++;
            }
        }
        return temp;
    }

    function updateCampaign(string memory _oldTitle, string memory _title, uint256 _amount, string memory _date, string memory _url, string memory _description) public {
    for (uint256 i = 0; i < allCampaignList.length; i++) {
        Campaign storage currentCampaign = allCampaignList[i];
        if (keccak256(bytes(currentCampaign.title)) == keccak256(bytes(_oldTitle)) && currentCampaign.owner == msg.sender) {
            currentCampaign.title = _title;
            currentCampaign.amount = _amount;
            currentCampaign.date = _date;
            currentCampaign.url = _url;
            currentCampaign.description = _description;
            emit updateCampagin(currentCampaign);
            break;
        }
    }
}

     function getAllCampaignList() public view returns (Campaign[] memory) {
        return allCampaignList;
    }

}