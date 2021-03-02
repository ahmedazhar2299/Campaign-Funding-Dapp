// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import Adoption from '../contracts/Adoption.json';
// import Web3 from "web3";

// export const initWeb3 = createAsyncThunk(
//     "InitWeb3",
//     async(a,thunkAPI)=>{
//         console.log("in init web3 = ", a);
//         console.log("in init web3 = ", thunkAPI);
//         console.log("in init web3 = ", thunkAPI.dispatch);
//         try {
//             if(Web3.givenProvider){
//                 const web3 = new Web3 (Web3.givenProvider);
//                 //web3.eth
//                 await Web3.givenProvider.enable();
//                 console.log("web3 = ", web3);
//                 const networkId = await web3.eth.net.getId();
//                 const network = Adoption.networks[networkId];
//                 const contract = new web3.eth.Contract(Adoption.abi,network.address);
//                 const addresses = await web3.eth.getAccounts();
//                 thunkAPI.dispatch(loadAdopters({
//                     contract: contract,
//                     address: addresses[0]
//                 }));
//                 console.log("addresss = ",addresses);
//                 return {
//                     web3,
//                     contract: contract,
//                     address: addresses[0]
//                 };
//             }
//             else {
//                 console.log("Error in loading web3");
//             }
//         }
//         catch(error){
//             console.log("Error in loading Blockchain = ",error);
//         }
        
//     }
// )

// export const loadAdopters = createAsyncThunk(
//     "LoadAdopters",
//     async(data,thunkAPI)=>{
//         const adopterList = await data.contract.methods.getAdopters().call();
//         return adopterList;
//     }
// )

// const adoptSlice = createSlice({
//     name: "AdopSlice",
//     initialState: {
//         web3: null,
//         contract: null,
//         address: null,
//     },
//     reducers: {
//         adopt: ()=>{

//         }
//     },
//     extraReducers: {
//         [initWeb3.fulfilled]: (state,action)=>{
//             console.log("In fullfil = ",state);
//             console.log("In fullfil = ",action);
//             state.web3 = action.payload.web3;
//             state.contract = action.payload.contract;
//             state.address = action.payload.address;
//         }
//     }
// })

// export const adoptReducer = adoptSlice.reducer;
// export const { adopt } = adoptSlice.actions;




import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Adoption from '../contracts/Adoption.json';
import Web3 from "web3";

export const initWeb3 = createAsyncThunk(
    "InitWeb3",
    async(a,thunkAPI)=>{
        console.log("in init web3 = ", a);
        console.log("in init web3 = ", thunkAPI);
        console.log("in init web3 = ", thunkAPI.dispatch);
        thunkAPI.getState()
        try {
            if(Web3.givenProvider){
                const web3 = new Web3 (Web3.givenProvider);
                //web3.eth
                await Web3.givenProvider.enable();

                const networkId = await web3.eth.net.getId();
                const network = Adoption.networks[networkId];
                const contract = new web3.eth.Contract(Adoption.abi,network.address);
                const addresses = await web3.eth.getAccounts();
                thunkAPI.dispatch(loadAdopters({
                    contract: contract,
                    address: addresses[0]
                }));
                console.log("addresss = ",addresses);
                return {
                    web3,
                    contract: contract,
                    address: addresses[0]
                };
            }
            else {
                console.log("Error in loading web3");
            }
        }
        catch(error){
            console.log("Error in loading Blockchain = ",error);
        }
        
    }
)

export const loadAdopters = createAsyncThunk(
    "LoadAdopters",
    async(data,thunkAPI)=>{
        const adopterList = await data.contract.methods.getAdopters().call();
        return adopterList;
    }
)

export const adoptPet = createAsyncThunk(
    "adoptPet",
    async(petIndex,thunkAPI)=>{
        console.log("hello in adopt Pet")
        console.log("in adopt pet petIndex = ", petIndex)
        console.log("in adopt pet thunkAPI = ", thunkAPI)
        console.log("in adopt pet s = ", thunkAPI.getState());
        const contract = thunkAPI.getState().adoptReducer.contract;
        const address = thunkAPI.getState().adoptReducer.address;

        const result = await contract.methods.adopt(petIndex).send({ from: address });
        console.log("after adopt result = ", result);

        return {
            adopterAddress: result.from,
            petIndex: petIndex
        }
        
    }
)

export const leavePet = createAsyncThunk(
    "leavePet",
    async(petIndex,thunkAPI)=>{
        console.log("hello in adopt Pet")
        console.log("in adopt pet petIndex = ", petIndex)
        console.log("in adopt pet thunkAPI = ", thunkAPI)
        console.log("in adopt pet s = ", thunkAPI.getState());
        const contract = thunkAPI.getState().adoptReducer.contract;
        const address = thunkAPI.getState().adoptReducer.address;

        const result = await contract.methods.leaveAdopt(petIndex).send({ from: address });
        console.log("after adopt result = ", result);

        return {
            //adopterAddress: result.from,
            petIndex: petIndex
        }
        
    }
)


const adoptSlice = createSlice({
    name: "AdopSlice",
    initialState: {
        web3: null,
        contract: null,
        address: null,
        adopters: [],
        adoptInProgress: false,
        adoptErrorMessage: "",
        adoptError: false,
     },
    reducers: {
        adopt: ()=>{

        }
    },
    extraReducers: {
        [initWeb3.fulfilled]: (state,action)=>{
            console.log("init web3 fullfil state = ",state);
            console.log("init web3 fullfil action = ",action);
            state.web3 = action.payload.web3;
            state.contract = action.payload.contract;
            state.address = action.payload.address;
            
        },
        [loadAdopters.fulfilled]: (state,action)=>{
            state.adopters = action.payload
        },

        [adoptPet.fulfilled]: (state,action)=>{
            console.log("adopt pet fulfil state = ", state);            
            console.log("adopt pet fulfil action = ", action);
            state.adopters[action.payload.petIndex] = action.payload.adopterAddress
            state.adoptInProgress = false;
            
        },
        [adoptPet.pending]: (state,action)=>{
            console.log("adopt pet pending state = ", state);
            console.log("adopt pet pending action = ", action);
            state.adoptInProgress = true;
        },
        [adoptPet.rejected]: (state,action)=>{
            console.log("adopt pet rejected state = ", state);
            console.log("adopt pet rejected action = ", action);
            state.adoptErrorMessage = action.error.message;
            state.adoptError = true;
            state.adoptInProgress = false;
            console.log("Error Message = ", action.error.message)
        },

        [leavePet.fulfilled]: (state,action)=>{
            console.log("leave pet fulfil state = ", state);
            console.log("leave pet fulfil action = ", action);
            state.adopters[action.payload.petIndex] = '0x0000000000000000000000000000000000000000';
            state.adoptInProgress = false;
        },
        [leavePet.pending]: (state,action)=>{
            console.log("adopt pet pending state = ", state);
            console.log("adopt pet pending action = ", action);
            state.adoptInProgress = true;
        },
        [leavePet.rejected]: (state,action)=>{
            console.log("adopt pet rejected state = ", state);
            console.log("adopt pet rejected action = ", action);
            state.adoptErrorMessage = action.error.message;
            state.adoptError = true;
            state.adoptInProgress = false;
            console.log("Error Message = ", action.error.message)
        },
        
    }
})

export const adoptReducer = adoptSlice.reducer;
export const { adopt } = adoptSlice.actions;


