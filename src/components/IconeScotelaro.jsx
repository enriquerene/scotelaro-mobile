import React from "react";
import ScotelaroDog from "../images/logo-dog.png";

const IconeScotelaro = ({size = 64, color = 'white'}) => {
  const borderColor = `border-${color}`;
  return(
    <div className={`border border-5 ${borderColor} bg-black rounded-circle p-1`} style={{marginTop: -30}}>
      <img src={ScotelaroDog} width={size} alt="O"/>
    </div>
  );
}

export default IconeScotelaro;