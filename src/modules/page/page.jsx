import {Tweener} from '../../lib/tweenState';
import React from 'react';

import Formula from '../formula/formula.jsx';
import Visualization from '../visualization/visualization.jsx';

import store from '../../data/store';

import './page.css';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...store.get(), animationCount: 0, duration: 10000, elapsed: 0};
    store.emitter.on('storeChange', data => this._update(data));
  }

  componentDidMount() {
    this.controlWidth = React.findDOMNode(this.refs.manual).clientWidth;
  }

  render() {
    const {easings, selectedEasingName} = this.state;
    const selectedEasing = easings[selectedEasingName];
    const src = store.getSource(selectedEasing);

    return (
      <div className='page'>
        <div className='controls' key={this.state.animationCount} >
          <button className='replay' onClick={e => this._replay(e)}>Animate</button>
          <input
            className='manual'
            min={0}
            max={1}
            ref='manual'
            step={0.01}
            type='range'
            onChange={(e) => this._elapsedChanged(e)}
            value={this.state.elapsed}
          />
        </div>
        <Visualization
          easings = {easings}
          elapsed = {this.state.elapsed}
          duration = {this.state.duration}
          selectedEasingName = {selectedEasingName}
          vizWidth = {this.controlWidth}
        />
        <Formula
          name={selectedEasingName}
          formula={src}
          syntaxError={selectedEasing.syntaxError}
        />
      </div>
    );
  }

  _elapsedChanged(e) {
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
