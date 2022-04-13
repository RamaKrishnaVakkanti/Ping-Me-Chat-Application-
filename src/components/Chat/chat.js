import React,{useState, useEffect} from "react";
import queryString from 'query-string';
import './chat.css'
import moment from "moment";
import ScrollToTheBottom from 'react-scroll-to-bottom';
import axios from "axios";
import config from '../../config/properties.json';

const Chat = ({socket})=> {
    const [message, setMessage] = useState('');
    const {roomName, userName} = queryString.parse(window.location.search);
    const [chatHistory, setChatHistory] = useState([]);
    const [userList, setUserList] = useState([]);
    const sendNewMessage =async ()=>{
        if(message){
            const newMessage = {userName,roomName, message,time: moment() };
            await socket.emit('new_message',newMessage);
        setChatHistory((history)=> [...history, newMessage]);
        setMessage('');
        }
    }

    useEffect(()=>{ 
        socket.on('receive_message', (chatHistory)=> {
            setChatHistory(chatHistory);
        });
        socket.on('user_list',(userList)=>{
            setUserList(userList);
        });
       axios(`${config.baseURL}/chatHistory?room=${roomName}`,{
            headers: {
                Authorization: localStorage.getItem('token'),
            },
            method: "GET"
        }).then((response)=>{
            response = JSON.parse(JSON.stringify(response.data));
            setChatHistory(response.chatHistory);
            setUserList(response.userList);
        })
        .catch((err)=>{
            console.log(err);
        });
        
    },[]);
    return (
    <div className="outer-chat">
        <div className="inner-chat">
        <h1 className="header">Ping me</h1>
        <div className="userList">

            <div className="userList-header">
            <h3>User List</h3>
            </div>
        <div className="userList-body">
            
                {
                userList.map((user, index)=>{
                    return(<p className="everyUser">{index+1}. {user.userName}</p>)
                })}
                {/* {
                [...new Set(userList.filter((user) => user.userName))].map((user, index)=>{
                    return(<p className="everyUser">{index+1}. {user}</p>)
                })} */}
                
                </div>
        </div>
            <div className="chat-body">
                <ScrollToTheBottom className="scroll">
                {chatHistory.map((details)=> {
                    return (
                    <div className="message" id={details.userName == userName ? 'author': 'other'}>
                        <div>
                        {details.userName != userName && <div className="meta-username">
                           <p>{details.userName}</p>
                           
                        </div>}
                        <div className="original-message">
                            <p>{details.message}</p>
                        </div>
                        <div className="meta-time">
                           <p>{moment(details.time).calendar()}</p>
                           
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
