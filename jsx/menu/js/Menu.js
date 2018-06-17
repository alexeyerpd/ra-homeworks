'use strict';

function Menu({items, opened}) {
  if (!opened) {
    return (
      <div className="menu">
        <div className="menu-toggle">
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="menu menu-open">
      <div className="menu-toggle">
        <span></span>
      </div>
      <nav>
        <ul>
          {createRow(items)}
        </ul>
      </nav>
    </div>
  )
}

function createRow(arr) {
  return arr.map(({title, href}) => {
    return <li><a href={href}>{title}</a></li>
  });
}

