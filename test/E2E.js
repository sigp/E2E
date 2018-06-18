contract('E2E', function(accounts) {
    var e2e = E2E.deployed();
    var account = accounts[0];
  it("should be able to clear messages", function() {
    return e2e.MarkRead({from: account})
        .then(function(){
          return true;
    });
  });
  it("should be able to send a message", function() {
    return e2e.Send(account, "Test Message", {from: account}).then(function() {
      return true;
    });
  });
  it("should be able to read Messages", function() {
    var messages = e2e.Message({_recepient: account},{fromBlock:0, toBlock: 'latest'});
    return messages.get(function(err,logs){
      assert.equal(logs.length, 1, "Reading messages failed")
  });
  it("should be able to ", function() {
  it("should send coin correctly", function() {
    var meta = MetaCoin.deployed();

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return meta.getBalance.call(account_one).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return meta.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return meta.sendCoin(account_two, amount, {from: account_one});
    }).then(function() {
      return meta.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return meta.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
});
