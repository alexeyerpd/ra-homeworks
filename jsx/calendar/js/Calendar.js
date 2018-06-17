'use strict';

Date.prototype.daysInMonth = function() {
  return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

function Calendar({date}) {
  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day" style={{textTransform: 'capitalize'}}>{date.toLocaleString('ru', {weekday: 'long'})}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{date.toLocaleString('ru', {day: 'numeric'})}</div>
          <div className="ui-datepicker-material-month">{date.toLocaleString('ru', {month: 'long'})}</div>
          <div className="ui-datepicker-material-year">{date.toLocaleString('ru', {year: 'numeric'})}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month" style={{textTransform: 'capitalize'}}>{date.toLocaleString('ru', {month: 'long'})}</span>&nbsp;<span className="ui-datepicker-year">{date.toLocaleString('ru', {year: 'numeric'})}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col/>
            <col/>
              <col/>
                <col/>
                  <col/>
                    <col className="ui-datepicker-week-end"/>
                      <col className="ui-datepicker-week-end"/>
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
          {createCalendar()}
        </tbody>
      </table>
    </div>
  );
}

function createCalendar(date) {
  const amountDays = getAmountDays();
  const first = new Date(new Date().getFullYear(), new Date().getMonth(), getFirstDayValue());

  const resArr = [];

  for (let i = 0; i < amountDays; ) {
    const prom = [];
    for (let week = 0; week < 7; week++, i++) {
      const obj = {};
      first.setDate(first.getDate() + 1);

      obj.date = first.getDate();
      obj.isClass = compareMonth(first);

      prom.push(obj);
    }
    resArr.push(prom);
  }

  return resArr.map((date, ind) => {
    return (
      createWeek(date, ind)
    );
  });

}

function createWeek(data, ind) {
  return (
    <tr key={ind}>
      {data.map(createDay)}
    </tr>
  )
}

function createDay({date, isClass}) {
  return <td className={compareDate(date, isClass)} >{date}</td>
}

function compareDate(date, isCls) {
  if (new Date().getDate() === date) {
    return (isCls || "") + "ui-datepicker-today";
  } else {
    return isCls || null;
  }
}

function compareMonth(date) {
  const currentData = new Date();

  if (date.getMonth() !== currentData.getMonth()) {
    return "ui-datepicker-other-month";
  } else {
    return null;
  }

}

function getAmountDays() {
  const date = new Date();
  return date.daysInMonth() - getFirstDayValue() + getLastDayValue();
}

function getFirstDayValue() {
  let currnetDayValue = 1;

  function getDayy() {
    if (new Date(new Date().getFullYear(), new Date().getMonth(), currnetDayValue).getDay() === 1) {
      return currnetDayValue - 1;
    } else {
      currnetDayValue -= 1;
      return getDayy();
    }
  }

  return getDayy();
}

function getLastDayValue() {
  let currnetDayValue = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  let value = 1;

  function getDayy() {
    if (new Date(new Date().getFullYear(), new Date().getMonth(), currnetDayValue).getDay() === 6) {
      return value;
    } else {
      value++;
      currnetDayValue++;
      return getDayy();
    }
  }

  return getDayy();
}