import {Tweener} from '../../lib/tweenState';
import React from 'react';

import Formula from '../formula/formula.jsx';
import Visualization from '../visualization/visualization.jsx';

import store from '../../data/store';

import './page.css';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...store.get(),
      animationCount: 0,
      autoPlay: true,
      duration: 10000,
      elapsed: 0
    };
    store.emitter.on('storeChange', data => this._update(data));
  }

  render() {
    const {easings, selectedEasingName} = this.state;
    const selectedEasing = easings[selectedEasingName];
    const src = store.getSource(selectedEasing);

    return (
      <div className='page' key={this.state.animationCount}>
        <div className='controls'>
          <button className='autoplay' onClick={e => this._play(e)}>AutoPlay ></button>
          <div className='buffer'></div>
          <input
            className='manual'
            max={1}
            min={0}
            onChange={(e) => this._elapsedChanged(e)}
            step={0.001}
            type='range'
            value={this.state.elapsed}
          />
          <div className='buffer'></div>
        </div>
        <Visualization
          autoPlay = {this.state.autoPlay}
          duration = {this.state.duration}
          easings = {easings}
          elapsed = {this.state.elapsed}
          selectedEasingName = {selectedEasingName}
        />
        <Formula
          formula={src}
          name={selectedEasingName}
          syntaxError={selectedEasing.syntaxError}
        />
      </div>
    );
  }

  _elapsedChanged(e) {
    Tweener.tagAllForDeletion();
    this.setState({autoPlay: false, elapsed: Number(e.target.value)});
  }

  _play() {
    Tweener.tagAllForDeletion();
    this.setState({animationCount: this.state.animationCount + 1, autoPlay: true});
  }

  _update(data) {
    const {easings, selectedEasingName, tweenFunctions} = data;
    this.setState({easings, selectedEasingName, tweenFunctions});
  }
}

React.render(<Container/>, document.body);

export default Container;
