import React from "react";
import "../style/searchreasult.css";
import api from "../API/LikedSong.json";
import { SlPlaylist } from "react-icons/sl";

type Props = {
  searchText: string;
};
const Searchsugg: React.FC<Props> = ({ searchText }) => {
  const filteredData = api.filter((el) => {
    if (searchText === "") {
      return "not found";
    } else {
      return (
        el.AlbumName.toLowerCase().includes(searchText) ||
        el.SongTitle.toLowerCase().includes(searchText) ||
        el.ArtistName.toLowerCase().includes(searchText)
      );
    }
  });
  return (
    <div className="searchreasult">
      {filteredData.length > 0 ? (
        <div>
          {filteredData.map((Details, index) => {
            return (
              <>
              <div key={index} className="search-name">
                <div>
                  <h3>Album</h3>
                  <div className="search-list">
                    <SlPlaylist />
                    <h5>{Details.AlbumName}</h5>
                  </div>
                </div>
                <div>
                  <h3>Artist</h3>
                  <div className="search-list">
                    <SlPlaylist />
                    <h5>{Details.ArtistName}</h5>
                  </div>
                </div>
                <div>
                  <h3>SongTitle</h3>
                  <div className="search-list">
                    <SlPlaylist />
                    <h5>{Details.SongTitle}</h5>
                  </div>
                </div>

               <hr /> 
              </div>
              </>
            );
          })}
        </div>
      ) : (
        "not found"
      )}
    </div>
  );
};

export default Searchsugg;
