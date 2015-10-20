import React from 'react';
import {Tweener} from '../../lib/tweenState';

import './animation.css';

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      startTime: -1
    }
  }

  static propTypes = {
    duration: React.PropTypes.number,
    easing: React.PropTypes.func,
    elapsed: React.PropTypes.number,
    linear: React.PropTypes.bool,
    vizWidth: React.PropTypes.number
  }

  static defaultProps = {
    duration: 10000,
    elapsed: -1,
    linear: false
  }

  componentWillReceiveProps(nextProps) {
    const { duration, easing, elapsed } = this.props;
    const { duration: nextDuration, easing: nextEasing, elapsed: nextElapsed } = nextProps;

    if (nextElapsed > -1) {
      // manual
      this.setState({left: this.props.vizWidth * this.props.easing(elapsed)});
    } else if (elapsed == -1 && (nextElapsed != elapsed || nextEasing != easing || nextDuration != duration)) {
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
    if (Number.isNaN(this.state.left)) {
      // console.log('NaN');
    }
    return (
      <svg className='animation'>
        <circle cx={this.state.left} cy="15" fill="blue" r="10" />
      </svg>
    );
  }

  _startAnimation(easing = this.props.easing, duration = this.props.duration) {
    debugger;
    if (this.tweenKey) {
      Tweener.tagForDeletion(this.tweenKey);
    }
    this.tweenKey = Tweener.animate(this, 'left', {
      beginValue: this.state.left,
      easing,
      duration: duration - (Date.now() - this.startTime),
      endValue: this.props.vizWidth
    });
  }
}

export default Animation;
