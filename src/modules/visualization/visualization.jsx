import React from 'react';

import Curve from '../curve/curve.jsx';
import VisualizationItem from '../visualizationItem/visualizationItem.jsx';

import './visualization.css';

class Visualization extends React.Component {

  static propTypes = {
    easings: React.PropTypes.arrayOf(React.PropTypes.fn),
    formula: React.PropTypes.fn,
    selectedEasingName: React.PropTypes.string
  }

  render() {
    const {easings, selectedEasingName, ...other} = this.props;
    return (
      <div className='visualization'>
        <ul className='visualizationList'>
          {Object.keys(easings).map((key, i) => (
            <VisualizationItem
              {...other}
              fn={{name: key, value: easings[key]}}
              key={i}
              selected={key == selectedEasingName}
            />
          ))}
        </ul>
        <div className='mediumBuffer'></div>
        <Curve easing={easings[selectedEasingName]} />
        <div className='mediumBuffer'></div>
      </div>
    );
  }
}

export default Visualization;
