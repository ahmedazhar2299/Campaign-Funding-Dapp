// SPDX-License-Identifier: Ahmed FAST-NU
pragma solidity ^0.8.0;

contract Nobiety {
    struct Backer{
    address backer;
    uint256 donation;
    string time;
    }

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

    function backCampaign(string memory _title,uint _donation,string memory _time) public {
        require(isTitleExist(_title)==false,"Invalid title provided");
        Campaign storage currentCampaign = getCampaign(_title);
        require(msg.sender != currentCampaign.owner, "Owner cannot back his own campaign");
        require(balances[msg.sender] >= _donation, "Insufficient balance");
        balances[msg.sender] -= _donation;
        _donation = _donation / 1000000000000000000;
        if (currentCampaign.raisedAmount+_donation >= currentCampaign.amount) {
            currentCampaign.raisedAmount = currentCampaign.amount;
        }
        else 
            currentCampaign.raisedAmount += _donation;
        Backer memory backer = Backer({
                backer : msg.sender,
                donation : _donation,
                time : _time
        });
            backers[_title].push(backer);
            if (currentCampaign.raisedAmount == currentCampaign.amount) {
                sendFundsToOwner(_title);
            }
            emit backerCampagin(backer,_title);
    }
    

    function sendFundsToOwner(string memory _title) public payable {
        Campaign storage currentCampaign = getCampaign(_title);

        require(currentCampaign.raisedAmount < currentCampaign.amount, "Campaign not fully funded");

        uint256 amountToSend = currentCampaign.raisedAmount;
        address payable owner = payable(currentCampaign.owner);

        (bool success, ) = owner.call{value: amountToSend}("");
        require(success, "Transfer failed");
        currentCampaign.status = "Raised";
        emit fundsSentToOwner(owner, amountToSend, _title);
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

   function addCampaign(string memory _title, uint256 _amount, string memory _date, string memory _url, string memory _description) public {
        require(isTitleExist(_title),"Cannot add a campagain with same name");
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

    function updateCampaign(string memory _oldTitle, string memory _title, uint256 _amount, string memory _date, string memory _url, string memory _description) public {
    require(isTitleExist(_title),"Cannot add a campagain with same name");
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

    function deleteCampaign(string memory _title) public {
        
    for (uint256 i = 0; i < allCampaignList.length; i++) {
        Campaign storage currentCampaign = allCampaignList[i];
        if (keccak256(bytes(currentCampaign.title)) == keccak256(bytes(_title)) && currentCampaign.owner == msg.sender) {
          currentCampaign.status = "Deleted";
          if(currentCampaign.raisedAmount>0){
                refundCampaign(currentCampaign.title);
          }
          emit deleteCampagin(currentCampaign);
          break;
        }
    }
    }

    function refundCampaign(string memory _title) public payable {
        Campaign storage currentCampaign = getCampaign(_title);

        require(currentCampaign.raisedAmount > 0, "No funds raised");

        for (uint256 i = 0; i < backers[_title].length; i++) {
            Backer storage currentBacker = backers[_title][i];
            uint256 donation = currentBacker.donation;
            address payable backer = payable(currentBacker.backer);

           // balances[backer] += donation;
            currentCampaign.raisedAmount -= donation;

            emit refund(backer, donation, _title);
            
            (bool success, ) = backer.call{value: donation}("");
            require(success, "Transfer failed");
        }
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