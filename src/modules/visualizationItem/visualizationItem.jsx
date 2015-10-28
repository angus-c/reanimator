import classnames from 'classnames';
import React from 'react';

import store from '../../data/store'

import Animation from '../animation/animation.jsx';

import './visualizationItem.css';

class VisualizationItem extends React.Component {

  static propTypes = {
    fn: React.PropTypes.func,
    selected: React.PropTypes.bool
  }

  render() {
    const {fn, selected, ...other} = this.props;
    const formulaButtonClass =
      classnames('formula', {'selected': selected});
    return (
      <li className="visualizationItem" key={fn.name}>
        <div className='smallBuffer'></div>
        <span className="animationLabel">
          {fn.name}
          <button
            className={formulaButtonClass}
            onClick={() => this._select()}
          >
            𝑓
          </button>
        </span>
        <div className='smallBuffer'></div>
        <Animation
          {...other}
          className="animation"
          easing={fn.value}
          key={fn.name}
        />
      </li>
    );
  }

  _select() {
    store.updateSelectedEasing(this.props.fn.name);
  }
}

export default VisualizationItem;
