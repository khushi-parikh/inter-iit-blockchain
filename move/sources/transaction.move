
// This module defines a minimal Coin and Balance.
module transaction_addr::basic_coin {
    use std::signer;
    use aptos_framework::aptos_account::transfer_coins;
    use aptos_framework::aptos_coin::AptosCoin;

    // Address of the owner of this module
    const MODULE_OWNER: address = @transaction_addr;

    // Error codes
    const ENOT_MODULE_OWNER: u64 = 0;
    const EINSUFFICIENT_BALANCE: u64 = 1;
    const EALREADY_HAS_BALANCE: u64 = 2;

    //creating a coin strcut that stores the value under address resource
    struct Coin has store {
        value: u64
    }

    // Struct representing the balance of each address.
    struct Balance has key {
        coin: Coin
    }

    // Publish an empty balance resource under accounts address. This function must be called before
    // minting or transferring to the account.
    public fun publish_balance(account: &signer) {
        //creating a empty coin struct under the resource 
        let empty_coin = Coin { value: 0 };
        //checks that account is empty or not
        assert!(!exists<Balance>(signer::address_of(account)), EALREADY_HAS_BALANCE);
        move_to(account, Balance { coin:  empty_coin });
    }

    // Minting amount tokens to mint_addr
    public fun mint(module_owner: &signer, mint_addr: address, amount: u64) acquires Balance {
        
        //only the owner can do the transaction or access the module
        assert!(signer::address_of(module_owner) == MODULE_OWNER, ENOT_MODULE_OWNER);

        // Deposit amount of tokens to mint_addr balance
        deposit(mint_addr, Coin { value: amount });
    }

    // Returns the balance of `owner`.
    public fun balance_of(owner: address): u64 acquires Balance {
        borrow_global<Balance>(owner).coin.value
    }

    // Transfers `amount` of tokens from addr -> to addr
    public entry fun transfer(from: &signer, to: address, amount: u64){
        // 
        transfer_coins<AptosCoin>(from, to, amount);
    }

    // Withdraw `amount` number of tokens from the balance under `addr`.
    fun withdraw(addr: address, amount: u64) : Coin acquires Balance {
        let balance = balance_of(addr);
        // balance must be greater than the withdraw amount
        assert!(balance >= amount, EINSUFFICIENT_BALANCE);
        let balance_ref = &mut borrow_global_mut<Balance>(addr).coin.value;
        *balance_ref = balance - amount;
        Coin { value: amount }
    }

    // Deposit amount number of tokens to the balance under addr.
    fun deposit(addr: address, check: Coin) acquires Balance{
        let balance = balance_of(addr);
        let balance_ref = &mut borrow_global_mut<Balance>(addr).coin.value;
        let Coin { value } = check;
        *balance_ref = balance + value;
    }

    #[test(account = @0x1)]
    #[expected_failure] // This test should abort
    fun mint_non_owner(account: &signer) acquires Balance {
        // Make sure the address we've chosen doesn't match the module
        // owner address
        publish_balance(account);
        assert!(signer::address_of(account) != MODULE_OWNER, 0);
        mint(account, @0x1, 10);
    }

    #[test(account = @transaction_addr)]
    fun mint_check_balance(account: &signer) acquires Balance {
        let addr = signer::address_of(account);
        publish_balance(account);
        mint(account, @transaction_addr, 42);
        assert!(balance_of(addr) == 42, 0);
    }

    #[test(account = @0x1)]
    fun publish_balance_has_zero(account: &signer) acquires Balance {
        let addr = signer::address_of(account);
        publish_balance(account);
        assert!(balance_of(addr) == 0, 0);
    }

    #[test(account = @0x1)]
    #[expected_failure(abort_code = 2, location = Self)] // Can specify an abort code
    fun publish_balance_already_exists(account: &signer) {
        publish_balance(account);
        publish_balance(account);
    }

    #[test]
    #[expected_failure]
    fun balance_of_dne() acquires Balance {
        balance_of(@0x1);
    }

    #[test]
    #[expected_failure]
    fun withdraw_dne() acquires Balance {
        // Need to unpack the coin since `Coin` is a resource
        Coin { value: _ } = withdraw(@0x1, 0);
    }

    #[test(account = @0x1)]
    #[expected_failure] // This test should fail
    fun withdraw_too_much(account: &signer) acquires Balance {
        let addr = signer::address_of(account);
        publish_balance(account);
        Coin { value: _ } = withdraw(addr, 1);
    }

    #[test(account = @transaction_addr)]
    fun can_withdraw_amount(account: &signer) acquires Balance {
        publish_balance(account);
        let amount = 1000;
        let addr = signer::address_of(account);
        mint(account, addr, amount);
        let Coin { value } = withdraw(addr, amount);
        assert!(value == amount, 0);
    }
}