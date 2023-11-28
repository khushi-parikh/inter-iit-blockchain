// Import necessary Move modules and libraries
module profile_addr::Profile {
    // use aptos_framework::account;
    use std::signer;
    use std::vector;
    use std::string::String;
     #[test_only]
    use std::string;
    use std::debug::print;


    // Struct to represent a song
    struct Song has key {
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

    struct Playlist has key{
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
    // const E_PLAYLIST_NOT_FOUND: u8 = 2;
    // const E_NOT_OWNER: u8 = 3;
    // const E_USER_NOT_FOUND: u8 = 4;
    const E_SONG_ALREADY_IN_PLAYLIST: u8 = 45;

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

    // Function to create a new song
    public fun create_song(
        album_id: u64,
        song_id: u64,
        account: &signer,
        name: String,
        duration: u64,
        current_price: u64,
        date: u64,
        cid: String,
        genre: String,
        preview_info: vector<u64>,
    ) acquires Artist{
        // Get the artist's address
        let artist_address = signer::address_of(account);

        // Ensure the artist has been created (you might want additional checks here)
        assert!(exists<Artist>(artist_address), E_NOT_INITIALIZED);

        // Create a new Song
        let song = Song {
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
        let song_id_copy = song.song_id;
        // Move the Song resource under the artist's account
        move_to(account, song);

        // Add the song to the artist's uploaded_songs
        let  artist_var: &mut Artist = borrow_global_mut(artist_address);

        vector::push_back(&mut artist_var.uploaded_songs, song_id_copy);

    }

    public entry fun create_playlist(account: &signer, 
                                    _playlistID: u64, 
                                    _playlistName: String,
                                    _dateAdded: String)acquires User{

        let user_address =  signer::address_of(account);

        assert!(exists<User>(user_address), E_NOT_INITIALIZED);

        let _songs = vector::empty<u64>();

        let newPlaylist= Playlist {
                                playlist_id :_playlistID,
                                playlist_name : _playlistName, 
                                songs : vector::empty<u64>(),
                                date_added : _dateAdded, 
                            };

        print(&newPlaylist);
        
        move_to(account, newPlaylist);

        let user: &mut User = borrow_global_mut(user_address);

        vector::push_back(&mut user.playlist, _playlistID);
        
        print(&user.playlist);
    } 

    public fun add_songs_to_playlist(account: &signer,
                                    _playlistID: u64,
                                    _songIDs: vector<u64>) acquires Playlist{

        // let playlist = &mut Playlist{playlist_id: _playlistID};

        // let playlist_address = address_of<Playlist>(signer::address_of(account));

        let playlist = borrow_global_mut<Playlist>(signer::address_of(account));

        let user_address = signer::address_of(account);


        // Check if the user exists
        assert!(exists<User>(user_address), 2);

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
    public entry fun test_profile_flow(admin: signer) acquires  Artist, Song , User, Playlist{
        // Create a user
        create_user(&admin);

        // Make the user an artist
        create_artist(&admin);


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

        // Check if the song is successfully uploaded
        let artist_var = borrow_global<Artist>(signer::address_of(&admin));
        assert!(vector::length(&artist_var.uploaded_songs) == 1,1);

        // Retrieve the uploaded song
        let song = borrow_global<Song>(signer::address_of(&admin));
        assert!(song.album_id == 1, 2);
        assert!(song.song_id == 1, 3);
        assert!(song.artist_address == signer::address_of(&admin), 4);
        assert!(song.name == string::utf8(b"Song name"), 5);
        assert!(song.duration == 180, 6);
        assert!(song.current_price == 101, 7);
        assert!(song.date == 20231231, 8);
        assert!(song.cid == string::utf8(b"cid"), 9);
        assert!(song.num_streams == 0, 10);
        assert!(song.genre == string::utf8(b"Rock"), 11);
        assert!(song.preview_info == vector<u64>[0,120], 12);

        create_playlist(&admin,
                        1,
                        string::utf8(b"Playlist's Name"),
                        string::utf8(b"Date Created")
                        );

        let playlist = borrow_global<Playlist>(signer::address_of(&admin));

        // print(playlist);

        assert!(playlist.playlist_id == 1, 2);
        assert!(playlist.playlist_name == string::utf8(b"Playlist's Name"), 3);
        assert!(playlist.songs == vector::empty<u64>(), 4);
        assert!(playlist.date_added == string::utf8(b"Date Created"), 5);


        add_songs_to_playlist(&admin,
                                1,
                                vector<u64>[1,2,3,4,5,6,7,8,9,10]);

        // let playlist = borrow_global<Playlist>(signer::address_of(&admin));

        // print(playlist);

    }
}
