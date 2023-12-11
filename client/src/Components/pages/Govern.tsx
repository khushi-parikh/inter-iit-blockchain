import React , {useState} from 'react'
import '../style/govern.css';
import VoteCard from '../Music/VoteCard'

const Govern = () => {
    const [activeTab, setActiveTab] = useState(0);
    const handleTabChange = (args: number) => {
        setActiveTab(args);
    };

    const RaiseIssue = () => {
        return (
            <center>
                <div className='raise-block'>
                    <div className='raise-heading'>Raise Issue Form</div>
                    <form action="#" className='raise-form'>
                        <label>Song ID
                            <input type="number"
                            name="SongID"
                            id="albumID"
                            placeholder="Enter Album ID"
                            required
                            className="enter-data"
                            />
                        </label>

                        <label>Reason
                            <input type="string"
                            name="Reason"
                            id="albumID"
                            placeholder="Enter your reason"
                            required
                            className="enter-data"
                            />
                        </label>
                        <center>
                        <button type='submit' className='raise-submit-button'>Submit</button>
                        </center>
                    </form>
                </div>
            </center>
        )
    }

    const VoteIssue = () => {
        return (
            <div >
                <VoteCard/>
            </div>
        )
    }

    function Tabs({ activeTab }: { activeTab: number }) {
        switch (activeTab) {
            case 0:
                return VoteIssue();
            case 1:
                return RaiseIssue();
               
            default:
                return <div>No tab selected</div>;
        }
    }

    return (
        <div className='page'>
            <div className='govern-head'>Raise or Vote</div>
            <div className='tabs'>
                    <button onClick={() => { handleTabChange(0) }} className={activeTab == 0 ? "active-button" : "non-active-button"}>Vote Song</button>
                    <button onClick={() => { handleTabChange(1) }} className={activeTab == 1 ? "active-button" : "non-active-button"}>Raise Issue</button>
                </div>
                {Tabs({ activeTab })}
        </div>
    )
}

export default Govern;
