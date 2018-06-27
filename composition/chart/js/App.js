function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function compareNumbers(a, b) {
  return a - b;
}

class App extends React.Component {
  componentWillMount() {
    this.setState({
      data: [],
      series: ['France', 'Italy', 'England', 'Sweden', 'Germany'],
      labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
      colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
    })
  }

  componentDidMount() {
    this.populateArray();
    setInterval(this.populateArray.bind(this), 2000);
  }

  populateArray() {
    const series = 5;
    const serieLength = 5;

    let data = new Array(series).fill(new Array(serieLength).fill(0));
    data = data.map(serie => serie.map(item => getRandomInt(0, 20)));

    this.setState({ data });
  }

  render() {

    const newProps = {...this.state};

    return (
      <section>
        <Charts props={newProps} />
        <Charts props={newProps} className='stacked'/>
        <Charts props={newProps} className='layered'/>
        <Charts props={newProps} thisClassName='horizontal'/>
        <Legend props={newProps}/>
      </section>
    );
  }
}

function Charts({props, className, thisClassName}) {
  const { data } = props;
  const newProp = {...props, className, thisClassName};


  return (
    <div className={`Charts ${thisClassName || ''}`}>
      {data.map((serie, serieIndex) => <ChartSerie props={{...newProp, serie, serieIndex}}/>)}
    </div>
  )
}

function ChartSerie({props}) {
  const {labels, serie, serieIndex, className, thisClassName} = props;

  let sortedSerie = serie.slice(0);
  const sum = serie.reduce((carry, current) => carry + current, 0);
  sortedSerie.sort(compareNumbers);

  return (
    <div
      className={`Charts--serie ${className || ''}`}
      key={serieIndex}
      style={ thisClassName ? {height: 'auto'} : {height: 250} }>
      <label>{ labels[serieIndex] }</label>
      {serie.map((item, itemIndex) => <ChartsItem props={{...props, item, itemIndex, sum, sortedSerie}}/>)}
    </div>
  )
}

function ChartsItem({props}) {
  const {colors, itemIndex, item, data, className} = props;

  const max = data.reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);

  let color = colors[itemIndex],
      size = getSize({...props, max});

  const styleProp = {...props, max, color, size};
  const style = getStyle(styleProp);

  return (
    <div
      className={`Charts--item ${className || ''}`.trim()}
      style={ style }
      key={ itemIndex }>
      <b style={ { color: color } }>{ item }</b>
    </div>
  );
}

function Legend({props}) {
  const {labels} = props;
  const descriptions = labels.map((label, labelIndex) => <LegendDescript props={ {...props, label, labelIndex} } />);

  return (
    <div className="Legend">
      { descriptions }
    </div>
  );
}

function LegendDescript({props}) {
  const {colors, label, labelIndex} = props;
  const style = {
    backgroundColor: colors[labelIndex % colors.length]
  };

  return (
    <div>
      <span className="Legend--color" style={ style } />
      <span className="Legend--label">{ label }</span>
    </div>
  );
}

function getStyle(props) {
  const {className, color, item, max, size, serie, sortedSerie, thisClassName} = props;

  if (className === 'layered') {
    return {
      backgroundColor: color,
      opacity: (item/max + .05),
      zIndex: item,
      height: size + '%',
      right: ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%'
    }
  } else if (className === 'stacked') {
    return {
      backgroundColor: color,
      opacity: 1,
      zIndex: item,
      height: size + '%'
    };
  } else if (thisClassName) {
    return {
      backgroundColor: color,
      opacity: item/max + .05,
      zIndex: item,
      width: size + '%'
    };
  } else {
    return {
      backgroundColor: color,
      opacity: item/max + .05,
      zIndex: item,
      height: size + '%'
    }
  }
}

function getSize({className, item, sum, max}) {
  if ( className=== 'stacked') {
    return item / sum * 100;
  } else {
    return item / (max) * 100;
  }
}