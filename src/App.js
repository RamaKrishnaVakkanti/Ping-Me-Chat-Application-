import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Join from './components/Join/join';
import Chat from './components/Chat/chat';
import './app.css'
import io from 'socket.io-client';
const socket = io.connect('https://ping-me-chat-app.herokuapp.com');

const App = () =>{
    return(<Router>
        <Routes>
        <Route exact path ="/" element ={<Join socket ={socket}/>}/>
        <Route path="/chat" element ={<Chat socket ={socket}/>}/>
        </Routes>
    </Router>);
};

export default App;