import React, { useState, useEffect } from 'react'
import './ChatStyle.css'
import ScrollToBottom from 'react-scroll-to-bottom';



const ChatWindow = ({ socket, userName, roomId }) => {
// props sent from App.js component

    const [userMessage, setUserMessage] = useState('')
    const [messageList, setMessageList] = useState([])


    const handleSendMessage = async () => {

        if (userMessage) {
            // create an data object to send
            const messageData = {
                room: roomId,
                author: userName,
                message: userMessage,
                time: new Date(Date.now()).getHours()
                    + ':' +
                    new Date(Date.now()).getMinutes()
            }

            await socket.emit('sendMessage', messageData)

            setMessageList((list) => [...list, messageData])
            
            setUserMessage('')

        }
    }

    // get other user' message and add to list
    useEffect(() => {
        socket.on('recieveMessage', (data) => {
            setMessageList((list) => [...list, data])
        });
    }, [socket])



    // render all mesages here
    const renderMessages = messageList.map(message => (
        <div
            className='messageStyle p-2 max-width-50'
            id={message.author === userName ? 'ownMessage' : 'otherMessage'}
        >
            <div className='d-flex flex-column'>
                <p className='messageAuthor'>{message.author}</p>
                <p className='messageText'>{message.message}</p>
                <p className='messageTime'>{message.time}</p>
            </div>
        </div>
    )
    )


    return (
        <div className='container'>

            {/* HEADER */}
            <h1 className='text-center mb-2'>&#x1F4AC; Live-Chat-App</h1>
            <small className='text-muted'>Chat is active on {roomId}</small>
            <small className='text-muted'>Username is {userName}</small>

            {/* CHAT SCREEN */}
            <ScrollToBottom className='displayMessages'>
                <section >
                    {renderMessages}
                </section>
            </ScrollToBottom>

            {/* TYPE SOMETHING */}
            <form className='d-flex'>
                <input
                    type='text'
                    className='form-control'
                    autoFocus={true}
                    value={userMessage}
                    onChange={(e) => {
                        setUserMessage(e.target.value)
                    }}
                    placeholder={`${userName}, type something...`}
                />
                {/* send btn */}
                <button
                    type='submit'
                    disabled={!userMessage}
                    className='btn btn-success'
                    onClick={handleSendMessage}
                >
                    &#128228;
                </button>
            </form>

        </div>
    )
}

export default ChatWindow
