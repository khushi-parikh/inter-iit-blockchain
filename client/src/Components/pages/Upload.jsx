import React, { useState } from "react";
import { NFTStorage } from "https://cdn.jsdelivr.net/npm/nft.storage/dist/bundle.esm.min.js";
import "../style/upload.css";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Network, Provider } from 'aptos'

const provider = new Provider(Network.DEVNET);

const Upload = () => {
	const [output, setOutput] = useState("");
	const [Amount, SetAmount] = React.useState(false);
	const [formData, setFormData] = useState({});
	const [songUploaded, setSongUploaded] = React.useState(false);

	const { account, signAndSubmitTransaction } = useWallet();
	const module_address = process.env.REACT_APP_MODULE_ADDRESS;

	const [photo, setPhoto] = useState()
	const [audio, setAudio] = useState()

	const token = process.env.REACT_APP_NFTSTORAGE_TOKEN;
	const store = new NFTStorage({ token });

	const handleInputChange = (event) => {
		const { name } = event.target;

		const { value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handlePhotoChange = (e) => {
		setPhoto(e.target.files[0]);
	};

	const handleAudioChange = (e) => {
		setAudio(e.target.files[0]);
	};


	const handleRadioChange = (e) => {
		if (e.target.id === "Free") {
			SetAmount(false);
		} else if (e.target.id === "Amount") {
			SetAmount(true);
		}
	};

	const handleUpload = async () => {
		if (!photo) {
			setOutput("Please add a photo");
			return;
		}
		if (!audio) {
			setOutput("Please add an audio");
			return;
		}
		setOutput(`Storing 2 files...`);
		try {
			const cid = await store.storeDirectory([photo, audio]);
			const status = await store.status(cid);
			console.log(status);
			return cid;
		} catch (error) {
			setOutput(`Error: ${error.message}`);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("inside submit");
		let cid = await handleUpload();
		setOutput("Uploaded files, creating song")
		console.log(cid);

		if (!account) return [];
        const payload = {
            type: "entry_function_payload",
            function: `${module_address}::Profile::create_song`,
            type_arguments: [],
            arguments: [
				formData["albumID"],
				formData["songname"],
				10,
				formData["Amount"],
				20243112,
				cid,
				formData["genre"],
				15,
				45
			],
        };
        try {
            // sign and submit transaction to chain
            const response = await signAndSubmitTransaction(payload);
            console.log("response", response)
            await provider.waitForTransaction(response.hash);
            setSongUploaded(true);
            console.log("Completed creating song")
        }
        catch (error) {
            setSongUploaded(false);
        }

	};

	return (
		<div className="page">
			<div className="upload-page">
				<center className="upload-form">
					<p className="form-header">Upload Details</p>
					<p className="below-header">Enter the song details</p>
					<hr className="line" />
					<form
						onSubmit={handleSubmit}
						action="#"
						method="get"
						className="login-form"
					>
						

						{/*  CHANGE THIS TO DROPDOWN CONTAINING CURRENT ALBUMS OF PERSON */}
						<label>
							Album ID*
							<input
								type="number"
								name="albumID"
								id="albumID"
								placeholder="Enter Album ID"
								required
								className="enter-data"
								onChange={handleInputChange}
							/>
							<br />
						</label>

						<label>
							Song ID*
							<input
								type="number"
								name="songID"
								id="songID"
								placeholder="Enter Song ID"
								required
								className="enter-data"
								onChange={handleInputChange}
							/>
							<br />
						</label>

						<label>
							Song Name*
							<input
								type="text"
								name="songname"
								id="songname"
								placeholder="Enter Song Name"
								required
								className="enter-data"
								onChange={handleInputChange}
							/>
							<br />
						</label>

						<label>
							Amount*
							<input
								type="radio"
								name="Amount"
								value=""
								id="Free"
								onChange={handleRadioChange}
							/>
							Free
							<input
								type="radio"
								name="Amount"
								value=""
								id="Amount"
								onChange={handleRadioChange}
							/>
							Amount
							{Amount ? (
								<input
									type="number"
									name="Amount"
									placeholder="Enter amount"
									onChange={handleInputChange}
								/>
							) : null}
							<br />
						</label>

						<label>
							Genre*
							<input
								type="text"
								name="genre"
								id="genre"
								placeholder="Enter Genre"
								required
								className="enter-data"
								onChange={handleInputChange}
							/>
							<br />
						</label>

						<label>
							Photo*
							<br />
							<input
								type="file"
								name="photoFile"
								id="file"
								placeholder="Upload Song Cover Image"
								required
								accept="image/*"
								className="enter-data"
								onChange={handlePhotoChange}
							/>
							<br />
						</label>

						<label>
							Audio*
							<br />
							<input
								type="file"
								name="photoFile"
								id="file"
								placeholder="Upload MP3 File"
								required
								accept="audio/mp3"
								className="enter-data"
								onChange={handleAudioChange}
							/>
							<br />
						</label>

						<center>
							<pre id="out">{output}</pre>
						</center>

						<center className="submit-button">
							<button type="reset" value="reset">
								Reset
							</button>
							<button type="submit" value="Submit" onClick={handleSubmit}>
								Submit
							</button>
						</center>
					</form>
				</center>
			</div>
		</div>
	);
};

export default Upload;
