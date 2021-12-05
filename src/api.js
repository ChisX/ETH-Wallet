// ------ Imports ------ //
let request = require('request');

class EthWalletAPI {
  constructor() {
    this.url = "https://api.blockcypher.com/v1/eth/main/";
  }

  EthNetInfo() {
    return new Promise((resolve, reject) => {
      request(this.url, (err, res, body) => {
        // If there is an error, reject and show.
        if(err) reject(err)
        // If there is no error, access the information.
        let info = JSON.parse(body);
        resolve({
          chainheight: info.height,
          lasthash: info.hash,
          lastupdate: info.time
        })
      })
    })
  }

  BlockInfo(id) {
    // The API will take in either hash or height.
    let url = this.url + "/blocks/" + id;
    return new Promise((resolve, reject) => {
      request(url, (err, res, body) => {
        // If there is an error, reject and show.
        if(err) reject(err)
        // If there is no error, access the information.
        let info = JSON.parse(body);
        resolve({
          bhash: info.hash,
          bheight: info.height,
          chain: info.chain,
          amount: info.total/COIN,
          bfees: info.fees/COIN,
          bsize: info.size,
          creation_time: info.time,
          txnum: info.n_tx,
          prevhash: info.prev_block,
          transactions: info.txids
        })
      })
    })
  }

  TxInfo(txhash) {
    let url = this.url + "/txs/" + txhash;
    return new Promise((resolve, reject) => {
      request(url, (err, res, body) => {
        // If there is an error, reject and show.
        if(err) reject(err)
        // If there is no error, access the information.
        let info = JSON.parse(body);
        resolve({
          bheight: info.block_height,
          bindex: info.block_index,
          addresses: info.addresses,
          amount: info.total/COIN,
          txfees: info.fees/COIN,
          txsize: info.size,
          txgas: info.gas_used,
          txprice: info.gas_price,
          numin: info.vin_sz,
          numout: info.vout_sz,
          confirmcount: info.confirmations,
          txparent: info.parent_tx,
          timeconf: info.confirmed,
          gaslimit: info.gas_limit,
        })
      })
    })
  }

  // To test if a tx is executed by a contract.
  ByContract(txhash) {
    let data = this.TxInfo(txhash);
    return data.then(info => {
      if (data.txparent) { return data.txparent }
      else {return false;}
    });
  }

  IsConfirmed(txhash) {
    let data = this.TxInfo(txhash);
    return data.then(info => {
      if (info.confirmcount) { return true }
      else {return false;}
    });
  }

  AccountTxs(address) {
    let url = this.url + "/addrs/" + address;
    return new Promise((resolve, reject) => {
      request(url, (err, res, body) => {
        // If there is an error, reject and show.
        if(err) reject(err)
        // If there is no error, access the information.
        let info = JSON.parse(body);
        resolve({
          txnum: info.n_tx,
          final_txnum: info.final_n_tx,
          txsummary: info.txrefs
        })
      })
    })
  }
}

module.exports = EthWalletAPI;