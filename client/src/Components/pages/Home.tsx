import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/home.css";
import SongCard from "../Music/SongCard";
import api from "../API/Songcard.json";
import { useState } from "react";
import { Network, Provider } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

interface HomeProps {
  onPlaySong: (
    url: string,
    songName: string,
    photourl: string,
    albumname: string
  ) => void;
  onPlaySongArray: (
    url: string[],
    songName: string[],
    photourl: string[]
  ) => void;
}
type Song = {
  album_id: BigInt;
  artist_address: string;
  cid: string;
  current_price: BigInt;
  date: string;
  duration: BigInteger;
  genre: string;
  name: string;
  num_likes: BigInt;
  num_streams: BigInt;
  previewEnd: BigInt;
  previewStart: BigInt;
  song_id: BigInt;
};

const Home: React.FC<HomeProps> = ({ onPlaySong, onPlaySongArray }) => {
  const { account, signAndSubmitTransaction } = useWallet();
  const provider = new Provider(Network.DEVNET);
  const module_address = process.env.REACT_APP_MODULE_ADDRESS;
  //   console.log(module_address);

  const [transactionID, setTransactionID] = useState(0);
  const [topSongs, setTopSongs] = useState();
  const [isTopSongsFetched, setIsTopSongsFetched] = useState(false);
  const [isRecentSongsFetched, setIsRecentSongsFetched] = useState(false);
  const [isRandomSongsFetched, setIsRandomSongsFetched] = useState(false);
  const [randomSongs, setRandomSongs] = useState();
  const [recentSongs, setRecentSongs] = useState();

  type EntryFunctionId = string;
  type MoveType = string;
  type ViewRequest = {
    function: EntryFunctionId;
    type_arguments: Array<MoveType>;
    arguments: Array<any>;
  };

  useEffect(() => {
    if (account || !isTopSongsFetched) {
      fetchTopSongs();
      setIsTopSongsFetched(true);
    }
    if (account || !isRandomSongsFetched) {
      fetchRandomSongs();
      setIsRandomSongsFetched(true);
    }
    if (account || !isRecentSongsFetched) {
      fetchRecentSongs();
      setIsRecentSongsFetched(true);
    }
  }, [account, isTopSongsFetched, isRandomSongsFetched, isRecentSongsFetched]);

  const fetchTopSongs = async () => {
    if (!account) return [];
    const payload: ViewRequest = {
      function: `${module_address}::Profile::getTopSongs`,
      type_arguments: [],
      arguments: [],
    };

    const topSongsResponse = await provider.view(payload);
    setTopSongs(JSON.parse(JSON.stringify(topSongsResponse)));
    console.log("Top Songs : ", topSongs);
  };

  const fetchRandomSongs = async () => {
    if (!account) return [];
    const payload: ViewRequest = {
      function: `${module_address}::Profile::randomsongs`,
      type_arguments: [],
      arguments: [],
    };

    const randomSongsResponse = await provider.view(payload);
    setRandomSongs(JSON.parse(JSON.stringify(randomSongsResponse)));
    console.log("Random Songs : ", randomSongsResponse);
  };
  const fetchRecentSongs = async () => {
    if (!account) return [];
    const payload: ViewRequest = {
      function: `${module_address}::Profile::recentsongs`,
      type_arguments: [],
      arguments: [],
    };

    const recentSongsResponse = await provider.view(payload);
    setRecentSongs(JSON.parse(JSON.stringify(recentSongsResponse)));
    if (recentSongs && recentSongs[0]) {
      onPlaySongArray(
        JSON.parse(JSON.stringify(recentSongs[0])).map(
          (song: any) => song.videoLink
        ),
        JSON.parse(JSON.stringify(recentSongs[0])).map(
          (song: any) => song.name
        ),
        JSON.parse(JSON.stringify(recentSongs[0])).map(
          (song: any) => song.photoLink
        )
      );
    }
    console.log("Recent Songs : ", recentSongsResponse);
  };

  const transferAmt = async (toAddress: string, amount: number) => {
    if (!account) return null;
    amount = amount * 1000000;
    const payload = {
      type: "entry_function_payload",
      function: `${module_address}::Profile::transfer`,
      type_arguments: [],
      arguments: [toAddress, amount],
    };

    try {
      const response = await signAndSubmitTransaction(payload);
      await provider.waitForTransaction(response.hash);
      console.log(`Transferred ${amount} to ${toAddress}`);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Transfer error:", error);
      return null;
    }
  };

  const createTransaction = async (
    price: number,
    transactionId: number,
    songId: number,
    toAddress: string
  ) => {
    if (!account) return null;

    const payload = {
      type: "entry_function_payload",
      function: `${module_address}::Profile::create_transaction`,
      type_arguments: [],
      arguments: [price, transactionId, songId, toAddress],
    };

    try {
      const response = await signAndSubmitTransaction(payload);
      await provider.waitForTransaction(response.hash);
      console.log(
        `Custom transaction sent to ${toAddress} for song ${songId} with transaction ID ${transactionId} for price ${price}`
      );
      return response;
    } catch (error) {
      console.error("Custom transaction error:", error);
      return null;
    }
  };
  const purchaseSong = async (
    artist_address: string,
    song_price: number,
    song_id: number
  ) => {
    const response = await transferAmt(artist_address, song_price);
    console.log(response);
    setTransactionID((prev) => prev + 1);
    console.log(transactionID);
    const response2 = await createTransaction(
      2,
      transactionID,
      song_id,
      artist_address
    );
    console.log(response2);
  };

  return (
    <div className="page">
      <button onClick={fetchTopSongs}>Fetch Top Songs</button>
      <button onClick={fetchRandomSongs}>Fetch Random Songs</button>
      <button onClick={fetchRecentSongs}>Fetch Recent Songs</button>
      <div className="home-page">
        {api.map((apimusic, index) => {
          return (
            <div className="temp">
              <p>{apimusic.title}</p>
              <div className="pc">
                {/* {topSongs && console.log("topppp", topSongs[0][0], typeof(topSongs[0]))} */}
                {apimusic.title === "Trending Songs" &&
                  topSongs &&
                  JSON.parse(JSON.stringify(topSongs[0])).map((song: any) => {
                    return (
                      <SongCard
                        SongName={song.name.slice(0, 15) +
                          "...."}
                        ArtistName={
                          song.artist_address.slice(0, 5) +
                          "...." +
                          song.artist_address.substring(
                            song.artist_address.length - 3
                          )
                        }
                        AlbumName={song.album_id}
                        Purchase_Status={false}
                        SongUrl={song.videoLink}
                        PhotoUrl={song.photoLink}
                        Song_Price={song.current_price}
                        purchaseHandler={() =>
                          purchaseSong(
                            song.artist_address,
                            song.current_price,
                            song.song_id
                          )
                        }
                        onPlaySong={onPlaySong}
                      />
                    );
                  })}
                {apimusic.title === "for you" &&
                  randomSongs &&
                  JSON.parse(JSON.stringify(randomSongs[0])).map(
                    (song: any) => {
                      return (
                        <SongCard
                        SongName={song.name.slice(0, 15) +
                          "...."}
                          
                           
                            ArtistName={
                            song.artist_address.slice(0, 5) +
                            "...." +
                            song.artist_address.substring(
                              song.artist_address.length - 3
                            )
                          }
                          AlbumName={song.album_id}
                          Purchase_Status={false}
                          SongUrl={song.videoLink}
                          PhotoUrl={song.photoLink}
                          Song_Price={song.current_price}
                          purchaseHandler={() =>
                            purchaseSong(
                              song.artist_address,
                              song.current_price,
                              song.song_id
                            )
                          }
                          onPlaySong={onPlaySong}
                        />
                      );
                    }
                  )}
                {apimusic.title === "Recently played" &&
                  recentSongs &&
                  JSON.parse(JSON.stringify(recentSongs[0])).map(
                    (song: any) => {
                      return (
                        <SongCard
                         
                         
                            SongName={song.name.slice(0, 15) +
                              "...." }
                            ArtistName={
                            song.artist_address.slice(0, 5) +
                            "...." +
                            song.artist_address.substring(
                              song.artist_address.length - 3
                            )
                          }
                          AlbumName={song.album_id}
                          Purchase_Status={false}
                          SongUrl={song.videoLink}
                          PhotoUrl={song.photoLink}
                          Song_Price={song.current_price}
                          purchaseHandler={() =>
                            purchaseSong(
                              song.artist_address,
                              song.current_price,
                              song.song_id
                            )
                          }
                          onPlaySong={onPlaySong}
                        />
                      );
                    }
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
