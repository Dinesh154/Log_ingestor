import React from 'react'
import "./Card.css"
const Card = (props) => {
  return (
    <div className='card'>
        <div>level:<span>{props.log.level}</span></div>
        <div>message:<span>{props.log.message}</span></div>
        <div>resourceId:<span>{props.log.resourceId}</span></div>
        <div>timestamp:<span>{props.log.timestamp}</span></div>
        <div>traceId:<span>{props.log.traceId}</span></div>
        <div>spanId:<span>{props.log.spanId}</span></div>
        <div>commit:<span>{props.log.commit}</span></div>
        <div>parentResourceId:<span>{props.log.metadata.parentResourceId}</span></div>
    </div>
  )
}

export default Card;
