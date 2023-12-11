import * as React from "react";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { styled } from "@mui/system";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Network, Provider } from "aptos";
type EntryFunctionId = string;
type MoveType = string;
type ViewRequest = {
  function: EntryFunctionId;
  type_arguments: Array<MoveType>;
  arguments: Array<any>;
};
interface SimplePopupProps {
  SongID: number |null;
 }
export default function SimplePopup({ SongID}: SimplePopupProps) {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const [amount, setAmount] = React.useState(0);

  const { account, signAndSubmitTransaction } = useWallet();
  const provider = new Provider(Network.DEVNET);
  const module_address = process.env.REACT_APP_MODULE_ADDRESS;
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
   };
   
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };
  const getArtistAddress = async (song_id: number |null) => {
    if (!account) return [];
    const payload: ViewRequest = {
      function: `${module_address}::Profile::getArtistAddress`,
      type_arguments: [],
      arguments: [song_id],
    };
    try {
      const response = await provider.view(payload);
      console.log("Artist address");
      console.log(response[0]);
      return response[0];
    } catch (error: any) {
      console.error("Error getting song details:", error);
    }
  };

  const handleTransfer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission


    if (!isNaN(amount)) {
      await tipArtist(SongID, amount);
    } else {
      console.error("Invalid amount");
    }
  };

  const tipArtist = async (song_id: number|null, amount: number) => {
    if (!account) return;
    const toAddress = await getArtistAddress(song_id);
    console.log("toAddress", toAddress);
    console.log("amount", amount);
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
  const open = Boolean(anchor);
  const id = open ? "simple-popup" : undefined;

  return (
    <div>
      <div aria-describedby={id} onClick={handleClick}>
        <MonetizationOnIcon />
      </div>
      <BasePopup id={id} open={open} anchor={anchor}>
        <PopupBody>
          <form onSubmit={handleTransfer}>
            <input
              type="number"
              placeholder="inter amount"
              className="addamount"
              min-value={1}
              required
              onChange={handleAmountChange}
            />
            <button className="addamountbutton" type="submit">
              done
            </button>
          </form>
        </PopupBody>
      </BasePopup>
    </div>
  );
}
const PopupBody = styled("div")(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: -140px;
  border-radius: 8px;
  background-color: black;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`
);
