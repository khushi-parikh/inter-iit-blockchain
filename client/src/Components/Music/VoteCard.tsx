import React from "react";
import "../style/likedSongs.css";
import "../style/voteCard.css";
import { BiSolidUpvote } from "react-icons/bi";
import { Network, Provider } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from "@mui/material";
import { get } from "http";
interface VoteCardProps {
  proposalID: string;
  Reason: string;
}
const provider = new Provider(Network.DEVNET);
type EntryFunctionId = string;
type MoveType = string;
type ViewRequest = {
  function: EntryFunctionId;
  type_arguments: Array<MoveType>;
  arguments: Array<any>;
};
const VoteCard: React.FC<VoteCardProps> = ({ proposalID, Reason }) => {
  const [ArtistName, setArtistName] = React.useState("" as string);
  const [SongName, setSongName] = React.useState("" as string);
  const [isDeleted, setIsDeleted] = React.useState(false);
  const [votesCount, setVotesCount] = React.useState("" as string)
  const { account, signAndSubmitTransaction } = useWallet();
  const module_address = process.env.REACT_APP_MODULE_ADDRESS;

  React.useEffect(() => {
    getSongDetails(proposalID);
    getVotesCount(proposalID);
  }, [proposalID]);

  const getSongDetails = async (songID: string) => {
    if (!account) return [];
    const payload: ViewRequest = {
      function: `${module_address}::Profile::retrieveSong`,
      type_arguments: [],
      arguments: [songID],
    };
    try {
      const response = await provider.view(payload);
      console.log("Song details");
      console.log(response);
      let songDetails = JSON.parse(JSON.stringify(response));
      if (songDetails && songDetails[0]) {
        console.log(songDetails[0].artist_address);
        console.log(songDetails[0].name);
        setArtistName(songDetails[0].artist_address);
        setSongName(songDetails[0].name);
      }
      // setArtistName(response.return_data[0].value);
      // setSongName(response.return_data[1].value);
    } catch (error: any) {
      console.error("Error getting song details:", error);
    }
  };
  const voteForSong = async (songID: string) => {
    if (!account) return;
    const payload = {
      type: "entry_function_payload",
      function: `${module_address}::Profile::voting`,
      type_arguments: [],
      arguments: [songID],
    };
    try {
      const response = await signAndSubmitTransaction(payload);
      console.log("Voted for song");
      console.log(response);
      getVotesCount(songID);
      checkEventCompleted(songID);
    } catch (error: any) {
      console.error("Error voting for song:", error);
    }
  };
  const getVotesCount = async (songID: string) => {
    const payload: ViewRequest = {
      function: `${module_address}::Profile::getTotalVotes`,
      type_arguments: [],
      arguments: [songID],
    };
    try {
      const response = await provider.view(payload);
      console.log("Votes count:", response[0]);
      let votesCount = JSON.parse(JSON.stringify(response));
      setVotesCount(votesCount[0]);
  
    } catch (error: any) {
      console.error("Error getting votes count:", error);
    }
  };
  const checkEventCompleted = async (songID: string) => {
    const payload: ViewRequest = {
      function: `${module_address}::Profile::checkEventCompleted`,
      type_arguments: [],
      arguments: [songID],
    };
    try {
      const response = await provider.view(payload);
      console.log("Event completed");
      console.log(response[0]);
      if (response[0] === true) {
        console.log("Event completed and value true");
        setIsDeleted(true);
        finishEvent(songID);
      }
    } catch (error: any) {
      console.error("Error getting event completed:", error);
    }
  };
  const finishEvent = async (songID: string) => {
    if (!account) return;
    const payload = {
      type: "entry_function_payload",
      function: `${module_address}::Profile::checkevent`,
      type_arguments: [],
      arguments: [module_address, songID],
    };
    try {
      const response = await signAndSubmitTransaction(payload);
      console.log("Event finished :Deleted succesfully");
      setTimeout(() => {
        setIsDeleted(false);
      }, 5000); // Hide the message after 5 seconds (adjust as needed)
      console.log(response);
    } catch (error: any) {
      console.error("Error finishing event:", error);
    }
  };

  return (
    <>
      {SongName ? (
        isDeleted ? (
          <div>Deleted</div>
        ) : (
          <center className="Vote-card">
            <div className="left-side">
              <div className="transac-details">
                <div className="key-transac">Song :</div>
                <div className="val-transac">{SongName}</div>
              </div>
              <div className="transac-details">
                <div className="key-transac">Artist name :</div>
                <div className="val-transac">{ArtistName}</div>
              </div>
              <div className="transac-details">
                <div className="key-transac"> Reason :</div>
                <div className="val-transac">{Reason}</div>
              </div>
              <div className="transac-details">
                <div className="key-transac">Votes:</div>
                <div className="val-transac"> {votesCount} / 3</div>
              </div>
            </div>
            <div className="right-side">
              <button
                onClick={() => voteForSong(proposalID)}
                className="vote-button"
              >
                Vote
              </button>
            </div>
          </center>
        )
      ) : null}
    </>
   );
   
};

export default VoteCard;
