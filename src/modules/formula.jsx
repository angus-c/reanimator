import React from 'react';

import store from '../data/store';

class Formula extends React.Component {
  static propTypes = {
    formula: React.PropTypes.string,
    name: React.PropTypes.string,
    syntaxError: React.PropTypes.bool
  }

  static defaultProps = {
    syntaxError: false
  }

  handleChange(event) {
    store.updateFormula(this.props.name, event.target.value);
  }

  render() {
    return (
      <textarea
        className="formulaBox"
        style={{color: this.props.syntaxError ? 'red' : 'black'}}
        onChange={(e) => this.handleChange(e)}
        value={this.props.formula}
      />
    );
  }

  shouldComponentUpdate(nextProps) {
    return true;
  }
}

export default Formula;
