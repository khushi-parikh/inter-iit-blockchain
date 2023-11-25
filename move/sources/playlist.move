module profile_addr::Playlist{

    // use profile_addr::Profile::{
    //     Song,
    //     User,
    //     Playlist,
    //     Artist
    // };
    
    // // use aptos_std::randomness;
    // use aptos_framework::event;
    // use std::string::String;
    // // use aptos_std::table::Table;
    // use std::signer;
    // use aptos_std::table::{Self, Table}; 
    // use aptos_framework::account;
    // use std::vector;
    // use std::debug::print;

    // // Error codes
    // const E_NOT_INITIALIZED: u64 = 1;
    // const E_PLAYLIST_NOT_FOUND: u8 = 2;
    // const E_NOT_OWNER: u8 = 3;
    // const E_USER_NOT_FOUND: u8 = 4;
    // const E_SONG_ALREADY_IN_PLAYLIST: u8 = 45;

    // public entry fun create_playlist(account: &signer, 
    //                                 _playlistID: u64, 
    //                                 _playlistName: String,
    //                                 _dateAdded: String)acquires User{

    //     let user_address =  signer::address_of(account);

    //     assert!(exists<User>(user_address), E_NOT_INITIALIZED);

    //     let _songs = vector::empty<u64>();

    //     let newPlaylist= Playlist {
    //                             playlist_id :_playlistID,
    //                             playlist_name : _playlistName, 
    //                             songs : vector::empty<u64>(),
    //                             date_added : _dateAdded, 
    //                         };

    //     move_to(account, newPlaylist);

    //     let user: &mut User = borrow_global_mut(user_address);

    //     vector::push_back(&mut user.playlist, _playlistID);
    // } 

    // public fun add_songs_to_playlist(account: &signer,
    //                                 _playlistID: u64,
    //                                 _songIDs: vector<u64>) acquires Playlist, User {

    //     let playlist = &mut Playlist{playlist_id: _playlistID};

    //     let playlist_address = address_of<Playlist>(playlist);

    //     let user_address = signer::address_of(account);

    //     // Check if the user exists
    //     assert!(exists<User>(user_address), E_USER_NOT_FOUND);

    //     // Check if the playlist exists
    //     assert!(exists<Playlist>(_playlistID), E_PLAYLIST_NOT_FOUND);

    //     // let playlist: &mut Playlist = borrow_global_mut(_playlistID);

    //     let songs_in_playlist = &mut playlist.songs;

    //     // //Checking if the song already exists in the playlist
    //     // let i = 0;
    //     // while (i < vector::length(&_songIDs) ){

    //     //     let element = vector::at(&_songIDs, i);

    //     //     assert!(vector::contains(&playlist.songs, element) , E_SONG_ALREADY_IN_PLAYLIST);
            
    //     //     i = i + 1;
    //     // };


    //     // vector::extend(&mut playlist.songs, _songIDs);
    // }

    // #[test(admin = @0x123)]
    //     public entry fun test_profile_flow(admin: signer) acquires  Artist, Song {
    //         // Create a user
    //         create_user(&admin);
    
    //         // Make the user an artist
    //         create_artist(&admin);
    
    
    //         create_song(
    //             1, // album_id
    //             1, // song_id
    //             &admin,
    //             string::utf8(b"Song name"), // name
    //             180, // duration
    //             101, // current_price
    //             20231231, // date
    //             string::utf8(b"cid"), // cid
    //             string::utf8(b"Rock"), // genre
    //             vector<u64>[0, 120] , // preview_info
    //         );
    
    //         // Check if the song is successfully uploaded
    //         let artist_var = borrow_global<Artist>(signer::address_of(&admin));
    //         assert!(vector::length(&artist_var.uploaded_songs) == 1,1);
    
    
    //         // Retrieve the uploaded song
    //         let song = borrow_global<Song>(signer::address_of(&admin));
    //         assert!(song.album_id == 1, 2);
    //         assert!(song.song_id == 1, 3);
    //         assert!(song.artist_address == signer::address_of(&admin), 4);
    //         assert!(song.name == string::utf8(b"Song name"), 5);
    //         assert!(song.duration == 180, 6);
    //         assert!(song.current_price == 101, 7);
    //         assert!(song.date == 20231231, 8);
    //         assert!(song.cid == string::utf8(b"cid"), 9);
    //         assert!(song.num_streams == 0, 10);
    //         assert!(song.genre == string::utf8(b"Rock"), 11);
    //         assert!(song.preview_info == vector<u64>[0,120], 12);



    //         create_playlist(1, 
    //                         string::utf8(b"Playlist's Name"), 
    //                         string::utf8(b"Date Playlist was created"));


                

    //         let songs = vector<u64>[1];


    //         add_song_to_playlist(&admin, 
    //                                 1 ,
    //                                 songs);
    //     }
    
}







