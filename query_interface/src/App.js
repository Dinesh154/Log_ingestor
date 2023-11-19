import React from "react";
import axios from "axios";
import "./App.css";
import Card from "./Card";
import Animated from "./Animated";
import { useState } from 'react';
import Filter from "./Filter";
import Navbar from "./Navbar";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [Logs, setLogs] = useState([]);
  const [start, setstart] = useState("");
  const [end, setend] = useState("");
  const [isloading, setisloading] = useState(false);
  const [issearching, setissearching] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const handlestart = (event) => { 
    setstart(event.target.value);
  };
  const handleend = (event) => { 
    setend(event.target.value);
  }

  const handleChange = (event) => {
    setissearching(true);
    setSearchTerm(event.target.value);
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault(); 
      setisloading(true);
      console.log("hello");
      console.log(checkedList,searchTerm)
      const response = await axios.post(`http://localhost:3000/log/search/${searchTerm}`, {
        "filters":checkedList,
        "start":start,
        "end":end
      });
      console.log(response.data);
      setisloading(false);
      if (response.data.length === 0) {
        alert("No logs found");
      }
      setLogs(response.data);
    } catch (error) {
      console.error(error);
    }
   
    
    
  }
  
  const handleSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    
    if (isChecked) {
      setCheckedList([...checkedList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedList.filter((item) => item !== value);
      setCheckedList(filteredList);
    }
  };

  return (
    <div className="Container">
      <span style={{"position": "sticky",
        "top": 0, "zIndex": 1, "backgroundColor": "rgb(215, 216, 216)"
      }}>
        <Navbar handlestart={handlestart} handleend={ handleend} searchTerm={searchTerm} handleSubmit={handleSubmit} handleChange={handleChange} />
      </span>
      <div className="body_content">
        <div className="filterContainer"><Filter handleSelect={handleSelect} /></div>
        {
        
      }
        {isloading && < div className="loading">Loading....</div>}
        { !isloading&&Logs &&<div className="cardContainer">
          {
            
            Logs.map((log) => {
              return <Card log={log} />;
            })
          }
           
           
        </div>}
      </div>
    </div>
  );
}

export default App;
