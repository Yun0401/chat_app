import io from 'socket.io-client';
import './App.css';
// import { useState } from 'react';
import Chat from './Chat';


const socket = io.connect("http://192.168.1.127:3001");

function Patient() {
  socket.emit("join_room", "123");
  return (
    <div className="App">
      <Chat socket = {socket} username = "patient" room = "123"/>
    </div>
  );
}

export default Patient;

