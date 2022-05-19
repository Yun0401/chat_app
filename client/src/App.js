import io from 'socket.io-client';
import './App.css';
import { useState } from 'react';
import Chat from './Chat';


const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState('');
  const [showChat, setShowChat] = useState(false);
  const room = "123";

  const joinRoom = () =>{
    if (username === "A" && password === "password"){
      socket.emit("join_room", room);
      setShowChat(true);
    }
    else if(username === "B" && password === "password"){
      socket.emit("join_room", room);
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
        <h3>Join A Chat</h3>
        <input type="text" placeholder='UserName' onChange = {(event) => {setUsername(event.target.value);}} onKeyPress = {(event) => {event.key === "Enter" && joinRoom()}}/>
        <input type="password" placeholder='Password' onChange = {(event) => {setPassword(event.target.value);}} onKeyPress = {(event) => {event.key === "Enter" && joinRoom()}}/>
        <button onClick = {joinRoom} onKeyPress = {(event) => {event.key === "Enter" && joinRoom()}}>Login</button>
        <button onClick = {forgetPassword}>Forget password</button>
      </div>):      
      (<Chat socket = {socket} username = {username} room = {room}/>)}
    </div>
  );
}

export default App;
