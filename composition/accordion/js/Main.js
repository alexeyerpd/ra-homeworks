'use strict';

class Main extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return <main className='main'>{this.props.children}</main>
  }
}