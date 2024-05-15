import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home, Login } from './components'
import { app } from "./config/firebase.config"
import { getAuth } from 'firebase/auth'
import { AnimatePresence } from 'framer-motion'
import { valiateUser } from './api'
import { useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer'

export default function App() {
    const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true")
    const navigate = useNavigate();
    const firebaseAuth = getAuth(app)
    const [{ user }, dispatch] = useStateValue();


    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred) {
                userCred.getIdToken().then((token) => {
                    console.log(token);
                    valiateUser(token).then((res) => {
                        dispatch({
                            type: actionType.SET_USER,
                            user: res.data.data
                        })
                    }).catch((err) => {
                        console.log(err);
                    })
                })
            } else {
                setAuth(false);
                window.localStorage.setItem("auth", "false")
                dispatch({
                    type: actionType.SET_USER,
                    user: null
                })
                navigate("/login")
            }
        })
    }, [])

    return (
        <AnimatePresence>
            <div className='h-auto min-w-[680px] flex justify-center items-center'>
                <Routes>
                    <Route path='/login' element={<Login setAuth={setAuth}></Login>} ></Route>
                    <Route path='/*' element={<Home></Home>}></Route>
                </Routes>
            </div>
        </AnimatePresence>
    )
}
