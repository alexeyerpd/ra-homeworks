'use strict';

'use strict';

const profileStyle = {
  border: '1px solid #cccccc',
  borderRadius: '5px',
  width: '100%',
  height: '100%',
  margin: '5px'
};

const imageStyle = {
  width: '200px',
  height: '200px'
};

const linkPropType = (props, propsName, componentName) => {
  let prop = props[propsName];
  const regExp = /https:\/\/vk.com\/(id[0-9]+|[A-Za-z0-9_-]+)/;

  let isProp = typeof prop === 'string' && regExp.test(prop);
  if (!isProp) {
    return new Error(`Неверный параметр ${propsName} в компоненте ${componentName}`)
  }

  return null;
};

const birthdayPropType = (props, propsName, componentName) => {
  let prop = props[propsName];
  const regExp = /[\d]{4}\-[\d]{2}\-[\d]{2}/;
  const data = new Date(prop);

  let isProp = typeof prop === 'string' && regExp.test(prop) && data <= new Date();
  if (!isProp) {
    return new Error(`Неверный параметр ${propsName} в компоненте ${componentName}`)
  }

  return null;
};



const createChainableTypeChecker = (validate) => {
  const checkType = (isRequired, props, propsName, componentName) => {
    if (props[propsName] === null) {
      if (isRequired) {
        return new Error(`Обязательный атрибут ${propsName} не был передан компоненту ${componentName}`)
      }
      return null;
    } else {
      return validate(props, propsName, componentName);
    }
  };

  let chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
};

const birthdayPropTypeChecker = createChainableTypeChecker(birthdayPropType);
const linkPropTypeChecker = createChainableTypeChecker(linkPropType);

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  static get defaultProps() {
    return {
      img: './images/profile.jpg'
    }
  }

  static get propTypes() {
    return {
      img: PropTypes.string,
      birthday: birthdayPropTypeChecker,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      url: linkPropTypeChecker
    }
  }

  checkDate = (birthday) => {
    if (/[\d]{4}\-[\d]{2}\-[\d]{2}/.test(birthday)) {
      const data = new Date(birthday);
      if (data <= new Date()) {
        return data.toISOString().split(/T/)[0];
      } else {
        return new Date().toISOString().split(/T/)[0];
      }
    } else {
      return new Date().toISOString().split(/T/)[0];
    }
  };

  checkLink = (link) => {
    const regExp = /https:\/\/vk.com\/(id[0-9]+|[A-Za-z0-9_-]+)/;
    if (regExp.test(link)) {
      return link;
    } else {
      return 'incorrect link'
    }
  };

  render() {
    return (
      <div className="col-md-4 text-center" style={{marginBottom: '10px'}}>
        <div style={profileStyle}>
          <h2>{this.props.first_name} {this.props.last_name}</h2>
          <div>
            <img src={this.props.img} className="img-thumbnail" style={imageStyle} />
          </div>
          <p>vk: <a href={this.checkLink(this.props.url)}>{this.checkLink(this.props.url)}</a></p>
          <p>birthday: <a href={this.checkDate(this.props.birthday)}>{this.checkDate(this.props.birthday)}</a></p>
        </div>
      </div>
    );
  }
}
