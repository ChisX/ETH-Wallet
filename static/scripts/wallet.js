// Create New Wallet button click
$("#create-wallet").click(function() {
  $("#old-wallet").hide();
  $("#new-wallet").show();
  $("#output-area").html("");
})

// Network selection and Create button click
$("#new-wallet-form").on('submit', function(e) {
    e.preventDefault(e);
    let network = $('input[name=network]:checked').val();
    ethereum.NewWallet(network).then(function() {
      $('#new-wallet-form')[0].reset();
      $('#new-wallet').hide();
      $('#output-area').html(generateNewWalletInfo());
    });

    // New wallet confirmation button click
    let account = ethereum.ShowWallet().address;
    $('#output-area').on('click', '#confirm-key', function(e) {
      $('#output-area').html(generateWalletUI(network));
      updateEthBalance(network, account);
    })
})



// Handle sending of transaction
$('#output-area').on('click', '#tx-form button', function(e) {
  e.preventDefault(e);

  let amount = $('input[name="eth"]').val();
  let addr = $('input[name="addr"]').val();
  let account = ethereum.ShowWallet();
  let network = $('input[name="networkname"]').val();

  if (amount <= 0 || Number.isNaN(amount)) {
    displayAlert("danger", "Please enter valid amount!");
    return;
  }

  ethereum.AccountBalance(network).then(function(balance) {
    if (amount > balance) { displayAlert("danger", "Not enough ethereum in account!"); } else {
      return ethereum.SendTransaction(network, account.address, account.privateKey, addr, amount);
    }
  }).then(function(result) {
    if (result === undefined) {
      displayAlert("danger", "Error! Invalid Address or Amount!");
    } else {
      displayAlert("success", "Success! TX ID: " + result);
      $('#tx-form')[0].reset();
    }
  }).catch(function(err){
    displayAlert("danger", "Unable to send TX!");
    console.log(err);
    console.log(amount, addr);
  });
})

// Import Existing Wallet button click
$('#import-wallet').click(function() {
  $("#old-wallet").show();
  $("#new-wallet").hide();
  $("#output-area").html("");
})

// Private key unlock button click
$('#old-wallet-form').on('submit', function(e) {
  e.preventDefault(e);
  let key = $('input[name="key"]').val();
  let net = ($('input[name="net"]').val()).toLowerCase();

  ethereum.OldWallet(net, key).then(function(wallet) {
    if (wallet.privateKey === key) {
      $('#old-wallet-form')[0].reset();
      $('#old-wallet').hide();
      $('#output-area').html(generateWalletUI(net));
      updateEthBalance(net, wallet.address);
    } else { displayAlert("danger", "Please Enter a Valid Key"); }
  }).catch(function(err) { displayAlert("danger", err); });
})

//==============================
// Helper Functions
//==============================

function displayAlert(type, msg) {
  let alert = `
    <div class='alert alert-dismissible alert-${type}'>
      <p>${msg}</p>
      <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    </div>
  `;
  $('#alert-msg').append(alert);
}

function generateNewWalletInfo() {
  let html = `
    <h4>Save your private key and DO NOT lose it!</h4>
    <div class='key-info'>${ethereum.ShowWallet().privateKey}</div>
    <button id='confirm-key' type='submit' class='btn btn-warning'>Ok, got it!</button>
  `;
  return html;
}

function generateWalletUI(network) {
  let html = `
    <h5 id='eth-balance'>Balance: 0</h5>
    <h5>Address: ${ethereum.ShowWallet().address}</h5>
    <h5>Send Transaction</h5>
    <form id='tx-form'>
        <div class='form-group'>
            <input type='number' min='0' step='any' name='eth' placeholder='Amount in ETH' class='form-control'>
            <input type='text' name='addr' placeholder='Recipient Address' class='form-control'>
            <input type='text' name='networkname' style="visibility: hidden;" value='${network}'>
        </div>
        <button type='submit' class='btn btn-warning'>Send Ethereum</button>
    </form>
  `;
  return html;
}

function round(x, n) {
  let y = Math.round(x * (10**n))/(10**n);
  return y;
}

function updateEthBalance(network, account) {
  const wei2eth = 10**18;
  ethereum.AccountBalance(network, account).then(function(balance) {
    let balanceineth = round(balance/wei2eth, 4);
    $('#eth-balance').html("Balance: " + balanceineth + " ETH");
  })
}