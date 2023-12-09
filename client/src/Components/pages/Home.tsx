import React from "react";
import { Link } from "react-router-dom";
import "../style/home.css";
import SongCard from "../Music/SongCard";
import api from "../API/Songcard.json";
import "../style/songcard.css";
import { useState } from "react";
import { Network, Provider } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const Home = () => {
    const { account, signAndSubmitTransaction } = useWallet();
    const provider = new Provider(Network.DEVNET);
    const module_address = "0x150e2fc51e258838b7b7c6944dcb5415b0d359d398e9736f7976168c0220ad22";

    const [tranasactionID, setTransactionID] = useState(0);
    const [topSongs, setTopSongs] = useState({});
    const [randomSongs, setRandomSongs] = useState({});
    const [recentSongs, setRecentSongs] = useState({});

    type EntryFunctionId = string;
    type MoveType = string;
    type ViewRequest = {
        function: EntryFunctionId;
        type_arguments: Array<MoveType>;
        arguments: Array<any>;
    };

    const fetchTopSongs = async () => {
        if (!account) return [];
        const payload: ViewRequest = {
            function: `${module_address}::Profile::getTopSongs`,
            type_arguments: [],
            arguments: [],
        };

        const topSongsResponse = await provider.view(payload);
        setTopSongs(topSongsResponse);
        // console.log(topSongsResponse);
    };

    const fetchRandomSongs = async () => {
        if (!account) return [];
        const payload: ViewRequest = {
            function: `${module_address}::Profile::randomsongs`,
            type_arguments: [],
            arguments: [],
        };

        const randomSongsResponse = await provider.view(payload);
        setRandomSongs(randomSongsResponse);
        // console.log(randomSongsResponse);
    };

    const fetchRecentSongs = async () => {
        if (!account) return [];
        const payload: ViewRequest = {
            function: `${module_address}::Profile::recentsongs`,
            type_arguments: [],
            arguments: [],
        };

        const recentSongsResponse = await provider.view(payload);
        setRecentSongs(recentSongsResponse);
        console.log(recentSongsResponse);
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
        console.log(tranasactionID);
        const response2 = await createTransaction(
            2,
            tranasactionID,
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
                                {apimusic.music.map((musicDetails, index) => {
                                    return (
                                        <>
                                            <SongCard
                                                SongName={musicDetails.Song_name}
                                                ArtistName={musicDetails.Artist_name}
                                                AlbumName={musicDetails.Song_Album}
                                                Purchase_Status={musicDetails.Purchase_Status}
                                                Song_Price={musicDetails.Song_price}
                                                purchaseHandler={() =>
                                                    purchaseSong(
                                                        "0xd6f998affe8ab2ded891178a09f4aff7be682a56a03a3fdf1cf8bc655cbfcfc2",
                                                        musicDetails.Song_price,
                                                        index
                                                    )
                                                }
                                            />
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
