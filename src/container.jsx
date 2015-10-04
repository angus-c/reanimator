import {Tweener} from './lib/tweenState';
import React from 'react';

import Formula from './formula.jsx';
import Visualization from './visualization.jsx';

import store from './store';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...store.get(), animationCount: 0, duration: 10000};
    store.emitter.on('storeChange', data => this._update(data));
  }

  render() {
    const {easings, selectedEasingName} = this.state;
    const selectedEasing = easings[selectedEasingName];
    const src = store.getSource(selectedEasing);

    return (
      <div key={this.state.animationCount} >
        <button onClick={e => this._replay(e)}>Replay</button>
        <input
          min={1000}
          max={100000}
          ref="duration"
          type="range"
          onChange={(e) => this._durationChanged(e)}
          value={this.state.duration}
        />
        <div className="page">
          <Visualization
            easings = {easings}
            duration = {this.state.duration}
            selectedEasingName = {selectedEasingName}
          />
          <Formula
            name={selectedEasingName}
            formula={src}
            syntaxError={selectedEasing.syntaxError}
          />
        </div>
      </div>
    );
  }

  _durationChanged(e) {
    this.setState({duration: Number(e.target.value)});
  }

  _replay() {
    Tweener.tagAllForDeletion();
    this.setState({animationCount: this.state.animationCount + 1});
  }

  _update(data) {
    const {easings, selectedEasingName, tweenFunctions} = data;
    this.setState({easings, selectedEasingName, tweenFunctions});
  }
}

React.render(<Container/>, document.body);

export default Container;
