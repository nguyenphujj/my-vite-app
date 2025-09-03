
import React, { useState, useEffect, useRef, useMemo } from 'react';

import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';





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
          return <BlockMath key={index}>{mathContent}</BlockMath>;
        } else if (part.startsWith('$') && part.endsWith('$')) {
          // Single dollar signs for inline math
          const mathContent = part.slice(1, -1);
          return <InlineMath key={index}>{mathContent}</InlineMath>;
        } else {
          // Regular text, handle multiline
          const lines = part.split('\n');
          return (
            <span key={index}>
              {lines.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < lines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </span>
          );
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
      "text": "Đây là lời giải:\n$$ 2x^2+4x-1=0 $$\nSử dụng công thức nghiệm của phương trình bậc hai $ax^2+bx+c=0$, ta có $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.\nTrong đó: $a=2$, $b=4$, $c=-1$.\n\nTính delta ($\\Delta$):\n$$ \\Delta = b^2 - 4ac = 4^2 - 4(2)(-1) $$\n$$ \\Delta = 16 + 8 $$\n$$ \\Delta = 24 $$\nVì $\\Delta > 0$, phương trình có hai nghiệm phân biệt:\n$$ x = \\frac{-4 \\pm \\sqrt{24}}{2(2)} $$\n$$ x = \\frac{-4 \\pm \\sqrt{4 \\cdot 6}}{4} $$\n$$ x = \\frac{-4 \\pm 2\\sqrt{6}}{4} $$\nChia cả tử và mẫu cho 2:\n$$ x = \\frac{-2 \\pm \\sqrt{6}}{2} $$\nVậy hai nghiệm của phương trình là:\n$$ x_1 = \\frac{-2 + \\sqrt{6}}{2} $$\n$$ x_2 = \\frac{-2 - \\sqrt{6}}{2} $$"
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
      "text": "Đây là lời giải:\n$$ 2x^2+4x-1=0 $$\nSử dụng công thức nghiệm của phương trình bậc hai $ax^2+bx+c=0$, ta có $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.\nTrong đó: $a=2$, $b=4$, $c=-1$.\n\nTính delta ($\\Delta$):\n$$ \\Delta = b^2 - 4ac = 4^2 - 4(2)(-1) $$\n$$ \\Delta = 16 + 8 $$\n$$ \\Delta = 24 $$\nVì $\\Delta > 0$, phương trình có hai nghiệm phân biệt:\n$$ x = \\frac{-4 \\pm \\sqrt{24}}{2(2)} $$\n$$ x = \\frac{-4 \\pm \\sqrt{4 \\cdot 6}}{4} $$\n$$ x = \\frac{-4 \\pm 2\\sqrt{6}}{4} $$\nChia cả tử và mẫu cho 2:\n$$ x = \\frac{-2 \\pm \\sqrt{6}}{2} $$\nVậy hai nghiệm của phương trình là:\n$$ x_1 = \\frac{-2 + \\sqrt{6}}{2} $$\n$$ x_2 = \\frac{-2 - \\sqrt{6}}{2} $$"
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
        "Reaction & Structure The Protein Folding Problem Proteins are chains of amino acids that fold into precise 3D shapes. Predicting folding was unsolved for decades, though AI (like DeepMind’s AlphaFold) has made big progress. Still, the full rules of folding dynamics aren’t fully understood. Catalysis Mysteries Catalysts speed up reactions, but often chemists don’t fully know how at the atomic level. For example, nitrogen fixation (turning N₂ into ammonia) in biological enzymes and industrial processes is still not completely understood. Water’s Weirdness Water has dozens of unusual properties (it expands when frozen, high heat capacity, multiple liquid phases). The exact molecular explanation for some of these anomalies is still debated.",
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
    "tinhyeu maunang (good v song) the night we met (good opening) obel the curse (good mid) ncs popsicle (like omfg, easy to forget) spice girls spice up vicetone walk thru fire noi gio roi (the clinic) hoa tinh (popular c song, gentle, smooth) doi tuthe (xam family tren lung) je te des mots (sad modern symphony, sounds like you made me smile) in this shirt (famous tik, i am lost, astronaut space theme, sounds like moon kid) 2.10 sounds like what https://www.youtube.com/watch?v=6G1tP10MrqM neu anh trang ko den https://www.youtube.com/watch?v=7gbw51prf5Y tay trai chi trang (c song, high pitch desperate) tuong quan (sounds like tranh duyen) mynhan (sounds like the thai) don't you worry child (like avicii) duong mot chieu (repeated, da biet nhau tu lau, v) way down we go (tik, ooh ooh ooh' ooh ooh' ooh`) ngoinha hoahong (banchan anh buoc) who loves the sun (weird good melody) so phai ketthuc where the trap is (liverpool pressing animals), ali the game ins (mayweather) fourth of july (tik mom mom) put your records on intentionally i fuck with you palladio (classic good) calabria (ronaldinho, why you run) hoa co lau (v good flow, flow like em nguyen, but with neutral accent) tinh nguyet thanthoai (c very good)"
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




function Login_Add(){
  const [jsoncache, setJsoncache] = useState("");
  const [atpage, setAtpage] = useState(22);
  const [server, setServer] = useState('')
  return (
    <>
      <div>
        {atpage == 0 && <LoginPage outpassPage={setAtpage} />}
        {atpage == 123 && <JsonDisplayPage outpass2={setJsoncache} inpass={jsoncache}/>}
        {atpage == 111 && <ChatPage />}
        {atpage == 1 && <Another outpassBackpage={setAtpage} outpassjson={setServer} inpassServer={server}/>}
        {atpage == 99 && <AllInOnePage />}
        {atpage == 22 && <CopilotUI />}
      </div>
    </>
  );
}
export default function App() {
  return (
    <>
      <Login_Add/>
    </>
  );
}