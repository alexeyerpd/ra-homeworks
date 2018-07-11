class ProgressBar extends React.Component {
  render() {
    return (
      <canvas id="progressCanvas" className="progress" />
    );
  }

  componentDidMount() {
    this.canvas = document.getElementById('progressCanvas');
    this.ctx = this.canvas.getContext('2d');
  }

  componentWillReceiveProps(newProps) {
    this.createCanvasProgress(newProps);
  }

  createCanvasProgress(props) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.lineWidth = 7;
    this.ctx.strokeStyle = '#4ca89a';
    this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 52, 0, 2 * Math.PI);
    this.ctx.font = '34px Lucida Console';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`${this.calcPercent(props)}%`, this.canvas.width / 2, this.canvas.height / 2 + 10);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.lineWidth = 7;
    this.ctx.strokeStyle = '#96d6f4';
    this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 45, 0, 2 * Math.PI * (this.calcPercent(props) / 100));
    this.ctx.fillText(`${this.calcPercent(props)}%`, this.canvas.width / 2, this.canvas.height / 2 + 10);
    this.ctx.stroke();
  }

  calcPercent(props) {
    return Math.round((props.completed / props.total) * 100);
  }
}
