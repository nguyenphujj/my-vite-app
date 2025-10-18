
import React, { useState, useEffect, useRef, useMemo } from 'react';

import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

import { motion, AnimatePresence } from "framer-motion";

import axios from "axios";

import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";






const API_URL = window.location.hostname === "localhost" ?
  "http://localhost:5000" : "https://my-express-backend-gyj9.onrender.com";

function MathRenderer({ text }) {
  // This regex looks for patterns like $$...$$ or $...$
  // It captures the content inside the delimiters and the delimiter type.
  const parts = text.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g);
  return (
    <div>
      {parts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          // Double dollar signs for block math
          const mathContent = part.slice(2, -2);
          return <BlockMath math={mathContent} />
        } else if (part.startsWith('$') && part.endsWith('$')) {
          // Single dollar signs for inline math
          const mathContent = part.slice(1, -1);
          return <InlineMath math={mathContent} />
        } else {
          // Regular text
          return <span key={index}>{part}</span>;
        }
      })}
    </div>
  );
}











function JsonDisplayPage({outpasserLoginState, outpass2, inpass}){
  //inpass is a json passed from an outside var. at beginning, outside var is empty so it uses the hardcoded data here
  if (inpass == '') inpass = [
    {
      "thecell": "0",
      "thevalue": "zero"
    },
    {
      "thecell": "1",
      "thevalue": "one"
    },
    {
      "sender": "user",
      "text": "hello"
    },
    {
      "sender": "bot",
      "text": "this is a test for initializing"
    }
  ]
  //myjson = inpass, from now on
  const [myjson, setMyjson] = useState(inpass);

  /* 
  const [foundvalue, setFoundvalue] = useState('')
  const [input, setInput] = useState('')

  function handleClick1(){
    setMyjson((prev) => [...prev, { user: 'user1', text: 'text from user1' }]);
    handleClick2()
  }

  const user2text = { user: 'bot', text: '$$ x_2 = \frac{-2 - \sqrt{6}}{2} $$' }
  function handleClick2(){
    setMyjson((prev0) => [...prev0, user2text]);
  }

  function handleFind(){
    const myfound = myjson.find((c) => c.thecell === input);
    if(myfound){
      setFoundvalue(myfound.thevalue)
    }
  }
  */
  

  const [userinput, setUserinput] = useState('')
  const [botinput, setBotinput] = useState('')
  function handleUserInput(){
    setUserinput('')
    setMyjson((prev) => [...prev, { sender: 'user', text: userinput }]);
  }
  function handleBotInput(){
    setBotinput('')
    setMyjson((prev) => [...prev, { sender: 'bot', text: botinput }]);
  }



  /* function handleBack(){
    outpass2(myjson)
    outpasserLoginState(false)
  } */


  return(
    <>
      {/* <div>{myjson[0].thevalue}</div> */}
      {/* <button onClick={handleBack}>back</button>
      <br />

      <button onClick={handleClick1}>user1click</button>
      <button onClick={handleClick2}>user2click</button>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type 0 or 1"
        />
        <button onClick={handleFind}>find</button>
        <div>{foundvalue}</div>
      </div> */}

      
      <pre>{JSON.stringify(myjson, null, 2)}</pre>

      <div>
        <textarea
          value={userinput}
          onChange={(e) => setUserinput(e.target.value)}
          placeholder="user to chat"
        />
        <button onClick={handleUserInput}>send</button>
      </div>
      <div>
        <textarea
          value={botinput}
          onChange={(e) => setBotinput(e.target.value)}
          placeholder="bot to chat"
        />
        <button onClick={handleBotInput}>send</button>
      </div>

      <div>
        {myjson.map((item, idx) => (
          <div key={idx}>
            <strong>{item.sender}</strong>
            {item.text && <MathRenderer text={item.text}/>}
          </div>
        ))}
      </div>
    </>
  )
}


function LoginPage({ outpassPage }) {
  return (
    <>
      <input type="text" />
      <button onClick={() => outpassPage(1)}>
        login
      </button>
    </>
  );
}


function ChatPage() {
  const [myjson1, setmyjson1] = useState([
    {
      "title": "Weekend Plans",
      "mymessages": [
        {
          "sender": "alice",
          "content": "Hey Bob, any plans for the weekend?"
        },
        {
          "sender": "bob",
          "content": "Not yet! Want to go hiking?"
        },
        {
          "sender": "alice",
          "content": "Sounds perfect! Let's do it."
        }
      ]
    }
  ]);
  const [myjson2, setmyjson2] = useState([
    {
      "title": "Work Chat",
      "mymessages": [
        {
          "sender": "carol",
          "content": "Hey Dave, did you finish the quarterly report?"
        },
        {
          "sender": "dave",
          "content": "Almost done, just need to double-check the numbers. I'll send it over by EOD."
        },
        {
          "sender": "carol",
          "content": "Great, thanks! Let me know if you need help with anything."
        }
      ]
    }
  ]);


  const [currentchat, setCurrentchat] = useState([])

  
  return (
    <>
      <div>
        <button onClick={() => setCurrentchat(myjson1)}>chat 1</button>
        <button onClick={() => setCurrentchat(myjson2)}>chat 2</button>
        <button onClick={() => setCurrentchat(myjson3)}>chat 3</button>
        <button onClick={() => setCurrentchat(myjson4)}>chat 4</button>

      </div>
      <div>
        {currentchat.map(item => (
          <div>
            {item.title}
          </div>
        ))}
      </div>
      <div>
        {currentchat.map(i =>
          i.mymessages.map(j => (
            <div>
              {j.sender}: {j.content}
            </div>
          ))
        )}
      </div>
    </>
  );
}





function Another({outpassBackpage, outpassjson, inpassServer}){


  if (inpassServer == '') inpassServer = [
    {
      "conversationId": "111",
      "title": "Weekend Plans",
      "participants": [
        { "username": "alice" },
        { "username": "bob" }
      ],
      "mymessages": [
        {
          "id": 1,
          "sender": "alice",
          "content": "Hey Bob, any plans for the weekend?"
        },
        {
          "id": 2,
          "sender": "bob",
          "content": "Not yet! Want to go hiking?"
        },
        {
          "id": 3,
          "sender": "alice",
          "content": "Sounds perfect! Let's do it."
        }
      ]
    },
    {
      "conversationId": "222",
      "title": "Work Chat",
      "participants": [
        { "username": "carol" },
        { "username": "dave" }
      ],
      "mymessages": [
        {
          "id": 1,
          "sender": "carol",
          "content": "Hey Dave, did you finish the quarterly report?"
        },
        {
          "id": 2,
          "sender": "dave",
          "content": "Almost done, just need to double-check the numbers. I’ll send it over by EOD."
        },
        {
          "id": 3,
          "sender": "carol",
          "content": "Great, thanks! Let me know if you need help with anything."
        }
      ]
    },
    {
      "conversationId": "333",
      "title": "Birthday Surprise",
      "participants": [
        { "username": "emma" },
        { "username": "frank" }
      ],
      "mymessages": [
        {
          "id": 1,
          "sender": "emma",
          "content": "Don't forget, we're meeting at 6 to set up the surprise!"
        },
        {
          "id": 2,
          "sender": "frank",
          "content": "Got it! I’ll bring the balloons and cake."
        },
        {
          "id": 3,
          "sender": "emma",
          "content": "Perfect, this is going to be amazing!"
        }
      ]
    },
    {
      "conversationId": "444",
      "title": "Movie Night",
      "participants": [
        { "username": "gina" },
        { "username": "harry" }
      ],
      "mymessages": [
        {
          "id": 1,
          "sender": "gina",
          "content": "Want to watch a movie tonight?"
        },
        {
          "id": 2,
          "sender": "harry",
          "content": "Sure! Comedy or thriller?"
        },
        {
          "id": 3,
          "sender": "gina",
          "content": "Let's go with comedy. I need a good laugh."
        }
      ]
    }
  ]

  const [entirejson, setEntirejson] = useState(inpassServer)




  const [currentob, setcurrentob] = useState('')



  const wantedOb = entirejson.find(item => item.conversationId == '111')


  useEffect(() => {
    setcurrentob(wantedOb);
  }, [wantedOb]);


  const [thechosenid, setThechosenid] = useState('')
  const [chosenob, setChosenob] = useState('')



  useEffect(() => {
    const thewantedob = entirejson.find(item => item.conversationId == thechosenid)
    setChosenob(thewantedob)
  }, [thechosenid]);

  

  const [inputcache, setInputcache] = useState('')
  function handleSend() {
    if (inputcache.trim()) {
      setChosenob(prev => ({
        ...prev,
        mymessages: [
          ...prev.mymessages,
          {
            id: prev.mymessages.length + 1,
            sender: 'user1',
            content: inputcache
          }
        ]
      }));
      setInputcache('');
    }
  }

  useEffect(() => {
    handleUpdateEntirejson();
  }, [chosenob]);
  useEffect(() => {
    outpassjson(entirejson);
  }, [entirejson]);


  function handleUpdateEntirejson() {
    setEntirejson(prev =>
      prev.map(item =>
        item.conversationId === thechosenid ? chosenob : item
      )
    );
  }


  return (
    <div>
      <button onClick={() => outpassBackpage(0)}>back</button>
      <button onClick={handleUpdateEntirejson}>update entirejson</button>
      <button onClick={() => outpassjson(entirejson)}>update to server</button>
      <div>
        {entirejson.map((item) => (
            <h4
              style={{ cursor: "pointer" }}
              key={item.conversationId}
              // onClick={() => navigate(`/conversation/${item.conversationId}`)}
              onClick={() => setThechosenid(item.conversationId)}
            >
              {item.conversationId}: {item.title}
            </h4>
          )
        )}
      </div>
      {/* <p>
        {currentob.title}
      </p>
      <div>
        {currentob && currentob.mymessages.map((item) => (
          <div key={item.id}>
            {item.sender}: {item.content}
          </div>
        ))}
      </div> */}
      <h2>{thechosenid}: {chosenob && chosenob.title}</h2>
      {/* <pre>{JSON.stringify(chosenob, null, 2)}</pre> */}
      <div>
        {chosenob && chosenob.mymessages.map(item => (
          <div key={item.id}>
            {item.sender}: {item.content}
          </div>
        ))}
      </div>
      <h2></h2>
      <input
        value={inputcache}
        onChange={(e) => setInputcache(e.target.value)}
        placeholder="your message"
      />
      <button onClick={handleSend}>send</button>
    </div>
  );
}





function InputOutputSection({inpass}){
  //inpass is a json passed from an outside var. at beginning, outside var is empty so it uses the hardcoded data here
  if (inpass == '') inpass = [
    {
      "sender": "user",
      "text": "hello"
    },
    {
      "sender": "bot",
      "text": "Đây là lời giải:\n$$ 2x^2+4x-1=0 $$\nSử dụng công thức nghiệm của phương trình bậc hai $ax^2+bx+c=0$"
    }
  ]
  //myjson = inpass, from now on
  const [myjson, setMyjson] = useState(inpass);

  const [userinput, setUserinput] = useState('')
  const [botinput, setBotinput] = useState('')
  function handleUserInput(){
    setUserinput('')
    setMyjson((prev) => [...prev, { sender: 'user', text: userinput }]);
  }
  function handleBotInput(){
    setBotinput('')
    setMyjson((prev) => [...prev, { sender: 'bot', text: botinput }]);
  }






  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const callGeminiAPI = async () => {
    if (!inputValue) {
      setError('Please enter a prompt.');
      return;
    }

    setMyjson((prev) => [...prev, { sender: 'user', text: inputValue }]);

    setIsLoading(true); // Show loading indicator
    setError(null); // Clear previous errors
    setInputValue(''); // Clear previous output

    try {
      const payload = {
        contents: [{
          role: "user",
          parts: [{
            text: inputValue
          }]
        }],
      };

      const apiKey = "AIzaSyB-9Jc4A0Ddi13WXD-ICQ_rfDchjHTIr80";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setOutputValue(text);
        setBotinput(text);
      } else {
        throw new Error("Invalid response structure from API.");
      }

    } catch (e) {
      console.error('API call failed:', e);
      setError(`Failed to get a response. ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };


  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [myjson]);


  const sendMyjsonToBackend = async () => {
    try {
      const response = await fetch('http://localhost:5001/save-myjson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(myjson),
      });
      if (!response.ok) throw new Error('Failed to save myjson');
      alert('myjson saved to backend!');
    } catch (err) {
      alert('Error saving myjson: ' + err.message);
    }
  };

  

  return(
    <>
      <div style={{height:"600px",width:"200px",backgroundColor:"gray"}}>
        <div>haha</div>
        {/* <div style={{ display: "flex"}}>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="user to chat"
          autoFocus
        />
        <button onClick={sendMyjsonToBackend}>
          send1
        </button>
      </div> */}

        {/* <textarea
          value={outputValue}
        /> */}

        {/* <div style={{ display: "flex" }}>
          <textarea
            value={botinput}
            onChange={(e) => setBotinput(e.target.value)}
            placeholder="bot to chat"
          />
          <button onClick={handleBotInput}>
            send2
          </button>
        </div> */}


        <div
          /* ref={messagesEndRef}
          id='messagescontainer' */
          style={{
            height: '400px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
          }}
        >
          {myjson.map((item, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
                background: item.sender === 'user' ? '#d1e7dd' : '#f5f5f5ff',
                borderRadius: '16px',
                maxWidth: '80%',
              }}
            >
              <strong>{item.sender}</strong>
              <div>
                {item.text && <MathRenderer text={item.text} />}
              </div>
            </div>
          ))}
        </div>

        {/* <pre>{JSON.stringify(myjson, null, 2)}</pre> */}

      </div>
      
    </>
  )
}
function AllInOnePage(){
  const [jsoncache, setJsoncache] = useState("");
  return(
    <>
      <InputOutputSection inpass={jsoncache}/>
    </>
  )
}





function Whatsapp() {
  let inpass = [
    {
      "sender": "user",
      "text": "hello"
    },
    {
      "sender": "bot",
      "text": "Đây là lời giải:\n$$ 2x^2+4x-1=0 $$\nSử dụng công thức nghiệm của phương trình bậc hai $ax^2+bx+c=0$"
    }
  ]


  const [messages, setMessages] = useState(inpass);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botReplies = [
        "Reaction & Structure The Protein Folding Problem Proteins",
      ];
      const randomReply =
        botReplies[Math.floor(Math.random() * botReplies.length)];
      setMessages((prev) => [...prev, { text: randomReply, sender: 'bot' }]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      height: '97vh',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #ccc',
      fontFamily: 'Arial, sans-serif',
      position: 'relative', // Add this
      background: '#fff'
    },
    header: {
      padding: '15px',
      backgroundColor: '#075E54',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '18px'
    },
    messagesContainer: {
      flex: 1,
      padding: '10px',
      overflowY: 'auto',
      backgroundColor: 'indigo',
      
    },
    message: {
      marginBottom: '10px',
      padding: '10px',
      borderRadius: '8px',
      maxWidth: '70%',
      wordWrap: 'break-word'
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#DCF8C6',
    },
    botMessage: {
      alignSelf: 'flex-start',
      backgroundColor: 'white',
    },
    inputContainer: {
      position: 'fixed', // Make it fixed
      left: 0,
      right: 0,
      bottom: 0,
      maxWidth: '600px',
      margin: '0 auto',
      display: 'flex',
      borderTop: '1px solid #ccc',
      padding: '10px',
      backgroundColor: 'gray',
      zIndex: 10,
      boxSizing: 'border-box',
      height: '70px', // Set a fixed height
    },
    input: {
      flex: 1,
      padding: '10px',
      fontSize: '16px',
      borderRadius: '20px',
      border: '1px solid #ccc',
      outline: 'none'
    },
    button: {
      marginLeft: '10px',
      padding: '10px 15px',
      fontSize: '16px',
      backgroundColor: '#128C7E',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.messagesContainer}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              ...(msg.sender === 'user' ? styles.userMessage : styles.botMessage)
            }}
          >
            {msg.text && <MathRenderer text={msg.text} />}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={styles.inputContainer}>
        <textarea
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};





function ViewportUI() {
  const [messages, setMessages] = useState([
    "Hello!",
    "How are you?",
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Fix for mobile viewport height (dynamic resizing)
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div>
      <style>{`
        .chat-container {
          height: calc(var(--vh, 1vh) * 100);
          display: flex;
          flex-direction: column;
          font-family: sans-serif;
        }
        .messages {
          flex: 1;
          overflow-y: auto;
          padding: 10px;
          background: #f5f5f5;
        }
        .message {
          background: white;
          margin-bottom: 8px;
          padding: 8px 12px;
          border-radius: 16px;
          max-width: 75%;
          word-wrap: break-word;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        .input-area {
          display: flex;
          border-top: 1px solid #ddd;
          background: #fff;
          padding: 6px;
        }
        .input-area input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 20px;
          outline: none;
        }
        .input-area button {
          margin-left: 6px;
          padding: 10px 16px;
          border: none;
          border-radius: 20px;
          background: #007bff;
          color: white;
          cursor: pointer;
        }
      `}</style>

      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, idx) => (
            <div key={idx} className="message">
              {msg}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}


function MessagingUI() {
  const [messages, setMessages] = useState([
    "Hello 👋",
    "This is a demo chat!",
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, input.trim()]);
    setInput("");
  };

  return (
    <>
      <div className="chatApp">
        <div className="topBar">Chat App</div>

        <div className="messageContainer">
          {messages.map((msg, i) => (
            <div key={i} className="message">
              {msg}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="inputContainer">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        body, html, #root {
          height: 100%;
          margin: 0;
        }

        .chatApp {
          display: flex;
          flex-direction: column;
          height: 100vh; /* responsive to mobile keyboard changes */
        }

        .topBar {
          flex: 0 0 50px; /* fixed height */
          background: #007bff;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: bold;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .messageContainer {
          flex: 1;
          overflow-y: auto;
          padding: 10px;
          background: #f5f5f5;
        }

        .message {
          background: white;
          padding: 8px 12px;
          margin: 6px 0;
          border-radius: 8px;
          max-width: 75%;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          word-break: break-word;
        }

        .inputContainer {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          padding: 8px;
          border-top: 1px solid #ddd;
          background: white;
          position: sticky;
          bottom: 0;
        }

        .inputContainer textarea {
          flex: 1;
          resize: none;
          padding: 8px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 6px;
          outline: none;
        }

        .inputContainer button {
          margin-left: 8px;
          padding: 8px 14px;
          background: #007bff;
          border: none;
          border-radius: 6px;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }

        .inputContainer button:active {
          background: #0056b3;
        }
      `}</style>
    </>
  );
}




function GeminiUI () {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const messagesEndRef = useRef(null);
  const topBarRef = useRef(null);
  const inputContainerRef = useRef(null);

  // Use a resize event listener to get the true viewport height,
  // which is crucial for handling the mobile virtual keyboard.
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll to the bottom whenever a new message is added.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle the "Send" button click.
  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), text: input, from: 'user' }]);
      setInput('');
    }
  };

  // Calculate the height of the message container dynamically
  // to fit between the top and bottom bars.
  const topBarHeight = topBarRef.current ? topBarRef.current.offsetHeight : 0;
  const inputContainerHeight = inputContainerRef.current ? inputContainerRef.current.offsetHeight : 0;
  const messageContainerHeight = viewportHeight - topBarHeight - inputContainerHeight;

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #f0f2f5;
          }

          .topBar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 56px;
            background-color: #007bff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            font-weight: 600;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            z-index: 1000;
          }

          .messageContainer {
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            padding: 10px;
          }
          
          .message {
            background-color: #e0e0e0;
            padding: 10px 15px;
            border-radius: 20px;
            margin: 5px 0;
            max-width: 75%;
            word-wrap: break-word;
          }

          .message.user {
            background-color: #007bff;
            color: white;
            align-self: flex-end;
          }
          
          .message.other {
            background-color: #e0e0e0;
            color: #333;
            align-self: flex-start;
          }

          .inputContainer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            display: flex;
            padding: 10px;
            background-color: white;
            box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
            align-items: center;
            z-index: 1000;
          }
          
          .inputContainer textarea {
            flex-grow: 1;
            padding: 10px;
            border-radius: 20px;
            border: 1px solid #ccc;
            margin-right: 10px;
            resize: none;
            max-height: 100px;
          }
          
          .inputContainer button {
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.2s;
          }

          .inputContainer button:hover {
            background-color: #0056b3;
          }
        `}
      </style>

      {/* Top bar for the title */}
      <div className="topBar" ref={topBarRef}>
        Simple Chat UI
      </div>

      {/* Message container that scrolls */}
      <div 
        className="messageContainer" 
        style={{ height: `${messageContainerHeight}px`, paddingTop: `${topBarHeight}px` }}
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.from}`}>
            {msg.text}
          </div>
        ))}
        {/* Empty div to auto-scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input container with a textarea and send button */}
      <div className="inputContainer" ref={inputContainerRef}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          rows="1"
        />
        <button onClick={handleSend}>
          &gt;
        </button>
      </div>
    </>
  );
};





function CopilotUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messageContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Ensure inputContainer stays above the virtual keyboard
  useEffect(() => {
    const handleFocus = () => {
      setTimeout(() => {
        // On mobile, sometimes we need to scroll input into view
        inputRef.current && inputRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 300);
    };

    const textarea = inputRef.current;
    if (textarea) {
      textarea.addEventListener("focus", handleFocus);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("focus", handleFocus);
      }
    };
  }, []);

  function handleSend() {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, id: Date.now() }]);
    setInput("");
  }

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: "100vw",
      background: "#f5f5f5",
      overflow: "hidden",
      fontFamily: "sans-serif"
    }}>
      {/* TopBar */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "56px",
        background: "#1976d2",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "18px",
        zIndex: 10,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
      }}>
        Messaging UI
      </div>

      {/* MessageContainer */}
      <div
        ref={messageContainerRef}
        style={{
          position: "absolute",
          top: "56px",
          bottom: "64px",
          left: 0,
          width: "100vw",
          overflowY: "auto",
          padding: "12px 8px",
          boxSizing: "border-box"
        }}
      >
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              marginBottom: "10px",
              alignSelf: "flex-end",
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <div style={{
              background: "#1976d2",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: "16px",
              maxWidth: "75vw",
              fontSize: "16px",
              wordBreak: "break-word"
            }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* InputContainer */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
        height: "64px",
        background: "#fff",
        borderTop: "1px solid #eee",
        display: "flex",
        alignItems: "center",
        padding: "8px",
        boxSizing: "border-box",
        zIndex: 11
      }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={1}
          style={{
            flex: 1,
            resize: "none",
            fontSize: "16px",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            marginRight: "8px",
            maxHeight: "40px"
          }}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "0 16px",
            height: "40px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}






function GeminiProUI () {
  // State for messages and the current input value
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there!", sender: 'other' },
    { id: 2, text: "Hi! How are you?", sender: 'user' },
    { id: 3, text: "I'm good, thanks! This is a demo of a mobile messaging UI.", sender: 'other' },
    { id: 4, text: "Looks great! The input bar stays at the bottom, even with the keyboard.", sender: 'user' },
  ]);
  const [inputValue, setInputValue] = useState('');
  
  // Ref to the messages container for auto-scrolling
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Function to scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputValue,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
      // Reset textarea height after sending
      if(textareaRef.current) {
        textareaRef.current.style.height = '24px';
      }
    }
  };
    
  // Handle 'Enter' key press for sending message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents adding a new line
      handleSendMessage();
    }
  };

  // Auto-resize textarea height based on content
  const handleTextareaChange = (e) => {
      setInputValue(e.target.value);
      e.target.style.height = 'auto'; // Reset height
      e.target.style.height = `${e.target.scrollHeight}px`; // Set to scroll height
  };

  // --- Inline Styles ---

  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f0f2f5',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    },
    topBar: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #dddddd',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    },
    topBarTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#333333',
    },
    messageContainer: {
      flex: 1,
      padding: '70px 10px 80px 10px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    messageBubble: {
      maxWidth: '75%',
      padding: '10px 15px',
      borderRadius: '20px',
      lineHeight: '1.4',
      wordWrap: 'break-word',
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#007aff',
      color: 'white',
    },
    otherMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#ffffff',
      color: '#333333',
      border: '1px solid #e5e5ea',
    },
    inputContainer: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '10px',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #dddddd',
      display: 'flex',
      alignItems: 'flex-end', // Aligns items to the bottom
      gap: '10px',
      zIndex: 100,
    },
    textarea: {
      flex: 1,
      resize: 'none',
      border: '1px solid #ccc',
      borderRadius: '20px',
      padding: '10px 15px',
      minHeight: '24px', // Corresponds to padding + lineHeight
      maxHeight: '120px',
      fontFamily: 'inherit',
      fontSize: '16px',
      lineHeight: '1.5',
      outline: 'none',
      overflowY: 'auto',
    },
    sendButton: {
      padding: '10px 15px',
      backgroundColor: '#007aff',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <div style={styles.topBarTitle}>John Doe</div>
      </div>

      {/* Message Container */}
      <div style={styles.messageContainer}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              ...styles.messageBubble,
              ...(msg.sender === 'user' ? styles.userMessage : styles.otherMessage),
            }}
          >
            {msg.text}
          </div>
        ))}
        {/* Empty div to which we scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div style={styles.inputContainer}>
        <textarea
          ref={textareaRef}
          style={styles.textarea}
          value={inputValue}
          onChange={handleTextareaChange}
          
          placeholder="Type a message..."
          
        />
        <button style={styles.sendButton} onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};


function MessageSaver() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSave = () => {
    if (input.trim() === "") return;
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        className="w-full p-3 border rounded-2xl shadow-sm focus:outline-none focus:ring"
        placeholder="Type your message..."
      />
      <button
        onClick={handleSave}
        className="mt-3 px-4 py-2 rounded-2xl shadow bg-blue-500 text-white hover:bg-blue-600"
      >
        Save Message
      </button>

      {messages.length > 0 && (
        <div className="mt-6 p-4 border rounded-2xl shadow-sm bg-gray-50 whitespace-pre-line">
          {messages[messages.length - 1]}
        </div>
      )}

      <div>
        {messages.map((item, idx) => (
          <div key={idx}>
            <strong style={{ whiteSpace: "pre-line" }}>{item}</strong>
          </div>
        ))}
      </div>

      <pre className="mt-4 p-3 text-sm bg-gray-100 rounded-2xl overflow-x-auto">
        {JSON.stringify(messages, null, 2)}
      </pre>
    </div>
  );
}

function GPTreasoningUI() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! Welcome to the chat.", who: "them" },
    { id: 2, text: "Hi — testing keyboard-aware input 😄", who: "me" },
  ]);
  const [text, setText] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [inputHeight, setInputHeight] = useState(48);

  const messagesRef = useRef(null);
  const textareaRef = useRef(null);
  const initialInnerHeightRef = useRef(typeof window !== "undefined" ? window.innerHeight : 0);

  // Auto-resize textarea and keep track of its height
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const resize = () => {
      ta.style.height = "auto";
      // clamp max height to something reasonable for mobile
      const newHeight = Math.min(ta.scrollHeight, 160);
      ta.style.height = `${newHeight}px`;
      setInputHeight(newHeight + 16); // padding + buffer
    };
    resize();
    ta.addEventListener("input", resize);
    return () => ta.removeEventListener("input", resize);
  }, []);

  // Keyboard awareness using visualViewport with a fallback to window.innerHeight differences
  useEffect(() => {
    const onViewport = () => {
      // visualViewport gives better info on mobile browsers
      const vv = window.visualViewport;
      if (vv) {
        // amount the keyboard covers = difference between layout viewport and visual viewport
        const heightDiff = Math.max(0, window.innerHeight - vv.height - (vv.offsetTop || 0));
        setKeyboardHeight(heightDiff);
      } else {
        // fallback: compare to initial innerHeight
        const diff = Math.max(0, initialInnerHeightRef.current - window.innerHeight);
        setKeyboardHeight(diff);
      }
    };

    // initial call
    onViewport();

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", onViewport);
      window.visualViewport.addEventListener("scroll", onViewport);
    }

    window.addEventListener("resize", onViewport);

    // when nothing else, try focusing/blur events on textarea as heuristic
    const ta = textareaRef.current;
    if (ta) {
      ta.addEventListener("focus", onViewport);
      ta.addEventListener("blur", onViewport);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", onViewport);
        window.visualViewport.removeEventListener("scroll", onViewport);
      }
      window.removeEventListener("resize", onViewport);
      if (ta) {
        ta.removeEventListener("focus", onViewport);
        ta.removeEventListener("blur", onViewport);
      }
    };
  }, []);

  // Scroll to bottom when messages or keyboardHeight change
  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    // small timeout to allow layout to settle on mobile
    const id = setTimeout(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, 50);
    return () => clearTimeout(id);
  }, [messages, keyboardHeight]);

  const send = () => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), text: text.trim(), who: "me" }]);
    setText("");
    // reset textarea height after sending
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  // computed styles
  const inputContainerStyle = {
    bottom: `${keyboardHeight}px`,
    // make sure system safe-area inset is respected (iOS notch / home indicator)
    paddingBottom: "env(safe-area-inset-bottom)",
  };

  const messagesPaddingBottom = inputHeight + 24; // 24px extra buffer

  return (
    <div className="h-screen w-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative overflow-hidden">
      {/* Top bar - fixed, transparent, blurred, elevated */}
      <header
        className="fixed inset-x-0 top-0 z-50 pointer-events-auto"
        style={{ WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" }}
      >
        <div className="backdrop-blur-sm bg-white/30 dark:bg-black/30 border-b border-white/10">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 flex items-center justify-center text-white font-bold">C</div>
            <div className="flex-1">
              <div className="text-sm font-semibold">Chat with Clara</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Online</div>
            </div>
            <div className="text-sm opacity-80">⋯</div>
          </div>
        </div>
      </header>

      {/* Messages container */}
      <main
        ref={messagesRef}
        className="absolute inset-x-0 top-16 bottom-0 overflow-y-auto px-4 pb-6 z-10"
        style={{ paddingBottom: `${messagesPaddingBottom}px` }}
      >
        <div className="max-w-2xl mx-auto mt-3 space-y-3">
          <AnimatePresence initial={false} mode="popLayout">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", stiffness: 600, damping: 30 }}
                className={`flex ${m.who === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl shadow-sm ${
                    m.who === "me"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">{m.text}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Input container - fixed to bottom, moves up with keyboardHeight */}
      <div
        className="fixed left-0 right-0 z-40 px-4 pt-3"
        style={inputContainerStyle}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={1}
                  placeholder="Type a message..."
                  className="w-full resize-none rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 pr-12 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-shadow"
                  
                />
                {/* small send hint when typing */}
                <div className="absolute right-3 bottom-3 text-xs text-gray-400">↵ send</div>
              </div>
            </div>

            <button
              onClick={send}
              aria-label="Send"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 shadow-lg text-white disabled:opacity-50"
              disabled={!text.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.94 2.5a1 1 0 011.06-.21l13 6a1 1 0 01.01 1.82l-4.5 2.11-2.11 4.5a1 1 0 01-1.82.01l-6-13a1 1 0 01.21-1.06z" />
              </svg>
            </button>
          </div>

          {/* bottom safe-area spacer */}
          <div style={{ height: "env(safe-area-inset-bottom)" }} />
        </div>
      </div>
    </div>
  );
}








const ArrowUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

const ArrowLeftIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
    </svg>
);

function TopBar ({outpass}){
  return (
    <header className="fixed top-0 left-0 right-0 z-20">
      <div className="absolute top-0 left-0 w-full h-full bg-slate-900/70 backdrop-blur-lg"></div>
      <div className="relative z-10 flex items-center justify-between p-4 text-white">
        <button
          onClick={() => {outpass(33)}}
          className="p-2 -ml-2">
            <ArrowLeftIcon />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold">Jane Doe</h1>
          <p className="text-sm text-gray-300">online</p>
        </div>
        <div className="w-10 h-10 flex-shrink-0">
          <img
            src="https://placehold.co/100x100/7e22ce/ffffff?text=JD"
            alt="Jane Doe's Avatar"
            className="w-full h-full rounded-full object-cover border-2 border-white/50"
          />
        </div>
      </div>
    </header>
  );
};

const MessageBubble = ({ message }) => {
  const { text, isSent } = message;
  const bubbleClasses = isSent
    ? 'bg-blue-100  self-end rounded-l-2xl rounded-tr-2xl'
    : 'bg-slate-700 text-white self-start rounded-r-2xl rounded-tl-2xl';
  
  return (
    <div className={`w-full flex ${isSent ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[75%] md:max-w-[60%] p-3 px-4 shadow-md ${bubbleClasses}`}>
        <p className="text-base">{text}</p>
      </div>
    </div>
  );
};

const MessageContainer = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Dependency array ensures this runs when messages change

  return (
    // The pt-24 and pb-28 values create space so content isn't hidden by the fixed TopBar and InputContainer
    <main className="flex-1 overflow-y-auto pt-24 pb-28 px-4">
      <div className="flex flex-col space-y-4 whitespace-pre-line">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {/* This empty div is the target for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>
    </main>
  );
};

const InputContainer = ({ onSendMessage }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize the textarea height based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`; // Set to content height
    }
  }, [text]);


  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents new line on Enter
      handleSend();
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-20 bg-blue-50">
      {/* Blur effect */}
      <div className="absolute bottom-0 left-0 w-full h-full  "></div>
      
      {/* Content */}
      <div className="relative z-10 p-3 flex items-end">
        <textarea
          ref={textareaRef}
          className="flex-1 bg-slate-800  rounded-2xl px-4 py-2.5 resize-none border-2 border-transparent focus:outline-none focus:border-blue-500 transition-all duration-200"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ maxHeight: '120px', background: 'lightgrey' }} // Prevents infinite growth
        ></textarea>
        <button 
          onClick={handleSend}
          className="ml-3  text-white rounded-full p-3 flex-shrink-0 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:bg-slate-600 disabled:cursor-not-allowed"
          style={{  background: 'lightgrey' }}
          aria-label="Send message"
        >
          <ArrowUpIcon />
        </button>
      </div>
    </footer>
  );
};

function Geminipro2UI({outpass2}) {
  const [foroutpass, setForoutpass] = useState('');

  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey, how is it going?', isSent: false },
    { id: 2, text: 'Hi! I am doing great. Thanks for asking!', isSent: true },
    { id: 3, text: 'I am working on a new React project for a messaging UI.', isSent: true },
    { id: 4, text: 'Wow, that sounds amazing! Can you show me?', isSent: false },
    { id: 5, text: 'Sure, here is a preview!', isSent: true },
  ]);

  const handleSendMessage = (text) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      isSent: true,
    };
    setMessages([...messages, newMessage]);
  };

  useEffect(() => {
    if(foroutpass == 33){
      outpass2(33) //putting this line outside of IF will crash frontend
    }
  }, [foroutpass]);

  return (
    <div className=" h-screen w-screen flex flex-col font-sans antialiased">
      <TopBar outpass={setForoutpass}/>
      <MessageContainer messages={messages} />
      <InputContainer onSendMessage={handleSendMessage} />
    </div>
  );
}





function CalculationViaBackend({ token }) {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('');
  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://my-express-backend-gyj9.onrender.com";
  const handleSubmit = async (math) => {
    //setResult('');
    if (!math.trim()) {
      setResult('Please enter an expression');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ expr: math }),
      });
      const data = await res.json();
      setResult(data.result !== undefined ? data.result : data.error);
    } catch {
      setResult('Error connecting to backend');
    }
  };
  function handleChange(e){
    const current = e.target.value
    setExpr(current)
    handleSubmit(current)
  }
  return (
    <>
      <input
        type="text"
        value={expr}
        onChange={handleChange}
        placeholder="e.g. 2+3*4"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        className={`px-4 py-2 text-white rounded-lg hover:bg-blue-700 bg-blue-600 disabled:bg-gray-400`}
        disabled={!expr.trim()}
        onClick={() => setResult('button is working')}
        >send
      </button>
      <div>{result}</div>
    </>
  );
}

function RenderUI() {
  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5001"
      : "https://my-express-backend-gyj9.onrender.com";

  useEffect(() => {
    fetch(`${API_URL}/`)
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return (
    <>
      <h1>Render</h1>
      <CalculationViaBackend/>
    </>
  )
}



function DatabaseUI() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        { name }
      );
      setMessage(`Saved: ${res.data.name}`);
      setName("");
    } catch (err) {
      setMessage("Error saving name");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Enter your name</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name"
      />
      <button onClick={handleSubmit}>Send</button>
      <p>{message}</p>
    </div>
  );
}





function VersionA1({outpass}) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const handleContinue = async () => {
    //setError(''); // => causes screen flickering when click continue with empty input
    try {
      const res = await fetch(
        window.location.hostname === "localhost"
          ? "http://localhost:5000/auth-passcode"
          : "https://my-express-backend-gyj9.onrender.com/auth-passcode",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passcode }),
        }
      );
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('jwt_token', data.token);
        // Optionally: redirect or update UI here
        setToken(data.token)
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch {
      setError('Network error');
    }
  };

  /* useEffect(() => {
    if(token){
      outpass(322) //at beginning, there is no token, as soon as there is, this will route you to this atpage num
    }
  }, [token]); */

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <h1 className="text-3xl font-bold mb-10">MathWeb</h1>
      <input
        type="text"
        placeholder="passcode"
        value={passcode}
        onChange={e => setPasscode(e.target.value)}
        className="w-64 px-4 py-2 mb-4 border rounded-full text-center focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        className="w-64 py-2 mb-3 bg-black text-white rounded-full font-medium hover:bg-gray-800"
        onClick={handleContinue}
      >
        continue
      </button>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <a href="#" className="text-sm text-black underline hover:text-gray-700">
        Sign up
      </a>
      {token && <h3>signed in</h3>}
      <CalculationViaBackend token={token}/>
    </div>
  );
}


function VersionA2({outpass}){

  function handleSignout(){
    localStorage.removeItem('jwt_token')
    outpass(33)
  }


  return(
    <>
      <h1>page 2 is here</h1>
      <button onClick={handleSignout}>sign out</button>
    </>
  )
}



function DatabaseDisplay() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  function handleContinue(){
    setUsers((prev) => [...prev, { name: 'user1', message: text }]);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Users Table</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="w-full resize-none rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 pr-12 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-shadow"
      />
      <button
        className="w-64 py-2 mb-3 bg-black text-white rounded-full font-medium hover:bg-gray-800"
        onClick={handleContinue}
      >
        continue
      </button>
      <FrontendToDatabase/>
      <div>
        {/* if this throws error, make sure the endpoint fetches the right table */}
        {users.map((item, idx) => (
          <div key={idx}>
            <strong>{item.name}</strong>
            {item.message && <MathRenderer text={item.message}/>}
          </div>
        ))}
      </div>
      <div style={{ whiteSpace: "pre-line" }}>
        {/* this is meant to display the systemprompt for debugging sake */}
        {/* comment this out if you don't wanna see it */}
        {/* if this throws error, make sure the endpoint fetches the right table */}
        {users
          .filter(item => item.id === 2)//this will filter or display specific items only
          .map((item, idx) => (
            <div key={item.id ?? idx}>{/* if there is item.id then use it, otherwise simply use idx */}
              <strong>{item.systemprompt}</strong>
            </div>
          ))}
      </div>
      {/* if this throws error, make sure the endpoint fetches the right table */}
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}


//this compo is to display database from postgres
//if you want this compo to display another database, make sure do following
//check endpoint url here
//in backend, make sure the code calls the right tablename
//in this component, adjust the id, the key name
function DisplaySystemPromptForDebugging() {
  const [thewholetable, setThewholetable] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/admin-to-get-db`)
      .then((response) => { setThewholetable(response.data); })
      .catch((error) => { console.error(error); });
  }, []);
  return (
    <div>
      <div style={{ whiteSpace: "pre-line" }}>
        {thewholetable
          .filter(item => item.id === 1)//this will filter or display specific items only
          .map((item, idx) => (
            <div key={item.id ?? idx}>{/* if there is item.id then use it, otherwise simply use idx */}
              <strong>{item.columnprompt}</strong>
            </div>
          ))}
      </div>
      {/* <pre>{JSON.stringify(thewholetable, null, 2)}</pre> */}
    </div>
  );
}

//this component isn't checked yet, i don't know if it works or not
function Inpass_DisplaySystemPrompt_ForDebugging({inpass_thewhole_jsonarray_here}) {
  const [thewholetable, setThewholetable] = useState(inpass_thewhole_jsonarray_here);
  return (
    <div>
      <div style={{ whiteSpace: "pre-line" }}>
        {thewholetable
          .filter(item => item.id === 2)//this will filter or display specific items only
          .map((item, idx) => (
            <div key={item.id ?? idx}>{/* if there is item.id then use it, otherwise simply use idx */}
              <strong>{item.systemprompt}</strong>
            </div>
          ))}
      </div>
      {/* <pre>{JSON.stringify(thewholetable, null, 2)}</pre> */}
    </div>
  );
}



function FrontendToDatabase() {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/admin-update-systemprompt`, {
        message,
      }, {
        headers: { "Content-Type": "application/json" }
      });
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <textarea
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={sendMessage}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >Send
      </button>
      <DisplaySystemPromptForDebugging/>
    </div>
  );
}






function FrontendBackendAPI() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // <-- Add this state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true); // <-- Set processing to true

    const res = await fetch(`${API_URL}/gptgeneralbackend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    let data = {};
    try {
      data = await res.json();
    } catch {
      setResponse("No response or invalid JSON from server.");
      setIsProcessing(false); // <-- Reset processing
      return;
    }
    setResponse(data.reply || "No reply from server.");
    setIsProcessing(false); // <-- Reset processing
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Ask me something..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-lg hover:bg-blue-700 bg-blue-600 disabled:bg-gray-400`}
          disabled={isProcessing || !prompt.trim()} // <-- Disable while processing
        >
          {isProcessing ? "Computer is thinking..." : "Send"}
        </button>
      </form>
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Output editor..."
        rows={4}
      />
      <div style={{ maxWidth: "600px", whiteSpace: "pre-line" }}>
        {response && <MathRenderer text={response} />}
      </div>
    </div>
  );
}







//check frontend url, check frontend component name
//check all the backend urls that the component make calls to

//derived from component FrontendBackendAPI
//this component is for you admin
//it features all functions like auth, admincheck, requestCount, all in one, to simulate the entire picture for you
function GPTgeneral() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // <-- Add this state
  const [password, setPassword] = useState("");
  const [vartoken, setVartoken] = useState("");

  
  //auth flow
  //type password => click sign in => axios sends password to /auth in backend
  //backend checks password => sends token+user back to frontend
  //frontend receives token+user => stores them in localStorage for later use
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/authVer2`, {password,});

      if (response.data.token) {
        setVartoken(response.data.token);//this is vartoken, so it will be lost whenever reload the page
        //and other components can't access vartoken, unless this component outpasses vartoken
        localStorage.setItem("localtoken", response.data.token);//this is localtoken
        //which will retain after page reload and can be accessed anywhere in frontend code
        localStorage.setItem("localuser", response.data.user.username);//if you write .user only, it will simply print "object"
      } else {
      }
    } catch (error) {
    }
  };
  const handleLogout = async () => {
    setVartoken('nothing')
    localStorage.setItem("localtoken", 'nothing')
  }


  //THIS IS VERSION THE NON-STREAMING VERSION, MAKE SURE IT GOES WITH THE NON-STREAMING VERSION IN BACKEND TOO
  //AND DISABLE THE STREAMING VERSIONS BOTH IN FRONTEND AND BACKEND
  //this will send prompt to a protected endpoint in backend
  //if you wanna remove the protection, just remove the middleware in the endpoint in backend
  //protected endpoint flow
  // once you signed in, the token either stored as localtoken or vartoken
  // but you should include the token in the backend call
  const handleSubmitNONSTREAMING = async (yourevent) => {
    yourevent.preventDefault(); // this is a critical line for form, without this line the whole page will reload when you submit
    setIsProcessing(true); // this is for button disable during API thinking

    try {
      const response = await axios.post(`${API_URL}/gpt-non-streaming`, {
        prompt,//the prompt will be in req.body.prompt when it arrives in backend
      }, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${vartoken}`
          //the token will be in req.headers.authorization when it arrives in backend
          //you can always send token to backend regardless backend requires it or not
        },
      });

      setResponse(response.data.reply || "Frontend: No reply from server.");
    } catch (error) {
      setResponse("Frontend: No response or invalid JSON from server.");
    } finally {
      setIsProcessing(false); // for button disable
    }
  };

  //THE STREAMING VERSION, MAKE SURE IT GOES WITH THE STREAMING VERSION IN BACKEND TOO
  //AND DISABLE THE NON-STREAMING VERSIONS BOTH IN FRONTEND AND BACKEND
  const handleSubmitSTREAMING = async (yourevent) => {
    yourevent.preventDefault();
    setIsProcessing(true);
    setResponse(""); // clear previous response

    try {
      const token = vartoken || localStorage.getItem("localtoken");

      const response = await fetch(`${API_URL}/gpt-streaming`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(line => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data:")) {
            const jsonStr = line.replace(/^data:\s*/, "");
            if (jsonStr === "[DONE]") break;

            try {
              const data = JSON.parse(jsonStr);
              if (data.token) {
                fullText += data.token;
                setResponse(prev => prev + data.token); // update UI live
              }
            } catch (err) {
              console.error("Frontend stream parse error:", err);
            }
          }
        }
      }
    } catch (error) {
      console.error("Streaming failed:", error);
      setResponse("Frontend: streaming failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div className="space-x-1">
        <input
          className="w-[300px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={`px-4 py-2 text-white rounded-lg hover:bg-blue-700 bg-blue-600 disabled:bg-gray-400`}
          disabled={!password.trim()}
          onClick={handleLogin}
        >sign in
        </button>
        <button
          className={`px-4 py-2 text-white rounded-lg hover:bg-blue-700 bg-blue-600 disabled:bg-gray-400`}
          onClick={handleLogout}
        >sign out
        </button>
      </div>
      <form onSubmit={handleSubmitNONSTREAMING}>
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Ask me something..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-lg hover:bg-blue-700 bg-blue-600 disabled:bg-gray-400`}
          disabled={isProcessing || !prompt.trim()} // <-- Disable while processing
        >
          {isProcessing ? "Computer is thinking..." : "Send"}
        </button>
      </form>
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Output editor..."
        rows={4}
      />
      <div style={{ maxWidth: "600px", whiteSpace: "pre-line" }}>
        {response && <MathRenderer text={response} />}
      </div>
    </div>
  );
}










function ImageUpload() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setDescription("");

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${API_URL}/api/analyze-image`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setDescription(data.description || "No description found");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      />

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>

      {true && (
        <div className="mt-4 p-4 border rounded-lg shadow w-full max-w-md">
          <h2 className="font-bold mb-2">Image Description:</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full max-w-[600px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            rows={4}
            placeholder="image description"
          />
        </div>
      )}
    </div>
  );
}





function ExampleRequestLimit() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [messages, setMessages] = useState([]);
  const [limitReached, setLimitReached] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/authVer2", { password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setMessages(["✅ Logged in as Alice"]);
    } catch (err) {
      alert("❌ Invalid password");
    }
  };

  const handleRequest = async () => {
    if (limitReached) return;

    try {
      const res = await axios.get("http://localhost:5000/requestcount", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages((prev) => [...prev, res.data.message]);
    } catch (err) {
      if (err.response?.status === 429) {
        setLimitReached(true);
        setMessages((prev) => [...prev, "⚠️ Request limit reached!"]);
      } else {
        setMessages((prev) => [...prev, "❌ Error sending request"]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!token ? (
        <div className="bg-white p-6 rounded-2xl shadow-md w-80 text-center">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <input
            type="password"
            className="border p-2 rounded w-full mb-3"
            placeholder="Enter password (123)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleLogin}
          >
            Send
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-md w-96 text-center">
          <h2 className="text-xl font-bold mb-4">Welcome Alice</h2>
          <button
            disabled={limitReached}
            className={`px-4 py-2 rounded ${
              limitReached ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            } text-white`}
            onClick={handleRequest}
          >
            Send Request
          </button>
          <div className="mt-4 text-left space-y-1">
            {messages.map((m, i) => (
              <div key={i} className="text-sm">{m}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}




function ExampleForAdminOnly() {
  const [input, setInput] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const res = await fetch(`${API_URL}/authVer2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: input }),
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);//this token is only stored in variable, so it will be lost whenever reload the page
      //and other components can't access the token, unless this component outpasses the token
      setMessage(`Logged in as ${data.user.username}`);
    } else {
      setMessage(data.error || "Login failed");
    }
  };

  const handleAdmin = async () => {
    const res = await fetch(`${API_URL}/foradmin`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMessage(data.message || data.error);
    //res.json stands for DataStreamFromBackend
    //"message" and "error" are not arbitrary
    // they are named "message" and "error" because in the DataStreamFromBackend
    // they are written "message" and "error"
    //this is the important linker between backend and frontend
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-80 text-center">
        <h1 className="text-2xl font-bold mb-4">Simple Login</h1>
        <input
          type="text"
          className="border p-2 w-full rounded mb-3"
          placeholder='Type "123" or "321"'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2"
          disabled={!input}
        >
          Send
        </button>

        <button
          onClick={handleAdmin}
          className="bg-purple-500 text-white px-4 py-2 rounded w-full"
          disabled={!token}
        >
          Access /foradmin
        </button>

        {message && (
          <div className="mt-4 text-sm text-gray-700 bg-gray-50 p-2 rounded">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}




function ForAdminToUpdateSystemPrompt() {
  const [systemprompt, setSystemprompt] = useState("");
  const [token, setToken] = useState('')
  const [paswword, setPaswword] = useState('')

  useEffect(() => {
    const savedToken = localStorage.getItem('jwt_token');
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLogin = async () => {
    const res = await fetch(`${API_URL}/authVer2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: input }),
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);//this token is only stored in variable, so it will be lost whenever reload the page
      //and other components can't access the token, unless this component outpasses the token
      setMessage(`Logged in as ${data.user.username}`);
    } else {
      setMessage(data.error || "Login failed");
    }
  };

  return (
    <div>
      <input
        value={paswword}
        onChange={(e) => setSystemprompt(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="password"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2"
        disabled={!paswword}
      >
        sign in
      </button>
      <textarea
        value={systemprompt}
        onChange={(e) => setSystemprompt(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        placeholder="input your systemprompt"
      />
      {token &&
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2"
          disabled={!systemprompt}
        >
          send
        </button>
      }
    </div>
  )
}




//THIS COMPONENT is for WEBSOCKET
//  to solve the "unable to stream" issue on android
//this has to go with WEBSOCKET endpoint in backend in order to make everything work
//to use websocket, you need to npm install ws in backend
//  push package.json to github
function PageforWebsockets() {
  const [wsStatus, setWsStatus] = useState('disconnected');
  const [streamText, setStreamText] = useState('');
  const [input, setInput] = useState('Write a short poem about autumn in 3 lines.');
  const wsRef = useRef(null);
  const [username, setUsername] = useState("");//new1
  const [password, setPassword] = useState("");
  const [vartoken, setVartoken] = useState("");

  /* const handleLogin = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/authVer2`, { password, });

      if (response.data.token) {
        setVartoken(response.data.token);//this is vartoken, so it will be lost whenever reload the page
        //and other components can't access vartoken, unless this component outpasses vartoken
        localStorage.setItem("localtoken", response.data.token);//this is localtoken
        //which will retain after page reload and can be accessed anywhere in frontend code
        localStorage.setItem("localuser", response.data.user.username);//if you write .user only, it will simply print "object"
      } else {
      }
    } catch (error) {
    }
  }; */
  
  //derived from handleLogin of authVer2
  //this handleLogin is for authVer3, disable other handleLogin if you wanna use this one
  const handleLogin = async () => {
    try {
      const response = await axios.post
        (`${import.meta.env.VITE_API_URL}/authVer3`, { username, password, });

      if (response.data.token) {
        setVartoken(response.data.token);
        localStorage.setItem("localtoken", response.data.token);
        localStorage.setItem("localuser", response.data.user.username);
        console.log("login successfully: " + response.data.user.username)
      } else { }
    } catch (error) {
    }
  };
  const handleLogout = async () => {
    setVartoken('nothing')
    localStorage.setItem("localtoken", 'nothing')
  }

  useEffect(() => {
    setVartoken(localStorage.getItem("localtoken"))
    if (vartoken != 'nothing' && vartoken != '' && vartoken != null) {
      //it's important to have a top and a bottom running conditions for useeffect to prevent its own self-running
      // because devtools will throw some annoying errors
      const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
      // const wsUrl = `${protocol}://${window.location.hostname}:5000`; // adjust port if backend different
      const wsUrl = `${import.meta.env.VITE_WSURL}/ws?token=${vartoken || 'usernone'}`; //modified
      //IMPORTANT, sensitive info can be leaked here, be careful
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => setWsStatus('connected');
      ws.onclose = () => setWsStatus('closed');
      ws.onerror = (e) => {
        console.error('WebSocket error', e);
        setWsStatus('error');
      };

      ws.onmessage = (evt) => {
        try {
          const msg = JSON.parse(evt.data);
          if (msg.type === 'delta') {
            // append token
            setStreamText((s) => s + msg.content);
          } else if (msg.type === 'done') {
            setWsStatus('done');
          } else if (msg.type === 'error') {
            setWsStatus('error: ' + (msg.message || 'unknown'));
          } else if (msg.type === 'pong') {
            // ignore
          }
        } catch (err) {
          console.error('invalid ws message', err);
        }
      };

      return () => {
        ws.close();
      };
    }
  }, [vartoken]);

  function startStream() {
    setStreamText('');
    setWsStatus('streaming');

    const messages = [
      { role: 'user', content: input }
    ];

    const payload = {
      type: 'start',
      model: 'o3-mini', //model hereeeeeeeeeeeeeee, if you clear model here, frontend will throw error
        //IMPORTANT, in this websocket code, the model option is decided in frontend, not backend
      messages: input, //modified, originally messages = itself here
        //i fixed this one to easier add systemprompt in backend
    };

    wsRef.current.send(JSON.stringify(payload));//THIS IS WHERE request is send to backend
  }

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui, sans-serif' }}>
      
      <p>Status: <strong>{wsStatus}</strong></p>
      <div className="space-x-1">
        <input
          className="max-w-[600px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="max-w-[600px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="px-4 py-2 text-white rounded-lg hover:bg-blue-700 bg-blue-600 disabled:bg-gray-400"
          disabled={!password.trim() || !username.trim()}
          onClick={handleLogin}
        >
          sign in
        </button>
        <button
          className="px-4 py-2 text-white rounded-lg hover:bg-blue-700 bg-blue-600 disabled:bg-gray-400"
          onClick={handleLogout}
        >
          sign out
        </button>
      </div>
      <br />

      <div>
        <textarea
          className="w-full max-w-[600px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          rows={4}
          cols={60}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 0 }}>
        <button
          className="px-4 py-2 text-white rounded-lg hover:bg-blue-700 bg-blue-600 disabled:bg-gray-400"
          onClick={startStream}
          // Allow sending a new message when connected or after a previous one is done
          disabled={!['connected', 'done'].includes(wsStatus) || !input.trim()}
        >
          {wsStatus === 'streaming' ? 'computer is thinking...' : 'send'}
        </button>
      </div>

      <textarea
        style={{ marginTop: 8 }}
        className="w-full max-w-[600px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
        /* standard css for textarea */
        rows={4}
        cols={60}
        value={streamText}
        onChange={(e) => setStreamText(e.target.value)}
        placeholder="output editor"
      />

      
      <div style={{ maxWidth: "600px", whiteSpace: "pre-wrap" }}>
        {streamText && <MathRenderer text={streamText} />}
      </div>
    </div>
  );
}




function ImageInput() {
  const [imageName, setImageName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageName.trim() !== "") {
      navigate(`/result?name=${encodeURIComponent(imageName)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Enter Image Name</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          placeholder="Type image name..."
          className="border border-gray-300 rounded-lg px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
        >
          Go
        </button>
      </form>
    </div>
  );
}

function ResultPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const imageName = params.get("name");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Result Page</h1>
      <div className="border border-gray-300 rounded-lg p-4 text-lg">
        {imageName ? imageName : "No image name provided."}
      </div>
    </div>
  );
}







function SlowResponse() {
  const [status, setStatus] = useState("Idle");
  const [delaysimulation, setDelaysimulation] = useState(1000);

  const handleClick = async () => {
    setStatus("⏳ Calling backend...");
    try {
      const response = await fetch("http://localhost:5000/api/start", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ delaysimulation }),
      });
      const text = await response.text();
      setStatus(text);
    } catch (error) {
      setStatus("❌ Error calling backend");
    }
  };

  return (
    <div>
      <h1>Simulate Slow Backend Chain</h1>
      <input
        className="w-full max-w-[600px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
        value={delaysimulation}
        onChange={(e) => setDelaysimulation(e.target.value)}
      />
      <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600" onClick={handleClick}>Start Process</button>
      <p>Status: {status}</p>
    </div>
  );
}





function StreamExample() {
  const [data, setData] = useState("");
  const [xvar, setXvar] = useState(0);

  useEffect(() => {
    const fetchStream = async () => {
      const response = await fetch("http://localhost:5000/endpoint1");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setData((prev) => prev + chunk);
      }
    };
    if(xvar > 0){
      fetchStream();
    }
  }, [xvar]);

  return (
    <div style={{ whiteSpace: "pre-wrap" }}>
      <h2>Streaming Response:</h2>
      <button
      className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
      onClick={() => setXvar(prev => prev + 1)}>activate
      </button>
      <div>{data}</div>
    </div>
  );
}





function Login_Add(){
  const [jsoncache, setJsoncache] = useState("");
  const [atpage, setAtpage] = useState(55);
  const [server, setServer] = useState('')
  const [token1, setToken1] = useState('')

  //whenever reload => check if token, if yes (regardless valid or not) => route to designated atpage
  //this will override the useState above if there is token. to make useState work again, delete the token in localStorage
  /* useEffect(() => {
    const savedToken = localStorage.getItem('jwt_token');
    if (savedToken) {
      setAtpage(322);
    }
  }, []); */
  
  return (
    <>
      <div>
        {atpage == 0 && <LoginPage outpassPage={setAtpage} />}
        {atpage == 123 && <JsonDisplayPage outpass2={setJsoncache} inpass={jsoncache}/>}
        {atpage == 111 && <ChatPage />}
        {atpage == 1 && <Another outpassBackpage={setAtpage} outpassjson={setServer} inpassServer={server}/>}
        {atpage == 99 && <AllInOnePage />}
        {atpage == 55 && <DatabaseDisplay />}
        {atpage == 12 && <FrontendBackendAPI />}
        {atpage == 13 && <ImageUpload />}
        {atpage == 444 && <CalculationViaBackend />}
        {atpage == 15 && <ExampleRequestLimit />}
        {atpage == 16 && <ExampleForAdminOnly />}
        
        {/* this is hard to understand, at first, atpage=33, triggering this component, now atpage=null, detriggering this very component */}
        {/* but since this doesn't create conflict, so there must a state other than null */}
        {atpage == 33 && <VersionA1 outpass={setAtpage}/>}
        {atpage == 322 && <Geminipro2UI outpass2={setAtpage}/>}
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GPTgeneral />} />
        <Route path="/login" element={<Login_Add />} />
        <Route path="/adminToUpdateDatabase" element={<FrontendToDatabase />} />
        <Route path="/gptgeneral" element={<GPTgeneral />} />
        <Route path="/testWS" element={<PageforWebsockets />} />
        <Route path="/ImageUpload" element={<ImageUpload />} />
        <Route path="/image" element={<ImageInput />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/slow" element={<SlowResponse />} />
        <Route path="/stream" element={<StreamExample />} />
      </Routes>
    </Router>
  );
}