import React from 'react'
import '../style/navbar.css';
import { Link } from 'react-router-dom';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

type Props = {
	sidenav: Boolean;
};

const TopNavbar: React.FC<Props> = ({ sidenav }) => {
	return (
		<div className={` ${sidenav ? 'top-navbar' : ' top-navbar-add'}`}>
			<div className='top-inside'>
				<div>
					<input className='search-bar' type="text" placeholder='search.........' />
					<WalletSelector />
					{/* <button className='login-button'><Link to='/login'>login</Link></button> */}
				</div>
			</div>
		</div>
	)
}

export default TopNavbar