import React, { useState, ChangeEvent, FormEvent } from "react";
import { NFTStorage } from "https://cdn.jsdelivr.net/npm/nft.storage/dist/bundle.esm.min.js";
import "../style/upload.css";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [output, setOutput] = useState("");
  const [Amount, SetAmount] = React.useState(false);
  const [formData, setFormData] = useState({
  
  });
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI0YTg0NzI5MjlhMjlmMDkzOUQwMDQxZWFBODhGRGY0ZENFMzUzMWYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMDY3Mjc3OTg0MSwibmFtZSI6InRlc3QxIn0.DnTfyOIfpSr2rW-gKpFyVGSWmf3BtMbMCy7dQ59jUuM";
  const store = new NFTStorage({ token });
  const handleInputChange = (event) => {
    const { name } = event.target;

    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    if (e.target.id === "Free") {
      SetAmount(false);
    } else if (e.target.id === "Amount") {
      SetAmount(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("inside submit");
    let cid= await handleUpload();
    setOutput("Hogaya Bhai")
    console.log("handle submit")
    console.log(cid);
    console.log(formData);

  };
  const handleUpload = async () => {
    if (!files.length) {
      setOutput("No files selected");
      return;
    }
    setOutput(`Storing ${files.length} files...`);
    try {
      const cid = await store.storeDirectory(files);
      // console.log(cid);
      // const filesList = files.map((f) => f.name);
      const status = await store.status(cid);
      console.log(status);
      return cid;
    } catch (error) {
      setOutput(`Error: ${error.message}`);
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
            <label>
              Song Name*
              <input
                type="text"
                name="firstname"
                id="songname"
                placeholder="Enter Song Name"
                required
                className="enter-data"
                onChange={handleInputChange}
              />
              <br />
            </label>

            <label>
              Song Title*
              <input
                type="text"
                name="songtitle"
                id="lastname"
                placeholder="Enter Song Title"
                required
                className="enter-data"
                onChange={handleInputChange}
              />
              <br />
            </label>

            <label>
              Album*
              <input
                type="text"
                name="Album"
                id="email"
                placeholder="Enter Album"
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
                  placeholder="Enter amount"
                    onChange={handleInputChange}
                />
              ) : null}
              <br />
            </label>
            {/* <label>
              Music* <br />
              <input
                type="file"
                name="file"
                id="file"
                placeholder="Enter Upload File"
                // required
                accept=""
                className="enter-data"
                // onChange={handleInputChange}
              />
              <br />
            </label> */}
            <label>
              Photo and Music*
              <br />
              <input
                type="file"
                name="photoFile"
                id="file"
                placeholder="Enter Upload File"
                required
                multiple
                accept=""
                className="enter-data"
                onChange={handleFileChange}
              />
              <br />
            </label>
            <label>About </label>

            <textarea
              name="about"
              id="about"
              placeholder="Enter something about your self"
              required
              className="enter-data"
                onChange={handleInputChange}
            ></textarea>
            <br />
            <br />

            <center className="submit-button">
              <button type="reset" value="reset">
                Reset
              </button>
              <button type="submit" value="Submit">
                Submit
              </button>
            </center>
          </form>
        </center>
        <button onClick={handleSubmit}>Upload</button>
        <pre id="out">{output}</pre>
      </div>
    </div>
  );
};

export default Upload;
