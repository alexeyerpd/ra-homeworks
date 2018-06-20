'use strict';

function Stars({count}) {
  if (count < 1 || count > 5 || typeof count !== 'number') {
    return null;
  }

  let memo = [];
  for (let i = count; i > 0; i--) {
    memo.push(i);
  }

  return (
    <ul className="card-body-stars u-clearfix">
      <li>
        {memo.map(Star)}
      </li>
    </ul>
  )
}

Stars.defaultProps = {
  count: 0
};