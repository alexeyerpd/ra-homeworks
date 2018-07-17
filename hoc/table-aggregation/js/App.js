'use strict';

const TableMonth = sortWrapper(reMonth, MonthTable);
const TableYear = sortWrapper(reYear, YearTable);
const TableSort = sortWrapper(sortingOut, SortTable);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    componentDidMount() {
        axios.get('https://api.myjson.com/bins/l2s9l').then(response => {
            this.setState(response.data);
        });
    }

    render() {
        const { list } = this.state;

        return (
            <div id="app">
                <TableMonth list={list} />
                <TableYear list={list} />
                <TableSort list={list} />
            </div>
        );
    }
};

function sortWrapper(sortVariant, Component) {
  return class extends React.Component {
    render() {
      return <Component list={sortVariant(this.props.list)}/>
    }
  }
}

function reMonth(lists) {
  if (isEmpty(lists)) return [];

  const currentYear = new Date().getFullYear();

  return lists.slice().sort(sortMonth).reduce((memory, list) => {
    const listDate = new Date(list.date);
    if (listDate.getFullYear() === currentYear) {
      memory.push({month: listDate.toLocaleString('en', {month: 'long'}), amount: list.amount});
    }
    return memory;
  }, []);
}

function reYear(lists) {
  if (isEmpty(lists)) return [];

  return lists.slice().sort(sortYear).reduce((memory, list) => {
    const listDate = new Date(list.date);
    memory.push({year: listDate.getFullYear(), amount: list.amount});
    return memory;
  }, []);
}

function sortingOut(lists) {
  if (isEmpty(lists)) return [];

  return lists.slice().sort(sortOut).reduce((memory, list) => {
    memory.push({date: list.date, amount: list.amount});
    return memory;
  }, []);
}

function sortMonth(a, b) {
  return new Date(a.date) - new Date(b.date);
}

function sortYear(a, b) {
  return new Date(b.date) - new Date(a.date);
}

function sortOut(a, b) {
  return b.amount - a.amount;
}

function isEmpty(array) {
  if (array.length === 0) {
    return true;
  } else {
    return false;
  }
}