import React from "react";
import { IoMdClose } from "react-icons/io";
import "../style/popupplaylist.css";
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { Network, Provider } from 'aptos'

type prop = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const Popupplaylist: React.FC<prop> = ({ isOpen, onClose, onOpen }) => {
  const provider = new Provider(Network.DEVNET);
  const[change,setChange] = React.useState(String)
  const[submit,setSubmit] = React.useState()
  const { account, signAndSubmitTransaction } = useWallet();
  const module_address = process.env.REACT_APP_MODULE_ADDRESS;
  const handleinputplay =(e:any) => {
    setChange(e.target.value)
    // createPlaylist(change,date)
    // createPlaylist(change,date)


  }
  const handleplaylist = (e:any) =>{
    // setSubmit(change)
    createPlaylist(change,date)

  }
  var today = new Date(),
  date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const createPlaylist = async (playlistName: string, date: string) => {
  console.log("today date",date)

    if (!account) return null;
    const payload = {
      type: "entry_function_payload",
      function: `${module_address}::Profile::create_playlist`,
      type_arguments: [],
      arguments: [playlistName, date],
    };

    try {
      const response = await signAndSubmitTransaction(payload);
      await provider.waitForTransaction(response.hash);
      // console.log(`Transferred ${amount} to ${toAddress}`);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Transfer error:", error);
      return null;
    }
  };
  return (
    <div className="popup">
      <div className="popup-inside">
              <IoMdClose onClick={onClose} className="closepopup"/>
        <form action="/">
        <input type="text" required placeholder="New playlist name " onChange={handleinputplay} value={change}/> <br />
        <button type="submit" onClick={handleplaylist}>done</button>
        </form>
      </div>
    </div>
  );
};

export default Popupplaylist;
