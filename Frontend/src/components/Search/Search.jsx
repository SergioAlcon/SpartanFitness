import "./Search.css";

import { memo } from "react";

export const Search = memo(({ type, group, setType, setGroup }) => {
  return (
    <form className="search-form">
      <div>
        <select
          onChange={(e) => setType(e.target.value)}
          className="custom-select"
          aria-label="Filtrar por tipo"
          value={type}
        >
          <option value="">Filtrar por tipo</option>
          <option value="aerobico">Aeróbico</option>
          <option value="flexibilidad">Flexibilidad</option>
          <option value="fuerza">Fuerza</option>
        </select>
        {type ? (
          <button className="buttonX" onClick={() => setType("")}>
            <b>X</b>
          </button>
        ) : null}
      </div>
      <div>
        <select
          onChange={(e) => setGroup(e.target.value)}
          className="custom-select"
          aria-label="Filtrar por tipo"
          value={group}
        >
          <option value="">Filtrar por grupo muscular</option>
          <option value="piernas">Piernas</option>
          <option value="hombros">Hombros</option>
          <option value="brazos">Brazos</option>
          <option value="pecho">Pecho</option>
          <option value="espalda">Espalda</option>
          <option value="abdomen">Abdomen</option>
        </select>
        {group ? (
          <button className="buttonX" onClick={() => setGroup("")}>
            <b>X</b>
          </button>
        ) : null}
      </div>
    </form>
  );
});
