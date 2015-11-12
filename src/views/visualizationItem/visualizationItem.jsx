import classnames from 'classnames';
import React from 'react';

import store from '../../data/store'

import Animation from '../animation/animation.jsx';

import './visualizationItem.css';

class VisualizationItem extends React.Component {

  static propTypes = {
    fnObj: React.PropTypes.objectOf(React.PropTypes.fn),
    selected: React.PropTypes.bool
  }

  render() {
    const {fnObj, selected, ...other} = this.props;
    const formulaButtonClass =
      classnames('formula', {'selected': selected});
    return (
      <li className="visualizationItem" key={fnObj.name}>
        <div className='smallBuffer'></div>
        <span className="animationLabel">
          {fnObj.name}
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
          easing={fnObj.value}
          key={fnObj.name}
        />
      </li>
    );
  }

  _select() {
    store.updateSelectedEasing(this.props.fnObj.name);
  }
}

export default VisualizationItem;
