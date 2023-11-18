import React from 'react';
import "./Filter.css";
const Filter = (props) => {
    const filters=["level","message","resourceId","traceId","spanId","commit","parentResourceId"]
    return ( 
        <div className="filter">
            <div className="title" style={{"fontWeight": "bold","marginBottom":"10px"}}>Filters</div>
            <div className="filter_list">
                {filters.map((filter, index) => (
                    <div className="filter_item" key={index}>
                        <input type="checkbox" id={filter}
                            name={filter}
                            value={filter}
                        onChange={props.handleSelect}/>
                        <label htmlFor={filter}>{filter}</label>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default Filter;