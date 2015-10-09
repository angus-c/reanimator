import {Tweener} from '../../lib/tweenState';
import React from 'react';

import Formula from '../formula/formula.jsx';
import Visualization from '../visualization/visualization.jsx';

import store from '../../data/store';

import './page.css';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...store.get(), animationCount: 0, duration: 10000, elapsed: 0.7};
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
          style={{marginLeft: 200, width: 1000}}
          min={0}
          max={1}
          ref="duration"
          step={0.01}
          type="range"
          onChange={(e) => this._elapsedChanged(e)}
          value={this.state.elapsed}
        />
        <div className='page'>
          <Visualization
            easings = {easings}
            elapsed = {this.state.elapsed}
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

  _elapsedChanged(e) {
    debugger;
    this.setState({elapsed: Number(e.target.value)});
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
