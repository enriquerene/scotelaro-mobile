import React, {useState} from 'react';
import Icone from "./Icone";

const CampoSenha = ({onSuccess}) => {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [visivel, setVisivel] = useState(false);

  const ICONE_MOSTRAR = 'eye';
  const ICONE_ESCONDER = 'eye-slash';

  const temOitoCaracteres = (val) => {
    return val.length >= 8;
  }

  const validacao = () => {
    if (!temOitoCaracteres(senha)) {
      setErro('A Senha deve conter pelo menos 8 caracteres.');
    } else {
      setErro('');
      onSuccess(senha);
    }
  }

  const estilosDeErro = erro !== '' ? 'border border-danger' : '';
  return(
    <div>
      <label className="text-white">Senha</label>
      <div className="input">
        <input
          type={visivel ? 'text' : 'password'}
          placeholder="Senha"
          value={senha}
          minLength={8}
          onChange={(e) => setSenha(e.target.value)}
          onBlur={validacao}
          onFocus={() => {setErro('')}}
        />
        <span className="icon" onClick={() => setVisivel(!visivel)}>
          <Icone size={24} color="#888" name={visivel ? ICONE_ESCONDER : ICONE_MOSTRAR } />
        </span>
      </div>
      <span className="text-danger px-1 error-message">{erro}</span>
    </div>
  )
}

export default CampoSenha;