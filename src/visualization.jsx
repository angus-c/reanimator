import React from 'react';

import VisualizationItem from './visualizationItem.jsx';

class Visualization extends React.Component {
  render() {
    const {easings, selectedEasingName, ...other} = this.props;
    return (
      <ul className="visualizationList">
        {Object.keys(easings).map((key, i) => (
          <VisualizationItem
            {...other}
            key={i}
            fn={{name: key, value: easings[key]}}
            selected={key == selectedEasingName}
          />
        ))}
      </ul>
    );
  }
}

export default Visualization;
