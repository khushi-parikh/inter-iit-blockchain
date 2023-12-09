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
        date: u64, // ? How is date stored
        cid: String, //removed file
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

    const PROFILE_ADDRESS: address = @0x4c4865348f30d4f8c9e1e21d37f8ee7fd8eb4ac3c25e67b39ef230db03a6d254;

    const ADMIN_ADDRESS: address = @0x979d4265f6807742b5351f80fc5a0b360a9cb18f8cefe2b3c58fec3f9b6a7ba0;

    
    public entry fun transfer(from: &signer, to: address, amount: u64){
        // 
        transfer_coins<AptosCoin>(from, to, amount);
    }
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
                                song_id: u64,
                                name: String,
                                duration: u64,
                                current_price: u64,
                                date: u64,
                                cid: String,
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
            album_id,
            song_id,
            artist_address,
            name,
            duration,
            num_likes: 0,
            current_price,
            date,
            cid,
            num_streams: 0,
            genre,
            previewStart,
            previewEnd
        };

        // adds the new task into the songs table
        table::upsert(&mut song_table.songs, song_id, new_song);

        assert!(table::contains(&song_table.songs, song_id), SAMPLE_ERROR);

        // assert!(counter > 0 , SAAMPLE_ERROR);
        
        print(&song_table.songs);

        // sets the task counter to be the incremented counter
        song_table.song_counter = counter;

        let  artist_var: &mut Artist = borrow_global_mut(artist_address);

        vector::push_back(&mut artist_var.uploaded_songs, song_id);

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

        assert!(exists<User>(from_address), E_NOT_INITIALIZED);
        assert!(exists<Artist>(to_address), E_NOT_INITIALIZED);

        // gets the TransactionTable resource
        assert!(exists<TransactionTable>(ADMIN_ADDRESS), ESHARED_NOT_EXIST);

        let transaction_table = borrow_global_mut<TransactionTable>(ADMIN_ADDRESS);

        let counter = transaction_table.transaction_counter + 1;

        assert!(counter > 0, SAMPLE_ERROR);

        // creates a new transaction
        let new_transaction = Transaction {
            price,
            transaction_id,
            song_id,
            from_address,
            to_address,
        };

        // adds the new transaction into the transactions table
        table::upsert(&mut transaction_table.transactions, transaction_id, new_transaction);

        assert!(table::contains(&transaction_table.transactions, transaction_id), SAMPLE_ERROR);

        print(&transaction_table.transactions);

        // sets the transaction counter to be the incremented counter
        transaction_table.transaction_counter = counter;

        let artist_var: &mut Artist = borrow_global_mut(to_address);
        let user_var: &mut User = borrow_global_mut(from_address);

        vector::push_back(&mut artist_var.transaction_history, transaction_id);
        vector::push_back(&mut user_var.transaction_history, transaction_id);
    }
    
    public entry fun create_playlist(account: &signer, 
                                    playlistID: u64, 
                                    playlistName: String,
                                    dateAdded: String)acquires User, Playlists_Table{

        

        std::debug::print(&std::string::utf8(b"ENTERED CREATE PLAYLIST-------------"));
        let user_address =  signer::address_of(account);

        assert!(exists<User>(user_address), USER_NOT_INITIALIZED);
        assert!(exists<Playlists_Table>(user_address), RESOURCE_NOT_INITIALIZED);

        let playlist_table = borrow_global_mut<Playlists_Table>(user_address);

        let counter = playlist_table.playlist_counter + 1;

        let newPlaylist= Playlist {
            playlist_id :playlistID,
            playlist_name : playlistName, 
            songs : vector::empty<u64>(),
            date_added : dateAdded, 
        };
        

        std::debug::print(&std::string::utf8(b"Playlist created"));
        print(&newPlaylist);

        table::upsert(&mut playlist_table.playlists, playlistID, newPlaylist);

        let user: &mut User = borrow_global_mut(user_address);

        vector::push_back(&mut user.playlist, playlistID);

        std::debug::print(&std::string::utf8(b"Playlist added to user"));
        print(&user.playlist);

        playlist_table.playlist_counter = counter;

    } 
   

    public entry fun add_songs_to_playlist(account: &signer,
                                    playlistID: u64,
                                    songIDs: vector<u64>) acquires Playlists_Table{

        // gets the signer address
        let signer_address = signer::address_of(account);

        assert!(exists<User>(signer_address), 2);

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
            let cid = song.cid;
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
                cid: cid,
                num_streams: numStreams,
                genre: genre,
                previewStart:previewStart,
                previewEnd:previewEnd
            };

        new_song
    }

    #[view]
    public fun retrieveSongs(songs_to_find: vector<u64>) : vector<Song> acquires Songs_Table {

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
            let cid = song.cid;
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
                cid: cid,
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
    
        //Function to get songs with likes more than 1000 from the universal song vector
    public fun getTopSongs() acquires  Songs_Table{
        
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

            while (i <= len) {
                //get the song that match with i
                let song_match=table::borrow_mut(&mut song_table.songs,i);

                std::debug::print(&std::string::utf8(b"Song match"));
                
                // accesssing the song likes
                if (song_match.num_likes > 1000) {
                    vector::push_back(&mut top_songvector,i);

                    std::debug::print(&std::string::utf8(b"Song added to top song vector"));
                };
                
                i = i + 1
            };

            print(&top_songvector);


    

    }


    //function to get the  randomsongs on basis of streams
    #[view]
   public fun randomsongs():vector<u64> acquires Songs_Table{

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
         if (song_match1.num_streams < 100) {
            vector::push_back(&mut random_songs,i);
        };
    
            i = i + 1
        };
        //returning the random song vector
        random_songs
        //print(&random_songs)
   }

    //get recent songs
    #[view]
    public fun recentsongs():vector<u64>  acquires Songs_Table {

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


          //assert statement so that song not found
         // assert!(exists<Songs_Table>(signer_address), E_NOT_INITIALIZED);

          //get the song that match with i
          
            // assert!(exists<Songs_Table>(table::borrow_mut(&mut song_table.songs,i)), E_NOT_INITIALIZED);
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
        recent_songs
    }



    // Test flowd6f998afd6f998affe8ab2ded891178a09f4aff7be682a56a03a3fdf1cf8bc655cbfcfc2fe8ab2ded891178a09f4aff7be682a56a03a3fdf1cf8bc655cbfcfc2
    #[test(user1 = @0x123,user2 = @0x124, user3 = @0x125,  admin_addr = @0x979d4265f6807742b5351f80fc5a0b360a9cb18f8cefe2b3c58fec3f9b6a7ba0 )]
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
            1, // song_id
            string::utf8(b"Song name"), // name
            180, // duration
            101, // current_price
            20231231, // date
            string::utf8(b"cid"), // cid
            string::utf8(b"Rock"),
            0,
            120 // genre
        );

        create_song(
            &user1,
            1, // album_id
            2, // song_id
            string::utf8(b"Song name"), // name
            180, // duration
            101, // current_price
            20231231, // date
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
                        1, 
                        string::utf8(b"Playlist name 1"), 
                        string::utf8(b"2021-04-01"));

        create_playlist(
                        &user1, 
                        2, 
                        string::utf8(b"Playlist name 2"), 
                        string::utf8(b"2021-04-01"));

        create_playlist(
                        &user1, 
                        3, 
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
        getTopSongs();
        randomsongs();
        recentsongs();
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

    }
}