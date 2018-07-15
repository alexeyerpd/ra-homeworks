'use strict';

const List = props => {
  return props.list.map(item => {
    switch (item.type) {
      case 'video':
        checker(item);
        return (
          checker(item, Video)
        );

        case 'article':
          return (
            checker(item, Article)
          );
    }
  });
};

function checker(props, Component) {
  if (props.views >= 1000) {
    return (
      <Popular>
        <Component {...props} />
      </Popular>
    )
  } else if (props.views <= 100) {
    return (
      <New>
        <Component {...props} />
      </New>
    )
  } else {
    return <Component {...props} />
  }
}