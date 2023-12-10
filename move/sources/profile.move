// Import necessary Move modules and libraries
module profile_addr::Profile {

    use std::signer;
    use std::vector;
    use std::string::String;
    #[test_only]
    use std::string;
    use aptos_std::table::{Self, Table};
    use std::debug::print;
    use aptos_framework::aptos_account::transfer_coins;
    use aptos_framework::aptos_coin::AptosCoin;


    // use aptos_framework::event;
    // use aptos_framework::account; 

    // Struct to represent a song table
    struct Songs_Table has key {
        songs: Table<u64, Song>,
        song_counter: u64
    }
    // Event emitted when there's a vote on a proposal;
    struct VoteEvent has key,drop, store {
        proposal_id: u64,//event is proposed with perticualr id
        stake_pool: address,//event will store at perticular addr
        minimum_votes: u64,
        total_votes:u64,//total votes on a perticualr event 
        should_pass: bool,
        required_proposer_stake: u64,
        total_stake:u64,
        message:String,
        
    }
    
    //if we give two vote events ex minimize the gas price and delete a perticular song
    //events can be retrive using forntend
    struct Fullevent has key,store{
        events:Table<u64,VoteEvent>,
        // proposal_id:u64,//event is proposed with perticular id
        
    }
    // Struct to represent a Playlist table
    struct Playlists_Table has key {
        playlists: Table<u64, Playlist>,
        playlist_counter: u64
    }
    struct TransactionTable has key {
        transactions: Table<u64, Transaction>,
        transaction_counter: u64
    }
    // Struct to represent a song
    struct Song has key, store, drop, copy {
        album_id: u64,
        song_id: u64,
        artist_address: address,
        name: String,
        duration: u64,
        num_likes: u64,
        current_price: u64,
        date: String, // ? How is date stored
        photoLink: String,
        videoLink:String, //removed file
        num_streams: u64,
        genre: String,
        previewStart:u64,
        previewEnd:u64 //startTime, endTime
    }

    // Struct to represent an album
    struct Album has key{    
        album_id: u64,
        album_name: String,
        artist_address: address,
        despription: String,
        date_added: String, // ? Date
        cid: String,
        album_cover : String,  //pfp file string
        songs: vector <u64> //song_id
    }

    // Struct to represent a user
    struct User has key{
        user_address: address,
        liked_songs: vector<u64>,
        playlist : vector<u64>,
        transaction_history: vector<u64>,
        listening_history: vector<u64>,
    }

    // Struct to represent a transaction
    struct Transaction has key, store , copy, drop{
        price: u64,
        transaction_id: u64,
        // timestamp: u64,
        song_id: u64,
        from_address: address,
        to_address: address,
    }

    struct Playlist has key, store , copy, drop{
        playlist_id: u64,
        playlist_name: String,
        songs: vector<u64>,
        date_added: String,
    }

    // Struct to represent an artist
    struct Artist has key{
        artist_address: address,
        liked_songs: vector<u64>,
        playlist: vector<u64>, //playlist_id
        transaction_history: vector<u64>,
        listening_history: vector<u64>,
        uploaded_songs: vector<u64>,
        earner_money: u64,
    }

    // Error codes

    /// Not initialized
    const E_NOT_INITIALIZED: u64 = 1;
    /// Not admin, can't create shared object
    const ENOT_ADMIN: u64 = 2;
    /// Shared object doesn't exist
    const ESHARED_NOT_EXIST: u64 = 3;

    /// User already exists
    const USER_EXISTS: u64 = 4;

    /// Artist already exists
    const ARTIST_EXISTS: u64 = 5;

    /// Sample error
    const SAMPLE_ERROR: u64 =  6;

    const USER_NOT_INITIALIZED: u64 = 5;

    const RESOURCE_NOT_INITIALIZED: u64 = 7;

    const PROFILE_ADDRESS: address = @0xc7bc45497872fcae59a6aa9613ac6614ff2b0d7c4dccf232e37c958600fb5635; 

    const ADMIN_ADDRESS: address = @0x948360774544eb680c1214082633a63805bc231bc9cf6e8d2e12cdbc5872d7c0;
    
    const EINSUFFICIENT_PROPOSER_STAKE: u64 = 8;
    const ENOT_DELEGATED_VOTER: u64 = 9;
    const EALREADY_VOTED: u64 = 10;
    const ENO_VOTING_POWER: u64 = 11;
    const ETABLE_EXIST:u64=12;
    const ESONG_NOT_EXIST:u64=13;
    const EEVENT_EXIST:u64=14;
    const EINSUFFICIENT_VOTES:u64=15;
    
    public entry fun transfer(from: &signer, to: address, amount: u64){
        // 
        transfer_coins<AptosCoin>(from, to, amount);
    }

///////Voting Code////////////////////////////////
    //function to create new event
    public entry fun create_event(_account: &signer, stake_pool:address,minimum_votes:u64,required_proposer_stake:u64, proposal_id: u64, message:String) acquires Fullevent{

        //create an instance of the table
        //assert table exists
        let eventTable = borrow_global_mut<Fullevent>(ADMIN_ADDRESS);
        // assert!(exists<eventTable>(ADMIN_ADDRESS),ETABLE_EXIST);

        let new_voteevent=VoteEvent{
            proposal_id:proposal_id,
            stake_pool: stake_pool,
            minimum_votes:minimum_votes,
            total_votes:0,    

            should_pass:false,
            required_proposer_stake:required_proposer_stake,
            total_stake:0,
            message:message,
        };

        table::upsert(&mut eventTable.events , proposal_id, new_voteevent); 

        // eventTable.proposal_id = proposalID;

    }

    //function to vote a event with perticular id
    public entry fun voting(_account:&signer,proposal_id:u64 ) acquires Fullevent {
        //retrive event of that id and increase the vote

        let eventTable = borrow_global_mut<Fullevent>(ADMIN_ADDRESS);

        let event = table::borrow_mut(&mut eventTable.events, proposal_id);
        profile_addr::Profile::transfer(_account,event.stake_pool,event.required_proposer_stake);


        event.total_votes = event.total_votes+1;
        event.total_stake = event.total_stake + event.required_proposer_stake;
    }

    //function that will delete the perticular song with song id
    public entry fun delete_song(song_id:u64) acquires Songs_Table{
        // gets the Songs Table resource
        let song_table = borrow_global_mut<Songs_Table>(ADMIN_ADDRESS);

        //get  a counter that matches with that song id and put that counter to delete a that struct with this counter
        //get the song that match with song_id

        //convert this to assert
        let _song_match1=table::borrow_mut(&mut song_table.songs,song_id);
        // assert!(!exists<song_match1>(ADMIN_ADDRESS),ESONG_NOT_EXIST);

        //delete a song struct with that id
        table::remove(&mut song_table.songs, song_id);
    }

    public entry fun checkevent(_stake_pool:address,proposal_id:u64)acquires Fullevent, Songs_Table{

        let eventTable = borrow_global_mut<Fullevent>(ADMIN_ADDRESS);

        let event = table::borrow_mut(&mut eventTable.events, proposal_id);

        let requiredVotes = event.minimum_votes;

        let totalVotes = event.total_votes;

        let requiredProposerStake = event.required_proposer_stake;

        let totalStake = event.total_stake;

        // let votes = borrow_global_mut<VoteEvent>(stake_pool);
        // let vote_match1=table::borrow_mut(&mut votes.events,proposal_id);

        assert!(totalStake >= requiredProposerStake,EINSUFFICIENT_PROPOSER_STAKE);

        assert!(totalVotes >= requiredVotes ,EINSUFFICIENT_VOTES);

        delete_song(proposal_id);
    }

    
    
  

    //create a function that checks that a perticular user buied that song or not so he has the voting power
    public entry fun votepower(account: &signer, song_id:u64) acquires User{
         // gets the Songs Table struct resource 
            // let song_trans = borrow_global_mut<Transaction>(ADMIN_ADDRESS);

            let user : &mut User = borrow_global_mut(signer::address_of(account));



            assert!(vector::contains (&user.transaction_history , &song_id), ENO_VOTING_POWER);
            //assert 
            // assert!((song_trans.song_id==_song_id),ENO_VOTING_POWER);

    }
      #[view]
      public fun getTotalVotes(proposal_id:u64) : u64 acquires Fullevent{
        let eventTable = borrow_global_mut<Fullevent>(ADMIN_ADDRESS);

        let event = table::borrow_mut(&mut eventTable.events, proposal_id);

        let totalVotes = event.total_votes;

        totalVotes
      }
        #[view]
        public fun getRequiredVotes(proposal_id:u64) : u64 acquires Fullevent{
        let eventTable = borrow_global_mut<Fullevent>(ADMIN_ADDRESS);

        let event = table::borrow_mut(&mut eventTable.events, proposal_id);

        let requiredVotes = event.minimum_votes;

        requiredVotes
        }
/////////////////////////////////////////////END///////////////////////////////////////////////
    // Function to create a new user
    public entry fun create_user(account: &signer) {

        assert!(!exists<User>(signer::address_of(account)), USER_EXISTS);

        let user = User {
            user_address: signer::address_of(account),
            liked_songs: vector::empty<u64>(),
            playlist: vector::empty<u64>(),
            transaction_history: vector::empty<u64>(),
            listening_history: vector::empty<u64>(),
        };
        move_to(account, user);
    }

    // Function to create a new artist
    public entry fun create_artist(account: &signer) {

        assert!(!exists<Artist>(signer::address_of(account)), ARTIST_EXISTS);

        let artist = Artist {
            artist_address: signer::address_of(account),
            liked_songs:vector::empty<u64>(),
            playlist:vector::empty<u64>(),
            transaction_history: vector::empty<u64>(),
            listening_history: vector::empty<u64>(),
            uploaded_songs:vector::empty<u64>(),
            earner_money: 0,
        };
        move_to(account, artist);
    }
    
    public entry fun createGlobalResources(account : &signer){

        assert!(signer::address_of(account) == ADMIN_ADDRESS, ENOT_ADMIN);

        let songs_holder = Songs_Table {
            songs: table::new(),
            song_counter: 0
        };
        let transaction_holder = TransactionTable {
            transactions: table::new(),
            transaction_counter: 0
        };
        let eventTable = Fullevent{
            events: table::new() 
        };

        move_to(account , eventTable);
        move_to(account , transaction_holder);      
        move_to(account , songs_holder);
    }
    


    //Allocate a song resource to the artist
    public entry fun create_resource(account: &signer){

        let playlist_holder = Playlists_Table {
            playlists: table::new(),
            playlist_counter: 0
        };

        
        move_to(account, playlist_holder);
    } 

    // Function to create a new album
    public entry fun create_song(
                                account: &signer,
                                album_id: u64,
                                // song_id: u64,
                                name: String,
                                duration: u64,
                                current_price: u64,
                                date: String,
                                photoLink: String,
                                videoLink:String,
                                genre: String,
                                previewStart:u64,
                                previewEnd:u64
                                ) acquires Songs_Table, Artist {

                                    
        std::debug::print(&std::string::utf8(b"create_song Initialized -------------"));

        let artist_address = signer::address_of(account);
        
        assert!(exists<Artist>(artist_address), E_NOT_INITIALIZED);
        // assert!(exists<Songs_Table>(signer_address),E_NOT_INITIALIZED);

        // gets the Songs Table resource
        assert!(exists<Songs_Table>(ADMIN_ADDRESS), ESHARED_NOT_EXIST);

        let song_table = borrow_global_mut<Songs_Table>(ADMIN_ADDRESS);

        let counter = song_table.song_counter + 1;

        assert!(counter > 0 , SAMPLE_ERROR);

        // creates a new song
        let new_song = Song {
            album_id: album_id,
            song_id: counter,
            artist_address: artist_address,
            name: name,
            duration: duration,
            num_likes: 0,
            current_price: current_price,
            date: date,
            photoLink: photoLink,
            videoLink:videoLink,
            num_streams: 0,
            genre: genre,
            previewStart: previewStart,
            previewEnd : previewEnd
        };

        // adds the new task into the songs table
        table::upsert(&mut song_table.songs, counter, new_song);

        assert!(table::contains(&song_table.songs, counter), SAMPLE_ERROR);

        // assert!(counter > 0 , SAAMPLE_ERROR);
        
        print(&song_table.songs);

        // sets the task counter to be the incremented counter
        song_table.song_counter = counter;

        let  artist_var: &mut Artist = borrow_global_mut(artist_address);

        vector::push_back(&mut artist_var.uploaded_songs, counter);

        // print(&artist_var.uploaded_songs);
    }

    public entry fun create_transaction(
        account: &signer,
        price: u64,
        transaction_id: u64,
        song_id: u64,
        to_address: address,
    ) acquires TransactionTable, Artist, User {
        std::debug::print(&std::string::utf8(b"create_transaction Initialized -------------"));

        let from_address = signer::address_of(account);

        assert!(exists<User>(from_address), USER_NOT_INITIALIZED);
        assert!(exists<Artist>(to_address), E_NOT_INITIALIZED);

        // gets the TransactionTable resource
        assert!(exists<TransactionTable>(ADMIN_ADDRESS), ESHARED_NOT_EXIST);

        let transaction_table = borrow_global_mut<TransactionTable>(ADMIN_ADDRESS);

        let counter = transaction_table.transaction_counter + 1;

        assert!(counter > 0, SAMPLE_ERROR);

        // creates a new transaction
        let new_transaction = Transaction {
            price,
            transaction_id: counter,
            song_id,
            from_address,
            to_address,
        };

        // adds the new transaction into the transactions table
        table::upsert(&mut transaction_table.transactions, counter, new_transaction);

        assert!(table::contains(&transaction_table.transactions, counter), SAMPLE_ERROR);

        print(&transaction_table.transactions);

        // sets the transaction counter to be the incremented counter
        transaction_table.transaction_counter = counter;

        let artist_var: &mut Artist = borrow_global_mut(to_address);
        let user_var: &mut User = borrow_global_mut(from_address);

        vector::push_back(&mut artist_var.transaction_history, transaction_id);
        vector::push_back(&mut user_var.transaction_history, transaction_id);
    }
    
    public entry fun create_playlist(account: &signer, 
                                    playlistName: String,
                                    dateAdded: String)acquires User, Playlists_Table{

        

        std::debug::print(&std::string::utf8(b"ENTERED CREATE PLAYLIST-------------"));
        let user_address =  signer::address_of(account);

        assert!(exists<User>(user_address), USER_NOT_INITIALIZED);
        assert!(exists<Playlists_Table>(user_address), RESOURCE_NOT_INITIALIZED);

        let playlist_table = borrow_global_mut<Playlists_Table>(user_address);

        let counter = playlist_table.playlist_counter + 1;

        let newPlaylist= Playlist {
            playlist_id :counter,
            playlist_name : playlistName, 
            songs : vector::empty<u64>(),
            date_added : dateAdded, 
        };
        

        std::debug::print(&std::string::utf8(b"Playlist created"));
        print(&newPlaylist);

        table::upsert(&mut playlist_table.playlists, counter, newPlaylist);

        let user: &mut User = borrow_global_mut(user_address);

        vector::push_back(&mut user.playlist, counter);

        std::debug::print(&std::string::utf8(b"Playlist added to user"));
        print(&user.playlist);

        playlist_table.playlist_counter = counter;

    } 
   

    public entry fun add_songs_to_playlist(account: &signer,
                                    playlistID: u64,
                                    songIDs: vector<u64>) acquires Playlists_Table{

        std::debug::print(&std::string::utf8(b"ENTERED ADD SONGS TO PLAYLIST-------------"));

        // gets the signer address
        let signer_address = signer::address_of(account);

        assert!(exists<User>(signer_address), 2);

        assert!(exists<Playlists_Table>(signer_address), 3);

        // gets the playlist resource
        let playlist_table = borrow_global_mut<Playlists_Table>(signer_address);


        // gets the playlist matches the playlist_id
        let playlist = table::borrow_mut(&mut playlist_table.playlists, playlistID);


        print(&vector::length(&songIDs));

        // Checking if the song already exists in the playlist
        
        let i = 0;
        while (i < vector::length(&songIDs) ){
            
            let element = *vector::borrow(&songIDs, i);
            
            if(!(vector::contains(&playlist.songs, &element))){
                vector::push_back(&mut playlist.songs, element);
            }
            else{
                std::debug::print(&std::string::utf8(b"Song already exists in playlist"));
            };
            
            i = i + 1;
        };

        std::debug::print(&std::string::utf8(b"Song added to playlist"));
        print(&playlist.songs);
        
    }

    #[view]
    public fun getTransactionHistory(account: &signer) : vector<Transaction> acquires User, TransactionTable {
        std::debug::print(&std::string::utf8(b"Getting Transaction History-------------"));

        assert!(exists<User>(signer::address_of(account)), USER_NOT_INITIALIZED);

        assert!(exists<TransactionTable>(ADMIN_ADDRESS), ESHARED_NOT_EXIST);

        let transaction_table = borrow_global_mut<TransactionTable>(ADMIN_ADDRESS);

        let transaction_history = vector::empty<Transaction>();

        let user: &mut User = borrow_global_mut(signer::address_of(account));

        // let all_transaction = borrow_global_mut<User>(signer::address_of(account)).transaction_history;

        let i = 0;

        while (i < vector::length(&mut user.transaction_history)) {

            let transaction_id = *vector::borrow(&user.transaction_history, i);

            let transaction = *table::borrow_mut(&mut transaction_table.transactions, transaction_id);

            vector::push_back(&mut transaction_history,transaction);

            i = i + 1;
        };

        transaction_history
    }

    #[view]
    public fun retrieveSong(song_to_find: u64) : Song acquires Songs_Table {

        std::debug::print(&std::string::utf8(b"retrieveSong Initialized -------------"));

        let songs_table = borrow_global_mut<Songs_Table>(ADMIN_ADDRESS);

        let song = table::borrow(&songs_table.songs, song_to_find);

        print(&song.album_id);

        let albumID = song.album_id;
        let songID = song.song_id;
        let artistAddress = song.artist_address;
        let name = song.name;
        let duration = song.duration;
        let numLikes = song.num_likes;
        let currentPrice = song.current_price;
        let date = song.date;
        let photoLink = song.photoLink;
        let videoLink = song.videoLink;
        let numStreams = song.num_streams;
        let genre = song.genre;
        let previewStart=song.previewStart;
        let previewEnd=song.previewEnd;

        let new_song = Song {
            album_id: albumID,
            song_id: songID,
            artist_address: artistAddress,
            name: name,
            duration: duration,
            num_likes: numLikes,
            current_price: currentPrice,
            date: date,
            photoLink:photoLink,
            videoLink:videoLink,
            num_streams: numStreams,
            genre: genre,
            previewStart:previewStart,
            previewEnd:previewEnd
        };

        new_song
    }

    #[view]
    public fun retrieveSongs(songs_to_find: vector<u64>) : vector<Song> acquires Songs_Table {

        std::debug::print(&std::string::utf8(b"retrieveSongs Initialized -------------"));

        let songs_table = borrow_global_mut<Songs_Table>(ADMIN_ADDRESS);

        // let _signer_address = signer::address_of(account);

        let songs_found = vector::empty<Song>();

        let i = 0;

        while (i < vector::length(&songs_to_find)) {

            let song_id = *vector::borrow(&songs_to_find, i);

            let song = table::borrow(&songs_table.songs, song_id);

            print(&song.album_id);

            let albumID = song.album_id;
            let songID = song.song_id;
            let artistAddress = song.artist_address;
            let name = song.name;
            let duration = song.duration;
            let numLikes = song.num_likes;
            let currentPrice = song.current_price;
            let date = song.date;
            let photoLink = song.photoLink;
            let videoLink = song.videoLink;
            let numStreams = song.num_streams;
            let genre = song.genre;
            let previewStart=song.previewStart;
            let previewEnd=song.previewEnd;



            
            let new_song = Song {
                album_id: albumID,
                song_id: songID,
                artist_address: artistAddress,
                name: name,
                duration: duration,
                num_likes: numLikes,
                current_price: currentPrice,
                date: date,
                photoLink:photoLink,
                videoLink:videoLink,
                num_streams: numStreams,
                genre: genre,
                previewStart:previewStart,
                previewEnd:previewEnd
            };
            
            vector::push_back(&mut songs_found, new_song);

            i = i + 1;
        };


        songs_found
    }
    
    #[view]  //Function to get songs with likes more than 1000 from the universal song vector
    public fun getTopSongs() : vector<Song> acquires  Songs_Table{

        std::debug::print(&std::string::utf8(b"getTopSongs Initialized -------------"));
        
        // gets the signer address
            // let _signer_address = signer::address_of(account);

        // gets the Songs Table struct resource 
            let song_table = borrow_global_mut<Songs_Table>(ADMIN_ADDRESS);

            std::debug::print(&std::string::utf8(b"Song table"));

            let top_songvector=vector::empty<u64>();

            std::debug::print(&std::string::utf8(b"top-Song vector"));
            print(&top_songvector);

            let i = 1;

            let len=song_table.song_counter;

            print(&len);

            // bool foundSongs=false;

            while (i <= len) {
                //get the song that match with i
                let song_match=table::borrow_mut(&mut song_table.songs,i);

                std::debug::print(&std::string::utf8(b"Song match"));
                
                // accesssing the song likes
                if (song_match.num_likes > 2 ) {
                    vector::push_back(&mut top_songvector,i);

                    std::debug::print(&std::string::utf8(b"Song added to top song vector"));
                };
                
                i = i + 1
            };

            if(vector::length(&top_songvector) == 0){
                let i = 1;


                while (i <= len) {


                    std::debug::print(&std::string::utf8(b"Song match"));
                    
                    // accesssing the song likes
                    if (vector::length(&top_songvector) < 5 ) {
                        vector::push_back(&mut top_songvector,i);
                    };
                    i = i + 1
                };
                
                
            };
               
            // print(&top_songvector);

            profile_addr::Profile::retrieveSongs(top_songvector)

    }

    public entry fun addLike (account: &signer, 
                                song_id: u64) acquires Songs_Table, User {
        std::debug::print(&std::string::utf8(b"like_song Initialized -------------"));

        let user_address = signer::address_of(account);

        assert!(exists<User>(user_address), USER_NOT_INITIALIZED);
        assert!(exists<Songs_Table>(ADMIN_ADDRESS), ESHARED_NOT_EXIST);

        let song_table = borrow_global_mut<Songs_Table>(ADMIN_ADDRESS);

        let song = table::borrow_mut(&mut song_table.songs, song_id);

        song.num_likes = song.num_likes + 1;

        let user: &mut User = borrow_global_mut(user_address);

        if(!vector::contains(&user.liked_songs, &song_id)){
            vector::push_back(&mut user.liked_songs, song_id);
        }

    }

    #[view]


    public fun viewLikedSongs(account: &signer) : vector<Song> acquires User, Songs_Table{

        std::debug::print(&std::string::utf8(b"viewLikedSongs Initialized -------------"));

        let user_address = signer::address_of(account);

        assert!(exists<User>(user_address), USER_NOT_INITIALIZED);

        let user: &mut User = borrow_global_mut(user_address);

        let likedSongs = retrieveSongs(user.liked_songs);

        likedSongs
    }

    //function to get the  randomsongs on basis of streams
    #[view]
    public fun returnLikedSongs(account: address) : vector<u64> acquires User{

        std::debug::print(&std::string::utf8(b"returnLikedSongs Initialized -------------"));

        // let user_address = signer::address_of(account);

        // assert!(exists<User>(user_address), USER_NOT_INITIALIZED);

        // let user: &mut User = borrow_global_mut(user_address);

        let user = borrow_global_mut<User>(account);

        print(&user.liked_songs);

        let returnVector = vector::empty<u64>();

        let i = 0;

        while (i < vector::length(&user.liked_songs)) {

            let song_id = *vector::borrow(&user.liked_songs, i);

            vector::push_back(&mut returnVector, song_id);

            i = i + 1;
        };

        returnVector
    }

    #[view]
   public fun randomsongs():vector<Song> acquires Songs_Table{

        std::debug::print(&std::string::utf8(b"randomsongs Initialized -------------"));

        // gets the signer address
        // let _signer_address = signer::address_of(account);

        // gets the Songs Table resource
        let song_table = borrow_global_mut<Songs_Table>(ADMIN_ADDRESS);
        
        //creating vector of random songs
        let random_songs=vector::empty<u64>();
        
        let  i = 1;
        let len=song_table.song_counter;

        while (i <= len) {
          //get the song that match with i
          let song_match1=table::borrow_mut(&mut song_table.songs,i);
         
         // accesssing the song streams
         if (song_match1.num_streams < 100 && vector::length(&random_songs) < 5) {
            vector::push_back(&mut random_songs,i);
        };
    
            i = i + 1
        };
        //returning the random song vector
        profile_addr::Profile::retrieveSongs(random_songs)
        //print(&random_songs)
   }

    //get recent songs
    #[view]
    public fun recentsongs():vector<Song>  acquires Songs_Table {

        std::debug::print(&std::string::utf8(b"recentsongs Initialized -------------"));

         // gets the signer address
        // let _signer_address = signer::address_of(account);
        // gets the Songs Table resource
        let song_table = borrow_global_mut<Songs_Table>(ADMIN_ADDRESS);
        
        //creating vector of random songs
        let recent_songs=vector::empty<u64>();
        
        
        let len=song_table.song_counter;

        std::debug::print(&std::string::utf8(b"The value of the song counter"));

        print(&song_table.song_counter);

        let i=len;

        while (i>0) {

          let song_match2=table::borrow_mut(&mut song_table.songs,i);

          std::debug::print(&std::string::utf8(b"ID of the matched song"));

          print(&song_match2.song_id);

          //adding song to recent song vector
          vector::push_back(&mut recent_songs,i);

            if(i > 0 ){

                // print(&i);
                i = i - 1;
            }
        };

        //returning the recent song vector

        profile_addr::Profile::retrieveSongs(recent_songs)
    }

   #[view]
    public fun viewLikedSongsMain(account: address) : vector<Song> acquires User, Songs_Table{

        std::debug::print(&std::string::utf8(b"viewLikedSongs Initialized -------------"));

        // let user_address = signer::address_of(account);

        assert!(exists<User>(account), USER_NOT_INITIALIZED);

        let user: &mut User = borrow_global_mut(account);

        let userLikedSongs = user.liked_songs;

        let likedSongs = retrieveSongs(userLikedSongs);

        likedSongs
        }


    // Test flowd6f998afd6f998affe8ab2ded891178a09f4aff7be682a56a03a3fdf1cf8bc655cbfcfc2fe8ab2ded891178a09f4aff7be682a56a03a3fdf1cf8bc655cbfcfc2
    #[test(user1 = @0x123,user2 = @0x124, user3 = @0x125,  admin_addr = @0x948360774544eb680c1214082633a63805bc231bc9cf6e8d2e12cdbc5872d7c0 )]
    public entry fun test_profile_flow(user1: signer, admin_addr: signer, user2: signer, user3: signer) acquires  User, Artist, Songs_Table, Playlists_Table, TransactionTable{
        // Create a user
        create_user(&admin_addr);

        // Make the user an artist

        createGlobalResources(&admin_addr);

        assert!(exists<Songs_Table>(signer::address_of(&admin_addr)), E_NOT_INITIALIZED);
        
        create_user(&user1);
        create_artist(&user1);
        create_resource(&user1);

        create_user(&user2);
        create_resource(&user2);

        create_user(&user3);
        create_resource(&user3);

        create_song(
            &user1,
            1, // album_id
            string::utf8(b"Song name"), // name
            180, // duration
            101, // current_price
            string::utf8(b"20231231"), // date
            string::utf8(b"cid"),
            string::utf8(b"cid"), // cid
            string::utf8(b"Rock"),
            0,
            120 // genre
        );

        create_song(
            &user1,
            1, // album_id
            string::utf8(b"Song name"), // name
            180, // duration
            101, // current_price
            string::utf8(b"20231231"), // date
            string::utf8(b"cid"),
            string::utf8(b"cid"), // cid
            string::utf8(b"Rock"), // genre
            0,
            120// preview_info
        );

        // Check if the song is successfully uploaded
        let artist_var = borrow_global<Artist>(signer::address_of(&user1));
        assert!(vector::length(&artist_var.uploaded_songs) == 2,2);

        // Create a playlist
        create_playlist(
                        &user1, 
                        string::utf8(b"Playlist name 1"), 
                        string::utf8(b"2021-04-01"));

        create_playlist(
                        &user1, 
                        string::utf8(b"Playlist name 2"), 
                        string::utf8(b"2021-04-01"));

        create_playlist(
                        &user1, 
                        string::utf8(b"Playlist name 3"), 
                        string::utf8(b"2021-04-01"));


        // Add songs to playlist
        add_songs_to_playlist(
                            &user1,
                            1, 
                            vector<u64>[1,2]);

        add_songs_to_playlist(
                            &user1,
                            1, 
                            vector<u64>[1,2,3,4]);


        // Retrieve songs
        let topsongs = getTopSongs();
        print(&topsongs);

        let randoms = randomsongs();
        print(&randoms);

        let recently_added_songs = recentsongs();
        print(&recently_added_songs);

        let songs_to_find = vector<u64>[1,2];
        let songs_found = retrieveSong(1);
        let songs_found2 = retrieveSongs(songs_to_find);
        print(&songs_found);
        print(&songs_found2);

        // Create a transaction
        create_transaction(
            &user2,
            100, // price
            1, // transaction_id
            1, // song_id
            signer::address_of(&user1), // to_address
        );

        create_transaction(
            &user2,
            100, // price
            2, // transaction_id
            2, // song_id
            signer::address_of(&user1), // to_address
        );

        let th = getTransactionHistory(&user2);

        print(&th);

        // Add like to a song
        addLike(&user2, 1);

        // Add like to a song
        addLike(&user2, 2);

        let song = retrieveSong(1);

        print(&song.num_likes);

        let song2 = retrieveSong(2);

        print(&song2.num_likes);

        let artist = borrow_global<Artist>(signer::address_of(&user1));

        std::debug::print(&std::string::utf8(b"Artist's Transaction History-------------"));
        print(&artist.transaction_history);

        std::debug::print(&std::string::utf8(b"Artist's Uploaded Songs-------------"));
        print(&artist.uploaded_songs);

        std::debug::print(&std::string::utf8(b"Artist's Liked Songs-------------"));
        print(&artist.earner_money);

        let user = borrow_global<User>(signer::address_of(&user2));

        std::debug::print(&std::string::utf8(b"User's Transaction History-------------"));
        print(&user.transaction_history);

        std::debug::print(&std::string::utf8(b"User's Liked Songs-------------"));
        print(&user.liked_songs);

        std::debug::print(&std::string::utf8(b"User's Playlist-------------"));
        print(&user.listening_history);

        std::debug::print(&std::string::utf8(b"Deleting Song-------------"));

        delete_song(1);

    }


    ////VOTING TEST///////////////////////////////////
    
//     #[test(user1 = @0x123, user2 = @0x124, user3 = @0x125, admin_addr = @0x979d4265f6807742b5351f80fc5a0b360a9cb18f8cefe2b3c58fec3f9b6a7ba0)]
//     public entry fun test_voting_flow(user1: signer, admin_addr: signer, user2: signer, user3: signer) acquires VoteEvent, Fullevent {
//         // Create an event table
//         assert!(exists<Fullevent>(signer::address_of(&admin_addr)), ETABLE_EXIST);

//         // Create a vote event
//         create_event(&admin_addr, signer::address_of(&user1), 100, 50, 1, string::utf8(b"Test event"));
//         let eventTable = borrow_global<Fullevent>(signer::address_of(&admin_addr));
//         assert!(exists<VoteEvent>(&mut eventTable.events, 1), EEVENT_EXIST);

//         // Vote on the event
//         voting(&user1, 1);
//         let event = table::borrow(&eventTable.events, 1);
//         assert!(event.total_votes == 1, EINSUFFICIENT_VOTES);

//         // Check the event
//         checkevent(signer::address_of(&admin_addr), 1);
//         assert!(exists<VoteEvent>(&mut eventTable.events, 1), EINSUFFICIENT_VOTES);
// }   
}