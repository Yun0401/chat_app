import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";




function Chat({socket,username,room}) {
    // try {
    //     JSON.parse(localStorage.getItem(username))["data"].map(()=>{return 0});
    // } catch(error){
    //     localStorage.setItem(username,JSON.stringify({"data" : []}));//初始化
    // }

    const [messageList, setMessageList] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");

    const encode = (msg) => {
        let encode_Message = '';
        if (username === 'Player A'){
            for(let i=0;i<msg.length;i++){
                let ch = msg[i];
                let n = ch.charCodeAt()+2;//way
                encode_Message += String.fromCharCode(n);
            }
        }
        else if (username === 'patient'){
            for(let i=0;i<msg.length;i++){
                let ch = msg[i];
                let n = ch.charCodeAt()-2;//way
                encode_Message += String.fromCharCode(n);
            }
        }
        else encode_Message = msg;
        return encode_Message

    }

    const sendMessage = async ()=>{
        if (currentMessage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + 
                ":" +
                new Date(Date.now()).getMinutes()
            };
            
            const encode_Message = encode(currentMessage);

            const otherData = {
                room: room,
                author: username,
                message: encode_Message,
                time: new Date(Date.now()).getHours() + 
                ":" +
                new Date(Date.now()).getMinutes()
            };

            await socket.emit("send_message",otherData);

            setMessageList((list) => [...list,messageData]);

            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message",(data)=>{
            if(username!==data.author){
            setMessageList((list)=>[...list,data]);
            console.log(1);}
        });
    }, [socket,username]);
    
    useEffect(()=>{
        console.log(messageList, messageList.length);
        if (messageList.length > 1){
            let data = messageList;
            for(var i = 0; i<messageList.length;i++){
                let dataA = messageList[messageList.length-1];
                let dataB = messageList[messageList.length-2];
                console.log(dataA,dataB);
                if(dataA['message'] === dataB['message'] && dataA['author'] === dataB['author']){
                    data.pop(data.length-1);
                }
                else break;
            setMessageList(data);
            console.log(data);
        }}
    },[messageList])

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                {messageList.map((messageContent) => {
                    return (
                    <div className="message" id = {username === messageContent.author?"you" : "other"}>
                        <div >
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p id = "time">{messageContent.time}</p>
                                <p id = "author">{messageContent.author}</p>
                            </div>
                        </div>
                    </div>);
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type = "text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange = {(event) => {setCurrentMessage(event.target.value);}}
                    onKeyPress = {(event) => {event.key === "Enter" && sendMessage()}}/>
                <button onClick={sendMessage}> &#9658; </button>
            </div>
        </div>
    );
}
export default Chat;