
class TextRenderLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  onChng = (e) => {
    const text = e.target.value.replace(/[^A-Za-z]/ig, '');

    this.props.onChange(text);

    this.setState({
      text: text
    })
  };

  getText = () => this.state.text;

  render() {
    return (
      <div className="type-text">
        <textarea name="text" id="font-text" cols="30" rows="2" placeholder="Введите текст для футболки" onChange={this.onChng} value={this.getText()}></textarea>
      </div>
    )
  }
}

