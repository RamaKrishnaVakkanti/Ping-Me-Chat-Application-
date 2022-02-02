import React, {useState} from "react";
import { Link } from "react-router-dom";
import './join.css';
import sendIcon from '@material-ui/icons/Send'

const Join = ({socket})=> {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return (
        <div className="outer">
            <div className="inner">
                <h1 className="heading">PING ME</h1>
                <div><input type="text" className="input" placeholder="Please enter your name here..." onChange={(event) => setName( event.target.value)}/></div>
                <div><input type="text" className="input" placeholder="Please enter your room here..." onChange={(event) => setRoom( event.target.value)}/></div>
                <Link onClick={(event)=> ((!name || !room) ? event.preventDefault() : null, socket.emit('join_room',({name, room}))) } to={`/chat?name=${name}&room=${room}`}>
                <button className="inputButton" type="submit">Join The Room</button>
                </Link>
            </div>
        </div>
    );
}


export default Join;