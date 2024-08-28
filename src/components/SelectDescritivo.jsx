import React, { useState, useEffect, useRef } from 'react';

const SelectDescritivo = ({ titulo, opcoes, valor, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (opcao) => {
    onOptionSelect(opcao);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
      <div ref={selectRef} className="d-flex flex-column filtro position-relative">
        <label className="text-muted text-uppercase"><small>{titulo}</small></label>
        <div
            className="custom-select-box text-muted border rounded shadow"
            onClick={toggleDropdown}
        >
          <div className="selected-option">
            {valor.texto || "Select an option"}
          </div>
          <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
            {opcoes.map((opcao) => (
                <div
                    className="dropdown-item p-2 border-bottom"
                    key={opcao.id}
                    onClick={() => handleOptionClick(opcao)}
                >
                  <div className="option-text">{opcao.texto}</div>
                  <div className="option-description text-muted">{opcao.descricao}</div>
                  <div className="option-price text-primary">{opcao.preco}</div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default SelectDescritivo;
