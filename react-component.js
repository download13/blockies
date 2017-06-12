// Usage:
//   npm install blockies-identicon
//   const Blockies = require("blockies/react-component");
//   <Blockies opts={{seed: "foo", color: "#dfe", bgcolor: "#a71", size: 15, scale: 3, spotcolor: "#000"}}/>

var blockies = require("./blockies");

class BlockiesIdenticon extends React.Component {
  constructor(props) {
    super(props);
  }
  getOpts () {
    return {
      seed: this.props.opts.seed || "foo",
      color: this.props.opts.color || "#dfe",
      bgcolor: this.props.opts.bgcolor || "#a71",
      size: this.props.opts.size || 15,
      scale: this.props.opts.scale || 3,
      spotcolor: this.props.opts.spotcolor || "#000"
    };
  }
  componentDidMount() {
    this.draw();
  }
  draw() {
    blockies.render(this.getOpts(), this.canvas);
  }
  render() {
    return React.createElement("canvas", {ref: canvas => this.canvas = canvas});
  }
}

module.exports = BlockiesIdenticon;
