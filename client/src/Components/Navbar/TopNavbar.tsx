import React, { useState } from 'react'
import '../style/navbar.css';
import { Link } from 'react-router-dom';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { IoIosSearch } from "react-icons/io";

type Props = {
	sidenav: Boolean;
};

const TopNavbar: React.FC<Props> = ({ sidenav }) => {
	const [searchText,setSearchText] = useState("");
	const handleInputText = (e : any) => {
		setSearchText(e.target.value);
	}
	return (
		<div className={` ${sidenav ? 'top-navbar' : ' top-navbar-add'}`}>
			<div className='top-inside'>
				<div>
					<div className="search-bar">
						<IoIosSearch className='search-icon'/>
						<input  className='search-bar-input' type="text" value={searchText} onChange={handleInputText} placeholder='search.........' />
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