import React, { useEffect, useRef, useState } from 'react'

const BaseChatBox = () => {
    const chat = [
        {
            id:1,
            message:"We Shall Over Come1",
            date:'2023-12-2'
        },,
        {
            id:1,
            message:"We Shall Over Come2",
            date:'2023-12-2'
        },
        {
            id:1,
            message:"We Shall Over Come3",
            date:'2023-12-2'
        },
        {
            id:1,
            message:"We Shall Over Come4",
            date:'2023-12-2'
        }
    ]
    const [value,setValue] = useState("");
    const [chatArr,setChatArr] = useState(chat);
    const scrollControlRef = useRef(null);

    
    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log('submit')
        const newItem = {
            id: chatArr.length + 1, // Assign a unique ID based on the array length
            message: value,
            date: new Date().toISOString() // Set the current date
        };
        console.log(newItem)
        setChatArr(prevChat => [...prevChat, newItem]);
    }

    useEffect(()=>{
        scrollControlRef.current.scrollIntoView({
            behaviour:'smooth',
            block:'end'
        })
    },[chatArr])

    
  return (
    <div className="chat_box_container">
        <style>{`
            .chat_box_container{
                border:2px solid black;
                padding:10px;
                height:300px;
            }
            .display_chat{
                border:2px solid green;
                overflow-y:scroll;
                height:200px;
            }
            .each_message{
                height:40px;
                width:100%;
                border:2px solid red;
                margin-top:10px;
            }
            .send_chat{
                margin-top:10px;
            }
            input{
                height:40px;
                padding:10px;
            }
            button{
                height:40px;
            }
        `}</style>
        <div className="chat_box_sm">
            <div className="display_chat">
                {chatArr.map((elem,index)=>{
                    return(
                        <div className='each_message'>
                            <p key={index}>{elem?.message}{elem?.id}</p>
                            <sub>{elem?.date}</sub>
                        </div>
                    )
                })}
                <span ref={scrollControlRef}></span>
            </div>
            <div className="send_chat">
                <form action="#" onSubmit={handleSubmit}>
                    <input type="text" name='txt' onChange={e=>setValue(e.target.value) } value={value}/>
                    <button>Send Message</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default BaseChatBox