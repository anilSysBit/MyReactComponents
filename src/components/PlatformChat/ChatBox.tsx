import React,{useEffect, useId, useRef, useState} from 'react'
import styled from 'styled-components'
import { ChatBubble, Check, CheckCircle, CheckCircleOutline, Close, Image } from '@mui/icons-material'
import { Avatar } from '@mui/material';
interface Message{
    message:string,
    username:string,
    timestamp:string,
    seen?:boolean,
}
const ChatBox:React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const socketRef = useRef<WebSocket | null>(null);
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const defaultUser = 'anotheruser1'
    
    const scrollMessage = (down = false) => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior:'smooth',
          });
        }
      };
    

      const scrollToPosition = () => {
        messageEndRef?.current?.scrollIntoView({
          // behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      };
  
    const sendMessage = () => {
      const date = new Date().toString();
      if (input.trim() && socketRef.current) {
        // setMessages([...messages, { message: input, username: "anilwagle",timestamp:date }]);
        socketRef.current.send(JSON.stringify({message:input,username:defaultUser}))
        setInput("");
        // scrollToPosition();
      }

    };


    // console.log('messagesdf df df',messages)
    const userId:number = 1;
    const url = "ws://127.0.0.1:8000/ws/chat/room1/2/"

    useEffect(()=>{
        socketRef.current = new WebSocket(url);
        if(socketRef.current){
            socketRef.current.onopen  = (e)=>{
                console.log('Websocket Connected')
            }
            socketRef.current.onerror = (e)=>{
                console.log('Websocket Error',e)
            }
    
            socketRef.current.onmessage=(e)=>{
                const data = JSON.parse(e.data)
                // console.log('data',data)
                if(data.type === 'pvm'){
                    const prevMessage = data.messages
                    setMessages([...prevMessage])
                }
                if (data.type === 'chat_message'){
                    setMessages((prevMessages)=>[...prevMessages,{...data}])
                }
            }
    
        }
        scrollMessage();

        return()=>{
            socketRef.current?.close();
        }
    },[])

    const formatTimeStamp =(time:string)=>{
        const date = new Date(time)
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  
    return (
      <div className="flex flex-col w-full h-[80vh] border sm:w-[90vw] lg:w-[30vw]  lg- rounded-xl shadow-lg p-4 bg-white fixed bottom-5 right-5">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-bold"><ChatBubble/> Chat</h2>
          <span className="material-icons cursor-pointer"><Close/></span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2 p-2 ref" ref={chatContainerRef}>
          {messages && messages.map((msg, index) => (
            <div
              key={index}
              className={`rounded-lg flex gap-1 ${msg.username === defaultUser ? 'justify-end' : 'justify-baseline'} w-full 
    }`}
            >
                {msg.username != defaultUser && <Avatar sx={{height:'30px',width:'30px'}}/>}
              <div className={`p-2 rounded-sm max-w-[80%] ${
      msg.username === defaultUser ? "bg-[#005c4b] text-white self-end" : "bg-gray-200 self-start" }`}>
              <p className='text-left  mr-5'>{msg.message}</p>
              <p className={`text-[0.7rem] flex place-items-center gap-1  ${msg.username === defaultUser ? 'justify-end': 'justify-end'}`}>
                {formatTimeStamp(msg.timestamp)} 
                {msg.username === defaultUser && (!msg?.seen ? <CheckCircleOutline sx={{fontSize:"0.8rem"}}/> : <CheckCircle sx={{fontSize:"0.8rem"}}/>)}
              </p>
              </div>
            </div>
          ))}
          <div className='red' ref={messageEndRef}>---</div>
        </div>
        <div className="flex items-center border-t pt-2 gap-0.5">
          <div className="upload_image p-2  relative">
            <Image/>
            <input type="file" name="" id="" className='w-10 absolute left-0 h-full opacity-0'/>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded-lg p-2 outline-none"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="ml-2 p-2 text-blue-500">
            <span className="material-icons">send</span>
          </button>
        </div>
      </div>
  )
}

export default ChatBox