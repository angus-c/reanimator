import React from 'react';

// import Curve from '../curve/curve.jsx';
import Plot from 'react-function-plot';
import VisualizationItem from '../visualizationItem/visualizationItem.jsx';

import './visualization.css';

class Visualization extends React.Component {

  static propTypes = {
    easings: React.PropTypes.objectOf(React.PropTypes.fn),
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
              fnObj={{name: key, value: easings[key]}}
              key={i}
              selected={key == selectedEasingName}
            />
          ))}
        </ul>
        <div className='mediumBuffer'></div>
        <Plot
          className='graphic'
          fn={easings[selectedEasingName]}
          thickness={4}
        />
      </div>
    );
  }
}

export default Visualization;
