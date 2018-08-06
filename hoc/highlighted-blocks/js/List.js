'use strict';

const сhecker = props => Component => {
  return class extends React.Component {
    validator(props) {
      if (props.views >= 1000) {
        return (
          <Popular>
            <Component {...props} />
          </Popular>
        );
      } else if (props.views <= 100) {
        return (
          <New>
            <Component {...props} />
          </New>
        );
      } else {
        return <Component {...props} />;
      }
    }

    render() {
      return this.validator(props);
    }
  };
};

const List = props => {
  return props.list.map(item => {
    let ListItem;
    switch (item.type) {
      case "video":
        ListItem = сhecker(item)(Video);
        return <ListItem />;

      case "article":
        ListItem = сhecker(item)(Article);
        return <ListItem />;
    }
  });
};