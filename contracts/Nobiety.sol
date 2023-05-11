// SPDX-License-Identifier: Ahmed FAST-NU
pragma solidity 0.8.13;

contract Nobiety {
    struct Backer{
    address backer;
    uint256 donation;
    string time;
    }

    struct Campaign{
        string title;
        uint256 amount;
        string url;
        string description;
        string status;
        uint256 raisedAmount;
        address owner;
    }

    Campaign[] public allCampaignList;
    mapping(string=>Backer[]) public backers; //map backer list to title
    mapping(address => uint256) public balances;



        constructor() {
    }
    
    event launchCampagin(Campaign indexed);
    event updateCampagin(Campaign indexed);
    event deleteCampagin(Campaign indexed);
    event backerCampagin(Backer indexed,string);
    event refund(address indexed,uint256,string);
    event fundsSentToOwner(address indexed,uint256,string);
    event withdrawAmount(address indexed,uint256);

     function getCampaign(string memory _title) internal view returns (Campaign storage) {
        for (uint256 i = 0; i < allCampaignList.length; i++) {
            Campaign storage currentCampaign = allCampaignList[i];
            if (keccak256(bytes(currentCampaign.title)) == keccak256(bytes(_title))) {
                return currentCampaign;
            }
        }
        revert("Campaign not found");
    }




   function deposit() public payable {
    balances[msg.sender] += msg.value;
    }

    function getDeposit(address ad) public view returns (uint256){
        return balances[ad];
    }

    
    function withdrawBalance(uint _amount) public payable {
       require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        emit withdrawAmount(msg.sender, _amount);
    }

    function backCampaign(string memory _title, uint _donation, string memory _time) public {
    require(isTitleExist(_title) == false, "Invalid title provided");
    Campaign storage currentCampaign = getCampaign(_title);
    require(currentCampaign.raisedAmount < currentCampaign.amount, "Campaign fully funded");
    require(msg.sender != currentCampaign.owner, "Owner cannot back his own campaign");
    require(balances[msg.sender] >= _donation, "Insufficient balance");
    uint donationInEther = _donation / 1 ether;
    uint remainingAmount = currentCampaign.amount - currentCampaign.raisedAmount;
    uint donationToAdd = donationInEther < remainingAmount ? donationInEther : remainingAmount;
    currentCampaign.raisedAmount += donationToAdd;
    balances[msg.sender] -= donationToAdd * 1 ether;

    Backer memory backer = Backer({
        backer: msg.sender,
        donation: donationToAdd,
        time: _time
    });

    backers[_title].push(backer);

    if (currentCampaign.raisedAmount == currentCampaign.amount) {
        sendFundsToOwner(_title);
    }

    emit backerCampagin(backer, _title);
}
    

    function sendFundsToOwner(string memory _title) public {
        Campaign storage currentCampaign = getCampaign(_title);

        require(currentCampaign.raisedAmount == currentCampaign.amount, "Campaign not fully funded");

        balances[currentCampaign.owner]+=currentCampaign.raisedAmount * 1 ether;
        emit fundsSentToOwner(currentCampaign.owner, currentCampaign.raisedAmount, _title);
    }

    function isTitleExist(string memory title) public view  returns(bool) {
     bool flag = true;
     for (uint256 i = 0; i < allCampaignList.length; i++) {
        Campaign storage currentCampaign = allCampaignList[i];
        if (keccak256(bytes(currentCampaign.title)) == keccak256(bytes(title))) {
            flag = false;
            break;
        }
    }
    return flag;
}

    function retreiveCampaignFromMemory(string memory _title) public view returns (Campaign memory) {
        for (uint256 i = 0; i < allCampaignList.length; i++) {
            Campaign storage currentCampaign = allCampaignList[i];
            if (keccak256(bytes(currentCampaign.title)) == keccak256(bytes(_title))) {
                return currentCampaign;
            }
        }
        revert("Campaign not found");
    }



   function addCampaign(string memory _title, uint256 _amount, string memory _url, string memory _description) public {
        require(isTitleExist(_title),"Cannot add a campagain with same name");
        Campaign memory newCampaign = Campaign({
            title: _title,
            amount: _amount,
            url: _url,
            description: _description,
            status : "Live",
            raisedAmount : 0.00,
            owner : msg.sender
        });
       
        allCampaignList.push(newCampaign);
        emit launchCampagin(newCampaign);
    }

    function updateCampaign(string memory _oldTitle, string memory _title, uint256 _amount, string memory _url, string memory _description) public {
    require(isTitleExist(_title),"Cannot add a campagain with same name");
    Campaign storage campaignToUpdate = getCampaign(_oldTitle);
    require(campaignToUpdate.owner == msg.sender, "Only owner can update campaign");
    require(campaignToUpdate.raisedAmount== 0 ether, "Cannot update already started campaign");
        campaignToUpdate.title = _title;
        campaignToUpdate.amount = _amount;
        campaignToUpdate.url = _url;
        campaignToUpdate.description = _description;
        emit updateCampagin(campaignToUpdate);
        
    }


    function getInsights() public view returns (uint,uint) {
        uint totalEthCollected = 0;
        uint totalCampaigns = allCampaignList.length;
        for (uint i=0;i<totalCampaigns;i++){
        Campaign storage camp = allCampaignList[i];
        if(camp.raisedAmount>0)
            totalEthCollected+= camp.raisedAmount;
        }
        return (totalCampaigns,totalEthCollected);
    }

    function deleteCampaign(string memory _title) public payable {
        
        Campaign storage campaignToDelete = getCampaign(_title);

        require(campaignToDelete.owner == msg.sender, "Only owner can delete campaign");
        require(keccak256(bytes(campaignToDelete.status)) != keccak256(bytes("Raised")), "Cannot delete campaign that has raised funds");
        Backer[] storage backersToRefund = backers[_title];
        for (uint256 i = 0; i < backersToRefund.length; i++) {
            Backer storage currentBacker = backersToRefund[i];
            balances[currentBacker.backer] += currentBacker.donation * 1 ether;
            emit refund(currentBacker.backer, currentBacker.donation, _title);
        }
        uint256 indexToDelete;
        for (uint256 i = 0; i < allCampaignList.length; i++) {
            Campaign storage currentCampaign = allCampaignList[i];
            if (keccak256(bytes(currentCampaign.title)) == keccak256(bytes(_title))) {
                indexToDelete = i;
                break;
            }
        }
        allCampaignList[indexToDelete] = allCampaignList[allCampaignList.length - 1];
        allCampaignList.pop();

        emit deleteCampagin(campaignToDelete);
    
    }

    
    function getBackers(string memory _title) public view returns (Backer[] memory) {
        return backers[_title];
    }

     function getAllCampaignList() public view returns (Campaign[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < allCampaignList.length; i++) {
            if (keccak256(bytes(allCampaignList[i].status)) != keccak256(bytes("Deleted"))) {
                count++;
            }
        }
        Campaign[] memory temp = new Campaign[](count);
         uint256 j = 0;
        for (uint256 i = 0; i < allCampaignList.length; i++) {
            if (keccak256(bytes(allCampaignList[i].status)) != keccak256(bytes("Deleted"))) {
                temp[j] = allCampaignList[i];
                j++;
            }
        }
        return temp;
    }  

}
