import Icone from "./Icone";
import { useNotification } from "../services/pushNotification.context";

const PushNotification = () => {
  const { notificacao } = useNotification();
  const iconePorTipo = {
    'sucesso': {nome: 'check-circle', cor: '#002b05', bg: 'success'},
    'aviso': {nome: 'warning-circle', cor: '#674801', bg: 'warning'},
    'erro': {nome: 'error-circle', cor: '#450000', bg: 'danger'},
    'info': {nome: 'info-circle', cor: '#004e4c', bg: 'info'},
  }
  const icone = iconePorTipo[notificacao.tipo] ?? iconePorTipo['info'];
  const classList = [
    'd-flex',
    'flex-row',
    'align-items-center',
    'push-notification',
    'p-1',
    `bg-${icone.bg}`,
  ];
  if (notificacao.visivel) {
    classList.push('visivel');
  }
  return(
    <div className="d-flex justify-content-center align-items-center">
      <div className={classList.join(' ')}>
        <span className="px-1"><Icone name={icone.nome} size={28} color={icone.cor}/></span>
        <strong style={{color: icone.cor}}>{notificacao.mensagem}</strong>
      </div>
    </div>
  )
}

export default PushNotification;