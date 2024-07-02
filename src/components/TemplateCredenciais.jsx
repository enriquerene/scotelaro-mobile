import React from 'react';
import Logo from "./Logo";

const TemplateCredenciais = ({children}) => {
  return(
    <div className="d-fle flex-column justify-content-center">
      <div className="d-flex flex-row align-items-center justify-content-center p-5">
        <Logo />
      </div>
      {children}
    </div>
  )
}

export default TemplateCredenciais;