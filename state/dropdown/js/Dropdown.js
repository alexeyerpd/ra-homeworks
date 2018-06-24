'use strict';

const Dropdown = ({props, state, func}) => {

  const Droplist = (option) => {
    return (
      <li
        className={option === state.active ? "active" : ""}
        onClick={() => func.handle(option)} >
        <a href="#">{option}</a>
      </li>
    );
  };

  const droplist = props.options.map(Droplist);
  return (
    <ul className="dropdown">
      {droplist}
    </ul>
  );
};