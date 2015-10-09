import React from 'react';
import {Tweener} from './lib/tweenState';

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 100,
      startTime: -1
    }
  }

  static propTypes = {
    duration: React.PropTypes.number,
    easing: React.PropTypes.func,
    elapsed: React.PropTypes.number,
    linear: React.PropTypes.bool
  }

  static defaultProps = {
    duration: 10000,
    elapsed: -1,
    linear: false
  }

  componentDidMount(props) {
    this.startTime = Date.now();
    if (this.props.elapsed < 0) {
      this._startAnimation();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.easing != this.props.easing ||
      nextProps.duration != this.props.duration
    ) {
      this._startAnimation(nextProps.easing, nextProps.duration);
    }
  }

  render() {
    return this._renderFormula();
  }

  _renderControl() {
    return (
      <div
        style={{
          position: 'absolute',
          left: this.state.left + 6,
          width: 4,
          height: 150,
          backgroundColor: 'red'
        }}>
      </div>
    );
  }

  _renderFormula() {
    const { elapsed } = this.props;
    if (elapsed > -1) {
      this.state.left = 1000 * this.props.easing(elapsed);
    }
    return (
      <svg className="animation">
        <circle cx={this.state.left} cy="15" r="10" fill="blue" />
      </svg>
    );
  }

  _startAnimation(easing=this.props.easing, duration=this.props.duration) {
    if (this.tweenKey) {
      Tweener.tagForDeletion(this.tweenKey);
    }
    this.tweenKey = Tweener.animate(this, 'left', {
      beginValue: this.state.left,
      easing,
      duration: duration - (Date.now() - this.startTime),
      endValue: 1000
    });
  }
}

export default Animation;
