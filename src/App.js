import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Join from './components/Join/join';
import Chat from './components/Chat/chat';
import './app.css'
import io from 'socket.io-client';
import Login from "./components/login/login";
import Authorization from "./components/authorization/authrization";
import config from './config/properties.json'
const socket = io.connect(config.baseURL);

const App =  () =>{
    const [localToken, setLocalToken] = useState(null);
    useEffect(()=>{
        setLocalToken(localStorage.getItem('token'));
    },[]);
    return(<Router>
        <Routes>
        <Route exact path ="/" element ={<Authorization socket ={socket} />}/>
        <Route exact path ="/join" element ={localToken ? <Join socket ={socket}/>: <Navigate to='/login'/>}/>
        <Route path="/chat"  element ={localToken ? <Chat socket ={socket} />: <Navigate to='/login'/>}/>
        <Route path='/login' element ={!localToken ? <Login socket ={socket}/>: <Navigate to='/join'/>}/>
        </Routes>
    </Router>);
};

export default App;