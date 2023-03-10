const nearAPI = require("near-api-js");
const {  connect, keyStores, WalletConnection  } = nearAPI;
const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
const walletConnection = new WalletConnection(nearConnection);

const connectionConfig = {
  networkId: "testnet",
  keyStore: myKeyStore, // first create a key store 
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};


const getTimeSpent = (json) => {
  var timeSpent = 0;
   return timeSpent;
}
const nearWalletGenerator = async function(){
  const nearConnection = await connect(connectionConfig);
  // create a new account using funds from the account used to create it.
  const account = await nearConnection.account("account.testnet");
  const results = await account.createAccount(
    "example-account2.testnet", // new account name
    "8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc", // public key for new account
    "10000000000000000000" // initial balance for new account in yoctoNEAR
  );
  console.log(results);
};
module.exports = {
  getTimeSpent,
  nearWalletGenerator
}