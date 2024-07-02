import React from 'react';
import Icone from "./Icone";

const IconeComTitulo = ({name, size, color, titulo}) => {
  return(
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Icone name={name} size={size} color={color} />
      <strong className={`text-${color} text-uppercase`}>{titulo}</strong>
    </div>
  )
};

export default IconeComTitulo;