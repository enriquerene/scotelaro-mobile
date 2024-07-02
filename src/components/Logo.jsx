import React from 'react';
import logo from '../images/logo.png';
const Logo = ({width = 200, height = 150}) => {
  return <img
    src={logo}
    width={width}
    height={height}
  />;
}
export default Logo;