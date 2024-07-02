import React from 'react';

const Botao = ({onClick, children}) => {
  return <button onClick={onClick} className="btn btn-block btn-primary text-white rounded-1">{children}</button>;
}

export default Botao;