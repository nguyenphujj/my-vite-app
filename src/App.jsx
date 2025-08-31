
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





function ApiResponseArea(){
  const [text, setText] = useState("");
  return(
    <>
      <div style={{display:"flex",width:"400px"}}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="api response input"
          style={{width:"400px",height:"400px"}}
        />
      </div>
    </>
  )
}
function InputOutputSection({inpass}){
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
      "text": "this is a test"
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

  return(
    <>
      <div style={{display:"flex"}}>
        <textarea
          value={userinput}
          onChange={(e) => setUserinput(e.target.value)}
          placeholder="user to chat"
        />
        <button onClick={handleUserInput}>send</button>
      </div>
      <div style={{display:"flex"}}>
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

      <pre>{JSON.stringify(myjson, null, 2)}</pre>
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