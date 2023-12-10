import React , {useEffect, useState} from 'react'
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Network, Provider } from 'aptos'
import { Link } from 'react-router-dom';
import '../style/login.css';

const Login = () => {
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
        const payload1 = {
            type: "entry_function_payload",
            function: `${module_address}::Profile::create_resource`,
            type_arguments: [],
            arguments: [],
        };
        console.log("payload 1", payload1)
        try {
            // sign and submit transaction to chain
            const getResourceDetails = await provider.getAccountResource(
              account.address,
              `${module_address}::Profile::Playlists_Table`
            )
            // await provider.waitForTransaction(response.hash);
            setAccountHasResource(true);
            console.log("Completed adding resource")
          }
          catch (error: any) {
            // setAccountHasResource(false);
            const response = await signAndSubmitTransaction(payload1);
            console.log("response", response)
            await provider.waitForTransaction(response.hash);
            
            const getResourceDetails = await provider.getAccountResource(
              account.address,
              `${module_address}::Profile::Playlists_Table`
            )
            setAccountHasResource(true);
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
            // console.log("entered try loop", payload)
            const getResourceDetails = await provider.getAccountResource(
              account.address,
              `${module_address}::Profile::User`
              )
              // await provider.waitForTransaction(response.hash);
              // console.log(exists<User>(account?.address));
              setAccountHasUser(true);
              console.log(accountHasUser);
              
            }
            catch (error: any) {
              // setAccountHasUser(false);
              const response = await signAndSubmitTransaction(payload);
              console.log("response", response)
              await provider.waitForTransaction(response.hash);
              const getResourceDetails = await provider.getAccountResource(
                account.address,
                `${module_address}::Profile::User`
                )
                setAccountHasUser(true);
                console.log(accountHasUser);
        }
        // finally {
        //     setTransactionInProgress(false);
        // }
    }

    useEffect(() => {
      if(account?.address)createUser();
      if(accountHasUser)createResource();
    })

  
  return (
    <div className='page'>
      
      {account?.address ? <Link to = '/'><div className='login-note'>Click here to move to Home-page</div></Link> : <div className='create-button'><WalletSelector /></div>}
      {accountHasUser ? <div></div> : <button onClick={createUser} className='create-button'>Create User</button>}
      {accountHasResource ? <div></div> : <button onClick={createResource} className='create-button'>Create Resource</button>}

    </div>
  )
}

export default Login