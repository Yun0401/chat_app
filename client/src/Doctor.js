import io from 'socket.io-client';
import './App.css';
import { useState } from 'react';
import Chat from './Chat';


const socket = io.connect("http://192.168.1.127:3001");

function Doctor() {
  const [password, setPassword] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () =>{
    if (password === "password"){
      socket.emit("join_room", "123");
      setShowChat(true);
    }
    else alert("wrong input");
  };

  const forgetPassword = () =>{
    alert("hint: Your password is password");
  }

  return (
    <div className="App">
      {!showChat ?
      (<div className='joinChatContainer'>
        <h3>Hello, Player A</h3>
        <input type="password" placeholder='Password' onChange = {(event) => {setPassword(event.target.value);}} onKeyPress = {(event) => {event.key === "Enter" && joinRoom()}}/>
        <button onClick = {joinRoom} onKeyPress = {(event) => {event.key === "Enter" && joinRoom()}}>Login</button>
        <button onClick = {forgetPassword}>Forget password</button>
      </div>):      
      (<Chat socket = {socket} username = "Player A" room = "123"/>)}
    </div>
  );
}

export default Doctor;
