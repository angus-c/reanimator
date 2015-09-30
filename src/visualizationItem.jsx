import classnames from 'classnames';
import React from 'react';

import store from './store'

import Animation from './animation.jsx';

class VisualizationItem extends React.Component {
  render() {
    const {fn, selected} = this.props;
    const formulaButtonClass =
      classnames('formula', {'selected': selected});
    return (
      <li key={fn.name} className="visualizationItem">
        <span className="animationLabel">
          {fn.name}
          <button
            className={formulaButtonClass}
            onClick={() => this._select()}
          >
            𝑓
          </button>
        </span>
        <Animation className="animation" key={fn.name} easing={fn.value} />
      </li>
    );
  }

  _select() {
    store.updateSelectedEasing(this.props.fn.name);
  }
}

export default VisualizationItem;
