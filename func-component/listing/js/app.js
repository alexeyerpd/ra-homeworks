'use strict';
init();

function getCatalogData() {
  return fetch('https://neto-api.herokuapp.com/etsy');
}

function checkStatus(response) {
  if (response.status === 200) {
    return response;
  } else {
    console.log(`Попытка неудачна. Код ошибки ${response.status}`);
  }
}

function respJSON(resp) {
  return resp.json();
}

function init() {
  getCatalogData()
    .then(checkStatus)
    .then(respJSON)
    .then((r) => {

      ReactDOM.render(
        <Listing items={r}/>,
        document.getElementById('root')
      );

    })
}

function Listing({items}) {
  const item = items.map(renderList);
  return (
    <div className="item-list">
      {item}
    </div>
  );
}

Listing.defaultProps = {
  items: []
};

function renderList(data) {
  return <List item={data}/>
}

function List({item}) {
  if (item.state !== 'active') return null;

  return (
    <div className="item" key={item.listing_id}>
      <div className="item-image">
        <a href={item.url}>
          <img src={item.MainImage['url_570xN']}/>
        </a>
      </div>
      <div className="item-details">
        <p className="item-title">{checkCharLenght(item.title)}</p>
        <p className="item-price">{getPrice(item['currency_code'], item.price)}</p>
        <p className={`item-quantity ${getClass(item.quantity)}`}>{item.quantity} left</p>
      </div>
    </div>
  )
}

function checkCharLenght(title) {
  if (title.length <= 50) {
    return title;
  } else {
    return title.slice(0, 50) + '\u2026';
  }
}

function getPrice(currencyCode, price) {
  if (currencyCode === 'USD') {
    return `$${price}`;
  } else if (currencyCode === 'EUR') {
    return `\u20ac${price}`;
  } else {
    return `${price} ${currencyCode}`;
  }
}

function getClass(amount) {
  if (!amount) return "";

  if (amount <= 10) {
    return "level-low";
  } else if (amount <= 20) {
    return "level-medium";
  } else {
    return "level-high";
  }
}