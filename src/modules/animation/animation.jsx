import React from 'react';
import {Tweener} from '../../lib/tweenState';

import './animation.css';

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0
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

  componentDidMount() {
    const { duration, easing } = this.props;
    this.animationWidth = React.findDOMNode(this.refs.animationPath).clientWidth;
    this.startTime = Date.now();
    this._startAnimation(easing, duration);
  }

  componentWillReceiveProps(nextProps) {
    const { duration, easing, elapsed } = this.props;
    const { duration: nextDuration, easing: nextEasing, elapsed: nextElapsed } = nextProps;

    if (nextElapsed > -1) {
      // manual
      debugger;
      this.setState({left: this.animationWidth * this.props.easing(nextElapsed)});
    } else if (nextEasing != easing || nextDuration != duration) {
      // auto
      this._startAnimation(nextEasing, nextDuration);
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
        <circle cx={this.state.left} cy="15" fill="blue" r="10" />
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
