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
        <div className="search-name">
          {filteredData.map((Details, index) => {
            return (
              <>
              <div key={index}>
                  <p>Album : {Details.AlbumName}</p>
                  <p>Artist : {Details.ArtistName}</p>
                  <p>SongTitle : {Details.SongTitle}</p>
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
