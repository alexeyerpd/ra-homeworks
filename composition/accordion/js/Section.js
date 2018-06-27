'use strict';

class Section extends React.Component {
  constructor(props){
    super(props);
    this.sectionRef;
    this.getSectionRef = ref => this.sectionRef = ref;

    this.state = {
      isOpen: false
    }
  }

  handlerClick = (event) => this.setState({
    isOpen: !this.state.isOpen
  });

  render() {
    const {title, content} = this.props.data;

    return (
      <section className={`section${this.state.isOpen ? ' open' : ''}`} ref={this.getSectionRef}>
        <button>toggle</button>
        <h3 className="sectionhead" onClick={this.handlerClick}>{title}</h3>
        <div className="articlewrap">
          <div className="article">
            {content}
          </div>
        </div>
      </section>
    )
  }
}