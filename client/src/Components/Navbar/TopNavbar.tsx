import React, { useState } from 'react'
import '../style/navbar.css';
import { Link } from 'react-router-dom';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { IoIosSearch } from "react-icons/io";
import Searchreasult from './Searchreasult';
import { IoMdClose } from "react-icons/io";
import Login from '../pages/Login';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Network, Provider } from 'aptos'


type Props = {
	sidenav: Boolean;
};

const TopNavbar: React.FC<Props> = () => {


	const provider = new Provider(Network.DEVNET);
    const { account, signAndSubmitTransaction } = useWallet();
    const module_address = '0xe04053115104aa71b7f70cd48cd47a19a246dbb09220aa1c7299ec04d526133e';
    const [accountHasResource, setAccountHasResource] = useState(false);
    const [accountHasPlaylist, setAccountHasPlaylist] = useState(false);
    const [accountHasUser, setAccountHasUser] = useState(false);

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


	const [searchText,setSearchText] = useState("");
	const handleInputText = (e : any) => {
		// setSearchText(e.target.value);
		var lowerCase = e.target.value.toLowerCase();
		setSearchText(lowerCase);
	}
	const handleClick = () => {
		setSearchText('');
	  };
	return (
		<div className='top-navbar' >
			<div className='top-inside'>
				<div>
                    <div className='project-name'>On-chain Radio </div>
					<div className='search-reasult'>
					{searchText.length >0 ? 
					<div>
						<Searchreasult searchText={searchText} />
					</div>
					:
					''
                    }
					</div>
					
					<div className="wallet" onClick={(e)=>console.log(e.target)}>
						{/* <WalletSelector  /> */}
                        {account?.address ? <WalletSelector/> : 
                        <Link to = '/login'><div className="login-button">Login</div></Link>
                        }
					</div>
				</div>
			</div>
		</div>
	)
}

export default TopNavbar