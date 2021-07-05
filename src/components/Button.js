import React from "react";

import "components/Button.scss";

const classname = require('classnames');


export default function Button(props) {
   console.log("---------PROPS-----------", props);

   let buttonClass = classname("button", {
    "button--confirm": props.confirm,
    "button--danger":props.danger
   })

   //  let buttonClass = "button";

  //  if(props.confirm){
  //     buttonClass += "button--confirm";
  //  }

  //  if(props.danger){
  //     buttonClass += "button--danger";
  //  }
   
   return (
     <
       button
       className={buttonClass}
       onClick={props.onClick}
       disabled={props.disabled}
     >
       {props.children}
     </button>
   );
}

