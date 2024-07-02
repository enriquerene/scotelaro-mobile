import {useState} from "react";

const CampoNome = ({onSuccess}) => {
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState('');

  const nomeUnico = (value) => {
    return value.trim().split(' ').length === 1;
  }
  const caracteresNaoAlfabeticos = (value) => {
    return !!value.trim().match(/[!@#$%^&*()_+\-0-9]/g);
  }

  const validacao = () => {
    if (nomeUnico(nome)) {
      setErro('Nome completo deve conter mais de um nome.');
    } else if (caracteresNaoAlfabeticos(nome)) {
      setErro('O nome contêm caracteres especiais ou numéricos.');
    } else {
      setErro('');
      onSuccess(nome);
    }
  }

  const estilosDeErro = erro !== '' ? 'border border-danger' : '';
  return (
    <div className="d-flex flex-column mb-2">
      <label className="text-white">Nome completo</label>
      <input
        type="text"
        placeholder="Nome completo"
        className={`input ${estilosDeErro}`}
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        onBlur={validacao}
        onFocus={() => {setErro('')}}
      />
      <span className="text-danger px-1 error-message">{erro}</span>
    </div>
  )
}

export default CampoNome;