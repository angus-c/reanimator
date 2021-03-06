import React from 'react';
import Tweener from '../../lib/tweenState';

import './animation.css';

const BALL_SIZE = 8;

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0
    }
  }

  static propTypes = {
    autoPlay: React.PropTypes.bool,
    duration: React.PropTypes.number,
    easing: React.PropTypes.func,
    elapsed: React.PropTypes.number,
    linear: React.PropTypes.bool
  }

  static defaultProps = {
    autoPlay: true,
    duration: 10000,
    elapsed: 0,
    linear: false
  }

  componentDidMount() {
    const { duration, easing } = this.props;
    this.animationWidth = this.refs.animationPath.clientWidth - 2.5 * BALL_SIZE;
    this.startTime = Date.now();
    this._startAnimation(easing, duration);
  }

  componentWillReceiveProps(nextProps) {
    const { autoPlay, duration, easing, elapsed } = nextProps;
    if (autoPlay) {
      this._startAnimation(easing, duration);
    } else {
      this.setState({left: this.animationWidth * this.props.easing(elapsed)});
    }
  }

  render() {
    return this._renderFormula();
  }

  // vertical needle representing linear animation path
  // _renderControl() {
  //   return (
  //     <div
  //       style={{
  //         position: 'absolute',
  //         left: this.state.left,
  //         width: 4,
  //         height: 150,
  //         backgroundColor: 'red'
  //       }}>
  //     </div>
  //   );
  // }

  _renderFormula() {
    return (
      <svg className='animation' ref="animationPath">
        <circle cx={this.state.left} cy="15" fill="blue" r={BALL_SIZE} />
      </svg>
    );
  }

  _startAnimation(easing = this.props.easing, duration = this.props.duration) {
    if (this.tweenKey) {
      Tweener.tagForDeletion(this.tweenKey);
    }
    this.tweenKey = Tweener.animate(this, 'left', {
      beginValue: this.state.left,
      easing,
      duration: duration - (Date.now() - this.startTime),
      endValue: this.animationWidth
    });
  }
}

export default Animation;
