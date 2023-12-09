import React, { useState } from 'react'
import '../style/navbar.css';
import { Link } from 'react-router-dom';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { IoIosSearch } from "react-icons/io";
import Searchreasult from './Searchreasult';
import { IoMdClose } from "react-icons/io";

type Props = {
	sidenav: Boolean;
};

const TopNavbar: React.FC<Props> = () => {
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
					<div className="search-bar">
						<IoIosSearch className='search-icon'/>
						<input  className='search-bar-input' type="text" value={searchText} onChange={handleInputText} placeholder='search.........' />
						{searchText.length >0 ? 
					<IoMdClose className='search-icon-close' onClick={handleClick}/>:null }
					    
					</div>
					<div className='search-reasult'>
					{searchText.length >0 ? 
					<div>
						<Searchreasult searchText={searchText} />
					</div>
					:
					''
                    }
					</div>
					
					<div className="wallet">
						<WalletSelector />
					</div>
				</div>
			</div>
		</div>
	)
}

export default TopNavbar