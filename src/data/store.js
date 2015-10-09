import EventEmitter from 'event-emitter';
import functionString from 'function-to-string';

import sanitize from '../lib/sanitize'
import tweenFunctions from '../lib/simplifiedEasings';

// const {linear, easeInQuad, easeOutQuad, easeInOutElastic, easeOutBounce, easeInCirc} = tweenFunctions;
const {linear, easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic} = tweenFunctions;
const DEFAULT_EASINGS = {linear, easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic};

const store = {
  state: {
    easings: DEFAULT_EASINGS,
    selectedEasingName: 'linear',
    tweenFunctions
  },

  get() {
    return this.state;
  },

  set(updates) {
    this.state = Object.assign({}, this.state, updates);
    this.emitter.emit('storeChange', this.state);
  },

  setSource(easings, name, src) {
    try {
      easings[name] = Function(...['t'].concat(src));
    } catch(e) {
      easings[name].syntaxError = true;
    }
    easings[name].src = src;
  },

  getSource(easing) {
    if (easing) {
      if (easing.src) {
        return easing.src;
      } else {
        const body = functionString(easing).body;
        return sanitize(body).trim().replace(/ {2,}/g, ' ');
      }
    }
  },

  updateFormula(name, formula) {
    const easingsCopy = Object.assign({}, this.state.easings);
    this.setSource(easingsCopy, name, formula);
    this.set({easings: easingsCopy});
  },

  updateSelectedEasing(name) {
    this.set({selectedEasingName: name });
  },

  emitter: EventEmitter({})
}

export default store;
