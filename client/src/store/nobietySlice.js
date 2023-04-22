import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from "web3";
import Nobiety from "../contracts/Nobiety.json";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

export const initWeb3 = createAsyncThunk("InitWeb3", async (a, thunkAPI) => {
  try {
    if (!thunkAPI.getState().nobietyReducer.address) {
      const web3 = new Web3(window.ethereum);
      //web3.eth
      await window.ethereum.enable();

      const networkId = await web3.eth.net.getId();
      const network = Nobiety.networks[networkId];
      const contract = new web3.eth.Contract(Nobiety.abi, network.address);
      const addresses = await web3.eth.getAccounts();
      thunkAPI.dispatch(getAllCampaigns());
      window.ethereum.on("accountsChanged", (newAccounts) => {
        thunkAPI.dispatch(setAddress(newAccounts[0]));
        localStorage.setItem(
          "auth",
          JSON.stringify({
            addresses: newAccounts[0],
          })
        );
        history.push("/");
        //window.location.reload();
      });

      return {
        web3,
        contract: contract,
        address: addresses[0],
      };
    }
  } catch (error) {
    console.log("Error in loading Blockchain = ", error);
  }
});

export const setAddress = createAsyncThunk(
  "setAddress",
  async (address, thunkAPI) => {
    return address;
  }
);

export const getAllCampaigns = createAsyncThunk(
  "allCampaigns",
  async (data, thunkAPI) => {
    const campaignList = thunkAPI
      .getState()
      .nobietyReducer.contract.methods.getAllCampaignList()
      .call();
    thunkAPI.dispatch(getCampaignInsights());
    return campaignList;
  }
);

export const updateCampaign = createAsyncThunk(
  "updateCampaign",
  async (data, thunkAPI) => {
    const contract = thunkAPI.getState().nobietyReducer.contract;
    const address = thunkAPI.getState().nobietyReducer.address;
    await contract.methods
      .updateCampaign(
        data.oldTitle,
        data.title,
        data.amount,
        data.url,
        data.description
      )
      .send({
        from: address,
      });
    thunkAPI.dispatch(getAllCampaigns());
  }
);

export const backACampaign = createAsyncThunk(
  "backCampaign",
  async (data, thunkAPI) => {
    const contract = thunkAPI.getState().nobietyReducer.contract;
    const address = thunkAPI.getState().nobietyReducer.address;
    const web3 = thunkAPI.getState().nobietyReducer.web3;
    const ethAmount = web3.utils.toWei(data.donation.toString(), "ether");
    const options = {
      timeZone: "Asia/Karachi",
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const date = new Date();
    const pst = date.toLocaleString("en-US", options);
    await contract.methods.backCampaign(data.title, ethAmount, pst).send({
      from: address,
    });
    thunkAPI.dispatch(getAllCampaigns());
  }
);

export const depositAmount = createAsyncThunk(
  "depositAmount",
  async (amount, thunkAPI) => {
    const contract = thunkAPI.getState().nobietyReducer.contract;
    const address = thunkAPI.getState().nobietyReducer.address;
    const web3 = thunkAPI.getState().nobietyReducer.web3;
    const ethAmount = web3.utils.toWei(amount.toString(), "ether");
    await contract.methods.deposit().send({
      from: address,
      value: ethAmount,
      gasLimit: 500000,
    });
    thunkAPI.dispatch(walletAmount());
  }
);

export const walletAmount = createAsyncThunk(
  "walletAmount",
  async (a, thunkAPI) => {
    const contract = thunkAPI.getState().nobietyReducer.contract;
    const address = thunkAPI.getState().nobietyReducer.address;
    const amount = await contract.methods.getDeposit(address).call();
    return amount;
  }
);

export const withdrawAmount = createAsyncThunk(
  "withdraw",
  async (amount, thunkAPI) => {
    const contract = thunkAPI.getState().nobietyReducer.contract;
    const address = thunkAPI.getState().nobietyReducer.address;
    const web3 = thunkAPI.getState().nobietyReducer.web3;
    const ethAmount = web3.utils.toWei(amount.toString(), "ether");
    await contract.methods.withdrawBalance(ethAmount).send({
      from: address,
    });
    thunkAPI.dispatch(walletAmount());
  }
);

export const getBackers = createAsyncThunk(
  "getBackersList",
  async (title, thunkAPI) => {
    const contract = thunkAPI.getState().nobietyReducer.contract;
    const backerList = await contract.methods.getBackers(title).call();
    return backerList;
  }
);

export const deleteCampaign = createAsyncThunk(
  "deleteCampaign",
  async (title, thunkAPI) => {
    const contract = thunkAPI.getState().nobietyReducer.contract;
    const address = thunkAPI.getState().nobietyReducer.address;
    await contract.methods.deleteCampaign(title).send({
      from: address,
    });
    thunkAPI.dispatch(getAllCampaigns());
  }
);

export const addNewCampaign = createAsyncThunk(
  "createCampaign",
  async (data, thunkAPI) => {
    const contract = thunkAPI.getState().nobietyReducer.contract;
    const address = thunkAPI.getState().nobietyReducer.address;
    await contract.methods
      .addCampaign(data.title, data.amount, data.url, data.description)
      .send({
        from: address,
      });
  }
);

export const getCampaignDetail = createAsyncThunk(
  "getCampaign",
  async (title, thunkAPI) => {
    const contract = thunkAPI.getState().nobietyReducer.contract;
    const res = await contract.methods.retreiveCampaignFromMemory(title).call();
    thunkAPI.dispatch(getBackers(title));
    return res;
  }
);

export const getCampaignInsights = createAsyncThunk(
  "campaignInsights",
  async (a, thunkAPI) => {
    const contract = thunkAPI.getState().nobietyReducer.contract;
    const res = await contract.methods.getInsights().call();
    return res;
  }
);

const nobietySlice = createSlice({
  name: "nobietySlice",
  initialState: {
    web3: null,
    contract: null,
    address: null,
    allCampaignList: [],
    wallet: 0,
    backerList: [],
    campaignDetail: null,
    totalCampaigns: 0,
    totalEtherDonated: 0,
  },
  reducers: {
    nobiety: () => {},
  },
  extraReducers: {
    [initWeb3.fulfilled]: (state, action) => {
      state.web3 = action.payload.web3;
      state.contract = action.payload.contract;
      state.address = action.payload.address;
    },
    [getAllCampaigns.fulfilled]: (state, action) => {
      state.allCampaignList = action.payload;
    },
    [setAddress.fulfilled]: (state, action) => {
      state.address = action.payload;
    },
    [walletAmount.fulfilled]: (state, action) => {
      state.wallet = action.payload / 1000000000000000000;
    },
    [getBackers.fulfilled]: (state, action) => {
      state.backerList = action.payload;
    },
    [getCampaignDetail.fulfilled]: (state, action) => {
      state.campaignDetail = action.payload;
    },
    [getCampaignInsights.fulfilled]: (state, action) => {
      state.totalCampaigns = action.payload[0];
      state.totalEtherDonated = action.payload[1];
    },
  },
});

export const nobietyReducer = nobietySlice.reducer;
export const { nobiety } = nobietySlice.actions;
