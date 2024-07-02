import React from "react";
import IconeCalendar from "./IconeCalendar";
import IconeMoney from "./IconeMoney";
import IconeGroup from "./IconeGroup";
import IconeNotification from "./IconeNotification";
import IconeScotelaro from "./IconeScotelaro";
import IconeExpandMore from "./IconeExpandMore";
import IconeExpandLess from "./IconeExpandLess";
import IconeCheck from "./IconeCheck";
import IconeCheckCircle from "./IconeCheckCircle";
import IconeErrorCircle from "./IconeErrorCircle";
import IconeEye from "./IconeEye";
import IconeEyeSlash from "./IconeEyeSlash";
import IconeWarningCircle from "./IconeWarningCircle";
import IconeInfoCircle from "./IconeInfoCircle";

const Icone = ({name, size, color}) => {
  const cores = {
    'green': '#006800',
    'red': '#8a0000',
    'orange': '#b67c0d',
  };
  const cor = cores[color] ?? color;
  const icones = {
    'calendario': <IconeCalendar fill={cor} width={size} height={size} />,
    'financeiro': <IconeMoney fill={cor} width={size} height={size} />,
    'perfil': <IconeScotelaro cor={cor === 'white' ? 'white' : 'primary'} />,
    'turmas': <IconeGroup fill={cor} width={size} height={size} />,
    'mensagens': <IconeNotification fill={cor} width={size} height={size} />,
    'expandir': <IconeExpandMore fill={cor} width={size} height={size} />,
    'minimizar': <IconeExpandLess fill={cor} width={size} height={size} />,
    'check': <IconeCheck fill={cor} width={size} height={size} />,
    'check-circle': <IconeCheckCircle fill={cor} width={size} height={size} />,
    'error-circle': <IconeErrorCircle fill={cor} width={size} height={size} />,
    'warning-circle': <IconeWarningCircle fill={cor} width={size} height={size} />,
    'info-circle': <IconeInfoCircle fill={cor} width={size} height={size} />,
    'eye': <IconeEye fill={cor} width={size} height={size} />,
    'eye-slash': <IconeEyeSlash fill={cor} width={size} height={size} />,
  }
  return icones[name];
}

export default Icone;