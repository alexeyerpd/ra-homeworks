'use strict';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "All"
    }
  }

  changeFilter = (fltr) => {
    this.setState({
      filter: fltr
    });
  };

  getCurrentProject = (project) => {
    if (this.state.filter === 'All') {
      return project.category
    } else {
      return project.category === this.state.filter;
    }
  };

  render() {
    return (
      <div>
        <Toolbar
          filters={this.props.filters}
          selected={this.state.filter}
          onSelectFilter={(filter) => {console.log(filter); this.changeFilter(filter)}} />
        <Portfolio projects={this.props.projects.filter(this.getCurrentProject)} />
      </div>
    );
  }
}

