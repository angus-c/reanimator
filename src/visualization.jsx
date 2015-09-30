import React from 'react';

import VisualizationItem from './visualizationItem.jsx';

class Visualization extends React.Component {
  render() {
    const {easings, selectedEasingName} = this.props;
    return (
      <ul className="visualizationList">
        {Object.keys(easings).map((key, i) => (
          <VisualizationItem
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
