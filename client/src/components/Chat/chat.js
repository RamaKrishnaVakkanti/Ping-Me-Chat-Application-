import React,{useState, useEffect} from "react";
import queryString from 'query-string';
import './chat.css'
import moment from "moment";
import ScrollToTheBottom from 'react-scroll-to-bottom';

// import io from 'socket.io-client';

// let socket;
const Chat = ({socket})=> {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const {room, name} = queryString.parse(window.location.search);

    const sendNewMessage =async ()=>{
        if(message){
            await socket.emit('new_message',{name,room, message,time: moment() });
        setChatHistory((history)=> [...history, {name,room, message,time: moment() }]);
        setMessage('');
        }
    }
    
    useEffect(()=>{
        socket.on('receive_message', (chatHistory)=> {
            setChatHistory(chatHistory);
        });
        
    })
    return (
    <div className="outer-chat">
        <div className="inner-chat">
        <h1 className="header">Ping me</h1>
            <div className="chat-body">
                <ScrollToTheBottom className="scroll">
                {chatHistory.map((details)=> {
                    return (
                    <div className="message" id={details.name == name ? 'author': 'other'}>
                        <div>
                        <div className="original-message">
                            <p>{details.message}</p>
                        </div>
                        <div className="meta-message">
                           <p>{details.name} . {moment(details.time).calendar()}</p>
                           
                        </div>
                        </div>
                    </div>
                    )
                })}
                </ScrollToTheBottom>
            </div>
            <div className="chat-footer">
                <input
                 type="text"
                  className="chat-textBox"
                   placeholder="Type here..."
                   value={message} 
                   onKeyPress={(event)=> event.key === 'Enter' && sendNewMessage()} 
                   onChange={(event)=> setMessage(event.target.value)}></input>
                <button className="chat-button" onClick={sendNewMessage}>&#9658;</button>
            </div>
        </div>
    </div>)
}

export default Chat;