'use strict';

function MessageHistory({list}) {
  if (list.length === 0) return null;

  const messages = list.map(Msg);
  return (
    <ul>
      {messages}
    </ul>
  )
}

function Msg(list) {
  const {type, from} = list;

  if (type === 'message') {
    return (<Message from={from} message={list}/>);
  } else if (type === 'response') {
    return (<Response from={from} message={list} />);
  } else if (type === 'typing') {
    return (<Typing from={from} message={list} />);
  } else {
    return null;
  }
}

MessageHistory.defaultProps = {
  list: 0
};