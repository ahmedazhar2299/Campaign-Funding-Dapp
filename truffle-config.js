const path = require("path");

// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const infuraKey = "57417d7d268940c4a538d3b5e821c4b6";
// //
// const fs = require('fs');
// //Add .secret file in root folder and place your HD wallet's mnemonic in that file
// // e.g mnemonic of MetaMask wallet
// const mnemonic = fs.readFileSync(".secret").toString().trim();

// module.exports = {
//   // See <http://truffleframework.com/docs/advanced/configuration>
//   // for more about customizing your Truffle configuration!
//   contracts_build_directory: path.join(__dirname, "client/src/contracts"),
//   networks: {
//     development: {
//       host: "127.0.0.1",
//       port: 7545,
//       network_id: "*" // Match any network id
//     },
//     develop: {
//       port: 8545
//     },
//     ropsten: {
//       provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`),
//       network_id: 3,       // Ropsten's id
//       gas: 5500000,        // Ropsten has a lower block limit than mainnet
//       //confirmations: 2,    // # of confs to wait between deployments. (default: 0)
//       //timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
//       //skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
//     },
//   }
// };

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.13",
    },
  },
};
