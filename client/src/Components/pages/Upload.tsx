import React from 'react'
import '../style/upload.css'
const Upload = () => {
  return (
    <div className="upload-file page"> 
            <h1>User Name</h1> 
            <fieldset> 
                <form action="#" method="get"> 
                    <label>Song Name*</label> 
                    <input 
                        type="text"
                        name="firstname"
                        id="songname"
                        placeholder="Enter Song Name"
                        required 
                    /> 
                    <br /><br /> 
                    <label >Song Title*</label> 
                    <input 
                        type="text"
                        name="songtitle"
                        id="lastname"
                        placeholder="Enter Song Title"
                        required 
                    /> 
                    <br /><br /> 
                    <label >Album* </label> 
                    <input 
                        type="text"
                        name="Album"
                        id="email"
                        placeholder="Enter Album"
                        required 
                    /> 
                    <br /><br /> 
                    <label >Amount*</label> 
                    <br /> 
                    <input type="radio" name="Amount"
                        value="" id="Free" /> 
                    Free 
                    <input type="radio" name="Amount"
                        value="" id="Amount" /> 
                    Amount
                    <br /><br /> 
                    <label>Music*</label> 
                    <input 
                        type="file"
                        name="file"
                        id="file"
                        placeholder="Enter Upload File"
                        required 
                        accept=''
                    /> 
                    <br /><br /> 
                    <label>Photo*</label> 
                    <input 
                        type="file"
                        name="file"
                        id="file"
                        placeholder="Enter Upload File"
                        required 
                        accept=''
                    /> 
                    <br /><br /> 
                    <label>About</label> 
                    <br /> 
                    <textarea 
                        name="about"
                        id="about"
                        placeholder="About your self"
                        required 
                    ></textarea> 
                    <br /><br /> 
                    <label>Submit OR Reset</label> 
                    <br /> 
                    <button type="reset" value="reset"> 
                        Reset 
                    </button> 
                    <button type="submit" value="Submit"> 
                        Submit 
                    </button> 
                </form> 
            </fieldset> 
        </div> 
  )
}

export default Upload