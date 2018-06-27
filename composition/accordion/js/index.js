'use strict';

class Accordion extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const sections = this.props.content.map((section) => <Section data={section}/>);

    return (
      <Main>
        <h2 className="title">React</h2>
        {sections}
      </Main>
    );
  }
}



