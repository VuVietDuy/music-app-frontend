import React, { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { getAllAlbums, getAllArtist, getAllSongs, getAllUsers } from "../api";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
export const DashboardCard = ({ icon, name, count }) => {
  return (
    <div className="w-1/3 p-4">
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex items-center p-6">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            {icon}
          </div>
          <div className="flex flex-col justify-center ml-4">
            <div className="text-gray-800 font-bold text-lg">{name}</div>
            <div className="text-gray-600 text-sm">{count}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DashboardHome() {
  const [{ allUsers, allSongs, allAlbums, artists }, dispatch] =
    useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((res) => {
        dispatch({
          type: "SET_ALL_USERS",
          allUsers: res.data,
        });
      });
    }
    console.log(allUsers);

    if (!allSongs) {
      getAllSongs().then((res) => {
        dispatch({
          type: "SET_ALL_SONGS",
          allSongs: res.data,
        });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((res) => {
        dispatch({
          type: "SET_ALL_ALBUMS",
          allAlbums: res.data,
        });
      });
    }

    if (!artists) {
      getAllArtist().then((res) => {
        dispatch({
          type: "SET_ALL_ARTISTS",
          artists: res.data,
        });
      });
    }
    // console.log(allSongs);
  }, []);
  return (
    <div className="w-full p-6 flex items-center justify-center flex-wrap">
      <DashboardCard
        icon={<FaUsers className="text-3xl text-textColor" />}
        name={"Users"}
        count={allUsers?.length > 0 ? allUsers?.length : 0}
      />

      <DashboardCard
        icon={<GiLoveSong className="text-3xl text-textColor" />}
        name={"Songs"}
        count={allSongs?.length > 0 ? allSongs?.length : 0}
      />

      <DashboardCard
        icon={<RiUserStarFill className="text-3xl text-textColor" />}
        name={"Artist"}
        count={artists?.length > 0 ? artists?.length : 0}
      />

      <DashboardCard
        icon={<GiMusicalNotes className="text-3xl text-textColor" />}
        name={"Album"}
        count={allAlbums?.length > 0 ? allAlbums?.length : 0}
      />
    </div>
  );
}
