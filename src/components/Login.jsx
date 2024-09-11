import React from "react";
import { FcGoogle } from "react-icons/fc";

import { app } from "../config/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { validateUser } from "../api";

export default function Login({ setAuth }) {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();

  const navigate = useNavigate();
  async function loginWithGoogle() {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      console.log(userCred);
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              validateUser(token).then((res) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: res.data,
                });
              });
            });
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            window.localStorage.setItem("auth", "false");
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            navigate("/login");
          }
        });
      }
    });
  }
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
        <div className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col justify-center items-center">
          <div
            onClick={loginWithGoogle}
            className="flex items-center justify-center px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 gap-2"
          >
            <FcGoogle className="text-xl " />
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
  );
}
