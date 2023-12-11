import React, { useEffect, useState } from "react";
import "../style/govern.css";
import VoteCard from "../Music/VoteCard";
import { Network, Provider } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const provider = new Provider(Network.DEVNET);
type EntryFunctionId = string;
type MoveType = string;
type ViewRequest = {
  function: EntryFunctionId;
  type_arguments: Array<MoveType>;
  arguments: Array<any>;
};

const Govern = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [eventLength, setEventLength] = useState(0);
  const [eventArray, setEventArray] = useState([]);
  const { account, signAndSubmitTransaction } = useWallet();
  const module_address = process.env.REACT_APP_MODULE_ADDRESS;
  const handleTabChange = (args: number) => {
    setActiveTab(args);
  };

  useEffect(() => {
    getAllEvents();
  }, [eventLength]);


  const getAllEvents = async () => {
    if (!account) return [];
    const payload:ViewRequest = {
      function: `${module_address}::Profile::getAllEvents`,
      type_arguments: [],
      arguments: [],
    };

    try {
      const response = await provider.view(payload);
      console.log("All events");
      setEventArray(JSON.parse(JSON.stringify(response)));
      console.log(eventArray);
      console.log(eventArray[0])
      //   setEventLength(response.return_data[0].value);
      //   setEventArray(response.return_data[1].value);
    } catch (error: any) {
      console.error("Error getting events:", error);
    }
  };
  const createEvent = async (songID: number, reason: string) => {
    if (!account) return;
    console.log(module_address);
    console.log(reason);
    const payload = {
      type: "entry_function_payload",
      function: `${module_address}::Profile::create_event`,
      type_arguments: [],
      arguments: [module_address, 3, 1, songID, reason],
    };

    try {
      console.log("Creating event...");
      const response = await signAndSubmitTransaction(payload);
      await provider.waitForTransaction(response.hash);
      console.log("Event created successfully");
      setEventLength(eventLength + 1);
      console.log(response);
      getAllEvents();
    } catch (error: any) {
      console.error("Error creating event:", error);
    }
  };

  const RaiseIssue = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const songID = parseInt(form.SongID.value);
      const reason = form.Reason.value;

      createEvent(songID, reason);
    };

    return (
      <center>
        <div className="raise-block">
          <div className="raise-heading">Raise Issue Form</div>
          <form action="#" className="raise-form" onSubmit={handleSubmit}>
            <label>
              Song ID
              <input
                type="number"
                name="SongID"
                id="albumID"
                placeholder="Enter Song ID"
                required
                className="enter-data"
              />
            </label>

            <label>
              Reason
              <input
                type="text"
                name="Reason"
                id="albumID"
                placeholder="Enter your reason"
                required
                className="enter-data"
              />
            </label>
            <center>
              <button type="submit" className="raise-submit-button">
                Submit
              </button>
            </center>
          </form>
        </div>
      </center>
    );
  };

  const VoteIssue = () => {
    return (
      <div>
        {eventArray && eventArray[0] && JSON.parse(JSON.stringify(eventArray[0])).map((event: any) => {
          return (
            <VoteCard
              proposalID={event.proposal_id}
              Reason={event.message}
            />
          );

        }
        )
        }
      </div>
    );
  };

  function Tabs({ activeTab }: { activeTab: number }) {
    switch (activeTab) {
      case 0:
        return VoteIssue();
      case 1:
        return RaiseIssue();

      default:
        return <div>No tab selected</div>;
    }
  }

  return (
    <div className="page">
      <div className="govern-head">Raise or Vote</div>
      <div className="tabs">
        <button
          onClick={() => {
            handleTabChange(0);
          }}
          className={activeTab === 0 ? "active-button" : "non-active-button"}
        >
          Vote Song
        </button>
        <button
          onClick={() => {
            handleTabChange(1);
          }}
          className={activeTab === 1 ? "active-button" : "non-active-button"}
        >
          Raise Issue
        </button>
      </div>

      {Tabs({ activeTab })}
    </div>
  );
};

export default Govern;
