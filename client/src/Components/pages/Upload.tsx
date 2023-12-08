import React from 'react'
import '../style/upload.css'
const Upload = () => {
  return (
    <div className="upload-file page"> 
            <center className='upload-form' > 
                <p className='form-header'>Upload Details</p> 
                <p className='below-header'>Enter the song details</p>
                <hr className='line'/>
                <form action="#" method="get" className='login-form'> 
                    <label >Song Name* 
                    <input 
                        type="text"
                        name="firstname"
                        id="songname"
                        placeholder="Enter Song Name"
                        required 
                        className='enter-data'
                    /><br />
                    </label>

                    <label >Song Title*
                    <input 
                        type="text"
                        name="songtitle"
                        id="lastname"
                        placeholder="Enter Song Title"
                        required 
                        className='enter-data'
                    /><br />
                    </label> 

                    <label >Album* 
                    <input 
                        type="text"
                        name="Album"
                        id="email"
                        placeholder="Enter Album"
                        required 
                        className='enter-data'
                    /> 
                    <br />
                    </label> 

                    <label >Amount*
                    
                    <input type="radio" name="Amount"
                        value="" id="Free" /> 
                    Free 
                    <input type="radio" name="Amount"
                        value="" id="Amount" /> 
                    Amount
                    <br />
                    </label> 
                    <label>Music*
                    <input 
                        type="file"
                        name="file"
                        id="file"
                        placeholder="Enter Upload File"
                        required 
                        accept=''
                        className='enter-data'
                    /> 
                    <br />
                    </label> 
                    <label>Photo*
                    <input 
                        type="file"
                        name="file"
                        id="file"
                        placeholder="Enter Upload File"
                        required 
                        accept=''
                        className='enter-data'
                    /> 
                    <br />
                    </label> 
                    <label>About </label>
                     
                    <textarea 
                        name="about"
                        id="about"
                        placeholder="Enter something about your self"
                        required 
                        className='enter-data'
                    ></textarea> 
                    <br /><br /> 
                    
                    
                    <center className='submit-button'>
                        <button type="reset" value="reset"> 
                            Reset 
                        </button> 
                        <button type="submit" value="Submit"> 
                            Submit 
                        </button> 

                    </center>
                </form> 
            </center> 
        </div> 
  )
}

export default Upload