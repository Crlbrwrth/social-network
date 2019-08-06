import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    let messages = useSelector(state => state && state.messages);
    const elemRef = useRef();

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    const keyCheck = e => {
        if (e.key == "Enter") {
            e.preventDefault();
            socket.emit("chatMessage", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <div className="chat-page">
            <h2>Chat Component</h2>
            <div className="messages" ref={elemRef}>
                {messages &&
                    messages.reverse().map(m => (
                        <div className="message" key={m.id}>
                            <img src={m.profile_pic} />
                            <h4>
                                {m.first} {m.last}:&nbsp;
                            </h4>
                            <p>{m.chat_text}</p>
                        </div>
                    ))}
            </div>

            <textarea
                placeholder="Your message goes here"
                onKeyDown={keyCheck}
            />
        </div>
    );
}
