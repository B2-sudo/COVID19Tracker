import React from 'react';

function Base(props){
    return (


        
(props.data!=="")?<React.Fragment >
<h2>You Have Been Here For {props.time} Seconds.</h2>
    <h5>{props.data}</h5>
</React.Fragment>:<React.Fragment><h2>You Have Been Here For {props.time} Seconds.</h2>
    <h5>{props.data}</h5>
</React.Fragment>)
}


export default Base;

