import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from "web3";
import Nobiety from "../contracts/Nobiety.json";

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
      localStorage.setItem(
        "auth",
        JSON.stringify({
          addresses: addresses[0],
        })
      );
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

export const getAllCampaigns = createAsyncThunk(
  "allCampaigns",
  async (data, thunkAPI) => {
    const campaignList = thunkAPI
      .getState()
      .nobietyReducer.contract.methods.getAllCampaignList()
      .call();
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
        String(data.date),
        data.url,
        data.description
      )
      .send({
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
      .addCampaign(
        data.title,
        data.amount,
        String(data.date),
        data.url,
        data.description
      )
      .send({
        from: address,
      });
  }
);

const nobietySlice = createSlice({
  name: "nobietySlice",
  initialState: {
    web3: null,
    contract: null,
    address: null,
    allCampaignList: [],
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
  },
});

export const nobietyReducer = nobietySlice.reducer;
export const { nobiety } = nobietySlice.actions;
