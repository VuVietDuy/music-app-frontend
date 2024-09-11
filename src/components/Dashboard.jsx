import React from "react";
import Header from "./Header";
import { NavLink, Route, Routes } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNoActiveStyles } from "../utils/style";
import {
  DashboardAlbums,
  DashboardArtists,
  DashboardNewSong,
  DashboardSongs,
  DashboardUsers,
  DashboardHome,
} from ".";

export default function Dashboard() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header></Header>
      <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNoActiveStyles
          }
        >
          <IoHome className="text-2xl text-textColor"></IoHome>
        </NavLink>
        <NavLink
          to={"/dashboard/users"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNoActiveStyles
          }
        >
          Users
        </NavLink>
        <NavLink
          to={"/dashboard/songs"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNoActiveStyles
          }
        >
          Songs
        </NavLink>
        <NavLink
          to={"/dashboard/artists"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNoActiveStyles
          }
        >
          Artists
        </NavLink>
        <NavLink
          to={"/dashboard/albums"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNoActiveStyles
          }
        >
          Albums
        </NavLink>
      </div>
      <div className="my-4 w-full p-4">
        <Routes>
          <Route path="/home" element={<DashboardHome></DashboardHome>}></Route>
          <Route
            path="/users"
            element={<DashboardUsers></DashboardUsers>}
          ></Route>
          <Route
            path="/songs"
            element={<DashboardSongs></DashboardSongs>}
          ></Route>
          <Route
            path="/newSong"
            element={<DashboardNewSong></DashboardNewSong>}
          ></Route>
          <Route
            path="/artists"
            element={<DashboardArtists></DashboardArtists>}
          ></Route>
          <Route
            path="/albums"
            element={<DashboardAlbums></DashboardAlbums>}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}
