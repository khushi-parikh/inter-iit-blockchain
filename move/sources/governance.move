module profile_addr::Governance{
    use aptos_framework::aptos_governance;
     use aptos_framework::block;
    use std::vector;
    use std::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::staking_config;
    
    public entry fun create_proposal_test(propser : &signer){
        let execution_hash = vector::empty<u8>();
        vector::push_back(&mut execution_hash, 1);
        aptos_governance::create_proposal(
            propser,
            signer::address_of(propser),
            execution_hash,
            b"",
            b"",
        );
    }
            





    public entry fun update_epoch(proposal_id:u64){
        let framework_signer = aptos_governance::resolve(proposal_id, @aptos_framework);
        // Update epoch interval to 2 hours.
        let epoch_interval_secs = 2 * 60 * 60;
        let epoch_interval_microsecs = epoch_interval_secs * 1000000;
        block::update_epoch_interval_microsecs(&framework_signer, epoch_interval_microsecs);
    }
    public entry fun update_voting_duration(proposal_id:u64){
        let framework_signer = aptos_governance::resolve(proposal_id, @aptos_framework);
        // Update voting duration of Aptos governance proposals to 1 day. Other params don't change.
        let updated_voting_duration_secs = 24 * 60 * 60;
        let unchanged_min_voting_threshold = aptos_governance::get_min_voting_threshold();
        let unchanged_required_proposer_stake = aptos_governance::get_required_proposer_stake();
        aptos_governance::update_governance_config(
            &framework_signer,
            unchanged_min_voting_threshold,
            unchanged_required_proposer_stake,
            updated_voting_duration_secs,
        );
    }
    public entry fun update_stake(proposal_id:u64){
        let framework_signer = aptos_governance::resolve(proposal_id, @aptos_framework);
        let one_aptos_coin_with_decimals = 10 *(coin::decimals<AptosCoin>() as u64);
        // Change min to 1000 and max to 1M Aptos coins.
        let new_min_stake = 1000 * one_aptos_coin_with_decimals;
        let new_max_stake = 1000000 * one_aptos_coin_with_decimals;
        staking_config::update_required_stake(&framework_signer, new_min_stake, new_max_stake);
    }
    public entry fun update_lockup( proposal_id:u64){
        let framework_signer = aptos_governance::resolve(proposal_id, @aptos_framework);
    // Change recurring lockup to 1 day.
        let one_day_in_secs = 24 * 60 * 60;
        staking_config::update_recurring_lockup_duration_secs(&framework_signer, one_day_in_secs);
    }
    public entry fun update_rewards_rate(proposal_id:u64){
        let framework_signer = aptos_governance::resolve(proposal_id, @aptos_framework);
        let num_seconds_in_a_year = 365 * 24 * 60 * 60;
        let epoch_duration_secs = block::get_epoch_interval_secs();
        let num_epochs_in_a_year = num_seconds_in_a_year / epoch_duration_secs;
        // Change reward rate to 5% a year.
        let apy = 5;
        // Need to represent reward rate fraction as 2 numbers - numerator and denominator.
        let reward_rate_denominator = 1000000000;
        let reward_rate_numerator = apy * reward_rate_denominator / num_epochs_in_a_year / 100;
        staking_config::update_rewards_rate(
            &framework_signer, reward_rate_numerator, reward_rate_denominator);
    }
    public entry fun update_voting_power(proposal_id:u64){
        let framework_signer = aptos_governance::resolve(proposal_id, @aptos_framework);
        // Update voting power increase limit to 10%.
        staking_config::update_voting_power_increase_limit(&framework_signer, 10);
    }
}