/*
 * inspired by https://github.com/chenglou/react-tween-state
 */

/*global requestAnimationFrame*/
import easingTypes, {easeInOutQuad} from 'tween-functions';

// TODO: we may want to support additive animation
// (see http://ronnqvi.st/multiple-animations)
const DEFAULT_EASING = easeInOutQuad;
const DEFAULT_DURATION = 300;

const Tweener = {
  // could be multiple, concurrent animations
  tweenMap: {},

  animate(
      component,
      path,
      { beginValue, easing, duration, endValue, onEnd }) {
    const tweenKey = Date.now() * Math.random();

    const animation = {
      easing: easing || DEFAULT_EASING,
      duration: duration || DEFAULT_DURATION,
      delay: 0,
      beginValue: beginValue,
      endValue: endValue,
      onEnd: onEnd
    };

    this.tweenMap[tweenKey] = {
      animation,
      initTime: Date.now() + animation.delay
    };

    requestAnimationFrame(this._raf.bind(this, component, path, tweenKey));

    return tweenKey;
  },

  deleteAnimation(tweenKey) {
    delete this.tweenMap[tweenKey];
  },

  tagAllForDeletion(tweenKey) {
    Object.keys(this.tweenMap).forEach(key => this.tagForDeletion(key));
  },

  tagForDeletion(tweenKey) {
    this.tweenMap[tweenKey] && (this.tweenMap[tweenKey].pendingDelete = true);
  },

  getAnimation(tweenKey) {
    return this.tweenMap[tweenKey];
  },

  getTweeningValue(tweenKey, elapsed) {
    const thisTween = this.tweenMap[tweenKey];
    const now = Date.now();
    const { beginValue, easing, duration, endValue } = thisTween.animation;
    const percentElapased = elapsed || (now - thisTween.initTime) / duration;
    const time = Math.min(percentElapased, 1)
    return beginValue + (endValue - beginValue) * easing(time);
  },

  _raf: function (component, path, tweenKey) {
    const thisTween = this.tweenMap[tweenKey];
    const now = Date.now();

    if (now - thisTween.initTime > thisTween.animation.duration) {
      component.setState({[path]: thisTween.animation.endValue});
      thisTween.animation.onEnd && thisTween.animation.onEnd();
      this.tagForDeletion(tweenKey);
    }

    if (thisTween.pendingDelete) {
      this.deleteAnimation(tweenKey);
      return;
    }

    component.setState({[path]: this.getTweeningValue(tweenKey)});
    requestAnimationFrame(this._raf.bind(this, component, path, tweenKey));
  }
};

export {
  Tweener,
  easingTypes
};
