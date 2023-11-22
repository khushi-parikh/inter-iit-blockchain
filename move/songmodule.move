module < account-address>:: audio {
   
    use 0x1::std;
    use 0x1::string;
    use 0x1::account;
    use 0x1::aptos_coin;
    use 0x1::coin;
    use 0x1::create_signer;
    use 0x1::error;
    use 0x1::event;
    use 0x1::signer;
    use std::vector;

    //creating struct
    struct Song {
        albumid:u64;
        songid:u64;
        cid: //from the function it will get the key,
        artist_name: string,
        duration: u64,
        owner: address,
        total_likes: u64,
        song_name: string,
        current_price:u64;
        dateof_release:u64;
        no_of_streams:u64;
        genre:string;
        preview_info:bool;

    }

    //struct store in vector
    // Define a vector to store instances of the Song struct
    let Songvector=vector::empty<Song>();

    
    // Function to add a new song to the vector
    public fun addSong(album_id:u64,sond_id:u64,_cid: address,artist_name: string,_duration:u64,_owner:address,song_name:string,_current_price:u64,date_of_release:u64,_genre:string) {
    let new_song = Song { album_id:albumid,
                        song_id:songid,
                         _cid: cid,
                         artist_name: name,
                         _duration:duration,
                         _owner:owner,
                         _song_name:song_name,
                         _current_price:current_price,
                         dateof_release:date_of_release,
                         _genre:genre };

        //setting no of view =0,no of likes =0,
        new_song.total_likes=0;
        new_song.no_of_streams=0

    //as some fields are mutable
        vector::push_back(&mut Songvector,new_song);
    }


    // Function to get songs with likes more than 1000
    public fun getTopSongs(): vector<Song> {
        //creating vector coataining top songs
     let top_songvector=vector::empty<Song>();
    for song in Songvector {
        if (song.likes > 1000) {
            vector::push_back(&mut top_songvector,song)
        }
    }
    top_songvector
}
   
   //Function to send the transactions
    public entry fun transfer_coins<AptosCoin>(from: &signer, to: address, amount: u64) acquires DirectTransferConfig {
        to=song.owner;
        deposit_coins(to, coin::withdraw<CoinType>(from, amount));
    }

}