import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";




function Chat({socket,username,room}) {
    try {
        JSON.parse(localStorage.getItem(username))["data"].map(()=>{return 0});
    } catch(error){
        localStorage.setItem(username,JSON.stringify({"data" : []}));//初始化
    }
    const [messageList, setMessageList] = useState(JSON.parse(localStorage.getItem(username))["data"]);
    const [currentMessage, setCurrentMessage] = useState("");
    // const otherplayer = (username === 'A' ? 'B':'A');

    const upDate = (data) => {
        let update_D = {"data" : [...messageList,data]};
        const update_J = JSON.stringify(update_D);
        localStorage.setItem(username,update_J);
    };

    const encode = (msg) => {
        let encode_Message = '';
        if (username === 'A'){
            for(let i=0;i<msg.length;i++){
                let ch = msg[i];
                let n = ch.charCodeAt()+2;//way
                encode_Message += String.fromCharCode(n);
            }
        }
        else if (username === 'B'){
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
            //加密
            // let encode_Message = '';
            // if (username === 'A'){
            //     for(let i=0;i<currentMessage.length;i++){
            //         let ch = currentMessage[i];
            //         let n = ch.charCodeAt()+2;//way
            //         encode_Message += String.fromCharCode(n);
            //     }
            // }
            // else if (username === 'B'){
            //     for(let i=0;i<currentMessage.length;i++){
            //         let ch = currentMessage[i];
            //         let n = ch.charCodeAt()-2;//way
            //         encode_Message += String.fromCharCode(n);
            //     }
            // }
            // else encode_Message = currentMessage;
            const encode_Message = encode(currentMessage);

            const otherData = {
                room: room,
                author: username,
                message: encode_Message,
                time: new Date(Date.now()).getHours() + 
                ":" +
                new Date(Date.now()).getMinutes()
            };
            // let update_D = {};
            // update_D[username] =  [...JSON.parse(localStorage.getItem("data"))[username],messageData];
            // update_D[otherplayer] =  [...JSON.parse(localStorage.getItem("data"))[otherplayer],otherData];
            // const update_J = JSON.stringify(update_D);
            // console.log(update_J);
            // localStorage.setItem('data',update_J);

            await socket.emit("send_message",otherData);

            setMessageList((list) => [...list,messageData]);
            //存在本地
            // let update_D = {"data" : [...messageList,messageData]};
            // const update_J = JSON.stringify(update_D);
            // localStorage.setItem(username,update_J);
            upDate(messageData);

            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message",(data)=>{
            // setMessageList(JSON.parse(localStorage.getItem("data"))[username]);});
            setMessageList((list)=>[...list,data]);
            upDate(data);
        });
            
            // let update_D = {"data" : [...messageList,data]};
            // const update_J = JSON.stringify(update_D);
            // localStorage.setItem(username,update_J);
    }, [socket]);

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