import React from "react";
import { useState } from 'react';
import "./navbar.css";
import log from "./log.png";
const Navbar = (props) => {
   
    return ( 
        <nav className="navbar">
            <div className="navbar__title">
                <img src={log} alt="log" style={{ width: 80, height: 80 }} className="navbar__logo" />
                Log Query
            </div>
            <div className="navbar__items">
                    <div className="form-group">
                    <input
                        id="search"
                        name="search"
                        type="text"
                        placeholder="Enter Your Query...."
                        value={props.searchTerm}
                        onChange={props.handleChange} />
                        <button type="submit" onClick={props.handleSubmit}>Search</button>
                     </div>
     
            </div>
            <div className="timestapm">
                <p>From:</p>
                    <input type="text"
                        id="Start"
                    name="Start"
                    value={props.start}
                    onChange={props.handlestart}
                />
                <p>To:</p>
                    <input type="text"
                        id="End"
                    name="End"
                    value={props.end}
                    onChange={props.handleend}
                />
                </div>
        </nav>
     );
}
 
export default Navbar;