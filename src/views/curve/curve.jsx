import {add, update} from '../../lib/plot';
import React from 'react';

import './curve.css';

class Curve extends React.Component {
  static propTypes = {
    easing: React.PropTypes.func
  }

  componentDidMount() {
    add('.curve', this.props.easing);
  }

  componentDidUpdate() {
    update('.curve', this.props.easing);
  }

  render() {
    return (
      <div className='curve'/>
    );
  }
}

export default Curve;
