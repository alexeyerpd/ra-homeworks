'use strict';

class SubscribeForm extends React.Component {
  constructor(props) {
    super(props);
    this.formRef;
    this.inputRef;
    this.getFormRef = (ref) => this.formRef = ref;
    this.getInputRef = (ref) => this.inputRef = ref;

    this.state = {
      valid: false,
      cls: ''
    }
  }

  handleChange = (event) => {
    if (event.currentTarget.validity.valid) {
      this.setState({
        valid: true,
        cls: ' is-valid'
      });
    } else if (this.inputRef && this.inputRef.value.length > 0){
      this.setState({
        valid: false,
        cls: ' is-error'
      });
    } else {
      this.setState({
        valid: false,
        cls: ''
      });
    }

  };

  getClass = () => {
    return this.state.cls;
  };

  render() {

    return (
      <div className="subscribe__form">
        <form className={`form form--subscribe${this.getClass()}`} ref={this.getFormRef}>
          <h4 className="form-title">Подписаться:</h4>
          <div className="form-group">
            <label htmlFor="input-email" className="sr-only">Email</label>
            <input type="email" id="input-email" placeholder="Email" className="form-control" onChange={this.handleChange} ref={this.getInputRef}/>
            <div className="form-error">Пожалуйста, проверьте корректность адреса электронной почты</div>
            <button type="submit" className="form-next">
              <i className="material-icons">keyboard_arrow_right</i>
            </button>
          </div>
        </form>
      </div>
    )
  }
}