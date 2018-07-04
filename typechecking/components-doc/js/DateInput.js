'use strict';

const checkDataValue = (props, propsName, componentName) => {
  const date = props[propsName];
  const regExps = [
    /[0-9]{1}$/,
    /[0-9]{2}$/,
    /[0-9]{3}$/,
    /[0-9]{4}$/,
    /[0-9]{4}-$/,
    /[0-9]{4}-[0-9]{1}$/,
    /[0-9]{4}-[0-9]{2}$/,
    /[0-9]{4}-[0-9]{2}-$/,
    /[0-9]{4}-[0-9]{2}-[0-9]{1}$/,
    /[0-9]{4}-[0-9]{2}-[0-9]{2}$/
  ];

  const checkDate = date.split('').reduce((memory, dateNum, index, array) => {
    if (!regExps[index]) return false;

    const currentValue = array.slice(0, index + 1).join("");
    const isValid = regExps[index].test(currentValue);

    if (!isValid) {
      memory = false;
    }

    return memory;
  }, true);


  let isCorrectDate = typeof date === 'string' && checkDate && date.length <= 10;
  if (!isCorrectDate) {
    return new Error(`Неверный параметр ${propsName}  компоненте ${componentName}: параметр должен быть в формате YYYY-MM-DD`)
  }

  return null;
};

class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstDate: true
    };
  }

  static get defaultProps() {
    return {
      valueDate: new Date().toISOString().split(/T/)[0]
    }
  }

  static get propTypes () {
    return {
      name: PropTypes.string,
      onChange: PropTypes.func,
      value: checkDataValue,
      required: PropTypes.bool
    }
  }

  handlerChange = (event) => {
    this.props.onChange(event);

    this.setState({firstDate: false})
  };


  render() {
    const { label, name, required, value, valueDate } = this.props;

    return (
      <div className="form-group">
        <label>{label}</label>
        <input type="text" className="form-control" name={name} onChange={this.handlerChange}
               value={this.state.firstDate ? valueDate : value} required={required} placeholder="YYYY-MM-DD"/>
      </div>
    );
  }
}