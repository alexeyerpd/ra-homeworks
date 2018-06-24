'use strict';

const Container = ({props, state, func}) => {
  return (
    <div className='container'>
      <div className={`dropdown-wrapper ${state.open ? "open" : ""}`} >
        <button className={"btn"} onClick={func.toggle} >
          <span>Account Settings</span>
          <i className="material-icons">public</i>
        </button>
        <Dropdown
          props={props}
          state={state}
          func={func} />
      </div>
    </div>
  )
};