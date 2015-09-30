import React from 'react';
import {Tweener} from './lib/tweenState';

const DURATION = 100000;

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 100,
      startTime: -1
    }
  }

  static propTypes = {
    easing: React.PropTypes.func,
    linear: React.PropTypes.bool
  }

  static defaultProps = {
    linear: false
  }

  componentDidMount() {
    this.startTime = Date.now();
    this._startAnimation();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.easing != this.props.easing) {
      this._startAnimation(nextProps.easing);
    }
  }

  render() {
    const linear = this.props.linear;

    if (linear) {
      return this._renderFormula();
    } else {
      return this._renderFormula();
    }
  }

  _renderControl() {
    return <div style={{position: "absolute", left: this.state.left+6, width: 4, height: 150, backgroundColor: 'red'}}></div>
  }

  _renderFormula() {
    return (
      <svg className="animation">
        <circle cx={this.state.left} cy="15" r="10" fill="blue" />
      </svg>
    );
  }

  _startAnimation(easing=this.props.easing) {
    if (this.tweenKey) {
      Tweener.tagForDeletion(this.tweenKey);
    }
    this.tweenKey = Tweener.animate(this, 'left', {
      beginValue: this.state.left,
      easing: easing,
      duration: DURATION - (Date.now() - this.startTime),
      endValue: 1000
    });
  }
}

export default Animation;
