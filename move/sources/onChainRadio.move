module onChainRadio_addr::onChainRadio{

    // use aptos_std::randomness;
    use aptos_framework::event;
    use std::string::String;
    // use aptos_std::table::Table;
    use std::signer;
    use aptos_std::table::{Self, Table}; 
    use aptos_framework::account;

        struct User has key{
        userAddress: address,
        likedSongs: Table<u64, Song>,
        // likedSongs: vector<u64>
        playlists: Table<u64, Playlist>,
        transactionHistory: Table<u64, Transaction>,
        songHistory: Table<u64, Song>,
    }

    // ? is this the correct notation for price
    // ? Artist Address to be stored here..?

    struct Song has key, store, drop{
        songID: u64,
        songName: String,
        albumID: u64,
        file : String,
        artistID: u64,
        duration: u64, //this is in seconds
        previewDuration: u64, //this is in seconds
        likes: u64,
        currentPrice : u64,
        dateAdded: String,
        CID: String,
        streams: u64,
        genre: String
    }

    struct Album has key{    
        albumID: u64,
        albumName: String,
        artistID: u64,
        despription: String,
        dateAdded: String,
        CID: String,
        albumCover : String,
        songs: Table<u64, Song>
    }

    struct Playlist has key{
        playlistID: u64,
        playlistName: String,
        songs: Table<u64, Song>,
        dateAdded: String,
        addSong: event::EventHandle<Song>,
    }

    struct Artist has key{
        userAddress: address,
        likedSongs: Table<u64, Song>,
        // likedSongs: vector<u64>
        playlists: Table<u64, Playlist>,
        transactionHistory: Table<u64, Transaction>,
        songHistory: Table<u64, Song>,
        uploadedSongs: Table<u64, Song>,
        earnedMoney : u64
    }

    struct Transaction has key{
        transactionID: u64,
        songID: u64,
        userAddress: address,
        artistAddress: address,
        timestamp: String,
        amount: u64,
    }

    public entry fun createPlaylist(account: &signer, 
                                    _playlistID: u64, 
                                    _playlistName: String,
                                    _dateAdded: String){
        let newPlaylist= Playlist {
            playlistID : _playlistID,
            playlistName : _playlistName,
            songs: table::new(),
            addSong: account::new_event_handle<Song>(account),
            dateAdded : _dateAdded
        };

        move_to(account, newPlaylist);
    } 

    public fun addSongToPlaylist(_playlistID: u64, 
                                _song: Song) {
        let playlist = borrow_global_mut<Playlist>(_playlistID);

        \
        table::insert(&mut playlist.songs, song.songID, song);

        
        event::emit_event<Song>(&mut playlist.addSong, song);
    }
    
}





