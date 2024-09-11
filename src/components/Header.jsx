import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isActiveStyles, isNoActiveStyles } from "../utils/style";
import { FaCrown } from "react-icons/fa";
import { useStateValue } from "../context/StateProvider";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { motion } from "framer-motion";

export default function Header() {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState(false);

  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/login");
  };
  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to={"/"}>
        <img src="/imgs/logo.png" alt="Logo" className="w-16 h-16"></img>
      </NavLink>

      <ul className="flex justify-center items-center ml-7">
        <li className="mx-5 text-lg">
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNoActiveStyles
            }
          >
            Home
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/musics"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNoActiveStyles
            }
          >
            Musics
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/premium"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNoActiveStyles
            }
          >
            Premium
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNoActiveStyles
            }
          >
            Contact us
          </NavLink>
        </li>
      </ul>
      <div
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
      >
        <img
          src={user?.imgURL}
          className="w-12 min-w-[44px] object-cover rounded-full shadow-lg"
          alt=""
          referrerPolicy=""
        ></img>
        <div>
          <p className="text-textColor text-lg hover:text-headingColor font-semibold">
            {user?.name}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
            Premium member.{" "}
            <FaCrown className="text-sm -ml-1 text-yellow-500"></FaCrown>
          </p>
        </div>
        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 top-12 right-0 w-275 bg-card flex flex-col gap-3 shadow-lg rounded-lg backdrop-blur p-3"
          >
            <NavLink to={"/userProfile"}>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                Profile
              </p>
            </NavLink>
            <NavLink to={"/userProfile"}>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                My favourit
              </p>
            </NavLink>
            <NavLink to={"/dashboard/home"}>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                D
              </p>
            </NavLink>
            <hr />
            <p
              onClick={logOut}
              className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
            >
              Sign out
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
}
