import classnames from 'classnames';
import React from 'react';

import store from '../../data/store'

import Animation from '../animation/animation.jsx';

import './visualizationItem.css';

class VisualizationItem extends React.Component {
  render() {
    const {fn, selected, ...other} = this.props;
    const formulaButtonClass =
      classnames('formula', {'selected': selected});
    return (
      <li className="visualizationItem" key={fn.name}>
        <span className="animationLabel">
          {fn.name}
          <button
            className={formulaButtonClass}
            onClick={() => this._select()}
          >
            𝑓
          </button>
        </span>
        <div className='buffer'></div>
        <Animation
          {...other}
          className="animation"
          easing={fn.value}
          key={fn.name}
        />
        <div className='buffer'></div>
      </li>
    );
  }

  _select() {
    store.updateSelectedEasing(this.props.fn.name);
  }
}

export default VisualizationItem;
