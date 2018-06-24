'use strict';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.options[0],
      open: false
    };
  }

  render() {
    return (
      <Container
        props={this.props}
        state={this.state}
        func={{
          toggle: this.toggleOpen,
          handle: this.handleChange
        }} />
    );
  }

  handleChange = (option) => {
    this.setState({
      active: option
    });
  };

  toggleOpen = () => {
    this.setState({
      open: !this.state.open
    });
  };

}

App.defaultProps = {
  options: []
};
