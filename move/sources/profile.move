// Import necessary Move modules and libraries
module profile_addr::Profile {
    // use aptos_framework::account;
    use std::signer;
    use std::vector;
    use std::string::String;
     #[test_only]
    use std::string;
    use aptos_std::table::{Self, Table};
    use std::debug::print;
    // use aptos_framework::event;
    // use aptos_std::table::Table;    
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
        preview_info: vector<u64>, //startTime, endTime
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
        // playlist: vector<PlaylistEntry>,
        playlist : vector<u64>,
        transaction_history: vector<u64>,
        listening_history: vector<u64>,
    }

    // Struct to represent a transaction
    struct Transaction {
        price: u64,
        transaction_id: u64,
        timestamp: u64,
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
    const E_NOT_INITIALIZED: u64 = 1;

    // Function to create a new user
    public fun create_user(account: &signer) {
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
    public fun create_artist(account: &signer) {
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

    //Allocate a song resource to the artist
    public entry fun create_song_resource(account: &signer){
        let songs_holder = Songs_Table {
            songs: table::new(),
            song_counter: 0
        };

        let playlist_holder = Playlists_Table {
            playlists: table::new(),
            playlist_counter: 0
        };
        // move the TSongs Table resource under the signer account
        move_to(account, songs_holder);
        move_to(account, playlist_holder);
    } 

    // Function to create a new album
    public entry fun create_song(
                                album_id: u64,
                                song_id: u64,
                                account: &signer,
                                name: String,
                                duration: u64,
                                current_price: u64,
                                date: u64,
                                cid: String,
                                genre: String,
                                preview_info: vector<u64>,) acquires Songs_Table, Artist {
        // gets the signer address
        let signer_address = signer::address_of(account);
        let artist_address = signer::address_of(account);

        // * assert that the signer has created a list
        assert!(exists<Songs_Table>(signer_address),E_NOT_INITIALIZED);

        // gets the Songs Table resource
        let song_table = borrow_global_mut<Songs_Table>(signer_address);
        // ? increment song counter... Why are we maintaining a song counter
        let counter = song_table.song_counter + 1;

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
            preview_info,
        };

        // adds the new task into the songs table
        table::upsert(&mut song_table.songs, counter, new_song);
        // sets the task counter to be the incremented counter
        song_table.song_counter = counter;

        let  artist_var: &mut Artist = borrow_global_mut(artist_address);

        vector::push_back(&mut artist_var.uploaded_songs, song_id);
    }

    public entry fun create_playlist(account: &signer, 
                                    _playlistID: u64, 
                                    _playlistName: String,
                                    _dateAdded: String)acquires User, Playlists_Table{

        

        let user_address =  signer::address_of(account);

        assert!(exists<User>(user_address), E_NOT_INITIALIZED);
        assert!(exists<Playlists_Table>(user_address), E_NOT_INITIALIZED);

        let playlist_table = borrow_global_mut<Playlists_Table>(user_address);

        let counter = playlist_table.playlist_counter + 1;
        
        let _songs = vector::empty<u64>();

        let newPlaylist= Playlist {
            playlist_id :_playlistID,
            playlist_name : _playlistName, 
            songs : vector::empty<u64>(),
            date_added : _dateAdded, 
        };
        

        print(&newPlaylist);

        table::upsert(&mut playlist_table.playlists, counter, newPlaylist);

        let user: &mut User = borrow_global_mut(user_address);

        vector::push_back(&mut user.playlist, _playlistID);

        print(&user.playlist);

    } 

    public fun add_songs_to_playlist(account: &signer,
                                    _playlistID: u64,
                                    _songIDs: vector<u64>) acquires Playlists_Table{

        // let playlist = &mut Playlist{playlist_id: _playlistID};

        // let playlist_address = address_of<Playlist>(signer::address_of(account));

        // gets the signer address
        let signer_address = signer::address_of(account);

        // gets the playlist resource
        let playlist_table = borrow_global_mut<Playlists_Table>(signer_address);

        // gets the playlist matches the task_id
        let playlist = table::borrow_mut(&mut playlist_table.playlists, _playlistID);

        // let playlist = borrow_global_mut<Playlist>(signer::address_of(account));

        // let user_address = signer::address_of(account);


        // Check if the user exists
        assert!(exists<User>(signer_address), 2);

        //Checking if the song already exists in the playlist
        let i = 0;
        while (i < vector::length(&_songIDs) ){

            let element = *vector::borrow(&_songIDs, i);

            // print(&playlist.songs);
            // print(&(vector::contains(&playlist.songs, &element)));

            if(!(vector::contains(&playlist.songs, &element))){
                vector::push_back(&mut playlist.songs, element);
            }
            else{
                abort 45
            };

            i = i + 1;
        };

        print(&playlist.songs);

    }

    // Test flow
    #[test(admin = @0x123)]
    public entry fun test_profile_flow(admin: signer) acquires  User, Artist, Songs_Table, Playlists_Table{
        // Create a user
        create_user(&admin);

        // Make the user an artist
        create_artist(&admin);

        create_song_resource(&admin);

        create_song(
            1, // album_id
            1, // song_id
            &admin,
            string::utf8(b"Song name"), // name
            180, // duration
            101, // current_price
            20231231, // date
            string::utf8(b"cid"), // cid
            string::utf8(b"Rock"), // genre
            vector<u64>[0, 120] , // preview_info
        );

        create_song(
            1, // album_id
            2, // song_id
            &admin,
            string::utf8(b"Song name"), // name
            180, // duration
            101, // current_price
            20231231, // date
            string::utf8(b"cid"), // cid
            string::utf8(b"Rock"), // genre
            vector<u64>[0, 120] , // preview_info
        );

        // Check if the song is successfully uploaded
        let artist_var = borrow_global<Artist>(signer::address_of(&admin));
        assert!(vector::length(&artist_var.uploaded_songs) == 2,2);

        // Create a playlist
        create_playlist(
                        &admin, 
                        1, 
                        string::utf8(b"Playlist name"), 
                        string::utf8(b"2021-04-01"));
        create_playlist(
                        &admin, 
                        2, 
                        string::utf8(b"Playlist name 1"), 
                        string::utf8(b"2021-04-01"));
        create_playlist(
                        &admin, 
                        3, 
                        string::utf8(b"Playlist name 2"), 
                        string::utf8(b"2021-04-01"));


        // Add songs to playlist
        add_songs_to_playlist(
                            &admin,
                            1, 
                            vector<u64>[1,2]);
        add_songs_to_playlist(
                            &admin, 
                            2, 
                            vector<u64>[1,2]);

        add_songs_to_playlist(
                            &admin, 
                            3, 
                            vector<u64>[1,2]);
        

        // Retrieve the uploaded song
        // let song = borrow_global<Song>(signer::address_of(&admin));
        // assert!(song.album_id == 1, 2);
        // assert!(song.song_id == 1, 3);
        // assert!(song.artist_address == signer::address_of(&admin), 4);
        // assert!(song.name == string::utf8(b"Song name"), 5);
        // assert!(song.duration == 180, 6);
        // assert!(song.current_price == 101, 7);
        // assert!(song.date == 20231231, 8);
        // assert!(song.cid == string::utf8(b"cid"), 9);
        // assert!(song.num_streams == 0, 10);
        // assert!(song.genre == string::utf8(b"Rock"), 11);
        // assert!(song.preview_info == vector<u64>[0,120], 12);
    }
}