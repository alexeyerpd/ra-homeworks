'use strict';

class App extends React.Component {

  checkType = (item) => {
    switch(item.type) {
      case 'unisex':
        return <Item color="black" item={item} />;
      case 'male':
        return <Item color="blue" item={item} />;
      case 'female':
        return <Item color="orange" item={item} />;
    }
  };

  render() {
    return (
      <main>
        {this.props.items.map(this.checkType)}
      </main>
    )
  }
}
