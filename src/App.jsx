
import React, { useState, useEffect, useRef } from 'react';

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
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="user to chat"
          style={{
            borderRadius: "12px",
            border: "1px solid #ccc",
            padding: "10px",
            fontSize: "1em",
            width: "220px",
            resize: "vertical",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
          }}
        />
        <button
          onClick={sendMyjsonToBackend}
          style={{
            borderRadius: "20px",
            background: "#4f8cff",
            color: "#fff",
            border: "none",
            padding: "10px 24px",
            fontWeight: "bold",
            fontSize: "1em",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            transition: "transform 0.15s"
          }}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.92)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          send1
        </button>
      </div>
      <textarea
        value={outputValue}
        style={{
          borderRadius: "12px",
          border: "1px solid #ccc",
          padding: "10px",
          fontSize: "1em",
          width: "220px",
          marginBottom: "12px",
          resize: "vertical",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
        }}
      />
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <textarea
          value={botinput}
          onChange={(e) => setBotinput(e.target.value)}
          placeholder="bot to chat"
          style={{
            borderRadius: "12px",
            border: "1px solid #ccc",
            padding: "10px",
            fontSize: "1em",
            width: "220px",
            resize: "vertical",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
          }}
        />
        <button
          onClick={handleBotInput}
          style={{
            borderRadius: "20px",
            background: "#ffb84f",
            color: "#fff",
            border: "none",
            padding: "10px 24px",
            fontWeight: "bold",
            fontSize: "1em",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            transition: "transform 0.15s"
          }}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.92)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          send
        </button>
      </div>


      <div
        ref={messagesEndRef}
        style={{
          height: '600px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: '10px',
          background: '#f9f9f9',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginTop: '16px'
        }}
      >
        {myjson.map((item, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
              background: item.sender === 'user' ? '#d1e7dd' : '#e2e3e5',
              padding: '8px 12px',
              borderRadius: '16px',
              maxWidth: '70%',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <strong style={{fontSize: '0.9em'}}>{item.sender}</strong>
            <div>
              {item.text && <MathRenderer text={item.text}/>}
            </div>
          </div>
        ))}
      </div>

      {/* <pre>{JSON.stringify(myjson, null, 2)}</pre> */}
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






function Login_Add(){
  const [jsoncache, setJsoncache] = useState("");
  const [atpage, setAtpage] = useState(99);
  const [server, setServer] = useState('')
  return (
    <>
      <div>
        {atpage == 0 && <LoginPage outpassPage={setAtpage} />}
        {atpage == 123 && <JsonDisplayPage outpass2={setJsoncache} inpass={jsoncache}/>}
        {atpage == 111 && <ChatPage />}
        {atpage == 1 && <Another outpassBackpage={setAtpage} outpassjson={setServer} inpassServer={server}/>}
        {atpage == 99 && <AllInOnePage />}
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