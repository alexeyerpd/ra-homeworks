'use strict';

function AuthForm({onAuth}) {
  return (
    <form className="ModalForm" action="/404/auth/" method="POST" onSubmit={onAuth}>
      <div className="Input">
        <input required type="text" placeholder="Имя" />
        <label></label>
      </div>
      <div className="Input">
        <input type="email" placeholder="Электронная почта" onChange={checkMail}/>
        <label></label>
      </div>
      <div className="Input">
        <input required type="password" placeholder="Пароль" onChange={checkNum}/>
        <label></label>
      </div>
      <button type="submit">
        <span>Войти</span>
        <i className="fa fa-fw fa-chevron-right"></i>
      </button>
    </form>
  );
}

function checkMail(event) {
  event.preventDefault();
  event.isDefaultPrevented();
  const target = event.currentTarget;
  target.value = target.value.replace(/[^A-Za-z0-9@_.\-]/gi, '');
}

function checkNum(event) {
  event.preventDefault();
  event.isDefaultPrevented();
  const target = event.currentTarget;
  target.value = target.value.replace(/\W/gi, '');
}

