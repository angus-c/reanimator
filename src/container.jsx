
import React from 'react';

import Formula from './formula.jsx';
import Visualization from './visualization.jsx';

import store from './store';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.get();
    store.emitter.on('storeChange', data => this._update(data));
  }

  render() {
    const {easings, selectedEasingName} = this.state;
    const selectedEasing = easings[selectedEasingName];
    const src = store.getSource(selectedEasing);

    return (
      <div className="page">
        <Visualization
          easings = {easings}
          selectedEasingName = {selectedEasingName}
        />
        <Formula
          name={selectedEasingName}
          formula={src}
          syntaxError={selectedEasing.syntaxError}
        />
      </div>
    );
  }

  _update(data) {
    const {easings, selectedEasingName, tweenFunctions} = data;
    this.setState({easings, selectedEasingName, tweenFunctions});
  }
}

React.render(<Container/>, document.body);

export default Container;
