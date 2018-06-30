
class FontSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {fonts, onSelect} = this.props;

    return (
      <div className="font-picker">
        {fonts.map((font) => <Fonts font={font} func={onSelect} />)}
      </div>
    )
  }
}

class Fonts extends React.Component {
  constructor(props) {
    super(props);
  }

  onChg = (event) => {
    this.props.func(this.props.font);
  };

  render() {
    const {name, path} = this.props.font;

    return (
      <div className="grid center font-item">
        <input type="radio" name="font" value={name} id={name} onChange={this.onChg}/>
          <label htmlFor={name} className="grid-1">
            <PictureFont text={name} path={path}/>
          </label>
      </div>
    )
  }
}
