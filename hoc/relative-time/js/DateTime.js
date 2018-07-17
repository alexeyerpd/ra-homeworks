'use strict';

const DateTime = props => {
  return (
    <p className="date">{props.date}</p>
  )
};

function newFormat(Valid, Component) {
  return class extends React.Component {

    render () {
      const date = Valid(this.props.date);
      return <Component date={ date } />
    }
  }
}

function ChangeDateTime(dataString) {
  const currentDate = new Date();
  const comparableDate = new Date(dataString);
  const hourseFactor = 1000 * 60 * 60;
  const differeneceTime = (currentDate - comparableDate) / hourseFactor;

  if (differeneceTime > 0 && differeneceTime < 1) {
    return `${Math.ceil(differeneceTime * 60)} минут назад`;
  } else if (differeneceTime > 1 && differeneceTime < 24) {
    return `${Math.ceil(differeneceTime)} часов назад`;
  } else if (differeneceTime > 24) {
    return `${Math.ceil(differeneceTime / 24)} дней назад`;
  }
}

const DateTimePretty = newFormat(ChangeDateTime, DateTime);