    // ------ API Calls ------ //
let WebAPI = require('./src/api');
let myapi = new WebAPI();

// Test EthNetInfo()
// myapi.EthNetInfo().then(info => console.log(info));

// Test BlockInfo()
// myapi.BlockInfo(12).then(info => console.log(info));

// Test TxInfo()
// let txhash = "0x12f8ecac2b8ef25cd0d4312b5d3b8028783a1d60e921789ca3ff1cfd0019a041";
// myapi.TxInfo(txhash).then(info => console.log(info));

// Test ByContract()
// let txhash = "0x12f8ecac2b8ef25cd0d4312b5d3b8028783a1d60e921789ca3ff1cfd0019a041";
// myapi.ByContract(txhash).then(info => console.log(info));

// Test IsConfirmed()
// let txhash = "0x12f8ecac2b8ef25cd0d4312b5d3b8028783a1d60e921789ca3ff1cfd0019a041";
// myapi.IsConfirmed(txhash).then(info => console.log(info));

// Test AccountTxs()
// let address = "0x6635F83421Bf059cd8111f180f0727128685BaE4";
// myapi.AccountTxs(address).then(info => console.log(info));


    // ------ Wallet Source Code ------ //
let mywallet = require('./src/wlt');

// Test NewWallet()
// mywallet.NewWallet();
// mywallet.NewWallet("rinkeby");
// console.log(mywallet.keychain);
// console.log(mywallet.ShowWallet());

// Test AccountBalance()
// let address = "0x6635F83421Bf059cd8111f180f0727128685BaE4";
// mywallet.AccountBalance("rinkeby", address);
// mywallet.AccountBalance();

// Test PrivateFromPublic()
// console.log(mywallet.PrivateFromPublic(Address));
// mywallet.PrivateFromPublic(Address).then(info => {console.log(info)});

// Test getCurrentGasPrices()
// mywallet.getCurrentGasPrices().then(info => console.log(info));
// mywallet.getCurrentGasPrices().then(info => console.log(info.low));

// Test getBalance()
// mywallet.getBalance("ropsten", "0x79e11d77f141ccf35136d338c81db3ff65f44a9a").then(info => {console.log(info)});

// Test SendTransaction()
// let address1 = "0x79e11d77f141ccf35136d338c81db3ff65f44a9a";
// let PrivKey1 = "0x482977d941978b8b461aaf8923d33d85aa7facd2f599927e809dbf698ea81e18";
// let address2 = "0xd0bff17f21c1c929e71d1c8ab0d54796c046e4e4";
// mywallet.AccountBalance("ropsten", address1);
// mywallet.AccountBalance("ropsten", address2);
// mywallet.SendTransaction("ropsten", address1, PrivKey1, address2, 0.8);


// const Web3 = require('web3');
// let web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/4ae1a7cf65794f9dbb5222f2e10316c8"));
// let res = web3.eth.getBalance("0x79e11d77f141ccf35136d338c81db3ff65f44a9a", function(err, result) {
//   if (err) { console.log(err) } else {
//     let outcome = (web3.utils.fromWei(result, "ether") + " ETH");
//     return outcome;
//   }
// });
// res.then(info => console.log((web3.utils.fromWei(info, "ether") + " ETH")));