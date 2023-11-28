module account_address:: audio {

    // Errors
    const E_NOT_INITIALIZED: u64 = 1;
    const ETASK_DOESNT_EXIST: u64 = 2;
    const ETASK_IS_COMPLETED: u64 = 3;
   
    //use 0x1::Vector;
   // use aptos_account::transfer;
    use std::signer;
    use std::vector;
    use std::string::String;
    use std::string;
    // use 0x1::coin;
    //use 0x1::aptos_coin::AptosCoin;
   // use 0x1::BasicCoin;
   // use 0x1::std;
   

    //use coin::transfer;

    //using another module
    
    /*
    use audio::Profile{
    
        Song,
        User,
        Transaction,
        PlaylistEntry,
        Artist
    };
    */
    
    //creating struct
    struct Song has copy,drop{
       
        albumid:u64,
        songid:u64,
        cid: address,//from the function it will get the key,
        artist_name: String,
        duration: u64,
        owner: address,
        total_likes: u64,
        song_name: String,
        current_price:u64,
        dateof_release:u64,
        no_of_streams:u64,
        genre:String,
        preview_info:bool

    }
    

    //struct store in vector
    
   
    

    
    // Function to add a new song to the vector
    public fun addSong(_album_id:u64,
                        _song_id:u64,
                        _cid:address,
                        _artist_name:String,
                        _duration:u64,
                        _owner:address,
                        _song_name:String,
                        _current_price:u64,
                        _date:u64,
                        _genre:String,
                        _preview_info:bool,
                        _dateof_release:u64) {
    // Define a vector to store instances of the Song struct
    let songvector = vector::empty<Song>();

    let new_song = Song {   albumid:_album_id,
                            songid:_song_id,
                            cid:_cid,
                            total_likes:0,
                            no_of_streams:0,
                            artist_name:_artist_name,
                            duration:_duration,
                            owner:_owner,
                            song_name:_song_name,
                            current_price:_current_price,
                            dateof_release:_dateof_release,
                            preview_info:false,
                            genre:_genre };

        //setting no of view =0,no of likes =0,
        //new_song.total_likes=0;
        //new_song.num_of_streams=0;

        //as some fields are mutable
        vector::push_back(&mut songvector,new_song);

        //return vector of new song added
        

    }


    //Function to get songs with likes more than 1000
    public fun getTopSongs(songvector:vector<Song>): vector<Song>  {
         let songvector = vector::empty<Song>();
    //creating vector coataining top songs
        let top_songvector=vector::empty<Song>();
    
        let  i = 0;
        let len=vector::length(&songvector);
        while (i < len) {
            let element = *vector::borrow(&songvector, i);
            // Do something with the element
            if (element.total_likes > 1000) {
            vector::push_back(&mut top_songvector,element)
            };
            
            i = i + 1
        };
     top_songvector

    }

    //randomsongs on basis of streams
   public fun randomsongs(songvector:vector<Song>):vector<Song> {
    let random_songs=vector::empty<Song>();

    //for song in Songvector {
        let i = 0;
        let length:u64=vector::length(&songvector);
        while (i < length) {
            let element = *vector::borrow(&songvector, i);
            // Do something with the element
            if (element.no_of_streams < 100) {
            vector::push_back(&mut random_songs,element)
            };
            
            i = i + 1;
        };

    random_songs
   }


 // Vector::push_back(&mut recent_songs,song)

    //recently added songs
    public fun recentsongs(songvector:vector<Song>):vector<Song>{
        let recent_songs=vector::empty<Song>();
        let i = vector::length(&songvector);
        while (i >= vector::length(&songvector)-5 ){
            let element = *vector::borrow(&songvector, i);
            //add that element in to the vector
            
            vector::push_back(&mut recent_songs,element);
            
            i = i - 1;
        };

    recent_songs

    }
/*
   //Function to send the transactions
    public entry fun transfer_coins<AptosCoin>(from: &signer, to: address, amount: u64) acquires DirectTransferConfig {
        //check this line
        to=Song.owner;
        deposit_coins(to, coin::withdraw<CoinType>(from, amount));
    }
*/

   

    // Transfers `amount` of tokens from `from` to `to`.
     // Address of the owner of this module
     /*
    public fun transaction(addr:address){
            let module_owner: address = @account_address;
            //const recipient_address:address=new_song.owner;
            transfer(module_owner, addr, 100);

    }
    */

    /*
    //Using basic coin module
    struct Coin has store {
        value: u64
    }

    // Struct representing the balance of  address.
    struct Balance has key {
        coin: Coin
    }
  
    public fun transfer(from: &signer, to: address, amount: u64) acquires Balance {
        let check = withdraw(signer::address_of(from), amount);
        deposit(to, check);
    }
    */
    /*

    #[test(admin = @0x123)]
    
    public fun test_addSong() {
        // Define test parameters
        addSong(
            1, // album_id
            1, // song_id
            0x1,
            0,//total likes
            0,//number of streams
            string::utf8(b"artist name"), // name
            90, // duration
            &admin,//owner
            string::utf8(b"song name"), // name
            100, // current_price
            20231231, // date
            false, // genre
            string::utf8(b"rock"), // preview_info
        );

        

        // Check if the song is added correctly to the vector
       // assert!(vector::length(&song_vector) == 1,1);

      
    
        // Check if the song details match the expected values
        assert!(added_song.albumid == album_id, 2, "Album ID mismatch");
        assert!(added_song.songid == song_id, 3, "Song ID mismatch");
        assert!(added_song.cid == cid, 4, "CID mismatch");
        assert!(
            added_song.artist_name == artist_name,
            5,
            "Artist name mismatch"
        );
        assert!(added_song.duration == duration, 6, "Duration mismatch");
        assert!(added_song.owner == owner, 7, "Owner mismatch");
        assert!(added_song.song_name == song_name, 8, "Song name mismatch");
        assert!(
            added_song.current_price == current_price,
            9,
            "Current price mismatch"
        );
        assert!(added_song.dateof_release == date_of_release, 10, "Date mismatch");
        assert!(added_song.genre == genre, 11, "Genre mismatch");
        assert!(
            added_song.preview_info == preview_info,
            12,
            "Preview info mismatch"
        );
    
    }
    */

   
}






