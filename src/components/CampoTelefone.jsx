import {useState} from "react";

const CampoTelefone = ({onSuccess}) => {
  const [telefone, setTelefone] = useState('');
  const [erro, setErro] = useState('');

  const mascara = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{1,5})?(\d+)?/g, (_, p1, p2, p3) => {
        if (p3) {
          return `(${p1}) ${p2}-${p3}`;
        }
        if (p2) {
          return `(${p1}) ${p2}`;
        }
        return `(${p1}`;
      });
  }

  const temOnzeDigitos = (val) => {
    return val.replace(/\D/g, '').length === 11;
  }

  const validacao = () => {
    if (!temOnzeDigitos(telefone)) {
      setErro('Telfone deve conter 11 digitos.');
    } else {
      setErro('');
      onSuccess(telefone);
    }
  }

  const estilosDeErro = erro !== '' ? 'border border-danger' : '';
  return(
    <div className="d-flex flex-column">
      <label className="text-white">WhatsApp</label>
      <input
        type="text"
        placeholder="WhatsApp"
        className={`input ${estilosDeErro}`}
        value={telefone}
        maxLength={15}
        onChange={(e) => setTelefone(mascara(e.target.value))}
        onBlur={validacao}
        onFocus={() => {setErro('')}}
      />
      <span className="text-danger px-1 error-message">{erro}</span>
    </div>
  )
}

export default CampoTelefone;