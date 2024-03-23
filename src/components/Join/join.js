import React, {useEffect, useState} from "react";
import { Link, Navigate } from "react-router-dom";
import './join.css';
import validate from "../authorization/validate";

const Join = ({socket})=> {
    const [userName, setName] = useState('');
    const [roomName, setRoom] = useState('');

    const enterRoom = async()=>{
        localStorage.setItem('room',roomName);
        socket.emit('join_room',({userName, roomName}));
    }
    useEffect(()=>{
        validate().then((data)=>{
            localStorage.setItem('name',data.name);
            localStorage.setItem('email',data.email);
            localStorage.setItem('id',data.id);
            // localStorage.setItem('profilePic', data.profilePic);
            setName(data.name);
        }).catch((err)=>{
            localStorage.clear();   
            return <Navigate to='/login'/>
        })
    },[]);
    return (
        <div className="outer">
            <div className="inner">
                <h1 className="heading">PING ME</h1>
                <div><input value={userName} disabled="disabled" type="text" className="input" placeholder="Username..."/></div>
                <div><input value= {roomName} type="text" className="input" placeholder="Room Name..." onChange={(event) => setRoom( event.target.value)}/></div>
                <Link onClick={(event)=> ((!userName || !roomName) ? event.preventDefault() : null, enterRoom()) } to={`/chat?userName=${userName}&roomName=${roomName}`}>
                <button className="inputButton" type="submit">Join The Room</button>
                </Link>
            </div>
        </div>
    );
}


export default Join;