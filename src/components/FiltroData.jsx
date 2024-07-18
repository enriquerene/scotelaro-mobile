import React, {useEffect} from 'react';

const FiltroData = ({titulo, onChange, valorAtual = '', max = '', min = ''}) => {
  const [valor, setValor] = React.useState(valorAtual);

  useEffect(() => {
    setValor(valorAtual ? valorAtual : '');
  });

  const manipulaMudanca = (ev) => {
    const data = ev.target.value;
    setValor(data);
    onChange(data);
  }

  return (
    <div className="d-flex flex-column filtro">
      <label className="text-muted text-uppercase"><small>{titulo}</small></label>
      <input
        type="date"
        className="text-muted border rounded shadow"
        onChange={manipulaMudanca}
        value={valor}
      />
    </div>
  );
}

export default FiltroData;