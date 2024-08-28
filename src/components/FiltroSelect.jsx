import React, {useEffect} from 'react';

const FiltroSelect = ({opcoes, titulo, onChange, opcaoAtual, opcaoNula}) => {
  const [valor, setValor] = React.useState(opcaoAtual ?? opcoes[0]);

  useEffect(() => {
    if (opcaoAtual) {
      setValor(opcaoAtual);
    } else {
      if (opcaoNula) {
        setValor(opcaoNula);
      } else {
        setValor(opcoes[0]);
      }
    }
  }, []);

  const manipulaMudanca = (ev) => {
    const id = parseInt(ev.target.value);
    const item = opcoes.find(op => op.id === id);
    setValor(item);
    onChange(item);
  }

  return (
    <div className="d-flex flex-column filtro">
      <label className="text-muted text-uppercase"><small>{titulo}</small></label>
      <select
        className="text-muted border rounded shadow"
        onChange={manipulaMudanca}
        value={valor ? valor.id : null}
      >
        {opcoes.map((opcao) => (
          <option
            className="text-muted"
            key={opcao.id}
            value={opcao.id}
          >{opcao.texto}</option>
        ))}
      </select>
    </div>
  );
}

export default FiltroSelect;