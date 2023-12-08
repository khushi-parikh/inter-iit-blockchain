import React, { useEffect } from 'react'
import '../style/profile.css'
import api from '../API/Playlist.json'
import PlaylistCard from '../Music/PlayList'
import { Link } from 'react-router-dom'
import '../style/playlist.css'
import likedSongsApi from '../API/LikedSong.json'
import LikedSongCard from '../Music/LikedSongs'
import Transaction from '../API/Transaction.json'
import TransactionCard from '../Music/TransactionCard'
import { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { Network, Provider } from 'aptos'

 


const Profile = () => {
  
  var count = Object.keys(api).length;
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (args: number) => {
    setActiveTab(args);
   };
   


  const playlistContent = () =>{
    return (
      <div className='Playlists'>
          {api.map((apimusic , index) => {
            return(
              <div className="pc">
                  <PlaylistCard PlaylistName={apimusic.PlaylistName} NumOfSongs={apimusic.Songs.length}/>
              </div>
            )
          })}
      </div>
    );
  }

  const likedSongContent = () => {
    return (
      <div className='Playlists'>
          
          {likedSongsApi.map((apimusic , index) => {
            return(
              <div className="pc">
                 <LikedSongCard SongName= {apimusic.SongTitle} ArtistName= {apimusic.ArtistName} AlbumName= {apimusic.AlbumName}/>
              </div>
            )
          })}
        </div>
    );
  }

  const recentSongContent = () => {
    return(
      <div className='Playlists'>
          {likedSongsApi.map((apimusic , index) => {
            return(
              <div className="pc">
                 <LikedSongCard SongName= {apimusic.SongTitle} ArtistName= {apimusic.ArtistName} AlbumName= {apimusic.AlbumName}/>
              </div>
            )
          })}
        </div>
    )
  }

  const transactionContent = () => {
    return(

    <div className='Playlists'>
          {Transaction.map((apimusic , index) => {
            return(
              <div className="pc">
                 <TransactionCard TransactionID={apimusic.Transaction_ID} TransactionDate={apimusic.Transaction_Date} SongName={apimusic.Song_Purchased} />
              </div>
            )
          })}
        </div>
    )
  }

  function Tabs({ activeTab }: { activeTab: number }) {
    switch (activeTab) {
      case 0:
        return playlistContent();
      case 1:
        return likedSongContent();
      case 2:
        return recentSongContent();
      case 3:
        return transactionContent();
      default:
        return <div>No tab selected</div>;
    }
   }

  return (
    <div className='profile-page'>

      <div className='profile-header'>
        <div className='profile-header-start'>
          <p>Profile Details</p>
        </div>
        <div className='profile-header-start-h1'>
          <h1>User key : 123ABCD</h1>
        </div>
        <div className='profile-header-start'>
          <p>Playlists : {count} </p>
        
        </div>
      </div>

      <div className='temp'>
          <div className='tabs'>
            <button onClick={() => {handleTabChange(0)}} className= {activeTab == 0? "active-button" : "non-active-button" }>Your Playlist</button>
            <button onClick={() => {handleTabChange(1)}} className= {activeTab == 1? "active-button" : "non-active-button" }>Liked Songs</button>
            <button onClick={() => {handleTabChange(2)}} className= {activeTab == 2? "active-button" : "non-active-button" }>Recent Songs</button>
            <button onClick={() => {handleTabChange(3)}} className= {activeTab == 3? "active-button" : "non-active-button" }>Transaction History</button>

          </div>
          
          
          {Tabs({ activeTab })}

          <br />

      </div>
      
    </div>
  )
type Song = {
    album_id: BigInteger,
    song_id: BigInteger,
    artist_address: string,
    name: String,
    duration: BigInteger,
    num_likes: BigInteger,
    current_price: BigInteger,
    date: BigInteger,
    cid: String,
    num_streams: BigInteger,
    genre: String,
    preview_info: [],
}

type Playlist = {
    playlist_id: BigInteger,
    playlist_name: string,
    songs: [],
    date_added: string,
}

const provider = new Provider(Network.DEVNET);

const Profile = (props: any) => {

    var count = Object.keys(api).length;
    const [activeTab, setActiveTab] = useState(0);
    const handleTabChange = (args: number) => {
        setActiveTab(args);
    };

    const { account, signAndSubmitTransaction } = useWallet();
    const module_address = '0x5297b8228d13d0252dfc1acb4348d606338fe5d4fbb7e4c2a8ae4b65ad387652';

    // console.log("profile : ", account);

    // const [playlists, setPlaylists] = useState<Task[]>([]);
    // const [newTask, setNewTask] = useState<string>("");
    const [accountHasResource, setAccountHasResource] = useState(false);
    const [accountHasPlaylist, setAccountHasPlaylist] = useState(false);
    const [accountHasUser, setAccountHasUser] = useState(false);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const createResource = async () => {
        if (!account) return [];
        // setTransactionInProgress(true);
        console.log("entered add resource", account.address)
        const payload = {
            type: "entry_function_payload",
            function: `${module_address}::Profile::create_resource`,
            type_arguments: [],
            arguments: [],
        };
        console.log("payload 1", payload)
        try {
            // sign and submit transaction to chain
            const response = await signAndSubmitTransaction(payload);
            console.log("response", response)
            await provider.waitForTransaction(response.hash);
            setAccountHasResource(true);
            console.log("Completed adding resource")
        }
        catch (error: any) {
            setAccountHasPlaylist(false);
            console.log("ERROR-----", error)
        }
        // finally {
        //     setTransactionInProgress(false);
        // }
    }

    const addNewPlaylist = async () => {
        if (!account) return [];
        // setTransactionInProgress(true);
        console.log("entered add new playlist", account.address)
        const payload = {
            type: "entry_function_payload",
            function: `${module_address}::Profile::create_playlist`,
            type_arguments: [],
            arguments: [5, "Hello World", "2023-01-01"],
        };
        try {
            // sign and submit transaction to chain
            console.log("entered try loop", payload)
            const response = await signAndSubmitTransaction(payload);
            console.log("response", response)
            await provider.waitForTransaction(response.hash);
            setAccountHasPlaylist(true);
            console.log("Completed")
        }
        catch (error: any) {
            setAccountHasPlaylist(false);
        }
        // finally {
        //     setTransactionInProgress(false);
        // }
    }
    const createUser=async()=>{
        if (!account) return [];
        // setTransactionInProgress(true);
        console.log("entered create User", account.address)
        const payload = {
            type: "entry_function_payload",
            function: `${module_address}::Profile::create_user`,
            type_arguments: [],
            arguments: [],
        };
        try {
            // sign and submit transaction to chain
            console.log("entered try loop", payload)
            const response = await signAndSubmitTransaction(payload);
            console.log("response", response)
            await provider.waitForTransaction(response.hash);
            setAccountHasUser(true);
            console.log("Completed")
        }
        catch (error: any) {
            setAccountHasPlaylist(false);
        }
        // finally {
        //     setTransactionInProgress(false);
        // }
    }
    const fetchPlaylists = async () => {
        if (!account) return [];
        // console.log(module_address)
        try {
            const Playlists_Table = await provider.getAccountResource(
                account.address,
                `${module_address}::Profile::Playlists_Table`
            );
            console.log("Playlists_Table---------------")
            console.log(Playlists_Table)
            // setAccountHasPlaylist(true);

            // const tableHandle = (Playlists_Table as any).data.tasks.handle;
            // const taskCounter = (Playlists_Table as any).data.task_counter;

            // let tasks = [];
            // let counter = 1;
            // while (counter <= taskCounter) {
            //     const tableItem = {
            //         key_type: "u64",
            //         value_type: `${module_address}::todolist::Task`,
            //         key: `${counter}`,
            //     };
            //     const task = await provider.getTableItem(tableHandle, tableItem);
            //     tasks.push(task);
            //     counter++;
            // }
            // setTasks(tasks);
        } 
        catch (e: any) {
            setAccountHasPlaylist(false);
        }
    }

    useEffect(() => {
        fetchPlaylists();
    }, [account?.address]);


    const playlistContent = () => {
        return (
            <div className='Playlists'>
                {!accountHasResource && <button onClick={createResource}>Create resource</button>}
                {!accountHasPlaylist && <button onClick={addNewPlaylist}>Add Playlist</button>}
                {!accountHasUser && <button onClick={createUser}>Create User</button>}
                {accountHasPlaylist && api.map((apimusic, index) => {
                    return (
                        <div className="pc">
                            <PlaylistCard PlaylistName={apimusic.PlaylistName} NumOfSongs={apimusic.Songs.length} />
                        </div>
                    )
                })}
            </div>
        );
    }

    const likedSongContent = () => {
        return (
            <div className='Playlists'>

                {likedSongsApi.map((apimusic, index) => {
                    return (
                        <div className="pc">
                            <LikedSongCard SongName={apimusic.SongTitle} ArtistName={apimusic.ArtistName} AlbumName={apimusic.AlbumName} />
                        </div>
                    )
                })}
            </div>
        );
    }

    const recentSongContent = () => {
        return (
            <div className='Playlists'>
                {likedSongsApi.map((apimusic, index) => {
                    return (
                        <div className="pc">
                            <LikedSongCard SongName={apimusic.SongTitle} ArtistName={apimusic.ArtistName} AlbumName={apimusic.AlbumName} />
                        </div>
                    )
                })}
            </div>
        )
    }

    const transactionContent = () => {
        return (

            <div className='Playlists'>
                {Transaction.map((apimusic, index) => {
                    return (
                        <div className="pc">
                            <TransactionCard TransactionID={apimusic.Transaction_ID} TransactionDate={apimusic.Transaction_Date} SongName={apimusic.Song_Purchased} />
                        </div>
                    )
                })}
            </div>
        )
    }

    function Tabs({ activeTab }: { activeTab: number }) {
        switch (activeTab) {
            case 0:
                return playlistContent();
            case 1:
                return likedSongContent();
            case 2:
                return recentSongContent();
            case 3:
                return transactionContent();
            default:
                return <div>No tab selected</div>;
        }
    }

    return (
        <div className='page'>

            <div className='profile-header'>
                <div className='profile-header-start'>
                    <p>Profile Details</p>
                </div>
                <div className='profile-header-start-h1'>
                    <h1>User key : 123ABCD</h1>
                </div>
                <div className='profile-header-start'>
                    <p>Playlists : {count} </p>

                </div>
            </div>

            <div className='temp'>
                <div className='tabs'>
                    <button onClick={() => { handleTabChange(0) }} className={activeTab == 0 ? "active-button" : "non-active-button"}>Your Playlist</button>
                    <button onClick={() => { handleTabChange(1) }} className={activeTab == 1 ? "active-button" : "non-active-button"}>Liked Songs</button>
                    <button onClick={() => { handleTabChange(2) }} className={activeTab == 2 ? "active-button" : "non-active-button"}>Recent Songs</button>
                    <button onClick={() => { handleTabChange(3) }} className={activeTab == 3 ? "active-button" : "non-active-button"}>Transaction History</button>

                </div>


                {Tabs({ activeTab })}

                <br />

            </div>

        </div>
    )
}
}

export default Profile;

function setTransactionInProgress(arg0: boolean) {
    throw new Error('Function not implemented.')
}
