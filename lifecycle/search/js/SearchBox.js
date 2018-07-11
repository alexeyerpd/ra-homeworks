class SearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = { fixed: false };

    this.firstCoordTop;
    this.onScroll = this.onScroll.bind(this);
  }

  render() {
    return <SearchBoxView fixed={this.state.fixed} />
  }

  isFixed() {
    const html = document.querySelector('html');
    if (html.scrollTop >= this.firstCoordTop) {
      return true;
    } else {
      return false;
    }
  }

  onScroll(event) {
    this.setPosition();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);

    const input = document.querySelector('.search-box');
    const top = input.getBoundingClientRect().top;
    this.firstCoordTop = top;
  }

  setPosition() {
    if (this.isFixed()) {
      this.setState({ fixed: true })
    } else {
      this.setState({ fixed: false })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
}
