import React, {createContext, useContext, useState} from "react";

const PushNotificationContext = createContext();

export const PushNotificationProvider = ({children}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('info');

  const notificar = ({mensagem, tipo = 'info'}) => {
    setVisible(true);
    setMessage(mensagem);
    setType(tipo);
    setTimeout(() => {
      setVisible(false);
    }, 4000);
  }
  const obtemEstadoAtual = () => {
    return {
      visivel: visible,
      mensagem: message,
      tipo: type
    }
  }
  return (
    <PushNotificationContext.Provider value={{ notificacao: obtemEstadoAtual(), notificar }}>
      {children}
    </PushNotificationContext.Provider>
  );
}

export const useNotification = () => useContext(PushNotificationContext);