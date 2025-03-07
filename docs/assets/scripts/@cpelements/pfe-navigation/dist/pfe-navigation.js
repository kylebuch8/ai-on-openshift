import PFElement from '../../../@patternfly/pfelement/dist/pfelement.js';
import '../../../@patternfly/pfe-icon/dist/pfe-icon.js';
import '../../../@patternfly/pfe-avatar/dist/pfe-avatar.js';

/*!
 * PatternFly Elements: PfeNavigation 1.0.127
 * @license
 * Copyright 2020 Red Hat, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
*/

/**
 * Figures out if string starts with certain characters
 * @note Removing need for startsWithPolyfill, which may be causing issues with Solutions Engine
 * @param {string} haystack String to search in
 * @param {string} needle What we're checking for
 * @return {boolean}
 */
function stringStartsWith(haystack, needle) {
  return haystack.substring(0, needle.length) === needle;
}

/**
 * Debounce helper function
 * @see https://davidwalsh.name/javascript-debounce-function
 *
 * @param {function} func Function to be debounced
 * @param {number} delay How long until it will be run
 * @param {boolean} immediate Whether it should be run at the start instead of the end of the debounce
 */
function debounce(func, delay, immediate = false) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
    if (callNow) func.apply(context, args);
  };
}

const _isCrustyBrowser = () => window.ShadyCSS && !window.ShadyCSS.nativeShadow;

// Config for mutation observer to see if things change inside of the component
const lightDomObserverConfig = {
  characterData: true,
  attributes: true,
  subtree: true,
  childList: true,
};

/**
 * Utiility function to merge objects and know if data was changed
 * @param {object} source Object to merge into
 * @param {object} update New data that can override source
 */
function mergeObjectData(source, update) {
  const updateKeys = Object.keys(update);
  updateKeys.forEach((key) => {
    if (!key in source || source[key] !== update[key]) {
      source[key] = update[key];
    }
  });
}

class PfeNavigation extends PFElement {
  static get version() {
    return "1.0.127";
  }

  get html() {
    return `<style>.element-invisible,.sr-only,.visually-hidden{position:absolute;width:1px;height:1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}*,:after,:before{box-sizing:border-box}:host{display:block;position:relative;z-index:95;z-index:95;z-index:var(--pfe-theme--zindex--navigation,95)}:host([hidden]){display:none}[hidden]{display:none!important}nav.pfe-navigation{display:flex;align-items:stretch}.pfe-navigation__overlay{display:block;background:rgba(21,21,21,.5);background:rgba(21,21,21,.5);background:var(--pfe-navigation--overlay--Background,rgba(21,21,21,.5));position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1}.pfe-navigation__overlay[hidden]{display:none}.pfe-navigation__wrapper{position:relative;z-index:95;z-index:95;z-index:var(--pfe-navigation--ZIndex,var(--pfe-theme--zindex--navigation,95));display:flex;align-items:stretch;height:72px;height:72px;height:var(--pfe-navigation__nav-bar--Height,72px);font-size:1rem;font-size:1rem;font-size:var(--pf-global--FontSize--md,1rem);line-height:1.5;font-family:Red Hat Text,RedHatText,Arial,Helvetica,sans-serif;font-family:Red Hat Text,RedHatText,Arial,Helvetica,sans-serif;font-family:var(--pfe-navigation--FontFamily,Red Hat Text,RedHatText,Arial,Helvetica,sans-serif);color:#fff;color:#fff;color:var(--pfe-navigation__nav-bar--Color--default,var(--pfe-theme--color--ui-base--text,#fff));background:#151515;background:#151515;background:var(--pfe-navigation__nav-bar--Background,#151515);max-width:9999em;margin:0;padding:0 16px;transition:opacity .1s linear}@media (min-width:768px){.pfe-navigation__wrapper{max-width:9999em;margin:0;padding:0 16px}}@media (min-width:1200px){.pfe-navigation__wrapper{margin:0 auto;padding:0 32px}}.pfe-navigation--collapse-main-menu .pfe-navigation__wrapper,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__wrapper{max-width:9999em;margin:0;padding:0 16px}.pfe-navigation--collapse-secondary-links .pfe-navigation__wrapper,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__wrapper{max-width:9999em;margin:0;padding:0 16px}.pfe-navigation__wrapper a{text-decoration:none}.pfe-navigation__wrapper button{font-family:inherit}.pfe-navigation__wrapper.pfe-navigation--is-resizing{opacity:0}.pfe-navigation__logo-wrapper{display:flex;align-items:center;justify-content:flex-start;margin:0;padding:10px 16px 10px 0}@media (min-width:768px){.pfe-navigation--no-main-menu .pfe-navigation__logo-wrapper{margin-right:auto}}.pfe-navigation--collapse-secondary-links .pfe-navigation--no-main-menu .pfe-navigation__logo-wrapper,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation--no-main-menu .pfe-navigation__logo-wrapper{margin-right:0}.pfe-navigation__logo-link{position:relative;display:block;padding:6px 8px;margin-left:-8px;outline:0;border-radius:3px}.pfe-navigation__logo-link:focus{outline:0}.pfe-navigation__logo-link:focus:after{content:'';position:absolute;right:0;bottom:0;top:0;left:0;display:block;border:1px dashed #fff}.pfe-navigation__logo-image,.pfe-navigation__logo-link img,.pfe-navigation__logo-link svg{display:block;width:100%;height:auto}@media (min-width:576px){.pfe-navigation__logo-image,.pfe-navigation__logo-link img,.pfe-navigation__logo-link svg{width:auto;height:40px;height:40px;height:var(--pfe-navigation__logo--height,40px)}}@media print{.pfe-navigation__logo-image,.pfe-navigation__logo-link img,.pfe-navigation__logo-link svg{display:none}}.pfe-navigation__logo-image:only-child,.pfe-navigation__logo-link img:only-child,.pfe-navigation__logo-link svg:only-child{display:block}@media (min-width:576px){.pfe-navigation__logo-image.pfe-navigation__logo-image--small,.pfe-navigation__logo-link img.pfe-navigation__logo-image--small,.pfe-navigation__logo-link svg.pfe-navigation__logo-image--small{height:32px;height:32px;height:var(--pfe-navigation__logo--height,32px)}}@media print{.pfe-navigation__logo-image.pfe-navigation__logo-image--screen,.pfe-navigation__logo-link img.pfe-navigation__logo-image--screen,.pfe-navigation__logo-link svg.pfe-navigation__logo-image--screen{display:none!important}}@media screen{.pfe-navigation__logo-image.pfe-navigation__logo-image--print,.pfe-navigation__logo-link img.pfe-navigation__logo-image--print,.pfe-navigation__logo-link svg.pfe-navigation__logo-image--print{display:none!important}}.pfe-navigation__logo-image.pfe-navigation__logo-image--screen.pfe-navigation__logo-image--print,.pfe-navigation__logo-link img.pfe-navigation__logo-image--screen.pfe-navigation__logo-image--print,.pfe-navigation__logo-link svg.pfe-navigation__logo-image--screen.pfe-navigation__logo-image--print{display:inline-block!important}.pfe-navigation__account-toggle,.pfe-navigation__log-in-link,.pfe-navigation__menu-toggle,.pfe-navigation__search-toggle{--pfe-icon--color:var(--pfe-navigation__dropdown--link--Color, var(--pfe-theme--color--link, #06c));position:relative;display:flex;align-items:center;width:100%;margin:0;padding:8px 24px;border:0;white-space:nowrap;font-family:inherit;font-size:1rem;font-size:1rem;font-size:var(--pf-global--FontSize--md,1rem);color:#06c;color:#06c;color:var(--pfe-navigation__dropdown--link--Color,var(--pfe-theme--color--link,#06c));text-align:center;text-decoration:none;background:0 0;outline:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;justify-content:flex-start}@media print{.pfe-navigation__account-toggle,.pfe-navigation__log-in-link,.pfe-navigation__menu-toggle,.pfe-navigation__search-toggle{display:none!important}}@media (min-width:768px){.pfe-navigation__account-toggle,.pfe-navigation__log-in-link,.pfe-navigation__menu-toggle,.pfe-navigation__search-toggle{--pfe-icon--color:var(--pfe-navigation__nav-bar--Color--default, var(--pfe-theme--color--ui-base--text, #fff));display:flex;flex-direction:column;justify-content:flex-end;width:auto;height:72px;height:72px;height:var(--pfe-navigation__nav-bar--Height,72px);padding:14px 8px;font-size:12px;font-size:12px;font-size:var(--pfe-navigation--FontSize--xs,12px);color:#fff;color:#fff;color:var(--pfe-navigation__nav-bar--Color--default,var(--pfe-theme--color--ui-base--text,#fff))}@supports (display:grid){.pfe-navigation__account-toggle,.pfe-navigation__log-in-link,.pfe-navigation__menu-toggle,.pfe-navigation__search-toggle{display:grid;grid-template-rows:26px 18px;align-items:center;justify-items:center}}.pfe-navigation__account-toggle[class]:focus,.pfe-navigation__account-toggle[class]:hover,.pfe-navigation__log-in-link[class]:focus,.pfe-navigation__log-in-link[class]:hover,.pfe-navigation__menu-toggle[class]:focus,.pfe-navigation__menu-toggle[class]:hover,.pfe-navigation__search-toggle[class]:focus,.pfe-navigation__search-toggle[class]:hover{box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c))}}.pfe-navigation__account-toggle:focus,.pfe-navigation__account-toggle:hover,.pfe-navigation__log-in-link:focus,.pfe-navigation__log-in-link:hover,.pfe-navigation__menu-toggle:focus,.pfe-navigation__menu-toggle:hover,.pfe-navigation__search-toggle:focus,.pfe-navigation__search-toggle:hover{box-shadow:inset 4px 0 0 0 #06c;box-shadow:inset 4px 0 0 0 #06c;box-shadow:inset 4px 0 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c))}@media (min-width:768px){.pfe-navigation__account-toggle:focus,.pfe-navigation__account-toggle:hover,.pfe-navigation__log-in-link:focus,.pfe-navigation__log-in-link:hover,.pfe-navigation__menu-toggle:focus,.pfe-navigation__menu-toggle:hover,.pfe-navigation__search-toggle:focus,.pfe-navigation__search-toggle:hover{box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c))}}.pfe-navigation--collapse-secondary-links .pfe-navigation__account-toggle:focus,.pfe-navigation--collapse-secondary-links .pfe-navigation__account-toggle:hover,.pfe-navigation--collapse-secondary-links .pfe-navigation__log-in-link:focus,.pfe-navigation--collapse-secondary-links .pfe-navigation__log-in-link:hover,.pfe-navigation--collapse-secondary-links .pfe-navigation__menu-toggle:focus,.pfe-navigation--collapse-secondary-links .pfe-navigation__menu-toggle:hover,.pfe-navigation--collapse-secondary-links .pfe-navigation__search-toggle:focus,.pfe-navigation--collapse-secondary-links .pfe-navigation__search-toggle:hover,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__account-toggle:focus,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__account-toggle:hover,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__log-in-link:focus,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__log-in-link:hover,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__menu-toggle:focus,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__menu-toggle:hover,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__search-toggle:focus,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__search-toggle:hover{box-shadow:inset 4px 0 0 0 #06c;box-shadow:inset 4px 0 0 0 #06c;box-shadow:inset 4px 0 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c))}.pfe-navigation__account-toggle:focus,.pfe-navigation__log-in-link:focus,.pfe-navigation__menu-toggle:focus,.pfe-navigation__search-toggle:focus{outline:0}.pfe-navigation__account-toggle:focus:after,.pfe-navigation__log-in-link:focus:after,.pfe-navigation__menu-toggle:focus:after,.pfe-navigation__search-toggle:focus:after{content:'';position:absolute;right:0;bottom:0;top:0;left:0;display:block;border:1px dashed currentColor}.pfe-navigation__account-toggle pfe-icon,.pfe-navigation__log-in-link pfe-icon,.pfe-navigation__menu-toggle pfe-icon,.pfe-navigation__search-toggle pfe-icon{pointer-events:none}.pfe-navigation__account-toggle .secondary-link__icon-wrapper,.pfe-navigation__account-toggle>pfe-icon,.pfe-navigation__log-in-link .secondary-link__icon-wrapper,.pfe-navigation__log-in-link>pfe-icon,.pfe-navigation__menu-toggle .secondary-link__icon-wrapper,.pfe-navigation__menu-toggle>pfe-icon,.pfe-navigation__search-toggle .secondary-link__icon-wrapper,.pfe-navigation__search-toggle>pfe-icon{--pfe-icon--size:18px;padding-right:5px}@media (min-width:768px){.pfe-navigation__account-toggle .secondary-link__icon-wrapper,.pfe-navigation__account-toggle>pfe-icon,.pfe-navigation__log-in-link .secondary-link__icon-wrapper,.pfe-navigation__log-in-link>pfe-icon,.pfe-navigation__menu-toggle .secondary-link__icon-wrapper,.pfe-navigation__menu-toggle>pfe-icon,.pfe-navigation__search-toggle .secondary-link__icon-wrapper,.pfe-navigation__search-toggle>pfe-icon{padding-right:0}}@media (min-width:768px){.pfe-navigation__account-toggle .secondary-link__icon-wrapper,.pfe-navigation__account-toggle>pfe-icon,.pfe-navigation__log-in-link .secondary-link__icon-wrapper,.pfe-navigation__log-in-link>pfe-icon,.pfe-navigation__menu-toggle .secondary-link__icon-wrapper,.pfe-navigation__menu-toggle>pfe-icon,.pfe-navigation__search-toggle .secondary-link__icon-wrapper,.pfe-navigation__search-toggle>pfe-icon{padding:2px 0 4px}}.pfe-navigation--collapse-secondary-links .pfe-navigation__account-toggle .secondary-link__icon-wrapper,.pfe-navigation--collapse-secondary-links .pfe-navigation__account-toggle>pfe-icon,.pfe-navigation--collapse-secondary-links .pfe-navigation__log-in-link .secondary-link__icon-wrapper,.pfe-navigation--collapse-secondary-links .pfe-navigation__log-in-link>pfe-icon,.pfe-navigation--collapse-secondary-links .pfe-navigation__menu-toggle .secondary-link__icon-wrapper,.pfe-navigation--collapse-secondary-links .pfe-navigation__menu-toggle>pfe-icon,.pfe-navigation--collapse-secondary-links .pfe-navigation__search-toggle .secondary-link__icon-wrapper,.pfe-navigation--collapse-secondary-links .pfe-navigation__search-toggle>pfe-icon,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__account-toggle .secondary-link__icon-wrapper,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__account-toggle>pfe-icon,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__log-in-link .secondary-link__icon-wrapper,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__log-in-link>pfe-icon,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__menu-toggle .secondary-link__icon-wrapper,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__menu-toggle>pfe-icon,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__search-toggle .secondary-link__icon-wrapper,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__search-toggle>pfe-icon{padding:0 16px 0 0}.pfe-navigation__account-toggle pfe-icon,.pfe-navigation__log-in-link pfe-icon,.pfe-navigation__menu-toggle pfe-icon,.pfe-navigation__search-toggle pfe-icon{display:block;height:18px}.pfe-navigation__menu-toggle[class]{--pfe-icon--color:var(--pfe-navigation__nav-bar--Color--default, var(--pfe-theme--color--ui-base--text, #fff));display:flex;flex-direction:column;justify-content:flex-end;width:auto;height:72px;height:72px;height:var(--pfe-navigation__nav-bar--Height,72px);padding:14px 8px;font-size:12px;font-size:12px;font-size:var(--pfe-navigation--FontSize--xs,12px);color:#fff;color:#fff;color:var(--pfe-navigation__nav-bar--Color--default,var(--pfe-theme--color--ui-base--text,#fff));display:flex;margin:0 0 0 auto;box-shadow:none;position:relative;min-width:50px}@supports (display:grid){.pfe-navigation__menu-toggle[class]{display:grid;grid-template-rows:26px 18px;align-items:center;justify-items:center}}.pfe-navigation__menu-toggle[class][class]:focus,.pfe-navigation__menu-toggle[class][class]:hover{box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c))}.pfe-navigation__menu-toggle[class][class]{background:0 0;color:#fff;color:#fff;color:var(--pfe-navigation__nav-bar--Color--default,var(--pfe-theme--color--ui-base--text,#fff))}.pfe-navigation__menu-toggle[class]:focus{outline:0}.pfe-navigation__menu-toggle[class]:focus:after{content:'';position:absolute;right:0;bottom:0;top:0;left:0;display:block;border:1px dashed currentColor}@media (min-width:768px){.pfe-navigation__menu-toggle[class]{display:flex;margin:0 auto 0 0}.pfe-navigation--no-main-menu .pfe-navigation__menu-toggle[class]{display:none}}@media (min-width:1200px){.pfe-navigation__menu-toggle[class]{display:none}}.pfe-navigation--collapse-main-menu .pfe-navigation__menu-toggle[class],:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__menu-toggle[class]{display:flex;margin:0 auto 0 0}.pfe-navigation--no-main-menu .pfe-navigation--collapse-main-menu .pfe-navigation__menu-toggle[class],.pfe-navigation--no-main-menu :host(.pfe-navigation--collapse-main-menu) .pfe-navigation__menu-toggle[class]{display:none}.pfe-navigation--collapse-secondary-links .pfe-navigation__menu-toggle[class],:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__menu-toggle[class]{--pfe-icon--color:var(--pfe-navigation__nav-bar--Color--default, var(--pfe-theme--color--ui-base--text, #fff));display:flex;flex-direction:column;justify-content:flex-end;width:auto;height:72px;height:72px;height:var(--pfe-navigation__nav-bar--Height,72px);padding:14px 8px;font-size:12px;font-size:12px;font-size:var(--pfe-navigation--FontSize--xs,12px);color:#fff;color:#fff;color:var(--pfe-navigation__nav-bar--Color--default,var(--pfe-theme--color--ui-base--text,#fff));display:flex;margin:0 0 0 auto}@supports (display:grid){.pfe-navigation--collapse-secondary-links .pfe-navigation__menu-toggle[class],:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__menu-toggle[class]{display:grid;grid-template-rows:26px 18px;align-items:center;justify-items:center}}.pfe-navigation--collapse-secondary-links .pfe-navigation__menu-toggle[class][class]:focus,.pfe-navigation--collapse-secondary-links .pfe-navigation__menu-toggle[class][class]:hover,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__menu-toggle[class][class]:focus,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__menu-toggle[class][class]:hover{box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c))}[open-toggle=mobile__button] .pfe-navigation__menu-toggle[class][class],[open-toggle^=main-menu__] .pfe-navigation__menu-toggle[class][class]{box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c))}[open-toggle=mobile__button] .pfe-navigation__menu-toggle[class][class][class],[open-toggle^=main-menu__] .pfe-navigation__menu-toggle[class][class][class]{--pfe-icon--color:var(--pfe-navigation__nav-bar--Color--active, var(--pfe-theme--color--text, #151515));color:#151515;color:#151515;color:var(--pfe-navigation__nav-bar--Color--active,var(--pfe-theme--color--text,#151515));background:#fff;background:#fff;background:var(--pfe-navigation__nav-bar--toggle--BackgroundColor--active,var(--pfe-theme--color--surface--lightest,#fff))}[open-toggle=mobile__button] .pfe-navigation__menu-toggle[class][class]:focus,[open-toggle^=main-menu__] .pfe-navigation__menu-toggle[class][class]:focus{outline:0}[open-toggle=mobile__button] .pfe-navigation__menu-toggle[class][class]:focus:after,[open-toggle^=main-menu__] .pfe-navigation__menu-toggle[class][class]:focus:after{content:'';position:absolute;right:0;bottom:0;top:0;left:0;display:block;border:1px dashed currentColor}[open-toggle=secondary-links__button--search] .pfe-navigation__menu-toggle[class],[open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__menu-toggle[class]{box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c))}[open-toggle=secondary-links__button--search] .pfe-navigation__menu-toggle[class][class],[open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__menu-toggle[class][class]{--pfe-icon--color:var(--pfe-navigation__nav-bar--Color--active, var(--pfe-theme--color--text, #151515));color:#151515;color:#151515;color:var(--pfe-navigation__nav-bar--Color--active,var(--pfe-theme--color--text,#151515));background:#fff;background:#fff;background:var(--pfe-navigation__nav-bar--toggle--BackgroundColor--active,var(--pfe-theme--color--surface--lightest,#fff))}[open-toggle=secondary-links__button--search] .pfe-navigation__menu-toggle[class]:focus,[open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__menu-toggle[class]:focus{outline:0}[open-toggle=secondary-links__button--search] .pfe-navigation__menu-toggle[class]:focus:after,[open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__menu-toggle[class]:focus:after{content:'';position:absolute;right:0;bottom:0;top:0;left:0;display:block;border:1px dashed currentColor}@media (min-width:768px){[open-toggle=secondary-links__button--search] .pfe-navigation__menu-toggle[class],[open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__menu-toggle[class]{box-shadow:none}[open-toggle=secondary-links__button--search] .pfe-navigation__menu-toggle[class][class],[open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__menu-toggle[class][class]{background:0 0;color:#fff;color:#fff;color:var(--pfe-navigation__nav-bar--Color--default,var(--pfe-theme--color--ui-base--text,#fff))}[open-toggle=secondary-links__button--search] .pfe-navigation__menu-toggle[class]:focus,[open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__menu-toggle[class]:focus{outline:0}[open-toggle=secondary-links__button--search] .pfe-navigation__menu-toggle[class]:focus:after,[open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__menu-toggle[class]:focus:after{content:'';position:absolute;right:0;bottom:0;top:0;left:0;display:block;border:1px dashed currentColor}}.pfe-navigation--collapse-secondary-links [open-toggle=secondary-links__button--search] .pfe-navigation__menu-toggle[class],.pfe-navigation--collapse-secondary-links [open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__menu-toggle[class],:host(.pfe-navigation--collapse-secondary-links) [open-toggle=secondary-links__button--search] .pfe-navigation__menu-toggle[class],:host(.pfe-navigation--collapse-secondary-links) [open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__menu-toggle[class]{box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c))}.pfe-navigation--collapse-secondary-links [open-toggle=secondary-links__button--search] .pfe-navigation__menu-toggle[class][class],.pfe-navigation--collapse-secondary-links [open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__menu-toggle[class][class],:host(.pfe-navigation--collapse-secondary-links) [open-toggle=secondary-links__button--search] .pfe-navigation__menu-toggle[class][class],:host(.pfe-navigation--collapse-secondary-links) [open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__menu-toggle[class][class]{--pfe-icon--color:var(--pfe-navigation__nav-bar--Color--active, var(--pfe-theme--color--text, #151515));color:#151515;color:#151515;color:var(--pfe-navigation__nav-bar--Color--active,var(--pfe-theme--color--text,#151515));background:#fff;background:#fff;background:var(--pfe-navigation__nav-bar--toggle--BackgroundColor--active,var(--pfe-theme--color--surface--lightest,#fff))}.pfe-navigation--collapse-secondary-links [open-toggle=secondary-links__button--search] .pfe-navigation__menu-toggle[class]:focus,.pfe-navigation--collapse-secondary-links [open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__menu-toggle[class]:focus,:host(.pfe-navigation--collapse-secondary-links) [open-toggle=secondary-links__button--search] .pfe-navigation__menu-toggle[class]:focus,:host(.pfe-navigation--collapse-secondary-links) [open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__menu-toggle[class]:focus{outline:0}.pfe-navigation--collapse-secondary-links [open-toggle=secondary-links__button--search] .pfe-navigation__menu-toggle[class]:focus:after,.pfe-navigation--collapse-secondary-links [open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__menu-toggle[class]:focus:after,:host(.pfe-navigation--collapse-secondary-links) [open-toggle=secondary-links__button--search] .pfe-navigation__menu-toggle[class]:focus:after,:host(.pfe-navigation--collapse-secondary-links) [open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__menu-toggle[class]:focus:after{content:'';position:absolute;right:0;bottom:0;top:0;left:0;display:block;border:1px dashed currentColor}.pfe-navigation__burger-icon{position:absolute;top:25px;left:calc(50% - 9px);transform:scale(.25) translateX(1px);transform-origin:left top;transition:transform .3s cubic-bezier(.55,.085,0,.99);backface-visibility:hidden}[aria-expanded=true] .pfe-navigation__burger-icon{transform:scale(.25) translateX(5px);transform-origin:left top}.pfe-navigation__burger-icon:after,.pfe-navigation__burger-icon:before{content:'';position:absolute;top:0;left:0;box-sizing:border-box;display:block;width:72px}.pfe-navigation__burger-icon:before{height:0;border-top:8px solid currentColor;background:currentColor;transform:translateY(-28px);transform-origin:left top;transition:transform .3s cubic-bezier(.55,.085,0,.99)}[aria-expanded=true] .pfe-navigation__burger-icon:before{border-color:currentColor;transform:translateY(-32px) rotate(45deg) scaleX(1) translateX(12px);transform-origin:left top}.pfe-navigation__burger-icon:after{height:36px;border:8px solid currentColor;border-width:8px 0 8px 0;transition:border .3s cubic-bezier(.55,.085,0,.99),transform .3s cubic-bezier(.55,.085,0,.99);transform-origin:left bottom}[aria-expanded=true] .pfe-navigation__burger-icon:after{transform:translateY(4px) rotate(-45deg) scaleX(1) translateX(12px);border-top-color:transparent;border-bottom-color:currentColor;transform-origin:left bottom}[id=mobile__button-text]{display:block;min-width:34px;grid-row:2}.pfe-navigation__mobile-dropdown[class][class][class]{position:absolute;top:100%;left:0;display:none;width:100%;height:calc(100vh - 72px);height:calc(100vh - 72px);height:calc(100vh - var(--pfe-navigation__nav-bar--Height,72px));margin:0;padding:16px 32px;padding:16px 32px;padding:var(--pfe-navigation__mobile-dropdown--PaddingVertical,16px) var(--pfe-navigation__mobile-dropdown--PaddingHorizontal,32px);overflow-x:hidden;overflow-y:auto;background:#fff;background:#fff;background:var(--pfe-navigation__dropdown--Background,var(--pfe-theme--color--surface--lightest,#fff))}@media (min-width:768px){.pfe-navigation__mobile-dropdown[class][class][class]{height:auto}}@media (min-width:1200px){.pfe-navigation__mobile-dropdown[class][class][class]{overflow:visible}}.pfe-navigation--collapse-main-menu .pfe-navigation__mobile-dropdown[class][class][class],:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__mobile-dropdown[class][class][class]{overflow-y:auto}.pfe-navigation--collapse-secondary-links .pfe-navigation__mobile-dropdown[class][class][class],:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__mobile-dropdown[class][class][class]{height:calc(100vh - 72px);height:calc(100vh - 72px);height:calc(100vh - var(--pfe-navigation__nav-bar--Height,72px))}[open-toggle=mobile__button] .pfe-navigation__mobile-dropdown[class][class][class],[open-toggle^=main-menu__] .pfe-navigation__mobile-dropdown[class][class][class]{display:flex}[open-toggle=secondary-links__button--search] .pfe-navigation__mobile-dropdown[class][class][class],[open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__mobile-dropdown[class][class][class]{display:flex}@media (min-width:768px){[open-toggle=secondary-links__button--search] .pfe-navigation__mobile-dropdown[class][class][class],[open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__mobile-dropdown[class][class][class]{display:none}}.pfe-navigation--collapse-secondary-links [open-toggle=secondary-links__button--search] .pfe-navigation__mobile-dropdown[class][class][class],.pfe-navigation--collapse-secondary-links [open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__mobile-dropdown[class][class][class],:host(.pfe-navigation--collapse-secondary-links) [open-toggle=secondary-links__button--search] .pfe-navigation__mobile-dropdown[class][class][class],:host(.pfe-navigation--collapse-secondary-links) [open-toggle^=pfe-navigation__secondary-link--] .pfe-navigation__mobile-dropdown[class][class][class]{display:flex}:host([pfe-sticky]) .pfe-navigation__mobile-dropdown[class][class][class]{max-height:calc(100vh - 72px);max-height:calc(100vh - 72px);max-height:calc(100vh - var(--pfe-navigation__nav-bar--Height,72px));overflow-y:auto}@media (min-width:1200px){:host([pfe-sticky]) .pfe-navigation__mobile-dropdown[class][class][class]{max-height:9999em;overflow:visible}}.pfe-navigation--collapse-main-menu :host([pfe-sticky]) .pfe-navigation__mobile-dropdown[class][class][class],:host(.pfe-navigation--collapse-main-menu) :host([pfe-sticky]) .pfe-navigation__mobile-dropdown[class][class][class]{max-height:calc(100vh - 72px);max-height:calc(100vh - 72px);max-height:calc(100vh - var(--pfe-navigation__nav-bar--Height,72px));overflow-y:auto}@media (min-width:768px){.pfe-navigation__outer-menu-wrapper,.pfe-navigation__outer-menu-wrapper__inner{display:flex;align-items:stretch}}@media (min-width:1200px){.pfe-navigation__outer-menu-wrapper,.pfe-navigation__outer-menu-wrapper__inner{flex-grow:1}}.pfe-navigation--collapse-main-menu .pfe-navigation__outer-menu-wrapper,.pfe-navigation--collapse-main-menu .pfe-navigation__outer-menu-wrapper__inner,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__outer-menu-wrapper,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__outer-menu-wrapper__inner{flex-grow:0}.pfe-navigation--collapse-secondary-links .pfe-navigation__outer-menu-wrapper,.pfe-navigation--collapse-secondary-links .pfe-navigation__outer-menu-wrapper__inner,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__outer-menu-wrapper,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__outer-menu-wrapper__inner{display:block}.pfe-navigation__outer-menu-wrapper{height:auto}@media (min-width:1200px){.pfe-navigation__outer-menu-wrapper{height:72px;height:72px;height:var(--pfe-navigation__nav-bar--Height,72px)}}.pfe-navigation--collapse-main-menu .pfe-navigation__outer-menu-wrapper,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__outer-menu-wrapper{height:auto}:host(:not([open-toggle])) .pfe-navigation--is-resizing .pfe-navigation__outer-menu-wrapper{overflow:hidden}.pfe-navigation__outer-menu-wrapper__inner{width:100%;opacity:0;transition:transform .25s ease-in-out,opacity .25s 1s linear;transition:transform .25s ease-in-out,opacity .25s 1s linear;transition:transform .25s ease-in-out,opacity .25s var(--pfe-navigation--fade-transition-delay,1s) linear}@media (prefers-reduced-motion){.pfe-navigation__outer-menu-wrapper__inner{transition:opacity .25s 1s linear;transition:opacity .25s 1s linear;transition:opacity .25s var(--pfe-navigation--fade-transition-delay,1s) linear}}:host([breakpoint]) .pfe-navigation--processed .pfe-navigation__outer-menu-wrapper__inner{opacity:1}:host([mobile-slide]) .pfe-navigation__outer-menu-wrapper__inner{position:relative;transform:translate(-100vw)}@media (min-width:768px){:host([mobile-slide]) .pfe-navigation__outer-menu-wrapper__inner{position:static;transform:none}}.pfe-navigation--collapse-secondary-links :host([mobile-slide]) .pfe-navigation__outer-menu-wrapper__inner,:host(.pfe-navigation--collapse-secondary-links) :host([mobile-slide]) .pfe-navigation__outer-menu-wrapper__inner{position:relative;transform:translate(-100vw)}.pfe-navigation__menu-wrapper{display:flex}@media (min-width:1200px){.pfe-navigation__menu-wrapper{margin-right:auto}}.pfe-navigation--collapse-main-menu .pfe-navigation__menu-wrapper,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__menu-wrapper{margin-right:0}.pfe-navigation__menu,.pfe-navigation__menu ul{list-style:none;margin:0;padding:0}.pfe-navigation__menu{width:100%}@media print{.pfe-navigation__menu{display:none!important}}@media (min-width:1200px){.pfe-navigation__menu{display:flex;align-items:stretch;width:auto}}.pfe-navigation--collapse-main-menu .pfe-navigation__menu,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__menu{display:block;width:100%}.pfe-navigation__menu-item{border-top:1px solid #d2d2d2;border-top:1px solid #d2d2d2;border-top:var(--pfe-navigation__dropdown--separator--Border,1px solid var(--pfe-theme--color--ui--border--lighter,#d2d2d2));padding:0;transition:border .5s .25s linear}@media (min-width:1200px){.pfe-navigation__menu-item{display:flex;align-items:stretch;border:none}}.pfe-navigation--collapse-main-menu .pfe-navigation__menu-item,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__menu-item{display:block;border-top:1px solid #d2d2d2;border-top:1px solid #d2d2d2;border-top:var(--pfe-navigation__dropdown--separator--Border,1px solid var(--pfe-theme--color--ui--border--lighter,#d2d2d2))}.pfe-navigation__menu-item:last-child{border-bottom:1px solid #d2d2d2;border-bottom:1px solid #d2d2d2;border-bottom:var(--pfe-navigation__dropdown--separator--Border,1px solid var(--pfe-theme--color--ui--border--lighter,#d2d2d2))}@media (min-width:1200px){.pfe-navigation__menu-item:last-child{border:0}}.pfe-navigation--collapse-main-menu .pfe-navigation__menu-item:last-child,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__menu-item:last-child{border-bottom:1px solid #d2d2d2;border-bottom:1px solid #d2d2d2;border-bottom:var(--pfe-navigation__dropdown--separator--Border,1px solid var(--pfe-theme--color--ui--border--lighter,#d2d2d2))}.pfe-navigation__menu-item--open{box-shadow:inset 4px 0 0 0 #06c,0 1px 2px rgba(0,0,0,.12);box-shadow:inset 4px 0 0 0 #06c,0 1px 2px rgba(0,0,0,.12);box-shadow:inset 4px 0 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c)),var(--pfe-navigation__dropdown--BoxShadow,0 1px 2px rgba(0,0,0,.12))}@media (min-width:1200px){.pfe-navigation__menu-item--open{box-shadow:none}}.pfe-navigation--collapse-main-menu .pfe-navigation__menu-item--open,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__menu-item--open{box-shadow:inset 4px 0 0 0 #06c,0 1px 2px rgba(0,0,0,.12);box-shadow:inset 4px 0 0 0 #06c,0 1px 2px rgba(0,0,0,.12);box-shadow:inset 4px 0 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c)),var(--pfe-navigation__dropdown--BoxShadow,0 1px 2px rgba(0,0,0,.12))}.pfe-navigation__menu-link{--pfe-icon--color:var(--pfe-navigation__dropdown--link--Color, var(--pfe-theme--color--link, #06c));position:relative;display:flex;align-items:center;width:100%;margin:0;padding:8px 24px;border:0;white-space:nowrap;font-family:inherit;font-size:1rem;font-size:1rem;font-size:var(--pf-global--FontSize--md,1rem);color:#06c;color:#06c;color:var(--pfe-navigation__dropdown--link--Color,var(--pfe-theme--color--link,#06c));text-align:center;text-decoration:none;background:0 0;outline:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;justify-content:flex-start;position:relative}@media print{.pfe-navigation__menu-link{display:none!important}}.pfe-navigation__menu-link:focus,.pfe-navigation__menu-link:hover{box-shadow:inset 4px 0 0 0 #06c;box-shadow:inset 4px 0 0 0 #06c;box-shadow:inset 4px 0 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c))}@media (min-width:1200px){.pfe-navigation__menu-link:focus,.pfe-navigation__menu-link:hover{box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c))}}.pfe-navigation--collapse-main-menu .pfe-navigation__menu-link:focus,.pfe-navigation--collapse-main-menu .pfe-navigation__menu-link:hover,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__menu-link:focus,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__menu-link:hover{box-shadow:inset 4px 0 0 0 #06c;box-shadow:inset 4px 0 0 0 #06c;box-shadow:inset 4px 0 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c))}.pfe-navigation__menu-link:focus{outline:0}.pfe-navigation__menu-link:focus:after{content:'';position:absolute;right:0;bottom:0;top:0;left:0;display:block;border:1px dashed currentColor}.pfe-navigation__menu-link pfe-icon{pointer-events:none}.pfe-navigation__menu-link[class]{width:100%;max-height:9999em;padding:16px 24px;font-size:1.25rem;font-size:1.25rem;font-size:var(--pf-global--FontSize--xl,1.25rem);font-weight:500;color:#151515;color:#151515;color:var(--pfe-navigation__dropdown--Color,#151515);background:0 0}@media (min-width:1200px){.pfe-navigation__menu-link[class]{width:auto;max-height:72px;padding:0 11px;font-size:1rem;font-size:1rem;font-size:var(--pf-global--FontSize--md,1rem);font-weight:400;color:#fff;color:#fff;color:var(--pfe-navigation__nav-bar--Color--default,var(--pfe-theme--color--ui-base--text,#fff))}}.pfe-navigation--collapse-main-menu .pfe-navigation__menu-link,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__menu-link{width:100%;max-height:9999em;padding:16px 24px;font-size:1.25rem;font-size:1.25rem;font-size:var(--pf-global--FontSize--xl,1.25rem);font-weight:500;color:#151515;color:#151515;color:var(--pfe-navigation__dropdown--Color,#151515);background:0 0}.pfe-navigation__menu-link--has-dropdown{position:relative}@media (min-width:1200px){.pfe-navigation__menu-link--has-dropdown:focus{outline:0}.pfe-navigation__menu-link--has-dropdown:focus:after{content:'';position:absolute;right:0;bottom:0;top:0;left:0;display:block;border:1px dashed currentColor}}.pfe-navigation--collapse-main-menu .pfe-navigation__menu-link--has-dropdown:focus,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__menu-link--has-dropdown:focus{box-shadow:none}@media (min-width:1200px){.pfe-navigation__menu-item--open>.pfe-navigation__menu-link--has-dropdown{--pfe-icon--color:var(--pfe-navigation__nav-bar--Color--active, var(--pfe-theme--color--text, #151515));color:#151515;color:#151515;color:var(--pfe-navigation__nav-bar--Color--active,var(--pfe-theme--color--text,#151515));background:#fff;background:#fff;background:var(--pfe-navigation__nav-bar--toggle--BackgroundColor--active,var(--pfe-theme--color--surface--lightest,#fff))}}.pfe-navigation--collapse-main-menu .pfe-navigation__menu-item--open>.pfe-navigation__menu-link--has-dropdown,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__menu-item--open>.pfe-navigation__menu-link--has-dropdown{box-shadow:none;background:0 0}@media (min-width:1200px){.pfe-navigation__menu-item--open>.pfe-navigation__menu-link--has-dropdown:focus{outline:0}.pfe-navigation__menu-item--open>.pfe-navigation__menu-link--has-dropdown:focus:after{content:'';position:absolute;right:0;bottom:0;top:0;left:0;display:block;border:1px dashed currentColor}}.pfe-navigation__menu-link--has-dropdown:before{position:absolute;top:50%;left:auto;right:24px;display:block;width:11px;height:11px;border:4px solid currentColor;border-bottom:0;border-left:0;transform:translateX(4px) rotate(45deg);transform-origin:right top;transition:transform .25s;content:''}@media (min-width:1200px){.pfe-navigation__menu-link--has-dropdown:before{position:absolute;top:100%;left:50%;right:auto;width:0;height:0;border:4px solid transparent;border-bottom:0;transform:translate(-4px,-14px);transition:none}}.pfe-navigation--collapse-main-menu .pfe-navigation__menu-link--has-dropdown:before,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__menu-link--has-dropdown:before{position:absolute;top:50%;left:auto;right:24px;display:block;width:11px;height:11px;border:4px solid currentColor;border-bottom:0;border-left:0;transform:translateX(4px) rotate(45deg);transform-origin:right top;transition:transform .25s}@media (min-width:1200px){.pfe-navigation__menu-link--has-dropdown:focus:before,.pfe-navigation__menu-link--has-dropdown:hover:before{border-top-color:#6a6e73;border-top-color:#6a6e73;border-top-color:var(--pfe-navigation__dropdown--arrow--color,#6a6e73)}}.pfe-navigation--collapse-main-menu .pfe-navigation__menu-link--has-dropdown:focus:before,.pfe-navigation--collapse-main-menu .pfe-navigation__menu-link--has-dropdown:hover:before,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__menu-link--has-dropdown:focus:before,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__menu-link--has-dropdown:hover:before{position:absolute;top:50%;left:auto;right:24px;display:block;width:11px;height:11px;border:4px solid currentColor;border-bottom:0;border-left:0;transform:translateX(4px) rotate(45deg);transform-origin:right top;transition:transform .25s;border-top-color:#151515;border-top-color:#151515;border-top-color:var(--pfe-navigation__dropdown--Color,#151515)}.pfe-navigation__menu-item--open>.pfe-navigation__menu-link--has-dropdown[class]:before{transform:translateY(7px) rotate(135deg)}@media (min-width:1200px){.pfe-navigation__menu-item--open>.pfe-navigation__menu-link--has-dropdown[class]:before{border-top-color:#6a6e73;border-top-color:#6a6e73;border-top-color:var(--pfe-navigation__dropdown--arrow--color--active,#6a6e73);transform:translate(-4px,-12px)}}.pfe-navigation--collapse-main-menu .pfe-navigation__menu-item--open>.pfe-navigation__menu-link--has-dropdown[class]:before,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__menu-item--open>.pfe-navigation__menu-link--has-dropdown[class]:before{transform:rotate(135deg)}.pfe-navigation__dropdown-wrapper{position:static;max-height:9999em;padding:0 calc(24px + 16px);padding:0 calc(24px + 16px);padding:0 calc(var(--pfe-navigation__dropdown--full-width--spacing--mobile,24px) + var(--pfe-navigation__dropdown--single-column--spacing,16px));overflow-y:visible;background:0 0;transition:height .25s ease-in-out;transition:height .25s ease-in-out;transition:var(--pfe-navigation--accordion-transition,height .25s ease-in-out);display:flex;align-items:flex-start;justify-content:center;width:100%;height:0;overflow:hidden;will-change:height}@media (prefers-reduced-motion){.pfe-navigation__dropdown-wrapper{transition:none}}@media (min-width:1200px){.pfe-navigation__dropdown-wrapper{position:absolute;top:100%;left:0;padding:0 calc(64px + 24px);padding:0 calc(64px + 24px);padding:0 calc(var(--pfe-navigation__dropdown--full-width--spacing--desktop,64px) + var(--pfe-navigation__dropdown--full-width--spacing--mobile,24px));background:#fff;background:#fff;background:var(--pfe-navigation__dropdown--Background,var(--pfe-theme--color--surface--lightest,#fff));transition:var(--pfe-navigation--dropdown-transition);height:auto}:host([pfe-sticky]) .pfe-navigation__dropdown-wrapper{max-height:calc(100vh - 72px);max-height:calc(100vh - 72px);max-height:calc(100vh - var(--pfe-navigation__nav-bar--Height,72px));overflow-y:auto}}@media (min-width:1200px) and (prefers-reduced-motion){.pfe-navigation__dropdown-wrapper{transition:none}}.pfe-navigation--collapse-main-menu .pfe-navigation__dropdown-wrapper,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__dropdown-wrapper{position:static;max-height:9999em;padding:0 calc(24px + 16px);padding:0 calc(24px + 16px);padding:0 calc(var(--pfe-navigation__dropdown--full-width--spacing--mobile,24px) + var(--pfe-navigation__dropdown--single-column--spacing,16px));overflow-y:visible;background:0 0;transition:height .25s ease-in-out;transition:height .25s ease-in-out;transition:var(--pfe-navigation--accordion-transition,height .25s ease-in-out);height:0}@media (prefers-reduced-motion){.pfe-navigation--collapse-main-menu .pfe-navigation__dropdown-wrapper,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__dropdown-wrapper{transition:none}}.pfe-navigation__dropdown-wrapper.pfe-navigation__dropdown-wrapper--invisible{display:none}.pfe-navigation__dropdown-wrapper--single-column{padding:0 calc(24px + 16px);padding:0 calc(24px + 16px);padding:0 calc(var(--pfe-navigation__dropdown--full-width--spacing--mobile,24px) + var(--pfe-navigation__dropdown--single-column--spacing,16px))}@media (min-width:1200px){.pfe-navigation__dropdown-wrapper--single-column{position:absolute;top:100%;max-width:100%;min-width:13em;padding:0 32px;box-shadow:0 1px 2px rgba(0,0,0,.12);box-shadow:0 1px 2px rgba(0,0,0,.12);box-shadow:var(--pfe-navigation__dropdown--BoxShadow,0 1px 2px rgba(0,0,0,.12))}}.pfe-navigation--collapse-main-menu .pfe-navigation__dropdown-wrapper--single-column,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__dropdown-wrapper--single-column{position:static;max-width:100%;box-shadow:none}@media (min-width:1200px){.pfe-navigation__dropdown-wrapper--single-column{left:auto;width:auto}}.pfe-navigation__dropdown{display:block;width:calc(100% + 32px);max-width:1136px;max-width:1136px;max-width:var(--pfe-navigation--content-max-width,1136px);margin-left:-16px;margin-right:-16px;padding-top:12px;padding-bottom:12px;-moz-column-count:auto;column-count:auto;gap:0;font-size:1rem;font-size:1rem;font-size:var(--pf-global--FontSize--md,1rem);color:#151515;color:#151515;color:var(--pfe-navigation__dropdown--Color,#151515);visibility:hidden;transition:visibility 0s linear .4s}.pfe-navigation__dropdown a{display:inline-block;color:#06c;color:#06c;color:var(--pfe-navigation__dropdown--link--Color,var(--pfe-theme--color--link,#06c));border:1px solid transparent}.pfe-navigation__dropdown a:focus,.pfe-navigation__dropdown a:hover{color:#036;color:#036;color:var(--pfe-navigation__dropdown--link--Color--hover,#036);text-decoration:underline}.pfe-navigation__dropdown a:focus{border:1px dashed currentColor;border-top:1px dashed currentColor;outline:0}.pfe-navigation__dropdown .pfe-link-list--header,.pfe-navigation__dropdown [role=heading][aria-heading-level],.pfe-navigation__dropdown h2,.pfe-navigation__dropdown h3,.pfe-navigation__dropdown h4,.pfe-navigation__dropdown h5,.pfe-navigation__dropdown h6{margin:32px 0 .75em;margin:32px 0 .75em;margin:var(--pfe-navigation--gutter,32px) 0 .75em;padding:0;-moz-column-break-inside:avoid;break-inside:avoid;font-size:1.125rem;font-size:1.125rem;font-size:var(--pf-global--FontSize--lg,1.125rem);font-family:Red Hat Display,RedHatDisplay,Arial,Helvetica,sans-serif;font-family:Red Hat Display,RedHatDisplay,Arial,Helvetica,sans-serif;font-family:var(--pfe-navigation--FontFamilyHeadline,Red Hat Display,RedHatDisplay,Arial,Helvetica,sans-serif);font-weight:500;color:#464646;color:#464646;color:var(--pfe-navigation__dropdown--headings--Color,#464646)}.pfe-navigation__dropdown .pfe-link-list--header:first-child,.pfe-navigation__dropdown [role=heading][aria-heading-level]:first-child,.pfe-navigation__dropdown h2:first-child,.pfe-navigation__dropdown h3:first-child,.pfe-navigation__dropdown h4:first-child,.pfe-navigation__dropdown h5:first-child,.pfe-navigation__dropdown h6:first-child{margin-top:0}.pfe-navigation__dropdown .pfe-link-list--header a,.pfe-navigation__dropdown [role=heading][aria-heading-level] a,.pfe-navigation__dropdown h2 a,.pfe-navigation__dropdown h3 a,.pfe-navigation__dropdown h4 a,.pfe-navigation__dropdown h5 a,.pfe-navigation__dropdown h6 a{color:#464646;color:#464646;color:var(--pfe-navigation__dropdown--headings--Color,#464646);border:1px solid transparent;text-decoration:underline}.pfe-navigation__dropdown .pfe-link-list--header a:focus,.pfe-navigation__dropdown .pfe-link-list--header a:hover,.pfe-navigation__dropdown [role=heading][aria-heading-level] a:focus,.pfe-navigation__dropdown [role=heading][aria-heading-level] a:hover,.pfe-navigation__dropdown h2 a:focus,.pfe-navigation__dropdown h2 a:hover,.pfe-navigation__dropdown h3 a:focus,.pfe-navigation__dropdown h3 a:hover,.pfe-navigation__dropdown h4 a:focus,.pfe-navigation__dropdown h4 a:hover,.pfe-navigation__dropdown h5 a:focus,.pfe-navigation__dropdown h5 a:hover,.pfe-navigation__dropdown h6 a:focus,.pfe-navigation__dropdown h6 a:hover{text-decoration:none;color:#036;color:#036;color:var(--pfe-navigation__dropdown--link--Color--hover,#036)}.pfe-navigation__dropdown .pfe-link-list--header a:focus,.pfe-navigation__dropdown [role=heading][aria-heading-level] a:focus,.pfe-navigation__dropdown h2 a:focus,.pfe-navigation__dropdown h3 a:focus,.pfe-navigation__dropdown h4 a:focus,.pfe-navigation__dropdown h5 a:focus,.pfe-navigation__dropdown h6 a:focus{border:1px dashed currentColor;border-top:1px dashed currentColor;outline:0}.pfe-navigation__dropdown li{margin:0 0 16px;-moz-column-break-inside:avoid;break-inside:avoid}.pfe-navigation__dropdown a,.pfe-navigation__dropdown pfe-card,.pfe-navigation__dropdown pfe-cta{-moz-column-break-inside:avoid;break-inside:avoid}.pfe-navigation__dropdown pfe-cta[pfe-priority=primary],.pfe-navigation__dropdown pfe-cta[priority=primary]{--pfe-cta--BackgroundColor:var(--pfe-navigation__dropdown--pfe-cta--BackgroundColor, #e00);--pfe-cta--BackgroundColor--hover:var(--pfe-navigation__dropdown--pfe-cta--hover--BackgroundColor, #c00);--pfe-theme--ui--border-width:0}.pfe-navigation__dropdown pfe-cta[pfe-priority=primary]:focus,.pfe-navigation__dropdown pfe-cta[pfe-priority=primary]:hover,.pfe-navigation__dropdown pfe-cta[priority=primary]:focus,.pfe-navigation__dropdown pfe-cta[priority=primary]:hover{--pfe-cta--BackgroundColor:var(--pfe-navigation__dropdown--pfe-cta--hover--BackgroundColor, #c00)}pfe-card .pfe-navigation__dropdown pfe-cta{margin-top:0}@media (min-width:768px){.pfe-navigation__dropdown{display:block;-moz-column-count:3;column-count:3;gap:32px;gap:32px;gap:var(--pfe-navigation--gutter,32px);padding-top:12px;padding-bottom:12px}}@media (min-width:1200px){.pfe-navigation__dropdown{display:flex;flex-wrap:wrap;-moz-column-count:auto;column-count:auto;padding-top:32px;padding-bottom:32px}@supports (display:grid){.pfe-navigation__dropdown{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:32px;gap:32px;gap:var(--pfe-navigation--gutter,32px);grid-auto-flow:row}}}.pfe-navigation--collapse-main-menu .pfe-navigation__dropdown,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__dropdown{display:block;-moz-column-count:3;column-count:3;gap:32px;gap:32px;gap:var(--pfe-navigation--gutter,32px);padding-top:12px;padding-bottom:12px}.pfe-navigation--collapse-secondary-links .pfe-navigation__dropdown,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__dropdown{display:block;width:calc(100% + 32px);max-width:1136px;max-width:1136px;max-width:var(--pfe-navigation--content-max-width,1136px);margin-left:-16px;margin-right:-16px;padding-top:12px;padding-bottom:12px;-moz-column-count:auto;column-count:auto;gap:0}@media (max-width:48em){.pfe-navigation__dropdown[class]{display:block;-moz-column-count:1;column-count:1}}:host([breakpoint=mobile]) .pfe-navigation__dropdown{display:block;width:calc(100% + 32px);max-width:1136px;max-width:1136px;max-width:var(--pfe-navigation--content-max-width,1136px);margin-left:-16px;margin-right:-16px;padding-top:12px;padding-bottom:12px;-moz-column-count:auto;column-count:auto;gap:0}.pfe-navigation__menu-item--open .pfe-navigation__dropdown{visibility:visible;transition-delay:0s}.pfe-navigation__dropdown>*{margin:0 0 18px;-moz-column-break-inside:avoid;break-inside:avoid}@media (min-width:1200px){.pfe-navigation__dropdown>*{margin:0}}.pfe-navigation--collapse-main-menu .pfe-navigation__dropdown>*,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__dropdown>*{margin:0 0 18px}.pfe-navigation__dropdown--3-column{display:block;width:calc(100% + 32px);max-width:1136px;max-width:1136px;max-width:var(--pfe-navigation--content-max-width,1136px);margin-left:-16px;margin-right:-16px;padding-top:12px;padding-bottom:12px;-moz-column-count:auto;column-count:auto;gap:0}@media (min-width:768px){.pfe-navigation__dropdown--3-column{display:block;-moz-column-count:3;column-count:3;gap:32px;gap:32px;gap:var(--pfe-navigation--gutter,32px);padding-top:12px;padding-bottom:12px}}@media (min-width:1200px){.pfe-navigation__dropdown--3-column{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));padding-top:32px;padding-bottom:32px;-moz-column-count:auto;column-count:auto}}.pfe-navigation--collapse-main-menu .pfe-navigation__dropdown--3-column,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__dropdown--3-column{display:block;-moz-column-count:3;column-count:3;gap:32px;gap:32px;gap:var(--pfe-navigation--gutter,32px);padding-top:12px;padding-bottom:12px}.pfe-navigation--collapse-secondary-links .pfe-navigation__dropdown--3-column,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__dropdown--3-column{display:block;width:calc(100% + 32px);max-width:1136px;max-width:1136px;max-width:var(--pfe-navigation--content-max-width,1136px);margin-left:-16px;margin-right:-16px;padding-top:12px;padding-bottom:12px;-moz-column-count:auto;column-count:auto;gap:0}.pfe-navigation__dropdown--single-column[class]{display:block;-moz-column-count:auto;column-count:auto;gap:0}@media (min-width:1200px){.pfe-navigation__dropdown--single-column{padding:16px 0;padding:16px 0;padding:var(--pfe-navigation__dropdown--single-column--spacing,16px) 0;background:#fff;background:#fff;background:var(--pfe-navigation__dropdown--Background,var(--pfe-theme--color--surface--lightest,#fff))}}.pfe-navigation--collapse-main-menu .pfe-navigation__dropdown--single-column,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__dropdown--single-column{background:0 0}.pfe-navigation__dropdown--single-column [role=heading][aria-heading-level],.pfe-navigation__dropdown--single-column h1,.pfe-navigation__dropdown--single-column h2,.pfe-navigation__dropdown--single-column h3,.pfe-navigation__dropdown--single-column h4,.pfe-navigation__dropdown--single-column h5,.pfe-navigation__dropdown--single-column h6{color:#6a6e73;color:#6a6e73;color:var(--pfe-navigation__dropdown--headings--single-column--Color,#6a6e73);font-family:Red Hat Display,RedHatDisplay,Arial,Helvetica,sans-serif;font-family:Red Hat Display,RedHatDisplay,Arial,Helvetica,sans-serif;font-family:var(--pfe-navigation--FontFamilyHeadline,Red Hat Display,RedHatDisplay,Arial,Helvetica,sans-serif);font-weight:500;font-size:.875rem;font-size:.875rem;font-size:var(--pf-global--FontSize--sm,.875rem)}.pfe-navigation__dropdown--single-column ul+ul,.pfe-navigation__sub-nav-link--separator[class]{border-top:1px solid #d2d2d2;border-top:1px solid #d2d2d2;border-top:var(--pfe-navigation__dropdown--separator--Border,1px solid var(--pfe-theme--color--ui--border--lighter,#d2d2d2));margin-left:calc(16px * -1);margin-left:calc(16px * -1);margin-left:calc(var(--pfe-navigation__dropdown--single-column--spacing,16px) * -1);margin-right:calc(16px * -1);margin-right:calc(16px * -1);margin-right:calc(var(--pfe-navigation__dropdown--single-column--spacing,16px) * -1);margin-top:16px;margin-top:16px;margin-top:var(--pfe-navigation__dropdown--single-column--spacing,16px);padding-left:16px;padding-left:16px;padding-left:var(--pfe-navigation__dropdown--single-column--spacing,16px);padding-right:16px;padding-right:16px;padding-right:var(--pfe-navigation__dropdown--single-column--spacing,16px);padding-top:16px;padding-top:16px;padding-top:var(--pfe-navigation__dropdown--single-column--spacing,16px)}.pfe-navigation__footer{display:flex;flex-wrap:nowrap;flex-direction:column;justify-content:flex-start;align-items:flex-start;border-top:1px solid #d2d2d2;border-top:1px solid #d2d2d2;border-top:var(--pfe-navigation__dropdown--separator--Border,1px solid var(--pfe-theme--color--ui--border--lighter,#d2d2d2));grid-column:1/-1;-moz-column-span:all;column-span:all;margin:16px 0 0;padding:26px 0 16px}@media (min-width:768px){.pfe-navigation__footer{display:flex;flex-wrap:wrap;flex-direction:row;justify-content:flex-start;align-items:flex-start}}@media (min-width:1200px){.pfe-navigation__footer{display:flex;flex-wrap:wrap;-moz-column-count:auto;column-count:auto;padding-top:32px;padding-bottom:32px;margin:calc(16px * 2) 0 calc(16px * 1.5);margin:calc(16px * 2) 0 calc(16px * 1.5);margin:calc(var(--pfe-theme--container-padding,16px) * 2) 0 calc(var(--pfe-theme--container-padding,16px) * 1.5);padding:calc(16px * 2.5) 0 0;padding:calc(16px * 2.5) 0 0;padding:calc(var(--pfe-theme--container-padding,16px) * 2.5) 0 0}@supports (display:grid){.pfe-navigation__footer{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:32px;gap:32px;gap:var(--pfe-navigation--gutter,32px);grid-auto-flow:row}}}.pfe-navigation--collapse-main-menu .pfe-navigation__footer,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__footer{display:block;width:calc(100% + 32px);max-width:1136px;max-width:1136px;max-width:var(--pfe-navigation--content-max-width,1136px);margin-left:-16px;margin-right:-16px;padding-top:12px;padding-bottom:12px;-moz-column-count:auto;column-count:auto;gap:0;margin:16px 0 0;padding:26px 0 16px}.pfe-navigation--collapse-secondary-links .pfe-navigation__footer,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__footer{display:flex;flex-wrap:wrap;flex-direction:row;justify-content:flex-start;align-items:flex-start}.pfe-navigation__footer .pfe-navigation--column,.pfe-navigation__footer a,.pfe-navigation__footer pfe-cta{margin:0 0 1em}@media (min-width:768px){.pfe-navigation__footer .pfe-navigation--column+.pfe-navigation--column,.pfe-navigation__footer .pfe-navigation--column+a,.pfe-navigation__footer .pfe-navigation--column+pfe-cta,.pfe-navigation__footer a+.pfe-navigation--column,.pfe-navigation__footer a+a,.pfe-navigation__footer a+pfe-cta,.pfe-navigation__footer pfe-cta+.pfe-navigation--column,.pfe-navigation__footer pfe-cta+a,.pfe-navigation__footer pfe-cta+pfe-cta{margin-left:32px;margin-left:32px;margin-left:var(--pfe-navigation--gutter,32px)}}@media (min-width:1200px){.pfe-navigation__footer .pfe-navigation--column+.pfe-navigation--column,.pfe-navigation__footer .pfe-navigation--column+a,.pfe-navigation__footer .pfe-navigation--column+pfe-cta,.pfe-navigation__footer a+.pfe-navigation--column,.pfe-navigation__footer a+a,.pfe-navigation__footer a+pfe-cta,.pfe-navigation__footer pfe-cta+.pfe-navigation--column,.pfe-navigation__footer pfe-cta+a,.pfe-navigation__footer pfe-cta+pfe-cta{margin-left:0}}.pfe-navigation--collapse-main-menu .pfe-navigation__footer .pfe-navigation--column+.pfe-navigation--column,.pfe-navigation--collapse-main-menu .pfe-navigation__footer .pfe-navigation--column+a,.pfe-navigation--collapse-main-menu .pfe-navigation__footer .pfe-navigation--column+pfe-cta,.pfe-navigation--collapse-main-menu .pfe-navigation__footer a+.pfe-navigation--column,.pfe-navigation--collapse-main-menu .pfe-navigation__footer a+a,.pfe-navigation--collapse-main-menu .pfe-navigation__footer a+pfe-cta,.pfe-navigation--collapse-main-menu .pfe-navigation__footer pfe-cta+.pfe-navigation--column,.pfe-navigation--collapse-main-menu .pfe-navigation__footer pfe-cta+a,.pfe-navigation--collapse-main-menu .pfe-navigation__footer pfe-cta+pfe-cta,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__footer .pfe-navigation--column+.pfe-navigation--column,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__footer .pfe-navigation--column+a,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__footer .pfe-navigation--column+pfe-cta,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__footer a+.pfe-navigation--column,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__footer a+a,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__footer a+pfe-cta,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__footer pfe-cta+.pfe-navigation--column,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__footer pfe-cta+a,:host(.pfe-navigation--collapse-main-menu) .pfe-navigation__footer pfe-cta+pfe-cta{margin-left:32px;margin-left:32px;margin-left:var(--pfe-navigation--gutter,32px)}.pfe-navigation--collapse-secondary-links .pfe-navigation__footer .pfe-navigation--column+.pfe-navigation--column,.pfe-navigation--collapse-secondary-links .pfe-navigation__footer .pfe-navigation--column+a,.pfe-navigation--collapse-secondary-links .pfe-navigation__footer .pfe-navigation--column+pfe-cta,.pfe-navigation--collapse-secondary-links .pfe-navigation__footer a+.pfe-navigation--column,.pfe-navigation--collapse-secondary-links .pfe-navigation__footer a+a,.pfe-navigation--collapse-secondary-links .pfe-navigation__footer a+pfe-cta,.pfe-navigation--collapse-secondary-links .pfe-navigation__footer pfe-cta+.pfe-navigation--column,.pfe-navigation--collapse-secondary-links .pfe-navigation__footer pfe-cta+a,.pfe-navigation--collapse-secondary-links .pfe-navigation__footer pfe-cta+pfe-cta,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__footer .pfe-navigation--column+.pfe-navigation--column,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__footer .pfe-navigation--column+a,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__footer .pfe-navigation--column+pfe-cta,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__footer a+.pfe-navigation--column,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__footer a+a,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__footer a+pfe-cta,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__footer pfe-cta+.pfe-navigation--column,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__footer pfe-cta+a,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__footer pfe-cta+pfe-cta{margin-left:0}.pfe-navigation__footer pfe-cta a{display:inline-block;margin:0}:host(.pfe-navigation--inline-search) .pfe-navigation__search-toggle,:host([breakpoint=mobile]) .pfe-navigation__search-toggle{display:none}[open-toggle=secondary-links__button--search] .pfe-navigation__search-toggle{--pfe-icon--color:var(--pfe-navigation__nav-bar--Color--active, var(--pfe-theme--color--text, #151515));color:#151515;color:#151515;color:var(--pfe-navigation__nav-bar--Color--active,var(--pfe-theme--color--text,#151515));background:#fff;background:#fff;background:var(--pfe-navigation__nav-bar--toggle--BackgroundColor--active,var(--pfe-theme--color--surface--lightest,#fff));box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c))}[open-toggle=secondary-links__button--search] .pfe-navigation__search-toggle:focus{outline:0}[open-toggle=secondary-links__button--search] .pfe-navigation__search-toggle:focus:after{content:'';position:absolute;right:0;bottom:0;top:0;left:0;display:block;border:1px dashed currentColor}.pfe-navigation__dropdown-wrapper--search[class][class]{position:absolute;top:100%;left:0;width:100%;height:auto;padding:16px;margin-bottom:0;background:#fff;background:#fff;background:var(--pfe-navigation__dropdown--Background,var(--pfe-theme--color--surface--lightest,#fff));visibility:hidden}:host([breakpoint=desktop]) .pfe-navigation--has-search .pfe-navigation__dropdown-wrapper--search[class][class],:host([breakpoint=tablet]) .pfe-navigation--has-search .pfe-navigation__dropdown-wrapper--search[class][class]{visibility:visible}.pfe-navigation__dropdown-wrapper--search[class][class].pfe-navigation__dropdown-wrapper--invisible{display:none}:host(.pfe-navigation--inline-search) .pfe-navigation__dropdown-wrapper--search[class][class]{position:relative;top:auto;left:auto;display:block;width:auto;height:100%;padding:0;overflow:visible;background:0 0}.pfe-navigation__search{display:block;width:100%;margin-bottom:24px;margin-bottom:24px;margin-bottom:var(--pfe-navigation__dropdown--full-width--spacing--mobile,24px);color:#151515;color:#151515;color:var(--pfe-navigation__dropdown--Color,#151515);max-width:1136px;max-width:1136px;max-width:var(--pfe-navigation--content-max-width,1136px);margin-left:auto;margin-right:auto}@media (min-width:768px){.pfe-navigation__search{margin-bottom:0}}.pfe-navigation--collapse-secondary-links .pfe-navigation__search,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__search{margin-bottom:24px;margin-bottom:24px;margin-bottom:var(--pfe-navigation__dropdown--full-width--spacing--mobile,24px)}[aria-hidden=true] .pfe-navigation__search{visibility:hidden}:host(.pfe-navigation--inline-search) .pfe-navigation__search{height:100%}.pfe-navigation__secondary-links-wrapper{display:flex;flex-direction:column;margin:0;padding:16px 0 0;list-style:none}@media (min-width:768px){.pfe-navigation__secondary-links-wrapper{flex-direction:row;margin-left:auto;padding-top:0}}.pfe-navigation--collapse-secondary-links .pfe-navigation__secondary-links-wrapper,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__secondary-links-wrapper{flex-direction:column;padding-top:16px;margin-left:0}.pfe-navigation__secondary-links-wrapper>li{display:block;width:auto;height:auto;margin:0 0 8px;padding:0;list-style:none}@media (min-width:768px){.pfe-navigation__secondary-links-wrapper>li{margin:0}}.pfe-navigation--collapse-secondary-links .pfe-navigation__secondary-links-wrapper>li,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__secondary-links-wrapper>li{margin:0 0 8px}.pfe-navigation__burger-icon{padding:2px 0 4px;left:calc(50% - 9px);transform:scale(.25) translateX(1px);transform-origin:left top;transition:transform .3s cubic-bezier(.55,.085,0,.99);backface-visibility:hidden}[aria-expanded=true] .pfe-navigation__burger-icon{transform:scale(.25) translateX(5px);transform-origin:left top}.pfe-navigation__burger-icon:after,.pfe-navigation__burger-icon:before{content:'';position:absolute;top:0;left:0;box-sizing:border-box;display:block;width:72px}.pfe-navigation__burger-icon:before{height:0;border-top:8px solid currentColor;background:currentColor;transform:translateY(-32px);transform-origin:left top;transition:transform .3s cubic-bezier(.55,.085,0,.99)}[aria-expanded=true] .pfe-navigation__burger-icon:before{border-color:currentColor;transform:translateY(-32px) rotate(45deg) scaleX(1) translateX(12px);transform-origin:left top}.pfe-navigation__burger-icon:after{height:40px;border:8px solid currentColor;border-width:8px 0 8px 0;transition:border .3s cubic-bezier(.55,.085,0,.99),transform .3s cubic-bezier(.55,.085,0,.99);transform-origin:left bottom}[aria-expanded=true] .pfe-navigation__burger-icon:after{transform:rotate(-45deg) scaleX(1) translateX(12px);border-top-color:transparent;border-bottom-color:currentColor;transform-origin:left bottom}.pfe-navigation__account-toggle,.pfe-navigation__log-in-link{--pfe-icon--color:var(--pfe-navigation__nav-bar--Color--default, var(--pfe-theme--color--ui-base--text, #fff));display:flex;flex-direction:column;justify-content:flex-end;width:auto;height:72px;height:72px;height:var(--pfe-navigation__nav-bar--Height,72px);padding:14px 8px;font-size:12px;font-size:12px;font-size:var(--pfe-navigation--FontSize--xs,12px);color:#fff;color:#fff;color:var(--pfe-navigation__nav-bar--Color--default,var(--pfe-theme--color--ui-base--text,#fff))}@supports (display:grid){.pfe-navigation__account-toggle,.pfe-navigation__log-in-link{display:grid;grid-template-rows:26px 18px;align-items:center;justify-items:center}}.pfe-navigation__account-toggle[class]:focus,.pfe-navigation__account-toggle[class]:hover,.pfe-navigation__log-in-link[class]:focus,.pfe-navigation__log-in-link[class]:hover{box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c))}@media print{.pfe-navigation__account-toggle,.pfe-navigation__log-in-link{display:none}}.pfe-navigation--collapse-secondary-links .pfe-navigation__account-toggle,.pfe-navigation--collapse-secondary-links .pfe-navigation__log-in-link,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__account-toggle,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__log-in-link{--pfe-icon--color:var(--pfe-navigation__nav-bar--Color--default, var(--pfe-theme--color--ui-base--text, #fff));display:flex;flex-direction:column;justify-content:flex-end;width:auto;height:72px;height:72px;height:var(--pfe-navigation__nav-bar--Height,72px);padding:14px 8px;font-size:12px;font-size:12px;font-size:var(--pfe-navigation--FontSize--xs,12px);color:#fff;color:#fff;color:var(--pfe-navigation__nav-bar--Color--default,var(--pfe-theme--color--ui-base--text,#fff))}@supports (display:grid){.pfe-navigation--collapse-secondary-links .pfe-navigation__account-toggle,.pfe-navigation--collapse-secondary-links .pfe-navigation__log-in-link,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__account-toggle,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__log-in-link{display:grid;grid-template-rows:26px 18px;align-items:center;justify-items:center}}.pfe-navigation--collapse-secondary-links .pfe-navigation__account-toggle[class]:focus,.pfe-navigation--collapse-secondary-links .pfe-navigation__account-toggle[class]:hover,.pfe-navigation--collapse-secondary-links .pfe-navigation__log-in-link[class]:focus,.pfe-navigation--collapse-secondary-links .pfe-navigation__log-in-link[class]:hover,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__account-toggle[class]:focus,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__account-toggle[class]:hover,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__log-in-link[class]:focus,:host(.pfe-navigation--collapse-secondary-links) .pfe-navigation__log-in-link[class]:hover{box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c))}.pfe-navigation__account-wrapper .pfe-navigation__account-wrapper--logged-in .pfe-navigation__account-toggle{display:flex}.pfe-navigation__account-wrapper .pfe-navigation__account-wrapper--logged-in .pfe-navigation__log-in-link{display:none}.pfe-navigation__account-wrapper--logged-in .pfe-navigation__log-in-link[class]{display:none}.pfe-navigation__log-in-link[class][class] pfe-icon{padding:2px 0 4px}.pfe-navigation__account-toggle{height:72px;height:72px;height:var(--pfe-navigation__nav-bar--Height,72px)}.pfe-navigation__account-toggle[class][class][class]{display:flex;justify-content:center}.pfe-navigation__account-toggle[aria-expanded=true]{--pfe-icon--color:var(--pfe-navigation__nav-bar--Color--active, var(--pfe-theme--color--text, #151515));color:#151515;color:#151515;color:var(--pfe-navigation__nav-bar--Color--active,var(--pfe-theme--color--text,#151515));background:#fff;background:#fff;background:var(--pfe-navigation__nav-bar--toggle--BackgroundColor--active,var(--pfe-theme--color--surface--lightest,#fff));box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 #06c;box-shadow:inset 0 4px 0 0 var(--pfe-navigation__nav-bar--highlight-color,var(--pfe-theme--color--ui-accent,#06c))}.pfe-navigation__account-toggle[aria-expanded=true]:focus{outline:0}.pfe-navigation__account-toggle[aria-expanded=true]:focus:after{content:'';position:absolute;right:0;bottom:0;top:0;left:0;display:block;border:1px dashed #151515;border:1px dashed #151515;border:1px dashed var(--pfe-navigation__nav-bar--Color--active,var(--pfe-theme--color--text,#151515))}.pfe-navigation__account-toggle pfe-avatar{width:36px;height:36px;border-radius:50%;overflow:hidden;background:rgba(122,122,122,.2)}.pfe-navigation__dropdown-wrapper--account[class][class]{position:absolute;top:72px;top:72px;top:var(--pfe-navigation__nav-bar--Height,72px);left:0;width:100%;display:block;padding:0;height:auto}.pfe-navigation__dropdown-wrapper--account.pfe-navigation__dropdown-wrapper--invisible[class]{display:none}:host([breakpoint=mobile]) .hidden-at-mobile[class][class][class]{display:none}:host([breakpoint=tablet]) .hidden-at-tablet[class][class][class]{display:none}:host([breakpoint=desktop]) .hidden-at-desktop[class][class][class]{display:none}.tablet-col-span-all{-moz-column-span:all;column-span:all}.desktop-col-span-2,.pfe-navigation--column--2{grid-column-end:span 2}.desktop-col-span-3,.pfe-navigation--column--3{grid-column-end:span 3}.desktop-col-span-4,.pfe-navigation--column--4{grid-column-end:span 4}
</style><nav id="pfe-navigation__wrapper" part="pfe-navigation__wrapper" class="pfe-navigation__wrapper" aria-label="Main">
  <button class="pfe-navigation__menu-toggle" part="pfe-navigation__menu-toggle" id="mobile__button">
    <div class="pfe-navigation__burger-icon"></div>
    <span id="mobile__button-text" part="mobile__button-text">Menu</span>
  </button>

  <div class="pfe-navigation__outer-menu-wrapper" id="mobile__dropdown" part="mobile__dropdown">
    <div id="pfe-navigation__outer-menu-wrapper__inner" part="pfe-navigation__outer-menu-wrapper__inner" class="pfe-navigation__outer-menu-wrapper__inner">

      <div id="pfe-navigation__search-wrapper--xs" part="pfe-navigation__search-wrapper--xs"></div>

      <div id="pfe-navigation__menu-wrapper" part="pfe-navigation__menu-wrapper" class="pfe-navigation__menu-wrapper">
      </div>

      <div class="pfe-navigation__secondary-links-wrapper" id="pfe-navigation__secondary-links-wrapper" part="pfe-navigation__secondary-links-wrapper">
        <div>
          <button class="pfe-navigation__search-toggle" id="secondary-links__button--search" part="secondary-links__button--search" hidden data-analytics-text="Search" data-analytics-category="Search" data-analytics-level="1">
            <pfe-icon icon="web-search" pfe-size="sm" aria-hidden="true"></pfe-icon>
            <span id="secondary-links__button--search-text" part="secondary-links__button--search-text">Search</span>
          </button>
          <div class="pfe-navigation__dropdown-wrapper pfe-navigation__dropdown-wrapper--search" id="pfe-navigation__search-wrapper--md" part="pfe-navigation__search-wrapper--md">
            <slot name="search" class="pfe-navigation__search" id="search-slot" part="search-slot">
            </slot>
          </div>
        </div>

        <slot name="secondary-links" id="secondary-links" part="secondary-links"></slot>

      </div>
    </div>
  </div>

  <div class="pfe-navigation__account-wrapper" id="pfe-navigation__account-wrapper" part="pfe-navigation__account-wrapper">
    <div id="pfe-navigation__account-dropdown-wrapper" part="pfe-navigation__account-dropdown-wrapper" class="pfe-navigation__dropdown-wrapper pfe-navigation__dropdown-wrapper--account pfe-navigation__dropdown-wrapper--invisible">
      <slot name="account" id="pfe-navigation__account-slot" part="pfe-navigation__account-slot"></slot>
    </div>
  </div>

</nav>
<div class="pfe-navigation__overlay" part="pfe-navigation__overlay" hidden></div>`;
  }

  static get properties() {
    return {"state":{"title":"State","type":"string","enum":[],"default":"","prefixed":true}};
  }

  static get slots() {
    return {"default":{"title":"Default slot","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"raw"}]}},"search":{"title":"Search","type":"array","namedSlot":true,"items":{"title":"Search item","oneOf":[{"$ref":"raw"}]}},"customlinks":{"title":"Customlinks","type":"array","namedSlot":true,"items":{"title":"Customlinks item","oneOf":[{"$ref":"raw"}]}}};
  }
  static get tag() {
    return "pfe-navigation";
  }

  get schemaUrl() {
    return "pfe-navigation.json";
  }

  get templateUrl() {
    return "pfe-navigation.html";
  }

  get styleUrl() {
    return "pfe-navigation.css";
  }

  get navTranslations() {
    return this._navTranslations;
  }

  /**
   * Adds site owner provided translations to our existing ones
   * Or overrides if there's overlap
   * @param {object} data An object of translations with the shape of:
   * {
   *   'en': {
   *     login: "Log In",
   *     menu: "Menu",
   *     search: "Search",
   *     returnToMainMenu: "Back to menu",
   *     openAccountMenu: "Open account menu",
   *   }
   * }
   */
  set navTranslations(data) {
    if (!data) {
      console.error('pfe-navigation.navTranslations: Refusing to set falsey value to navTranslations.', {data});
      return;
    }
    if (typeof data !== 'object') {
      console.error('pfe-navigation.navTranslations: Tried setting navTranslations with no object', {data});
      return;
    }

    // Iterate over the languages and add/override the existing translations
    const dataKeys = Object.keys(data);
    for (let index = 0; index < dataKeys.length; index++) {
      const langCode = dataKeys[index];
      if (langCode in this._navTranslations) {
        mergeObjectData(this._navTranslations[langCode], data[langCode]);
      }
      else {
        this._navTranslations[langCode] = data[langCode];
      }
    }
  }

  static get events() {
    return {
      expandedItem: `${this.tag}:expanded-item`,
      collapsedItem: `${this.tag}:collapsed-item`,
      shadowDomInteraction: `pfe-shadow-dom-event`,
      ready: `${this.tag}:ready`,

      // @note v1.x support:
      pfeNavigationItemOpen: `pfe-navigation-item:open`,
      pfeNavigationItemClose: `pfe-navigation-item:close`,
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Combo;
  }

  static get properties() {
    return {
      // Using _lang to avoid namespacing issue with HTMLElement.lang
      _lang: {
        title: "Language support",
        attr: "lang",
        type: String,
        default: "en",
        observer: "_translateStrings",
      },
      // State indicator
      breakpoint: {
        title: "Indicates current layout state",
        // 'mobile' means secondary links && main menu are collapsed, search goes to top of mobile dropdown
        // 'tablet' means main menu is collapsed, search has it's own dropdown
        // 'desktop' means nothing is collapsed, search has it's own dropdown
        type: String,
      },
      // State indicator
      openToggle: {
        title: "Currently opened toggle",
        type: String,
      },
      // State indicator
      mobileSlide: {
        title:
          "Indicates an open child element that slides the menu over when open",
        type: Boolean,
      },
      // @note If role isn't set, code will check if it has a parent with role="banner",
      // If not role=banner will be added to pfe-navigation
      role: {
        type: String,
      },
      sticky: {
        title:
          "When page touches top of navigation stick it to the top of the screen",
        type: Boolean,
      },
      // @note v1.x support
      pfeSticky: {
        type: Boolean,
        alias: "sticky",
        attr: "pfe-sticky",
      },
    };
  }

  static get slots() {
    return {
      search: {
        title: "Search",
        description: "For site's search form",
        namedSlot: true,
      },
      secondaryLinks: {
        title: "Secondary Links",
        description:
          "For site's custom links/dropdowns that appear in the top right at desktop",
        slotName: "secondary-links",
        namedSlot: true,
      },
      account: {
        title: "Account",
        description: "For rh-account-dropdown component or custom auth content",
        namedSlot: true,
      },
    };
  }

  constructor() {
    super(PfeNavigation, { type: PfeNavigation.PfeType });

    // Set pointers to commonly used elements
    this._shadowDomOuterWrapper = this.shadowRoot.getElementById(
      "pfe-navigation__wrapper"
    );
    this._logoWrapper = this.shadowRoot.getElementById(
      "pfe-navigation__logo-wrapper"
    );
    this._shadowMenuWrapper = this.shadowRoot.getElementById(
      "pfe-navigation__menu-wrapper"
    );
    this._mobileToggle = this.shadowRoot.getElementById("mobile__button");
    this._mobileToggleText = this.shadowRoot.getElementById(
      "mobile__button-text"
    );
    this._mobileButton = this.shadowRoot.querySelector("#mobile__button-text");
    this._menuDropdownXs = this.shadowRoot.getElementById("mobile__dropdown");
    this._menuDropdownMd = this.shadowRoot.getElementById(
      `${this.tag}__menu-wrapper`
    );
    this._secondaryLinksWrapper = this.shadowRoot.getElementById(
      `${this.tag}__secondary-links-wrapper`
    );
    this._searchToggle = this.shadowRoot.getElementById(
      "secondary-links__button--search"
    );
    this._searchToggleText = this.shadowRoot.getElementById(
      "secondary-links__button--search-text"
    );
    this._searchSlot = this.shadowRoot.getElementById("search-slot");
    this._searchSpotXs = this.shadowRoot.getElementById(
      `${this.tag}__search-wrapper--xs`
    );
    this._searchSpotMd = this.shadowRoot.getElementById(
      `${this.tag}__search-wrapper--md`
    );
    this._customLinksSlot = this.shadowRoot.getElementById("secondary-links");
    this._mobileNavSearchSlot = this.shadowRoot.querySelector(
      'slot[name="search"]'
    );
    this._overlay = this.shadowRoot.querySelector(`.${this.tag}__overlay`);
    this._shadowNavWrapper = this.shadowRoot.querySelector(
      `.${this.tag}__wrapper`
    );
    this._accountOuterWrapper = this.shadowRoot.getElementById(
      "pfe-navigation__account-wrapper"
    );
    this._accountSlot = this.shadowRoot.getElementById(
      "pfe-navigation__account-slot"
    );
    this._accountDropdownWrapper = this.shadowRoot.getElementById(
      "pfe-navigation__account-dropdown-wrapper"
    );
    this._searchButtonText = this.shadowRoot.querySelector(
      "#secondary-links__button--search-text"
    );

    // Elements that don't exist yet
    this._siteSwitcherToggle = null;
    this._siteSwitcherBackButton = null;
    this._accountComponent = null;
    this._accountToggle = null;
    this._accountLogInLink = null;
    this._currentMobileDropdown = null;

    // @todo Make this selector list a PFE-wide resource?
    this._focusableElements =
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    // Set default collapse breakpoints to null (falls back to CSS)
    this._menuBreakpoints = {
      secondaryLinks: null,
      mainMenu: null,
    };

    // Used to calculate when menu should collapse,
    // parts that have changed can be set to null and breakpoints recalculated
    this._menuBounds = {
      logoRight: null,
      mainMenuRight: null,
      secondaryLinksLeft: null,
    };

    // To track observers and events and remove them when necessary
    this._customDropdownAlertsObservers = {};
    this._mobileSliderMutationObservers = {};
    this._mobileSliderFocusTrapEvents = {};
    this._mobileSliderFocusTrapElements = {};
    this._debouncedPreResizeAdjustments = null;
    this._debouncedPostResizeAdjustments = null;
    this._menuBreakpointQueries = {
      secondaryLinks: null,
      mainMenu: null,
    };

    this._prefersReducedMotion = false;

    // Tracking if window width gets updated
    this._windowInnerWidth = null;
    // Cache element visibility for performance
    this.mainMenuButtonVisible = null;
    this.secondaryLinksSectionCollapsed = null;
    this.logoHeights = {
      default: 40,
      small: 32,
    };


    // Add default translations
    this._navTranslations = {
      en: {
        login: "Log In",
        menu: "Menu",
        search: "Search",
        returnToMainMenu: "Back to menu",
        openAccountMenu: "Open account menu",
      },
      ja: {
        login: "ログイン",
        menu: "メニュー",
        search: "検索",
        returnToMainMenu: "メニューに戻る",
        openAccountMenu: "アカウントメニューを開く",
      },
      ko: {
        login: "로그인",
        menu: "메뉴",
        search: "검색",
        returnToMainMenu: "메뉴로 돌아가기",
        openAccountMenu: "계정 메뉴 열기",
      },
      zh: {
        login: "登录",
        menu: "菜单",
        search: "搜索",
        returnToMainMenu: "返回菜单",
        openAccountMenu: "打开账户菜单",
      },
      de: {
        login: "Anmelden",
        menu: "Menü",
        search: "Suchen",
        returnToMainMenu: "Zurück zum Menü",
        openAccountMenu: "Kontomenü öffnen",
      },
      fr: {
        login: "Se connecter",
        menu: "Menu",
        search: "Rechercher",
        returnToMainMenu: "Retour au menu",
        openAccountMenu: "Ouvrir menu du compte",
      },
      it: {
        login: "Accedi",
        menu: "Menu",
        search: "Cerca",
        returnToMainMenu: "Torna al menu",
        openAccountMenu: "Apri menu account",
      },
      es: {
        login: "Iniciar sesión",
        menu: "Menu",
        search: "Buscar",
        returnToMainMenu: "Regresar al menú",
        openAccountMenu: "Abrir menú de la cuenta",
      },
      pt: {
        login: "Entrar",
        menu: "Menu",
        search: "Pesquisar",
        returnToMainMenu: "Voltar ao menu",
        openAccountMenu: "Abrir menu da conta",
      }
    };

    // Ensure 'this' is tied to the component object in these member functions
    const functionsToBind = [
      "isOpen",
      "getToggleElement",
      "getDropdownElement",
      "isMobileMenuButtonVisible",
      "isSecondaryLinksSectionCollapsed",
      "_focusOutOfNav",
      "_isDevelopment",
      "_getParentToggleAndDropdown",
      "_changeNavigationState",
      "_calculateBreakpointAttribute",
      "_processSearchSlotChange",
      "_createCustomDropdownToggle",
      "_processCustomDropdowns",
      "_shadowDomInteraction",
      "_processLightDom",
      "_toggleMobileMenu",
      "_toggleSearch",
      "_siteSwitcherBackClickHandler",
      "_dropdownItemToggle",
      "_calculateMenuBreakpoints",
      "_collapseMainMenu",
      "_collapseSecondaryLinks",
      "_moveSearchSlot",
      "_postResizeAdjustments",
      "_generalKeyboardListener",
      "_overlayClickHandler",
      "_stickyHandler",
      "_hideMobileMainMenu",
      "_showMobileMainMenu",
      "_createLogInLink",
      "_accountToggleClick",
      "_processAccountDropdownChange",
      "_processAccountSlotChange",
      "_getLastFocusableItemInMobileSlider",
      "_updateAlerts",
      "_postProcessLogo",
      "updateOpenDropdownHeight",
    ];

    for (let index = 0; index < functionsToBind.length; index++) {
      const functionName = functionsToBind[index];
      if (this[functionName]) {
        this[functionName] = this[functionName].bind(this);
      } else {
        this.error("Tried to bind a function that doesn't exist", functionName);
      }
    }

    // Handle updates to slotted search content
    this._searchSlot.addEventListener(
      "slotchange",
      this._processSearchSlotChange
    );
    this._accountSlot.addEventListener(
      "slotchange",
      this._processAccountSlotChange
    );

    // Setup mutation observer to watch for content changes
    this._observer = new MutationObserver(this._processLightDom);

    // Ensure we close the whole menu and hide the overlay when the overlay is clicked
    this._overlay.addEventListener("click", this._overlayClickHandler);
  } // ends constructor()

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here
    if (this._isDevelopment()) {
      PFElement._debugLog = true;
    }

    // Assess if user prefers reduced motion, which means we can eliminate some timeouts
    const prefersReducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion)"
    );
    this._prefersReducedMotion = prefersReducedMotionQuery.matches || false;

    this._resizeDebounce = 500;

    // Change a few preferences for automated testing so scripts can run faster
    if (this.hasAttribute("automated-testing")) {
      this._resizeDebounce = 10;
      this._prefersReducedMotion = true;
    }

    // Add class to scope styles for old browsers like IE11
    if (_isCrustyBrowser()) {
      this.classList.add("pfe-navigation--in-crusty-browser");
    }

    this.emitEvent(PfeNavigation.events.ready, {
      detail: {
        nav: this,
      },
    });


    ////////////////////////////////////////////////////////
    // Kicks off the menu/light DOM processing
    // for the bulk of the menu render
    ////////////////////////////////////////////////////////
    this._processLightDom();

    this._observer.observe(this, lightDomObserverConfig);

    const preResizeAdjustments = () => {
      // iOS changes browser height on scroll, shouldn't fade out UI for window height changes
      if (
        this._windowInnerWidth !== window.innerWidth &&
        !this.classList.contains("pfe-navigation--is-resizing")
      ) {
        this.classList.add("pfe-navigation--is-resizing");
      }
    };

    this._debouncedPreResizeAdjustments = debounce(
      preResizeAdjustments,
      // Needs to be run frequently
      this._resizeDebounce > 10 ? 10 : this._resizeDebounce,
      true
    );
    window.addEventListener("resize", this._debouncedPreResizeAdjustments);
    this._debouncedPostResizeAdjustments = debounce(
      this._postResizeAdjustments,
      this._resizeDebounce
    );
    window.addEventListener("resize", this._debouncedPostResizeAdjustments, {
      passive: true,
    });
    this._calculateBreakpointAttribute();

    // Initial position of this element from the top of the screen
    this._top = this.getBoundingClientRect().top || 0;

    // If the nav is set to sticky, run the sticky handler and attach scroll event to window
    if (this.sticky) {
      // Run the sticky check on first page load
      this._stickyHandler();

      // Attach the scroll event to the window
      window.addEventListener("scroll", () => {
        window.requestAnimationFrame(() => {
          this._stickyHandler();
        });
      });
    }

    // Make sure pfe-navigation or a parent is a header/role=banner element
    if (this.role !== "banner") {
      const closestHeader = this.closest('header, [role="banner"]');
      if (!closestHeader) {
        this.role = "banner";
        this.log(`Added role=banner to ${this.tag}`);
      }
    }

    this.classList.add("pfe-navigation--processed");
    this.addEventListener("focusout", this._focusOutOfNav);
  } // end connectedCallback()

  disconnectedCallback() {
    this._observer.disconnect();

    window.removeEventListener("resize", this._debouncedPreResizeAdjustments);
    window.removeEventListener("resize", this._debouncedPostResizeAdjustments);
    this._searchSlot.removeEventListener(
      "slotchange",
      this._processSearchSlotChange
    );
    this._overlay.removeEventListener("click", this._overlayClickHandler);
    this._mobileToggle.removeEventListener("click", this._toggleMobileMenu);
    this._searchToggle.removeEventListener("click", this._toggleSearch);
    document.removeEventListener("keydown", this._generalKeyboardListener);

    if (this._siteSwitcherBackButton) {
      this._siteSwitcherBackButton.removeEventListener(
        "click",
        this._siteSwitcherBackClickHandler
      );
    }

    const mobileSliderObserverKeys = Object.keys(
      this._mobileSliderMutationObservers
    );
    for (let index = 0; index < mobileSliderObserverKeys.length; index++) {
      this._mobileSliderMutationObservers[
        mobileSliderObserverKeys[index]
      ].disconnect();
    }

    const customDropdownAlertsObserversKeys = Object.keys(
      this._customDropdownAlertsObservers
    );
    for (
      let index = 0;
      index < customDropdownAlertsObserversKeys.length;
      index++
    ) {
      const currentId = customDropdownAlertsObserversKeys[index];
      this._customDropdownAlertsObservers[currentId].disconnect();
    }

    const mobileSliderFocusTrapKeys = Object.keys(
      this._mobileSliderFocusTrapEvents
    );
    for (let index = 0; index < mobileSliderFocusTrapKeys.length; index++) {
      const currentId = mobileSliderFocusTrapKeys[index];
      this._mobileSliderFocusTrapElements[currentId].removeEventListener(
        "keydown",
        this._mobileSliderFocusTrapEvents[currentId]
      );
    }

    const menuBreakpointQueriesKeys = Object.keys(this._menuBreakpointQueries);
    for (let index = 0; index < menuBreakpointQueriesKeys.length; index++) {
      const menuBreakpointQueryKey = menuBreakpointQueriesKeys[index];
      if (this._menuBreakpointQueries[menuBreakpointQueryKey]) {
        this._removeMediaQueryListener(
          this._menuBreakpointQueries[menuBreakpointQueryKey],
          menuBreakpointQueryKey === "mainMenu"
            ? this._collapseMainMenu
            : this._collapseSecondaryLinks
        );
      }
    }

    if (this.sticky) {
      window.removeEventListener("scroll", () => {
        window.requestAnimationFrame(() => {
          this._stickyHandler();
        });
      });
    }

    if (this._accountToggle) {
      this._accountToggle.removeEventListener(
        "click",
        this._accountToggleClick
      );
    }

    // Remove main menu dropdown listeners
    const dropdownButtons = this.shadowRoot.querySelectorAll(
      ".pfe-navigation__menu-link--has-dropdown"
    );
    for (let index = 0; index < dropdownButtons.length; index++) {
      const dropdownButton = dropdownButtons[index];
      dropdownButton.removeEventListener("click", this._dropdownItemToggle);
    }
  } // end disconnectedCallback()

  /**
   * Get the translated text, or english as fallback
   * @param {string} key The key from this.navTranslations[this._lang][KEY]
   * @returns {string}
   */
  getTranslatedText(key) {
    const lang = this.lang ? this.lang : 'en';
    if (key in this.navTranslations.en) {
      if (lang in this.navTranslations) {
        if (this.navTranslations[lang][key]) {
          return this.navTranslations[lang][key];
        }
        else {
          console.error(`pfe-navigation.getTranslatedText: Missing translation for ${key} in ${lang}`);
        }
      }
      else {
        console.error(`pfe-navigation.getTranslatedText: Couldn't find ${lang} in available translations. See available lang codes:`, Object.keys(this.navTranslations));
      }
      return this.navTranslations.en[key];
    }
    console.error(`pfe-navigation.getTranslatedText: Couldn't find ${key} as translated string.`);
    return '';
  }

  /**
   * Utility function to polyfill media query listeners
   */
  _addMediaQueryListener(mediaQueryObject, eventHandler) {
    if (
      mediaQueryObject &&
      typeof mediaQueryObject.addEventListener !== "undefined"
    ) {
      mediaQueryObject.addEventListener("change", eventHandler);
    }
    // @note Removed IE Support for breakpoints
    // else if (mediaQueryObject && typeof mediaQueryObject.addListener === "function") {
    // mediaQueryObject.addListener(eventHandler);
    // }
  }

  /**
   * Utility function to polyfill media query listeners
   */
  _removeMediaQueryListener(mediaQueryObject, eventHandler) {
    if (
      mediaQueryObject &&
      typeof mediaQueryObject.removeEventListener !== "undefined"
    ) {
      mediaQueryObject.removeEventListener("change", eventHandler);
    }
    // @note Removed IE Support for breakpoints
    // else if (mediaQueryObject && typeof mediaQueryObject.removeListener === "function") {
    // mediaQueryObject.removeListener(eventHandler);
    // }
  }

  /**
   * Utility function that is used to display more console logging in non-prod env
   */
  _isDevelopment() {
    return this.hasAttribute("debug");
  }

  /**
   * Utility function to return DOM Object for a toggle, since it may be in the parent or shadow DOM
   * @param {string} toggleId Id of toggle to retrieve
   * @return {object} DOM Object of desired toggle
   */
  getToggleElement(toggleId) {
    if (stringStartsWith(toggleId, "pfe-navigation__secondary-link--")) {
      return this.querySelector(`#${toggleId}`);
    } else if (
      toggleId === "pfe-navigation__account-toggle" &&
      this.classList.contains("pfe-navigation--has-custom-account-dropdown")
    ) {
      return this.querySelector(`#${toggleId}`);
    } else {
      return this.shadowRoot.getElementById(toggleId);
    }
  }

  /**
   * Utility function to return DOM Object for a dropdown, since it may be in the parent or shadow DOM
   * @param {string} dropdownId Id of dropdown to retrieve
   * @return {object} DOM Object of desired dropdown
   */
  getDropdownElement(dropdownId) {
    if (stringStartsWith(dropdownId, "pfe-navigation__custom-dropdown--")) {
      return this.querySelector(`#${dropdownId}`);
    } else if (
      dropdownId === "pfe-navigation__account-dropdown" &&
      this.classList.contains("pfe-navigation--has-custom-account-dropdown")
    ) {
      return this.querySelector(`#${dropdownId}`);
    } else {
      return this.shadowRoot.getElementById(dropdownId);
    }
  }

  /**
   * Checks to see if anything in the menu, or if a specific part of it is open
   * @param {string} toggleId Optional. Check if specific part of menu is open, if blank will check if anything is open
   * @return {boolean}
   */
  isOpen(toggleId) {
    const openToggleId = this.openToggle;
    // Is anything open
    if (openToggleId) {
      if (typeof toggleId === "undefined") {
        // Something is open, and a toggleId wasn't set
        return true;
      }
      // Figure out if the mobile menu is open due to it's children, account toggle is not a child dropdown
      if (
        toggleId === "mobile__button" &&
        openToggleId !== "pfe-navigation__account-toggle"
      ) {
        // If the link is main menu, they're all children of the mobile toggle, the mobile toggle should be open
        if (stringStartsWith(openToggleId, "main-menu")) {
          return true;
        }
        // If we're at mobile, and any link other than account toggle is open, the mobile toggle should be open
        if (this.isSecondaryLinksSectionCollapsed()) {
          return true;
        }
      }

      // If there isn't a parent/child dropdown situation, then see if the requested toggle is currently open
      return toggleId === openToggleId;
    }

    return false;
  }

  /**
   * Use for elements that stop being dropdowns
   *
   * @param {object} toggleElement Toggle Button DOM Element
   * @param {object} dropdownWrapper Dropdown wrapper DOM element
   */
  _removeDropdownAttributes(toggleElement, dropdownWrapper) {
    let toggleId = null;

    if (toggleElement) {
      toggleId = toggleElement.id;
      toggleElement.removeAttribute("aria-expanded");
      toggleElement.parentElement.classList.remove(
        "pfe-navigation__menu-item--open"
      );
    }

    // this.log(
    //   "_removeDropdownAttributes",
    //   toggleId,
    //   dropdownWrapper ? dropdownWrapper.id : 'undefined'
    // );

    if (dropdownWrapper) {
      dropdownWrapper.removeAttribute("aria-hidden");
      dropdownWrapper.classList.remove(
        "pfe-navigation__dropdown-wrapper--invisible"
      );
      dropdownWrapper.style.removeProperty("height");
    }
  }

  /**
   * Utility function to set height of a dropdown
   * Depends on a dropdown having 2 wrappers and the parameter should be the outer wrapper
   * @param {object} dropdownWrapper DOM Object of dropdown wrapper
   */
  _setDropdownHeight(dropdownWrapper) {
    const dropdownHeight = dropdownWrapper.children[0].offsetHeight;
    // @NOTE not sure this is needed since offsetHeight will always return a number
    if (typeof dropdownHeight === "number") {
      dropdownWrapper.style.setProperty("height", `${dropdownHeight}px`);
    } else {
      dropdownWrapper.style.setProperty("height", "auto");
    }
  }

  /**
   * Finds the current dropdown and sets the height
   * assuming that the the nav state is at a point where a dropdown height is set with JS
   */
  updateOpenDropdownHeight() {
    // Quick exit if it's open
    if (!this.isOpen()) {
      this.warn("There doesn't seem to be an open dropdown.");
      return;
    }
    // Quick exit if we're on desktop
    if (this.breakpoint === "desktop") {
      this.warn("Dropdown height is not set for desktop breakpoint.");
    }

    // Do what we came to
    const openToggleId = this.openToggle;
    const dropdownId = this._getDropdownId(openToggleId);
    if (!dropdownId) {
      this.warn(`Couldn't find dropdown for the open toggle: ${openToggleId}`);
      return;
    }

    const dropdown = this.getDropdownElement(dropdownId);
    if (dropdown) {
      this._setDropdownHeight(dropdown);
    } else {
      this.warn(`Couldn't get dropdown element with the id: ${dropdownId}`);
    }
  }

  /**
   * Sets attributes for an open element, but DOES NOT update navigation state
   * Only use to update DOM State to reflect nav state
   * Almost all open/close actions should go through this._changeNavigationState, not this function
   *
   * @param {object} toggleElement Toggle Button DOM Element
   * @param {object} dropdownWrapper Dropdown wrapper DOM element
   */
  _addOpenDropdownAttributes(toggleElement, dropdownWrapper) {
    // Toggle Button DOM Element ID attribute
    let toggleId = null;
    // Dropdown wrapper DOM element ID attribute
    let dropdownWrapperId = null;
    const isMobileSlider =
      this.breakpoint === "mobile" &&
      toggleElement.parentElement.hasAttribute("mobile-slider");
    let isMainMenuToggle = false;
    let isCustomLink = false;

    if (toggleElement) {
      toggleId = toggleElement.id;
      isMainMenuToggle = stringStartsWith(toggleId, "main-menu__button--");
      if (!isMainMenuToggle) {
        isCustomLink = stringStartsWith(
          toggleId,
          "pfe-navigation__secondary-link--"
        );
      }
    }

    if (dropdownWrapper) {
      dropdownWrapperId = dropdownWrapper.id;
    } else {
      dropdownWrapperId = toggleElement.getAttribute("aria-controls");
      dropdownWrapper = this.querySelector(`#${dropdownWrapperId}`);
    }

    // this.log(
    //   "_addOpenDropdownAttributes",
    //   toggleId,
    //   dropdownWrapper ? dropdownWrapper.id : 'undefined'
    // );

    if (toggleElement) {
      toggleElement.setAttribute("aria-expanded", "true");
      if (!toggleElement.hasAttribute("aria-controls")) {
        toggleElement.setAttribute("aria-controls", dropdownWrapperId);
      }

      // Main menu specific actions
      if (stringStartsWith(toggleId, "main-menu__")) {
        toggleElement.parentElement.classList.add(
          "pfe-navigation__menu-item--open"
        );
      }
    }

    if (dropdownWrapper) {
      dropdownWrapper.setAttribute("aria-hidden", "false");
      dropdownWrapper.removeAttribute("tabindex");
      dropdownWrapper.classList.remove(
        "pfe-navigation__dropdown-wrapper--invisible"
      );

      // Setting up CSS transforms by setting height with JS
      let setHeight = false;

      // Handle animation state and attributes
      if (toggleId) {
        if (this.breakpoint === "mobile" && isMobileSlider) {
          this.mobileSlide = true;
        }
        // No animations at desktop, and for expanding elements in mobile menu dropdown
        // (mobile slides over instead of expanding)
        else if (
          this.breakpoint === "mobile" &&
          (isMainMenuToggle || isCustomLink)
        ) {
          setHeight = true;
        } else if (this.breakpoint === "tablet" && isMainMenuToggle) {
          setHeight = true;
        }
      }

      if (setHeight) {
        this._setDropdownHeight(dropdownWrapper);
      }
    }
  }

  /**
   * Sets attributes for a closed element, but DOES NOT update navigation state
   * Only use to update DOM State to reflect nav state
   * Almost all open/close actions should go through this._changeNavigationState, not this function
   *
   * @param {object} toggleElement Toggle Button DOM Element
   * @param {object} dropdownWrapper Dropdown wrapper DOM element
   * @param {number} invisibleDelay Delay on visibility hidden style, in case we need to wait for an animation
   */
  _addCloseDropdownAttributes(
    toggleElement,
    dropdownWrapper,
    invisibleDelay = 0
  ) {
    // Toggle Button DOM Element ID attribute
    let toggleId = null;
    // Dropdown wrapper DOM element ID attribute
    let dropdownWrapperId = null;

    if (toggleElement) {
      toggleId = toggleElement.id;
    }
    if (dropdownWrapper) {
      dropdownWrapperId = dropdownWrapper.id;
    }

    if (toggleElement) {
      toggleElement.setAttribute("aria-expanded", "false");
      if (!toggleElement.hasAttribute("aria-controls") && dropdownWrapperId) {
        toggleElement.setAttribute("aria-controls", dropdownWrapperId);
      }
      // Main menu specific code
      if (stringStartsWith(toggleId, "main-menu")) {
        toggleElement.parentElement.classList.remove(
          "pfe-navigation__menu-item--open"
        );
      }
    }

    // Handle dropdown wrapper
    if (dropdownWrapper) {
      dropdownWrapper.style.removeProperty("height");
      dropdownWrapper.setAttribute("aria-hidden", "true");
      // Set tabindex in conjuction with aria-hidden true
      dropdownWrapper.setAttribute("tabindex", "-1");

      if (!this._prefersReducedMotion && invisibleDelay) {
        // Sometimes need a delay visibility: hidden so animation can finish
        window.setTimeout(
          () =>
            dropdownWrapper.classList.add(
              "pfe-navigation__dropdown-wrapper--invisible"
            ),
          invisibleDelay // Should be slightly longer than the animation time
        );
      } else {
        dropdownWrapper.classList.add(
          "pfe-navigation__dropdown-wrapper--invisible"
        );
      }
    }

    this.mobileSlide = false;
  }

  /**
   * Create dash delimited string with no special chars for use in HTML attributes
   * @param {string}
   * @return {string} String that can be used as a class or ID (no spaces or special chars)
   */
  _createMachineName(text) {
    if (typeof text !== "string") return;
    return (
      text
        // Get rid of special characters
        .replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, "")
        // Get rid of extra space
        .trim()
        // Replace remaining single spaces between words with -
        .replace(/[\s\-]+/g, "-")
    );
  }

  /**
   * Figures out if secondary links are collapsed
   * @param {boolean} forceRecalculation
   * @returns {boolean}
   */
  isSecondaryLinksSectionCollapsed(forceRecalculation) {
    // Trying to avoid running getComputedStyle too much by caching it on the web component object
    if (
      forceRecalculation ||
      this.secondaryLinksSectionCollapsed === null ||
      window.innerWidth !== this._windowInnerWidth
    ) {
      const secondaryLinksWrapperFlexDirection = window.getComputedStyle(
        this._secondaryLinksWrapper,
        false
      ).flexDirection;
      this.secondaryLinksSectionCollapsed =
        secondaryLinksWrapperFlexDirection === "column";

      // Update the stored windowInnerWidth variable so we don't recalculate for no reason
      if (window.innerWidth !== this._windowInnerWidth) {
        this._windowInnerWidth = window.innerWidth;
        // Update the other layout state function, but avoid infinite loop :P
        this.isMobileMenuButtonVisible(true);
      }
      this.log(
        "isSecondaryLinksSectionCollapsed recalculated",
        `Secondary Links Wrapper Flex Direction is ${secondaryLinksWrapperFlexDirection}`,
        `isSecondaryLinksSectionCollapsed is ${this.secondaryLinksSectionCollapsed}`
      );
    }
    return this.secondaryLinksSectionCollapsed;
  }

  /**
   * Figures out if the mobile menu toggle (aka hamburger icon) is visible
   * @param {boolean} forceRecalculation
   * @returns {boolean}
   */
  isMobileMenuButtonVisible(forceRecalculation) {
    // Trying to avoid running getComputedStyle too much by caching iton the web component object
    if (
      forceRecalculation ||
      this.mainMenuButtonVisible === null ||
      window.innerWidth !== this._windowInnerWidth
    ) {
      const mobileToggleDisplay = window.getComputedStyle(
        this._mobileToggle,
        false
      ).display;
      this.mainMenuButtonVisible = mobileToggleDisplay !== "none";

      // Update the stored windowInnerWidth variable so we don't recalculate for no reason
      if (window.innerWidth !== this._windowInnerWidth) {
        this._windowInnerWidth = window.innerWidth;
        this.isSecondaryLinksSectionCollapsed(true);
      }
      this.log(
        "isMobileMenuButtonVisible recalculated",
        `mobileToggle's display is ${mobileToggleDisplay}`,
        `isMobileMenuButtonVisible is ${this.mainMenuButtonVisible}`
      );
    }
    return this.mainMenuButtonVisible;
  }

  /**
   * Sets the current breakpoint as an attribute on the component
   */
  _calculateBreakpointAttribute() {
    if (_isCrustyBrowser()) {
      if (!this.breakpoint) {
        this.breakpoint = "desktop";
      }
      return;
    }
    let currentBreakpoint = null;
    if (this.isMobileMenuButtonVisible()) {
      if (this.isSecondaryLinksSectionCollapsed()) {
        currentBreakpoint = "mobile";
      } else {
        currentBreakpoint = "tablet";
      }
    } else {
      currentBreakpoint = "desktop";
    }
    this.breakpoint = currentBreakpoint;
    return currentBreakpoint;
  }

  /**
   * Sets this._currentMobileDropdown depending on breakpoint
   */
  _setCurrentMobileDropdown() {
    if (this.isMobileMenuButtonVisible()) {
      if (this.isSecondaryLinksSectionCollapsed()) {
        this._currentMobileDropdown = this._menuDropdownXs;
        this._currentMobileDropdown.classList.add(
          "pfe-navigation__mobile-dropdown"
        );

        if (this._menuDropdownMd) {
          this._menuDropdownMd.classList.remove(
            "pfe-navigation__mobile-dropdown"
          );
        }
      } else {
        if (this._menuDropdownMd) {
          this._currentMobileDropdown = this._menuDropdownMd;
          this._currentMobileDropdown.classList.add(
            "pfe-navigation__mobile-dropdown"
          );
        }
        this._menuDropdownXs.classList.remove(
          "pfe-navigation__mobile-dropdown"
        );
      }
    } else {
      this._currentMobileDropdown = null;
      this._menuDropdownXs.classList.remove("pfe-navigation__mobile-dropdown");
      if (this._menuDropdownMd) {
        this._menuDropdownMd.classList.remove(
          "pfe-navigation__mobile-dropdown"
        );
      }

      // Ran into a circumstance where these elements didn't exist... ? Don't know how that's possible.
      if (this._menuDropdownXs) {
        this._menuDropdownXs.classList.remove(
          "pfe-navigation__mobile-dropdown"
        );
      }
      if (this._menuDropdownMd) {
        this._menuDropdownMd.classList.remove(
          "pfe-navigation__mobile-dropdown"
        );
      }
    }
  }

  /**
   * Get the dropdownId based on the toggleId
   * @param {string} toggleId ID of a toggle button
   * @return {string} ID of the corresponding dropdown
   */
  _getDropdownId(toggleId) {
    if (toggleId === "mobile__button") {
      if (this._currentMobileDropdown) {
        return this._currentMobileDropdown.id;
      }
    }
    if (stringStartsWith(toggleId, "main-menu")) {
      return this.shadowRoot.getElementById(toggleId).parentElement.dataset
        .dropdownId;
    }
    if (stringStartsWith(toggleId, "secondary-links")) {
      switch (toggleId) {
        case "secondary-links__button--search":
          return "pfe-navigation__search-wrapper--md";
      }
    }

    const toggleElement = this.getToggleElement(toggleId);
    if (toggleElement && toggleElement.hasAttribute("aria-controls")) {
      return toggleElement.getAttribute("aria-controls");
    }
    this.error(`Could not find corresponding dropdown for #${toggleId}`);
  }

  /**
   * Figure out if a toggle is a child of a dropdown, returns DOM Objects for the parent
   * @param {string} toggleId Id attribute of toggle
   * @return {array|false} An array with the DOM object of the toggle and the dropdown, in that order, false if it's not a child
   */
  _getParentToggleAndDropdown(toggleId) {
    // At mobile and tablet main menu items are in the mobile dropdown
    if (
      (this.breakpoint === "tablet" || this.breakpoint === "mobile") &&
      stringStartsWith(toggleId, "main-menu")
    ) {
      return [this._mobileToggle, this._currentMobileDropdown];
    }

    // At mobile secondary links are in the mobile dropdown
    if (
      this.breakpoint === "mobile" &&
      stringStartsWith(toggleId, "pfe-navigation__secondary-link--")
    ) {
      return [this._mobileToggle, this._currentMobileDropdown];
    }
    return false;
  }

  /**
   * Manages all dropdowns and ensures only one is open at a time
   * @param {string} toggleId Id to use in open-toggle param
   * @param {string} toState Optional, use to set the end state as 'open' or 'close', instead of toggling the current state
   * @return {boolean} True if the final state is open, false if closed
   */
  _changeNavigationState(toggleId, toState) {
    // Preventing issues in IE11 & Edge
    if (_isCrustyBrowser()) {
      this._observer.disconnect();
    }
    const isOpen = this.isOpen(toggleId);
    // Set toState param to go to opposite of current state if toState isn't set
    if (typeof toState === "undefined") {
      toState = isOpen ? "close" : "open";
    }
    const dropdownId = this._getDropdownId(toggleId);
    const currentlyOpenToggleId = this.openToggle;
    const toggleElementToToggle = this.getToggleElement(toggleId);

    /**
     * Local utility function to open a dropdown (shouldn't be used outside of parent function)
     * @param {object} toggleElement Toggle Button DOM Element
     * @param {object} dropdownWrapper Dropdown wrapper DOM element
     */
    const _openDropdown = (toggleElement, dropdownWrapper) => {
      const toggleIdToOpen = toggleElement.id;

      this._addOpenDropdownAttributes(toggleElement, dropdownWrapper);

      this.openToggle = toggleIdToOpen;

      this.emitEvent(PfeNavigation.events.expandedItem, {
        detail: {
          toggle: toggleElement,
          pane: dropdownWrapper,
          parent: this,
        },
      });

      this.emitEvent(PfeNavigation.events.pfeNavigationItemOpen, {
        detail: {
          toggle: toggleElement,
          pane: dropdownWrapper,
          parent: this,
        },
      });

      // Show overlay
      this._overlay.hidden = false;
    };

    /**
     * Local utility function to close a dropdown (shouldn't be used outside of parent function)
     * @param {object} toggleElement Toggle Button DOM Element
     * @param {object} dropdownWrapper Dropdown wrapper DOM element
     * @param {boolean} backOut If we're in a subdropdown, should we keep the parent one open, false will close all dropdowns
     */
    const _closeDropdown = (toggleElement, dropdownWrapper, backOut = true) => {
      const toggleIdToClose = toggleElement.id;

      let invisibleDelay = 0;
      // Dropdowns with a parent dropdown animate open and need a delay
      if (this._getParentToggleAndDropdown(toggleIdToClose)) {
        invisibleDelay = 300;
      }

      this._addCloseDropdownAttributes(
        toggleElement,
        dropdownWrapper,
        invisibleDelay
      );

      // If we're backing out close child dropdown, but not parent
      let closed = false;
      const parentToggleAndDropdown =
        this._getParentToggleAndDropdown(toggleIdToClose);
      if (backOut) {
        if (parentToggleAndDropdown) {
          _openDropdown(parentToggleAndDropdown[0], parentToggleAndDropdown[1]);
          closed = true;
        }
      } else {
        this._addCloseDropdownAttributes(
          parentToggleAndDropdown[0],
          parentToggleAndDropdown[1]
        );
      }

      // If we weren't able to back out, close everything by removing the open-toggle attribute
      if (!closed) {
        this.removeAttribute("open-toggle");
        this._overlay.hidden = true;
      }

      this.emitEvent(PfeNavigation.events.collapsedItem, {
        detail: {
          toggle: toggleElement,
          pane: dropdownWrapper,
          parent: this,
        },
      });

      this.emitEvent(PfeNavigation.events.pfeNavigationItemClose, {
        detail: {
          toggle: toggleElement,
          pane: dropdownWrapper,
          parent: this,
        },
      });
    };

    // Shut any open dropdowns before we open any other
    if (currentlyOpenToggleId) {
      const parentToggleAndDropdown =
        this._getParentToggleAndDropdown(toggleId);
      const currentlyOpenParentToggleAndDropdown =
        this._getParentToggleAndDropdown(currentlyOpenToggleId);
      // Don't close a parent dropdown if we're opening the child
      if (
        !parentToggleAndDropdown ||
        parentToggleAndDropdown[0].id !== currentlyOpenToggleId
      ) {
        const openToggle = this.getToggleElement(currentlyOpenToggleId);
        const openDropdownId = this._getDropdownId(currentlyOpenToggleId);
        const keepParentOpen =
          currentlyOpenParentToggleAndDropdown &&
          parentToggleAndDropdown &&
          currentlyOpenParentToggleAndDropdown[0].id ===
            parentToggleAndDropdown[0].id;
        _closeDropdown(
          openToggle,
          this.getDropdownElement(openDropdownId),
          keepParentOpen
        );
      }
    }

    if (toState !== "close" && toState !== "open") {
      this.error(
        `toState param was set to ${toState}, can only be 'close' or 'open'`
      );
    }

    // Update the element we came to update
    if (toState === "close") {
      _closeDropdown(
        toggleElementToToggle,
        this.getDropdownElement(dropdownId)
      );
    } else if (toState === "open") {
      _openDropdown(toggleElementToToggle, this.getDropdownElement(dropdownId));
    }

    // Clone state attribute inside of Shadow DOM to avoid compound :host() selectors
    this._shadowDomOuterWrapper.setAttribute("open-toggle", this.openToggle);

    // Reconnecting mutationObserver for IE11 & Edge
    if (_isCrustyBrowser()) {
      this._observer.observe(this, lightDomObserverConfig);
    }

    return toState === "open";
  } // end _changeNavigationState

  /**
   * Close expanded elements if the focus leaves the nav
   */
  _focusOutOfNav(event) {
    if (this.isOpen()) {
      if (
        event.relatedTarget &&
        !event.relatedTarget.closest("pfe-navigation")
      ) {
        const openToggleId = this.openToggle;
        this._changeNavigationState(openToggleId, "close");
      }
    }
  }

  /**
   * Add a class to component wrapper if we have a search slot
   */
  _processSearchSlotChange() {
    if (this.hasSlot("search")) {
      this.classList.add("pfe-navigation--has-search");
      this._searchToggle.hidden = false;
    } else {
      this.classList.remove("pfe-navigation--has-search");
      this._searchToggle.hidden = true;
    }
  }

  /**
   * Creates HTML for icon in a secondary link
   * @param {string} icon Name of icon from pfe-icon
   * @return {object} DOM Object for pfe-icon
   */
  _createPfeIcon(icon) {
    const iconElement = document.createElement("pfe-icon");
    iconElement.setAttribute("icon", icon);
    iconElement.setAttribute("size", "sm");
    iconElement.setAttribute("aria-hidden", "true");
    return iconElement;
  }

  /**
   * Update alert count on a custom dropdown
   * @param {object} pfeNavigationDropdown DOM Object for the dropdown we need to update
   */
  _updateAlerts(pfeNavigationDropdown) {
    // No alerts for IE11
    if (_isCrustyBrowser()) {
      return;
    }
    const toggle =
      pfeNavigationDropdown.parentElement.parentElement.querySelector(
        ".pfe-navigation__secondary-link"
      );
    let alertsContainer = toggle.querySelector(".secondary-link__alert-count");
    if (pfeNavigationDropdown.alerts) {
      if (!alertsContainer) {
        alertsContainer = document.createElement("div");
        alertsContainer.classList.add("secondary-link__alert-count");
        alertsContainer.innerText = pfeNavigationDropdown.alerts;
        toggle
          .querySelector(".secondary-link__icon-wrapper")
          .appendChild(alertsContainer);
      } else {
        alertsContainer.innerText = pfeNavigationDropdown.alerts;
      }
    } else if (alertsContainer) {
      alertsContainer.innerText = "";
    }
  }

  /**
   * Translate strings based on passed in object
   */
  _translateStrings() {
    this._mobileToggleText.innerText = this.getTranslatedText('menu');
    this._searchButtonText.innerText = this.getTranslatedText('search');
    if (this._accountLogInLink) {
      this._accountLogInLink.innerText = this.getTranslatedText('login');
      this._accountLogInLink.prepend(this._createPfeIcon("web-icon-user"));
    }
    if (this._siteSwitcherBackButton) {
      this._siteSwitcherBackButton.innerText = this.getTranslatedText('returnToMainMenu');
    }
    if (this._accountToggle) {
      this._accountToggle.setAttribute("aria-label", this.getTranslatedText('openAccountMenu'));
    }

    // Widths have changed, should recalculate dynamic breakpoints
    this._menuBreakpoints.secondaryLinks = null;
    window.setTimeout(this._calculateMenuBreakpoints, 0);
  }

  /**
   * Translate mobile menu button string
   */
  _updateMobileMenuText() {
    this._mobileButton.textContent = this.mobileButtonTranslation;
  }

  /**
   * Translate search button string
   */
  _updateSearchButtonText() {
    this._searchButtonText.textContent = this.searchButtonTranslation;
  }

  /**
   * Create a custom dropdown toggle
   * @param {Element} pfeNavigationDropdown DOM object for a pfe-navigation-dropdown tag in the secondary-links slot
   * @param {String} buttonText The text for the button
   * @param {String} icon The name of the icon for pfe-icon
   * @returns {Element} Button with necessary HTML
   */
  _createCustomDropdownToggle(pfeNavigationDropdown, buttonText, icon) {
    const toggleMachineName = pfeNavigationDropdown.dataset.idSuffix
      ? pfeNavigationDropdown.dataset.idSuffix
      : this._createMachineName(buttonText);
    const toggle = document.createElement("button");
    const iconWrapper = document.createElement("div");

    // Set the id suffix in case it's needed later
    if (!pfeNavigationDropdown.dataset.idSuffix) {
      pfeNavigationDropdown.dataset.idSuffix = toggleMachineName;
    }

    toggle.innerText = buttonText;
    toggle.classList.add("pfe-navigation__secondary-link");

    iconWrapper.classList.add("secondary-link__icon-wrapper");
    iconWrapper.prepend(this._createPfeIcon(icon));
    toggle.prepend(iconWrapper);

    return toggle;
  }

  /**
   * Process secondary dropdown, a toggle button, behaviors, and necessary attributes
   * @param {array|NodeList} pfeNavigationDropdowns List of DOM object for a pfe-navigation-dropdown tag in the secondary-links slot
   */
  _processCustomDropdowns(pfeNavigationDropdowns) {
    // Preventing issues in IE11 & Edge
    this.log("Processing Custom Dropdowns");
    if (_isCrustyBrowser()) {
      this._observer.disconnect();
    }

    for (let index = 0; index < pfeNavigationDropdowns.length; index++) {
      const pfeNavigationDropdown = pfeNavigationDropdowns[index];
      const isSecondaryLink =
        pfeNavigationDropdown.parentElement.getAttribute("slot") ===
        "secondary-links";
      const isAccountDropdown =
        pfeNavigationDropdown.parentElement.getAttribute("slot") === "account";

      /**
       * Validate the custom dropdowns
       */
      if (
        isSecondaryLink ||
        // Is it an unprocessed account dropdown
        (isAccountDropdown &&
          !pfeNavigationDropdown.classList.contains("pfe-navigation__dropdown"))
      ) {
        const toggleAndDropdownWrapper = pfeNavigationDropdown.parentElement;
        if (isAccountDropdown) {
          this.classList.add("pfe-navigation--has-custom-account-dropdown");
        }

        // Check for provided toggle element
        let toggle = toggleAndDropdownWrapper.querySelector(
          ".pfe-navigation__secondary-link, .pfe-navigation__account-toggle"
        );
        const attributeValues = {};
        let toggleMachineName = pfeNavigationDropdown.dataset.idSuffix;

        // Validate the toggle if we have one
        if (toggle) {
          if (!toggle.querySelector("pfe-icon")) {
            this.error(
              "A pfe-navigation-dropdown in the secondary-links slot is missing an icon"
            );
            break;
          }

          if (!toggleMachineName) {
            toggleMachineName = this._createMachineName(toggle.innerText);
          }
        }
        // Validate we have the necessary properties to create the toggle
        else {
          const requiredAttributes = ["name", "icon"];
          for (let index = 0; index < requiredAttributes.length; index++) {
            const attribute = requiredAttributes[index];
            if (!pfeNavigationDropdown.getAttribute(attribute)) {
              this.error(
                `A pfe-navigation-dropdown in the secondary-links slot doesn't seem to have a toggle and is missing the attribute ${attribute}, which is required to make a toggle`
              );
              break;
            } else {
              attributeValues[attribute] =
                pfeNavigationDropdown.getAttribute(attribute);
            }
          }

          if (!toggleMachineName && attributeValues["name"]) {
            toggleMachineName = this._createMachineName(
              attributeValues["name"]
            );
          }
        }

        /**
         * Process the custom dropdown markup
         */
        const dropdownWrapper = document.createElement("div");
        let dropdownId;
        if (isSecondaryLink) {
          dropdownId = `pfe-navigation__custom-dropdown--${toggleMachineName}`;
        } else if (isAccountDropdown) {
          dropdownId = `pfe-navigation__account-dropdown`;
        }

        // Set the id suffix in case it's needed later
        if (!pfeNavigationDropdown.dataset.idSuffix) {
          pfeNavigationDropdown.dataset.idSuffix = toggleMachineName;
        }

        // Create a toggle if there isn't one
        let createdNewToggle = false;
        if (!toggle) {
          if (attributeValues["name"]) {
            toggle = this._createCustomDropdownToggle(
              pfeNavigationDropdown,
              attributeValues["name"],
              attributeValues["icon"]
            );
            createdNewToggle = true;
          } else {
            this.error(
              "Could not find or create a toggle. Please add a button.pfe-navigation__secondary-link or add the attributes name & icon to pfe-navigation dropdown"
            );
            break;
          }
        }

        if (isSecondaryLink) {
          toggle.id = `pfe-navigation__secondary-link--${toggleMachineName}`;
        } else if (isAccountDropdown) {
          toggle.id = "pfe-navigation__account-toggle";
        }

        toggle.addEventListener("click", this._dropdownItemToggle);

        // Add Dropdown attributes
        dropdownWrapper.setAttribute("id", dropdownId);
        dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper");
        dropdownWrapper.appendChild(pfeNavigationDropdown);
        pfeNavigationDropdown.classList.add("pfe-navigation__dropdown");

        switch (pfeNavigationDropdown.getAttribute("dropdown-width")) {
          case "single":
            dropdownWrapper.classList.add(
              "pfe-navigation__custom-dropdown--single-column"
            );
            toggleAndDropdownWrapper.classList.add(
              "pfe-navigation__custom-dropdown__wrapper--single-column"
            );
            break;

          case "full":
          default:
            dropdownWrapper.classList.add(
              "pfe-navigation__custom-dropdown--full"
            );
            toggleAndDropdownWrapper.classList.add(
              "pfe-navigation__custom-dropdown__wrapper--full"
            );
            break;
        }

        if (
          pfeNavigationDropdown.classList.contains(
            "pfe-navigation__dropdown--default-styles"
          )
        ) {
          dropdownWrapper.classList.add(
            "pfe-navigation__dropdown-wrapper--default-styles"
          );
        }

        // For some reason setting this earlier causes the value to be null in the DOM
        toggle.setAttribute("aria-controls", dropdownId);

        // Adding closed dropdown attributes
        this._addCloseDropdownAttributes(toggle, dropdownWrapper);

        // Add everything to the DOM that needs to be added
        if (createdNewToggle) {
          toggleAndDropdownWrapper.prepend(toggle);
        }
        toggleAndDropdownWrapper.classList.add(
          "pfe-navigation__custom-dropdown__wrapper"
        );
        toggleAndDropdownWrapper.appendChild(dropdownWrapper);

        // Deal with alerts on dropdown
        if (isSecondaryLink) {
          this._updateAlerts(pfeNavigationDropdown);
        }

        // No alerts for IE11
        if (!window.ShadyCSS || window.ShadyCSS.nativeShadow) {
          // Set up observer to catch any updates to the alerts attribute
          const observerCallback = (mutationList) => {
            // Call updateAlerts for update targets (should only be 1 per update)
            for (let index = 0; index < mutationList.length; index++) {
              this._updateAlerts(mutationList[index].target);
            }
          };

          this._customDropdownAlertsObservers[toggle.id] = new MutationObserver(
            observerCallback
          );
          this._customDropdownAlertsObservers[toggle.id].observe(
            pfeNavigationDropdown,
            {
              attributeFilter: ["alerts", "pfe-alerts"],
            }
          );
        }

        // Process Site Switcher Dropdown
        if (
          toggleAndDropdownWrapper.classList.contains(
            "pfe-navigation__site-switcher"
          )
        ) {
          this._siteSwitcherToggle = toggle;
          const siteSwitcherBackButtonWrapper = document.createElement("div");
          const siteSwitcherBackButton = document.createElement("button");

          toggleAndDropdownWrapper.setAttribute("mobile-slider", "");

          siteSwitcherBackButtonWrapper.classList.add(
            "pfe-navigation__site-switcher__back-wrapper"
          );

          siteSwitcherBackButton.classList.add(
            "pfe-navigation__site-switcher__back-button"
          );
          siteSwitcherBackButton.innerText = this.getTranslatedText('returnToMainMenu');

          siteSwitcherBackButton.addEventListener(
            "click",
            this._siteSwitcherBackClickHandler
          );

          this._siteSwitcherBackButton = siteSwitcherBackButton;
          siteSwitcherBackButtonWrapper.appendChild(siteSwitcherBackButton);
          pfeNavigationDropdown.prepend(siteSwitcherBackButtonWrapper);
        }
      }
    }
    this.classList.add("pfe-navigation--custom-dropdowns--processed");
    this._shadowDomOuterWrapper.setAttribute(
      "class",
      `pfe-navigation__wrapper ${this.getAttribute("class")}`
    );

    // Reconnecting mutationObserver for IE11 & Edge
    if (_isCrustyBrowser()) {
      this._observer.observe(this, lightDomObserverConfig);
    }
  }

  /**
   * Event handler to capture interactions that occur in the shadow DOM
   * @param {object} event
   */
  _shadowDomInteraction(event) {
    if (!window.ShadyCSS || window.ShadyCSS.nativeShadow) {
      this.emitEvent(PfeNavigation.events.shadowDomInteraction, {
        detail: {
          target: event.target,
          parent: this,
        },
      });
    }
  }

  /**
   * Adds max-width to logo so logo can squish at mobile sizes
   * If the logo doesn't squish it may push other menu controls off the side of the screen
   */
  _postProcessLogo() {
    // How many times we'll poll for image dimensions
    let timesToCheckForImageDimensions = 8;
    const logoCheckInterval = 500;
    const logoSelector =
      ".pfe-navigation__logo-image--screen, .pfe-navigation__logo-image, img, svg";
    const logoLink = this._logoWrapper.querySelector("a");

    // Adding event listener so analytics knows when the logo is clicked
    logoLink.addEventListener("click", () => {
      this.emitEvent(PfeNavigation.events.shadowDomInteraction, {
        detail: {
          target: logoLink,
          parent: this,
        },
      });
    });

    /**
     * Sets a max width for the logo the logo can be squished at mobile sizes
     * @param {Object} logoDimensions Object with width and height key
     * @param {Integer} maxHeight The maximum height the logo should be
     */
    const setLogoMaxWidth = (logoDimensions, maxHeight) => {
      // Use the proportions of the image and the desired height to calculate the max-width
      const maxWidth = Math.ceil(
        (logoDimensions.width * maxHeight) / logoDimensions.height
      );
      // Need to apply the max-width to the image because the wrappers have padding
      const shadowLogo = this._logoWrapper.querySelector(logoSelector);
      if (shadowLogo) {
        shadowLogo.style.maxWidth = `var(--pfe-navigation--logo--maxWidth, ${maxWidth}px)`;
      } else {
        this.error("Couldn't find logo image for ");
      }
    };

    /**
     * Gets the dimensions of the logo
     * @param {Element} logoElement Logo element, should be an img or svg
     * @returns {Object} Logo dimensions as an object with width and height keys
     */
    const getLogoDimensions = (logoElement) => {
      const logoDimensions = { width: 0, height: 0 };
      const logoTag = logoElement.tagName.toLowerCase();
      if (logoTag === "svg") {
        const svgBounds = logoElement.getBBox();
        logoDimensions.width = svgBounds.width;
        logoDimensions.height = svgBounds.height;
      } else if (logoTag === "img") {
        logoDimensions.width = logoElement.naturalWidth;
        logoDimensions.height = logoElement.naturalHeight;
      } else {
        // Don't poll since we don't know how to handle the logoElement tag
        timesToCheckForImageDimensions = 0;
        this.error(
          `Logo image wasn\'t a HTML tag that was expected. Expected img or svg, was ${logoTag}`
        );
      }

      return logoDimensions;
    };

    /**
     * Polls to see when the logo dimensions are available so we can set max width
     * @param {Element} logoElement Logo element, should be an img or svg
     */
    const pollForLogoDimensions = (logoElement) => {
      this.log("Polling for logo dimensions");
      let logoDimensions = getLogoDimensions(logoElement);
      if (logoDimensions.width > 0 && logoDimensions.height > 0) {
        // Figure out desired height per design spec by checking for small class
        let logoHeight = this.logoHeights.default;
        if (
          logoElement.classList.contains("pfe-navigation__logo-image--small")
        ) {
          logoHeight = this.logoHeights.small;
        }
        this.log(
          "Got logo dimensions",
          logoDimensions.width,
          logoDimensions.height
        );
        setLogoMaxWidth(logoDimensions, logoHeight);
      }
      // If we didn't get logo dimensions wait a bit and try again
      else if (timesToCheckForImageDimensions) {
        window.setTimeout(() => {
          timesToCheckForImageDimensions--;
          pollForLogoDimensions(logoElement);
        }, logoCheckInterval);
      }
    };

    // Kicks everything off
    if (this._logoWrapper) {
      const logoElement = this._logoWrapper.querySelector(logoSelector);
      if (logoElement) {
        pollForLogoDimensions(logoElement);
      } else {
        this.error(
          "Was not able to identify a logo image, this may cause issues with mobile logo display."
        );
      }
    }
  }

  /**
   * Handle initialization or changes in light DOM
   * Clone them into the shadowRoot
   * @param {array} mutationList Provided by mutation observer
   */
  _processLightDom(mutationList) {
    // If we're mutating because an attribute on the web component starting with pfe- changed, don't reprocess dom
    let cancelLightDomProcessing = true;
    let componentClassesChange = false;
    let needToRecalculateBreakpoints = false;
    const ignoredTags = [
      "PFE-NAVIGATION",
      "PFE-ICON",
      "PFE-NAVIGATION-DROPDOWN",
      "PFE-CTA",
    ];
    const ie11IgnoredClasses = [
      "pfe-navigation__dropdown-wrapper",
      "pfe-navigation__dropdown",
      "pfe-cta",
    ];

    const recalculateBreakpoints = () => {
      this._calculateMenuBreakpoints();
      this._calculateBreakpointAttribute();
      this._setCurrentMobileDropdown();
      // If we have a mobile dropdown make sure it has dropdown attributes
      if (this._currentMobileDropdown) {
        this._addCloseDropdownAttributes(
          this._mobileToggle,
          this._currentMobileDropdown
        );
      }
      this._moveSearchSlot();
    };

    // On initialization
    if (!mutationList) {
      cancelLightDomProcessing = false;

      // Process Custom Dropdowns in secondary links area
      // @note Running into issue where custom button text returns "" without the timeout
      window.setTimeout(() => {
        const pfeNavigationDropdowns = this.querySelectorAll(
          "pfe-navigation-dropdown"
        );
        this._processCustomDropdowns(pfeNavigationDropdowns);
      }, 0);
    }
    // On Mutation we get a mutationList, check to see if there are important changes to react to
    // If not hop out of this function early
    else if (mutationList.length) {
      for (let index = 0; index < mutationList.length; index++) {
        const mutationItem = mutationList[index];
        const oneXSlotsNotIn2x = ["skip", "logo", "trigger", "tray"];

        // Ignore common mutations that we don't care about
        let ignoreThisMutation = false;

        if (mutationItem.type === "childList") {
          // @note Prevent preprocess thrashing in IE11 from pfe-cta
          if (_isCrustyBrowser()) {
            for (let j = 0; j < ie11IgnoredClasses.length; j++) {
              const className = ie11IgnoredClasses[j];
              if (mutationItem.target.classList.contains(className)) {
                ignoreThisMutation = true;
              }
            }
          }

          // Don't worry about site switcher content updates
          if (mutationItem.target.tagName.toLowerCase() === "site-switcher") {
            ignoreThisMutation = true;
          }

          if (!ignoreThisMutation) {
            const customDropdownsToProcess = [];
            if (mutationItem && mutationItem.addedNodes) {
              for (let k = 0; k < mutationItem.addedNodes.length; k++) {
                const addedNode = mutationItem.addedNodes[k];
                if (
                  addedNode.nodeType === 1 &&
                  addedNode.hasAttribute("slot") &&
                  addedNode.parentElement.tagName === "PFE-NAVIGATION"
                ) {
                  switch (addedNode.getAttribute("slot")) {
                    case "secondary-links":
                      const customDropdown = addedNode.querySelector(
                        "pfe-navigation-dropdown"
                      );
                      if (customDropdown) {
                        customDropdownsToProcess.push(customDropdown);
                      }
                      break;
                  }
                }

                // Recalculate both breakpoints
                this._menuBounds.mainMenuRight = null;
                this._menuBounds.secondaryLinksLeft = null;
                needToRecalculateBreakpoints = true;
              }
            }
            // @todo Handle removed nodes
            // for (let index = 0; index < mutationItem.removedNodes.length; index++) {
            //   const removedNode = mutationItem.removedNodes[index];
            // }
            if (customDropdownsToProcess.length) {
              this._processCustomDropdowns(customDropdownsToProcess);
            }
          }
          // for (let index = 0; index < mutationItem.removedNodes.length; index++) {
          //   const removedNode = mutationItem.removedNodes[index];
          // }
        }

        // Capture any changes to pfe-navigation copy those classes shadow DOM wrapper
        // This is to help with styling, due to the limitations of :host()
        if (
          !ignoreThisMutation &&
          mutationItem.target.tagName === "PFE-NAVIGATION" &&
          mutationItem.type === "attributes" &&
          mutationItem.attributeName === "class"
        ) {
          componentClassesChange = true;
        }

        if (!ignoreThisMutation && mutationItem.type === "attributes") {
          // User has set breakpoints
          if (
            mutationItem.attributeName === 'breakpoint-tablet'
            || mutationItem.attributeName === 'breakpoint-desktop'
          ) {
            needToRecalculateBreakpoints = true;
          }

          // Updates to PFE elements inside of PFE Nav should be ignored
          if (!mutationItem.target && stringStartsWith(mutationItem.target.tagName, "PFE")) {
            if (
              mutationItem.attributeName === "pfelement" ||
              mutationItem.attributeName === "class" ||
              mutationItem.attributeName === "type"
            ) {
              ignoreThisMutation = true;
            }
          }
        }

        if (!ignoreThisMutation) {
          if (
            mutationItem.target.tagName === "PFE-NAVIGATION-ACCOUNT" ||
            mutationItem.target.tagName === "RH-ACCOUNT-DROPDOWN"
          ) {
            this._processAccountDropdownChange(mutationItem);
          } else if (mutationItem.type === "characterData") {
            // Process text changes
            cancelLightDomProcessing = false;
          }
          // Slotted tags shouldn't cause lightDomProcessing
          // Unless it's a slot from 1.x that we're not using anymore
          else if (
            !mutationItem.target.hasAttribute("slot") ||
            oneXSlotsNotIn2x.includes(mutationItem.target.getAttribute("slot"))
          ) {
            // Elements with slotted parents should also be ignored
            const slottedParent = mutationItem.target.closest("[slot]");
            if (
              !slottedParent ||
              oneXSlotsNotIn2x.includes(slottedParent.getAttribute("slot"))
            ) {
              // Make sure it's not an ignored tag
              if (!ignoredTags.includes(mutationItem.target.tagName)) {
                if (mutationItem.attributeName) {
                  // We need to update attribute changes
                  cancelLightDomProcessing = false;
                }
                if (
                  mutationItem.type === "childList" &&
                  mutationList.addedNodes &&
                  mutationList.addedNodes.length
                ) {
                  for (let j = 0; index < mutationList.addedNodes.length; j++) {
                    const addedNode = mutationList.addedNodes[j];
                    // We need to update on tree changes if they aren't in a slot
                    if (
                      !addedNode.hasAttribute("slot") ||
                      !addedNode.closest("[slot]")
                    ) {
                      cancelLightDomProcessing = false;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    // Preventing issues in IE11 & Edge
    if (_isCrustyBrowser()) {
      this._observer.disconnect();
    }

    // Handle class updates to the parent component
    // Copying them to shadow DOM to avoid compound :host() selectors
    if (componentClassesChange) {
      this._shadowDomOuterWrapper.setAttribute(
        "class",
        `pfe-navigation__wrapper ${this.getAttribute("class")}`
      );
    }

    if (cancelLightDomProcessing) {
      if (needToRecalculateBreakpoints) recalculateBreakpoints();

      // Reconnecting mutationObserver for IE11 & Edge
      if (_isCrustyBrowser()) {
        this._observer.observe(this, lightDomObserverConfig);
      }

      this.log("Cancelled light DOM processing", mutationList);

      return;
    }

    // Begins the wholesale replacement of most of the shadowDOM -------------------------------
    this.log("_processLightDom: replacing shadow DOM", mutationList);
    // New nav element we'll populate and replace the old one with later
    const newShadowMenuWrapper = document.createElement("nav");

    ///
    // @note v1.x markup:
    // Address skip links, put them at the beginning of the document
    ///
    const htmlBody = document.querySelector("body");
    const skipLinks = this.querySelectorAll('[slot="skip"]');
    if (skipLinks.length) {
      // Wrapper used to make sure we don't duplicate skip links
      const skipLinksWrapper = document.createElement("div");
      skipLinksWrapper.id = "pfe-navigation__1x-skip-links";
      for (let index = 0; index < skipLinks.length; index++) {
        skipLinks[index].removeAttribute("slot");

        // Add visually-hidden to the link tags so we can show them when focused on with CSS
        if (skipLinks[index].tagName === "A") {
          skipLinks[index].classList.add("visually-hidden", "skip-link");
        } else {
          const theRealSkipLinks = skipLinks[index].querySelectorAll("a");
          for (let j = 0; j < theRealSkipLinks.length; j++) {
            theRealSkipLinks[j].classList.add("visually-hidden", "skip-link");
          }
        }
        skipLinksWrapper.appendChild(skipLinks[index]);
      }

      // If we already have an oldSkipLinks, replace it
      const oldSkipLinksWrapper = document.getElementById(
        "pfe-navigation__1x-skip-links"
      );
      if (oldSkipLinksWrapper) {
        oldSkipLinksWrapper.parentElement.replaceChild(
          skipLinksWrapper,
          oldSkipLinksWrapper
        );
      } else {
        // Put skip links as the first thing after the body tag
        htmlBody.prepend(skipLinksWrapper);
      }
    }

    ///
    // Add the logo to the correct part of the shadowDom
    ///
    let lightLogo = this.querySelector("#pfe-navigation__logo-wrapper");
    if (lightLogo) {
      const newShadowLogoWrapper = lightLogo.cloneNode(true);
      if (this._logoWrapper) {
        this._shadowDomOuterWrapper.replaceChild(
          newShadowLogoWrapper,
          this._logoWrapper
        );
      } else {
        this._shadowDomOuterWrapper.prepend(newShadowLogoWrapper);
      }
      // Re-set pointer since old element doesn't exist
      this._logoWrapper = newShadowLogoWrapper;
    }
    // @note v1.x markup:
    // Address logo
    else {
      lightLogo = this.querySelector('[slot="logo"]');
      if (lightLogo) {
        const logoLinkCopy = lightLogo.cloneNode(true);
        const logoLinkWrapper = document.createElement("div");
        logoLinkWrapper.classList.add("pfe-navigation__logo-wrapper");
        logoLinkWrapper.setAttribute("id", "pfe-navigation__logo-wrapper");

        logoLinkCopy.removeAttribute("slot");
        logoLinkCopy.classList.add("pfe-navigation__logo-link");
        logoLinkWrapper.prepend(logoLinkCopy);

        // Add it to the shadow DOM
        if (this._logoWrapper) {
          this._logoWrapper.parentElement.replaceChild(
            logoLinkWrapper,
            this._logoWrapper
          );
        } else {
          this._shadowDomOuterWrapper.prepend(logoLinkWrapper);
        }
        // Re-set pointer since old element doesn't exist
        this._logoWrapper = logoLinkWrapper;
      } else {
        this.log("Cannot find a logo in the component tag.");
      }
    }

    this._postProcessLogo();

    ///
    // Add the menu to the correct part of the shadowDom
    ///
    let lightMenu = this.querySelector("#pfe-navigation__menu");
    let hasOneXMenuMarkup = false;
    const pfeNavigationMain = this.querySelector("pfe-navigation-main");
    if (pfeNavigationMain || this.querySelector("pfe-navigation-item")) {
      hasOneXMenuMarkup = true;
    }

    // @note v1.x markup:
    // Add selectors needed for the menu to behave well in 2.x
    if (!lightMenu) {
      if (pfeNavigationMain) {
        lightMenu = this.querySelector("pfe-navigation-main > ul");
        if (lightMenu && lightMenu.id !== "pfe-navigation__menu") {
          lightMenu.id = "pfe-navigation__menu";
          lightMenu.classList.add("pfe-navigation__menu");

          // Add necessary classes to li
          for (let index = 0; index < lightMenu.children.length; index++) {
            lightMenu.children[index].classList.add(
              "pfe-navigation__menu-item"
            );
          }
        }

        // Add necessary classes to top level links
        const oneXTopLevelLinks =
          lightMenu.querySelectorAll('[slot="trigger"] a');
        for (let index = 0; index < oneXTopLevelLinks.length; index++) {
          oneXTopLevelLinks[index].classList.add("pfe-navigation__menu-link");
        }
      }
    }

    ///
    // @note v1.x markup:
    // Address secondary links by transforming markup and adding it
    ///
    const customDropdownsToProcess = [];
    // Storing transformed markup in a document fragment to minimize DOM writes
    const transformedSecondaryLinks = document.createDocumentFragment();
    if (hasOneXMenuMarkup) {
      for (let index = 0; index < this.children.length; index++) {
        const pfeNavigationChild = this.children[index];
        if (pfeNavigationChild.tagName === "PFE-NAVIGATION-ITEM") {
          // Trigger is optional
          const trigger = pfeNavigationChild.querySelector('[slot="trigger"]');
          // Trigger link is also optional
          const triggerLink = trigger ? trigger.querySelector("a") : null;
          // Tray is optional
          const tray = pfeNavigationChild.querySelector('[slot="tray"]');

          // These have to be set depending on the markup
          let shadowTrigger = null;
          let toggleName = null;
          if (triggerLink) {
            shadowTrigger = triggerLink.cloneNode(true);
            toggleName = triggerLink.innerText;
          } else if (trigger) {
            toggleName = trigger.innerText;
            shadowTrigger = trigger.cloneNode(true);
            shadowTrigger.removeAttribute("slot");
          } else {
            const unslottedChildLink = pfeNavigationChild.querySelector("a");
            if (unslottedChildLink) {
              toggleName = unslottedChildLink.innerText;
              shadowTrigger = unslottedChildLink;
            }
            // If we can't find any of that markup we can't transform the markup
            else {
              this.error(
                "Attempted to transform 1.x secondary link and couldn't find what we needed.",
                pfeNavigationChild
              );
              break;
            }
          }

          // Div Wrapper for secondary links
          const divWrapper = document.createElement("div");
          divWrapper.setAttribute("slot", "secondary-links");
          // If there's a tray, it's a dropdown, setup a pfe-navigation-dropdown
          if (tray) {
            // If it's a dropdown, wrap it in pfe-navigation-dropdown
            const dropdown = document.createElement("pfe-navigation-dropdown");
            dropdown.dataset.idSuffix = this._createMachineName(toggleName);
            const toggle = this._createCustomDropdownToggle(
              dropdown,
              toggleName,
              pfeNavigationChild.getAttribute("pfe-icon")
            );

            // Copy over any data attributes to the toggle
            if (triggerLink) {
              const datasetKeys = Object.keys(triggerLink.dataset);
              for (let j = 0; j < datasetKeys.length; j++) {
                const dataKey = datasetKeys[j];
                toggle.dataset[dataKey] = triggerLink.dataset[dataKey];
              }
            }

            dropdown.dropdownWidth = "full";
            dropdown.classList.add(
              "pfe-navigation__dropdown--default-styles",
              "pfe-navigation__dropdown--1-x"
            );
            dropdown.appendChild(pfeNavigationChild);

            divWrapper.appendChild(toggle);
            divWrapper.appendChild(dropdown);
            transformedSecondaryLinks.appendChild(divWrapper);
            customDropdownsToProcess.push(dropdown);
          }
          // Otherwise this is just a link with an icon
          else {
            shadowTrigger.classList.add("pfe-navigation__secondary-link");
            shadowTrigger.innerHTML = toggleName;
            shadowTrigger.prepend(this._createPfeIcon(pfeNavigationChild.icon));
            divWrapper.appendChild(shadowTrigger);
            transformedSecondaryLinks.appendChild(divWrapper);
          }
        }
      }
    }

    // Write our transformed 1.x markup to the DOM
    this.appendChild(transformedSecondaryLinks);

    // Process any custom dropdowns
    if (customDropdownsToProcess.length) {
      this._processCustomDropdowns(customDropdownsToProcess);
    }

    // Ensure we're still disconnected after _processCustomDropdowns
    // Preventing issues in IE11 & Edge
    if (_isCrustyBrowser()) {
      this._observer.disconnect();
    }

    ///
    // Process Main Menu
    ///
    if (lightMenu) {
      //--------------------------------------------------
      // Begin best time to manipulate DOM in nav
      // Modify elements when they're in the shadow vars before they get appended to the shadow DOM
      //--------------------------------------------------

      // Add attributres we need on the shadow DOM menu wrapper
      newShadowMenuWrapper.setAttribute("id", "pfe-navigation__menu-wrapper");
      newShadowMenuWrapper.classList.add("pfe-navigation__menu-wrapper");

      // Copy light DOM menu into new wrapper, to be put in shadow DOM after manipulations
      newShadowMenuWrapper.appendChild(lightMenu.cloneNode(true));

      // @note v1.x markup:
      // Address menu items by adding class hooks we need to import into shadowDom
      // and classes we need to maintain appropriate styles
      if (hasOneXMenuMarkup) {
        // Remove pfe-navigation-item tag, but keep the important children elements
        const pfeNavigationItems = newShadowMenuWrapper.querySelectorAll(
          "pfe-navigation-item"
        );
        for (let index = 0; index < pfeNavigationItems.length; index++) {
          const pfeNavigationItem = pfeNavigationItems[index];

          const menuListItem = pfeNavigationItem.closest("li");
          menuListItem.classList.add("pfe-navigation__menu-item");
          // Address menu toggle
          let menuItemLink =
            pfeNavigationItem.querySelector('[slot="trigger"] a');
          if (!menuItemLink && pfeNavigationItem.children[0].tagName === "A") {
            menuItemLink = pfeNavigationItem.children[0];
          }
          if (menuItemLink) {
            menuItemLink.classList.add("pfe-navigation__menu-link");
            menuListItem.prepend(menuItemLink);
          } else {
            this.error("Wasn't able to process toggle", pfeNavigationItem);
          }

          // Address menu dropdown
          let menuItemDropdown =
            pfeNavigationItem.querySelector(".pfe-navigation-grid") ||
            pfeNavigationItem.querySelector(".pfe-navigation__dropdown") ||
            pfeNavigationItem.querySelector("[slot='tray']");
          if (menuItemDropdown) {
            menuItemDropdown.classList.add("pfe-navigation__dropdown");
            const pfeNavigationItemFooter = pfeNavigationItem.querySelector(
              ".pfe-navigation--footer"
            );
            if (pfeNavigationItemFooter) {
              pfeNavigationItemFooter.classList.add("pfe-navigation__footer");
              menuItemDropdown.appendChild(pfeNavigationItemFooter);
            }
            menuListItem.appendChild(menuItemDropdown);
          } else {
            this.error("Wasn't able to process dropdown", pfeNavigationItem);
          }

          // Remove the rest
          menuListItem.removeChild(pfeNavigationItem);
        }
      }

      // Add menu dropdown toggle behavior
      const dropdowns = newShadowMenuWrapper.querySelectorAll(
        ".pfe-navigation__dropdown"
      );
      for (let index = 0; index < dropdowns.length; index++) {
        const dropdown = dropdowns[index];
        const dropdownLink = dropdown.parentElement.querySelector(
          ".pfe-navigation__menu-link"
        );

        if (!dropdownLink) {
          this.warn(
            "Could not find link to create toggle for dropdown",
            dropdown
          );
          break;
        }

        // Convert dropdown links into buttons
        const dropdownButton = document.createElement("button");

        // Move over or add important attributes and content
        dropdownButton.setAttribute(
          "class",
          dropdownLink.getAttribute("class")
        );
        dropdownButton.classList.add("pfe-navigation__menu-link--has-dropdown");

        dropdownButton.innerHTML = dropdownLink.innerHTML;
        // Keep data attributes from link with the button
        const dropdownLinkAttributes = dropdownLink.getAttributeNames();
        for (let index = 0; index < dropdownLinkAttributes.length; index++) {
          const currentAttribute = dropdownLinkAttributes[index];
          if (stringStartsWith(currentAttribute, "data-")) {
            dropdownButton.setAttribute(
              currentAttribute,
              dropdownLink.getAttribute(currentAttribute)
            );
          }
        }
        dropdownButton.dataset.machineName = this._createMachineName(
          dropdownLink.innerText
        );

        // Add dropdown behavior
        dropdownButton.addEventListener("click", this._dropdownItemToggle);
        dropdownLink.parentElement.replaceChild(dropdownButton, dropdownLink);

        // Set Id's for the button and dropdown and add their ID's to the parent li for easy access
        const dropdownButtonId = `main-menu__button--${dropdownButton.dataset.machineName}`;
        const dropdownId = `main-menu__dropdown--${dropdownButton.dataset.machineName}`;
        dropdownButton.setAttribute("id", dropdownButtonId);

        // Create wrapper for dropdown and give it appropriate classes and attributes
        const dropdownWrapper = document.createElement("div");
        dropdownWrapper.setAttribute(
          "part",
          "pfe-navigation__dropdown-wrapper"
        );

        dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper");
        if (
          dropdown.classList.contains("pfe-navigation__dropdown--single-column")
        ) {
          dropdownWrapper.classList.add(
            "pfe-navigation__dropdown-wrapper--single-column"
          );
        }
        dropdownWrapper.setAttribute("id", dropdownId);

        dropdownWrapper.appendChild(dropdown);
        dropdownButton.parentElement.appendChild(dropdownWrapper);
        dropdownButton.parentElement.dataset.dropdownId = dropdownId;
        dropdownButton.setAttribute("aria-controls", dropdownId);

        // Add custom event for interactive elements in shadowDom so anayltics can capture them acccurately
        // We'll omit elements that have custom events already to avoid double reporting
        const focusableElements = dropdownWrapper.querySelectorAll(
          this._focusableElements
        );
        for (let index = 0; index < focusableElements.length; index++) {
          const currentElement = focusableElements[index];
          currentElement.addEventListener("click", this._shadowDomInteraction);
        }

        // Set everything to closed by default
        this._addCloseDropdownAttributes(dropdownButton, dropdownWrapper);
      }
    }
    //--------------------------------------------------
    // End best time to manipulate DOM in nav
    //--------------------------------------------------

    // Replace the menu in the shadow DOM
    this._shadowMenuWrapper.parentElement.replaceChild(
      newShadowMenuWrapper,
      this._shadowMenuWrapper
    );
    this._shadowMenuWrapper = newShadowMenuWrapper;

    // Recalculate main menu breakpoint
    this._menuBounds.mainMenuRight = null;
    needToRecalculateBreakpoints = true;

    // Re-set pointers to commonly used elements that just got paved over
    this._menuDropdownXs = this.shadowRoot.getElementById("mobile__dropdown");
    this._menuDropdownMd = this.shadowRoot.getElementById(
      "pfe-navigation__menu-wrapper"
    );
    if (!this._menuDropdownMd) {
      this.classList.add("pfe-navigation--no-main-menu");
    }

    // Add menu burger behavior
    this._mobileToggle.addEventListener("click", this._toggleMobileMenu);

    // Add search toggle behavior
    this._searchToggle.addEventListener("click", this._toggleSearch);

    // General keyboard listener attached to the entire component
    document.addEventListener("keydown", this._generalKeyboardListener);

    // Set initial on page load aria settings on all original buttons and their dropdowns
    if (this._currentMobileDropdown) {
      this._addCloseDropdownAttributes(
        this._mobileToggle,
        this._currentMobileDropdown
      );
    }

    // Setup dropdown attributes appropriately
    this._addCloseDropdownAttributes(null, this._accountDropdownWrapper);
    if (this.classList.contains('pfe-navigation--inline-search')) {
      this._removeDropdownAttributes(this._searchToggle, this._searchSpotMd);
    }
    else {
      this._addCloseDropdownAttributes(this._searchToggle, this._searchSpotMd);
    }

    // Reconnecting mutationObserver for IE11 & Edge
    if (_isCrustyBrowser()) {
      this._observer.observe(this, lightDomObserverConfig);
    }

    // Putting off heavy DOM calculations
    if (needToRecalculateBreakpoints) {
      window.setTimeout(recalculateBreakpoints, 0);
    }

    const menuAnchorTags = this._shadowMenuWrapper.querySelectorAll(
      "a.pfe-navigation__menu-link"
    );
    for (let index = 0; index < menuAnchorTags.length; index++) {
      const menuAnchorTag = menuAnchorTags[index];
      menuAnchorTag.addEventListener("click", () => {
        this.emitEvent(PfeNavigation.events.shadowDomInteraction, {
          detail: {
            target: menuAnchorTag,
            parent: this,
          },
        });
      });
    }

    if (this.isOpen()) {
      this._changeNavigationState(this.openToggle, "open");
    }

    // Some cleanup and state management for after render
    const postProcessLightDom = () => {
      // Preventing issues in IE11 & Edge
      if (_isCrustyBrowser()) {
        this._observer.disconnect();
      }

      if (this.isMobileMenuButtonVisible() && !this.isOpen("mobile__button")) {
        this._addCloseDropdownAttributes(
          this._mobileToggle,
          this._currentMobileDropdown
        );
      }

      // Mobile slider elements have a tab trap that will need to be updated if content has been updated
      const mobileSliderElements = this.querySelectorAll("[mobile-slider]");
      for (let index = 0; index < mobileSliderElements.length; index++) {
        const currentMobileSliderElement = mobileSliderElements[index];
        this._getLastFocusableItemInMobileSlider(currentMobileSliderElement);
        const toggle = currentMobileSliderElement.querySelector(
          ".pfe-navigation__secondary-link"
        );
        const dropdown = currentMobileSliderElement.querySelector(
          ".pfe-navigation__dropdown"
        );

        // Add mutation observer if we don't have one already
        if (
          toggle &&
          toggle.id &&
          dropdown &&
          !this._mobileSliderMutationObservers[toggle.id]
        ) {
          this._mobileSliderMutationObservers[toggle.id] = new MutationObserver(
            () =>
              this._getLastFocusableItemInMobileSlider(
                currentMobileSliderElement
              )
          );
          this._mobileSliderMutationObservers[toggle.id].observe(dropdown, {
            subtree: true,
            childList: true,
          });
        }
      }

      // Reconnecting mutationObserver for IE11 & Edge
      if (_isCrustyBrowser()) {
        this._observer.observe(this, lightDomObserverConfig);
      }
    };

    window.setTimeout(postProcessLightDom, 0);
  } // end _processLightDom()

  /**
   * Behavior for main menu breakpoint
   * @param {object} event Event from MediaQueryList
   */
  _collapseMainMenu(event) {
    if (event.matches) {
      this.classList.add("pfe-navigation--collapse-main-menu");
    } else {
      this.classList.remove("pfe-navigation--collapse-main-menu");
    }
  }

  /**
   * Behavior for secondary links breakpoint
   * @param {object} event Event from MediaQueryList
   */
  _collapseSecondaryLinks(event) {
    if (event.matches) {
      this.classList.add("pfe-navigation--collapse-secondary-links");
    } else {
      this.classList.remove("pfe-navigation--collapse-secondary-links");
    }
  }

  /**
   * Calculate the points where the main menu and secondary links should be collapsed and adds them
   * To recalculate a breakpoint set this.menuBreakpoint[name] to null and run this function.
   */
  _calculateMenuBreakpoints() {
    if (_isCrustyBrowser()) {
      return;
    }

    const hardcodedBreakpointTablet = parseInt(this.getAttribute('breakpoint-tablet'));
    const hardcodedBreakpointDesktop = parseInt(this.getAttribute('breakpoint-desktop'));

    // Only recreate media queries if something changed
    let recreateMediaQueries = false;
    const someExtraWhiteSpace = 20;

    if (hardcodedBreakpointTablet && this._menuBreakpoints.secondaryLinks !== hardcodedBreakpointTablet) {
      recreateMediaQueries = true;
    }
    else if (hardcodedBreakpointDesktop && this._menuBreakpoints.mainMenu !== hardcodedBreakpointDesktop) {
      recreateMediaQueries = true;
    }

    if (!hardcodedBreakpointTablet || !hardcodedBreakpointDesktop) {
      // How much white space to add to some of these calculations
      // @todo future - 20 should probably be based on a CSS value or DOM measurement

      // Calculate space needed for logo
      if (this._menuBounds.logoRight === null) {
        if (this._logoWrapper) {
          const logoBoundingRect = this._logoWrapper.getBoundingClientRect();
          // Getting the right boundary, which will include menu padding and the image's width
          const logoRight = Math.ceil(logoBoundingRect.right);
          // Compare new value with old value to see if there was any change
          if (logoRight && logoRight !== this._menuBounds.logoRight) {
            this._menuBounds.logoRight = logoRight;
            recreateMediaQueries = true;
          }
        }
      }

      // Calculate space needed for logo and main menu
      if (!this._menuBounds.mainMenuRight && !this.isMobileMenuButtonVisible()) {
        const navigation = this.shadowRoot.getElementById("pfe-navigation__menu");
        if (navigation) {
          const navigationBoundingRect = navigation.getBoundingClientRect();

          // Gets the length from the left edge of the screen to the right side of the navigation
          const mainMenuRight = Math.ceil(navigationBoundingRect.right);
          // Compare new value with old value to see if there was any change
          if (mainMenuRight && mainMenuRight !== this._menuBounds.mainMenuRight) {
            this._menuBounds.mainMenuRight = mainMenuRight;
            recreateMediaQueries = true;
          }
        }
      }

      // Calculate space needed for right padding and secondary links
      if (
        !this._menuBounds.secondaryLinksLeft &&
        !this.isSecondaryLinksSectionCollapsed()
      ) {
        let leftMostSecondaryLink = null;
        let secondaryLinksLeft = null;
        let leftMostSecondaryLinkBoundingRect = null;

        if (this.hasSlot("search")) {
          if (this.classList.contains('pfe-navigation--inline-search')) {
            leftMostSecondaryLink = this._searchSpotMd;
          }
          else {
            leftMostSecondaryLink = this._searchToggle;
          }
        } else if (this.hasSlot("secondary-links")) {
          leftMostSecondaryLink = this.getSlot("secondary-links")[0];
        } else if (this._accountToggle) {
          leftMostSecondaryLink = this._accountToggle;
        } else if (this._accountLogInLink) {
          leftMostSecondaryLink = this._accountLogInLink;
        } else {
          // We don't have a left most secondary link, use padding on the nav
          secondaryLinksLeft = parseInt(
            window.getComputedStyle(this._shadowDomOuterWrapper, false)
              .paddingRight
          );
        }
        if (leftMostSecondaryLink) {
          leftMostSecondaryLinkBoundingRect =
            leftMostSecondaryLink.getBoundingClientRect();

          // Gets the length from the right edge of the screen to the left side of the left most secondary link
          secondaryLinksLeft =
            window.innerWidth - Math.ceil(leftMostSecondaryLinkBoundingRect.left);
        }
        // Compare new value with old value to see if there was any change
        if (
          leftMostSecondaryLinkBoundingRect &&
          secondaryLinksLeft &&
          secondaryLinksLeft !== this._menuBounds.secondaryLinksLeft
        ) {
          this._menuBounds.secondaryLinksLeft =
            window.innerWidth - Math.ceil(leftMostSecondaryLinkBoundingRect.left);
          recreateMediaQueries = true;
        }
      }
    }

    // Only true if a length has changed
    if (recreateMediaQueries) {
      // Set the desktop breakpoint (aka mainMenu) if we have the info we need
      let updatedMainMenuBreakpoint = false;
      if (hardcodedBreakpointDesktop) {
        updatedMainMenuBreakpoint = this._menuBreakpoints.mainMenu !== hardcodedBreakpointDesktop;
        this._menuBreakpoints.mainMenu = hardcodedBreakpointDesktop;
      }
      else if (this._menuBounds.secondaryLinksLeft) {
        if (this._menuBounds.mainMenuRight) {
          updatedMainMenuBreakpoint = true;
          this._menuBreakpoints.mainMenu =
            this._menuBounds.mainMenuRight +
            this._menuBounds.secondaryLinksLeft;
        } else if (this._menuBounds.logoRight) {
          updatedMainMenuBreakpoint = true;
          this._menuBreakpoints.mainMenu =
            this._menuBounds.logoRight +
            this._menuBounds.secondaryLinksLeft +
            someExtraWhiteSpace;
        }
      }

      // Update our media queries if needed
      if (updatedMainMenuBreakpoint) {
        // Remove old listener
        if (this._menuBreakpointQueries.mainMenu) {
          this._removeMediaQueryListener(
            this._menuBreakpointQueries.mainMenu,
            this._collapseMainMenu
          );
        }
        // Create new one
        this._menuBreakpointQueries.mainMenu = window.matchMedia(
          `(max-width: ${this._menuBreakpoints.mainMenu}px)`
        );
        this._addMediaQueryListener(
          this._menuBreakpointQueries.mainMenu,
          this._collapseMainMenu
        );
      }

      // Set the tablet breakpoint (aka secondary links) if we have the info we need
      let updatedSecondaryLinksBreakpoint = false;
      if (hardcodedBreakpointTablet) {
        updatedSecondaryLinksBreakpoint = this._menuBreakpoints.secondaryLinks !== hardcodedBreakpointTablet;
        this._menuBreakpoints.secondaryLinks = hardcodedBreakpointTablet;
      }
      else if (this._menuBounds.logoRight && this._menuBounds.secondaryLinksLeft) {
        updatedSecondaryLinksBreakpoint = true;
        this._menuBreakpoints.secondaryLinks =
          this._menuBounds.logoRight +
          this._menuBounds.secondaryLinksLeft +
          this._mobileToggle.offsetWidth +
          someExtraWhiteSpace;
      }

      // Update our media queries if needed
      if (updatedSecondaryLinksBreakpoint) {
        // Remove old listener
        if (this._menuBreakpointQueries.secondaryLinks) {
          this._removeMediaQueryListener(
            this._menuBreakpointQueries.secondaryLinks,
            this._collapseSecondaryLinks
          );
        }
        // Create new listener
        this._menuBreakpointQueries.secondaryLinks = window.matchMedia(
          `(max-width: ${this._menuBreakpoints.secondaryLinks}px)`
        );
        this._addMediaQueryListener(
          this._menuBreakpointQueries.secondaryLinks,
          this._collapseSecondaryLinks
        );
      }

      this.log("Menu Bounds updated, updating mediaQueries", {
        // Flattening object so what it was at the time of logging doesn't get updated
        menuBounds: `logoRight: ${this._menuBounds.logoRight}, mainMenuRight: ${this._menuBounds.mainMenuRight}, secondaryLinksLeft: ${this._menuBounds.secondaryLinksLeft}`,
        menuBreakpoints: `secondaryLinks: ${this._menuBreakpoints.secondaryLinks}, mainMenu: ${this._menuBreakpoints.mainMenu}`,
      });
    }
  }

  /**
   * Depending on breakpoint we need to move the search slot to one of two places to make a logical tab order
   */
  _moveSearchSlot() {
    // Preventing issues in IE11 & Edge
    if (_isCrustyBrowser()) {
      this._observer.disconnect();
    }

    if (this.isSecondaryLinksSectionCollapsed()) {
      this._removeDropdownAttributes(null, this._searchSpotMd);
      if (this._searchSlot.parentElement !== this._searchSpotXs) {
        this._searchSpotXs.appendChild(this._searchSlot);
      }
    } else {
      if (this._searchSlot.parentElement !== this._searchSpotMd) {
        this._searchSpotMd.appendChild(this._searchSlot);
      }
      if (this.isOpen("secondary-links__button--search")) {
        this._addOpenDropdownAttributes(null, this._searchSpotMd);
      } else {
        this._addCloseDropdownAttributes(null, this._searchSpotMd);
      }
    }

    // Reconnecting mutationObserver for IE11 & Edge
    if (_isCrustyBrowser()) {
      this._observer.observe(this, lightDomObserverConfig);
    }
  }

  /**
   * Adjustments to behaviors and DOM that need to be made after a resize event
   */
  _postResizeAdjustments() {
    if (
      this._menuBreakpoints.mainMenu === null ||
      this._menuBreakpoints.secondaryLinks === null
    ) {
      this._calculateMenuBreakpoints();
    }

    // Track current navigation state
    const openToggle = this.openToggle
      ? this.getToggleElement(this.openToggle)
      : null;
    const openDropdownId = this.openToggle
      ? this._getDropdownId(this.openToggle)
      : null;
    const openDropdown = openDropdownId
      ? this.getDropdownElement(openDropdownId)
      : null;

    // Track previous state and new state
    const oldMobileDropdown = this._currentMobileDropdown;

    this._setCurrentMobileDropdown();
    const breakpointWas = this.breakpoint;
    const breakpointIs = this._calculateBreakpointAttribute();

    // Things that need to be checked if b
    if (breakpointIs !== breakpointWas) {
      // Make sure search slot is in the right spot, based on breakpoint
      this._moveSearchSlot();

      ///
      // Manage mobile toggle & dropdown state
      ///
      if (breakpointIs === "desktop") {
        // Mobile button doesn't exist on desktop, so we need to clear the state if that's the only thing that's open
        if (this.openToggle === "mobile__button") {
          this._changeNavigationState("mobile__button", "close");
        }

        // At desktop the mobile dropdown is just a wrapper
        this._removeDropdownAttributes(
          this._mobileToggle,
          this._currentMobileDropdown
        );
      } else {
        // Make sure old dropdown doesn't have dropdown aria and state attributes
        if (
          this._currentMobileDropdown !== oldMobileDropdown &&
          oldMobileDropdown !== null
        ) {
          this._removeDropdownAttributes(null, oldMobileDropdown);
        }

        // Make sure the current mobile dropdown has the correct attributes
        if (this.isOpen("mobile__button")) {
          this._addOpenDropdownAttributes(
            this._mobileToggle,
            this._currentMobileDropdown
          );
        } else {
          this._addCloseDropdownAttributes(
            this._mobileToggle,
            this._currentMobileDropdown
          );
        }
      }

      ///
      // Manage overlay state
      ///
      if (this.isOpen()) {
        this._overlay.hidden = false;
      } else {
        this._overlay.hidden = true;
      }

      if (breakpointIs === "mobile") {
        if (openToggle) {
          const mobileSlideParent = openToggle.closest("[mobile-slider]");
          if (mobileSlideParent) {
            this.mobileSlide = true;
          }
        }
      }
    }

    ///
    // Manage Dropdown Heights
    ///
    if (openToggle && openDropdown) {
      // Main menu needs a height set at mobile/tablet
      if (stringStartsWith(openToggle.id, "main-menu__button--")) {
        if (breakpointIs !== "desktop") {
          this._setDropdownHeight(openDropdown);
        } else {
          openDropdown.style.removeProperty("height");
        }
      }
      // Secondary menu dropdowns get set at mobile only
      else if (
        stringStartsWith(openToggle.id, "pfe-navigation__secondary-link--")
      ) {
        if (this.breakpoint === "mobile") {
          this._setDropdownHeight(openDropdown);
        } else {
          openDropdown.style.removeProperty("height");
        }
      }
    }

    ///
    // ! Begin lines need to be at the end of this function
    ///
    // Remove class that hides nav while it's resizing
    this.classList.remove("pfe-navigation--is-resizing");

    // Set layout state vars for next resize
    this._wasMobileMenuButtonVisible = this.isMobileMenuButtonVisible();
    this._wasSecondaryLinksSectionCollapsed =
      this.isSecondaryLinksSectionCollapsed();

    this.breakpoint = breakpointIs;
    ///
    // ! End lines that need to be at the end of this function
    ///
  } // end _postResizeAdjustments()

  /**
   * Event listeners for toggles
   */
  _toggleMobileMenu() {
    if (!this.isOpen("mobile__button")) {
      this._changeNavigationState("mobile__button", "open");
      // Show main menu when mobile All Red Hat menu is closed
      this._showMobileMainMenu();
    } else {
      this._changeNavigationState("mobile__button", "close");
      // @todo: (KS) decide if I need this (i do not think so rn)
      // Hide main menu when mobile All Red Hat menu is open
      // this._hideMobileMainMenu();
    }
  }

  _toggleSearch() {
    this._changeNavigationState("secondary-links__button--search");
    // Move focus to search field when Desktop search button is activated
    this._searchFieldFocusHandler();
  }

  _dropdownItemToggle(event) {
    event.preventDefault();
    const dropdownItem = event.target;
    const toggleId = dropdownItem.id;
    this._changeNavigationState(toggleId);
  }

  /**
   * Default Keydown Keyboard event handler
   * @param {object} event
   */
  _generalKeyboardListener(event) {
    const key = event.key;
    // If Escape wasn't pressed, or the nav is closed, SMOKE BOMB
    if (key !== "Escape" || !this.isOpen()) {
      return;
    }

    // event.which is deprecated
    // see @resource: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/which
    event.preventDefault();
    event.stopPropagation();

    const currentlyOpenToggleId = this.openToggle;
    const openToggle = this.getDropdownElement(currentlyOpenToggleId);
    const currentBreakpoint = this.breakpoint;

    switch (currentBreakpoint) {
      case "mobile":
        // close mobile menu
        this._changeNavigationState("mobile__button", "close");
        // Set the focus back onto the mobile menu trigger toggle only when escape is pressed
        this._mobileToggle.focus();
        break;

      case "tablet":
        // if it's a child of main menu (e.g. currentlyOpenToggleId.startsWith("main-menu") -- accordion dropdown) close mobile__button
        // Else close currentlyOpenToggleId -- desktop menu
        if (stringStartsWith(currentlyOpenToggleId, "main-menu")) {
          this._changeNavigationState("mobile__button", "close");
          // Set the focus back onto the mobile menu trigger toggle only when escape is pressed
          this._mobileToggle.focus();
        } else {
          this._changeNavigationState(currentlyOpenToggleId, "close");
          // Set the focus back onto the trigger toggle only when escape is pressed
          openToggle.focus();
        }
        break;

      case "desktop":
        this._changeNavigationState(currentlyOpenToggleId, "close");
        // Set the focus back onto the trigger toggle only when escape is pressed
        openToggle.focus();
        break;
    }
  }

  /**
   * Back to Menu Event Handler
   * close All Red Hat Menu and go back to Main Mobile Menu and set focus back to All Red Hat Toggle
   * Show main menu
   */
  _siteSwitcherBackClickHandler() {
    this._changeNavigationState("mobile__button", "open");
    // Show main menu when All Red Hat menu is closed
    this._showMobileMainMenu();
    if (this._siteSwitcherToggle) {
      this._siteSwitcherToggle.focus();
    }
  }

  /**
   * Overlay Event Handler
   * close menu when overlay is clicked
   */
  _overlayClickHandler() {
    if (this.openToggle) {
      this._changeNavigationState(this.openToggle, "close");
    }
    // @todo Check a11y expectations
    switch (this.breakpoint) {
      case "mobile":
        this._changeNavigationState("mobile__button", "close");
        break;
      case "tablet":
        // if it's a child of main menu (e.g. openToggleId.startsWith("main-menu") -- accordion dropdown) close mobile__button
        // Else close openToggleId -- desktop menu
        if (this.openToggle && stringStartsWith(this.openToggle, "main-menu")) {
          this._changeNavigationState("mobile__button", "close");
        }
        break;
    }
  }

  /**
   * Sticky Handler
   * turn nav into sticky nav
   */
  _stickyHandler() {
    const stuckClass = "pfe-navigation--stuck";
    if (window.pageYOffset >= this._top) {
      if (!this.classList.contains(stuckClass)) this.classList.add(stuckClass);
    } else {
      if (this.classList.contains(stuckClass))
        this.classList.remove(stuckClass);
    }
  }

  /**
   * Hide main menu from screen readers and keyboard when mobile All Red Hat menu is open
   */
  _hideMobileMainMenu() {
    // Search
    this._searchSpotXs.setAttribute("hidden", "");

    // Main menu
    if (this._menuDropdownMd) {
      this._menuDropdownMd.setAttribute("hidden", "");
    }
  }

  /**
   * Show main menu to screen readers and keyboard users when Back to main menu button is pressed
   */
  _showMobileMainMenu() {
    // Search
    this._searchSpotXs.removeAttribute("hidden");

    // Main menu
    if (this._menuDropdownMd) {
      this._menuDropdownMd.removeAttribute("hidden");
    }
  }

  /**
   * Set focus to search field when search button is pressed on Desktop
   * if search input exists set to the light dom search input field (either type=text or type=search) so focus is in the correct place for screen readers and keyboards
   */
  _searchFieldFocusHandler() {
    const searchBox = this.querySelector(
      "[slot='search']  input[type='text'], [slot='search']  input[type='search']"
    );

    // Accomodate cp-search-autocomplete or similar, which doesn't have a lightDom input
    if (!searchBox) {
      const $pfComponent = this.querySelector('[slot="search"] .PFElement');
      if ($pfComponent && $pfComponent.shadowRoot) {
        const $shadowRootInput = $pfComponent.shadowRoot.querySelector("input");        if ($shadowRootInput) {
          $shadowRootInput.focus();
        }
      }
    }

    if (searchBox) {
      searchBox.focus();
    }
  }

  /**
   * Utility function to create log in link
   * @param {string} logInUrl URL for login
   * @return {object} DOM Object for link
   */
  _createLogInLink(logInUrl) {
    if (this._accountLogInLink === null) {
      const logInLink = document.createElement("a");
      logInLink.setAttribute("href", logInUrl);
      logInLink.innerText = this.getTranslatedText('login');
      logInLink.classList.add("pfe-navigation__log-in-link");
      logInLink.prepend(this._createPfeIcon("web-icon-user"));
      logInLink.dataset.analyticsLevel = 1;
      logInLink.dataset.analyticsText = "Log In";
      logInLink.dataset.analyticsCategory = "Log In";
      logInLink.id = "pfe-navigation__log-in-link";

      // Adding event listener so analytics knows when the login link is clicked
      logInLink.addEventListener("click", () => {
        this.emitEvent(PfeNavigation.events.shadowDomInteraction, {
          detail: {
            target: logInLink,
            parent: this,
          },
        });
      });

      this._accountLogInLink = logInLink;
      return logInLink;
    }
  }

  /**
   * Creates Avatar Markup
   * @param {string} name User's Name
   * @param {string} src Optional, Path to avatar image
   */
  _createPfeAvatar(name, src) {
    const pfeAvatar = document.createElement(`pfe-avatar`);
    pfeAvatar.setAttribute("name", name);
    pfeAvatar.setAttribute("shape", "circle");
    pfeAvatar.setAttribute('aria-hidden', 'true');

    if (typeof src === "string") {
      pfeAvatar.setAttribute("src", src);
    }

    return pfeAvatar;
  }

  /**
   * Create Account menu button
   * @param {string} fullName Full name of the user
   * @param {string} avatarSrc URL for an avatar image
   * @return {object} Reference to toggle
   */
  _createAccountToggle(fullName, avatarSrc) {
    if (this._accountToggle === null) {
      const accountToggle = document.createElement("button");
      accountToggle.classList.add("pfe-navigation__account-toggle");
      accountToggle.id = "pfe-navigation__account-toggle";
      // @todo translate
      accountToggle.setAttribute("aria-label", this.getTranslatedText('openAccountMenu'));

      accountToggle.dataset.analyticsLevel = 1;
      accountToggle.dataset.analyticsText = "Account";
      accountToggle.dataset.analyticsCategory = "Account";

      const pfeAvatar = this._createPfeAvatar(fullName, avatarSrc);
      accountToggle.appendChild(pfeAvatar);
      this._accountToggle = accountToggle;

      return accountToggle;
    }
  }

  _accountToggleClick() {
    this._changeNavigationState(this._accountToggle.id);
  }

  /**
   * Handle DOM updates on the account dropdown
   * @param {object} mutationItem Part of a mutationObserver event object for the change
   */
  _processAccountDropdownChange(mutationItem) {
    // If the account component doesn't exist yet we can't do anything
    if (!this._accountComponent) {
      // If we don't have accountComponent set yet and we can confirm this is it, set the var.
      if (
        mutationItem.target.getAttribute("slot") === "account" &&
        mutationItem.target.parentElement.tagName === "PFE-NAVIGATION"
      ) {
        this._accountComponent = mutationItem.target;
      }
      // If we can't find the accountComponent and it isn't set, we can't do anything else.
      else {
        return;
      }
    }
    if (this._accountLogInLink === null) {
      // Create login link
      const logInLink = this._accountComponent.getAttribute("login-link");
      if (logInLink) {
        this._accountOuterWrapper.prepend(this._createLogInLink(logInLink));
      }
    } else if (
      mutationItem &&
      mutationItem.type === "attributes" &&
      mutationItem.attributeName === "login-link"
    ) {
      // Deal with login link changes
      this.shadowRoot
        .getElementById("pfe-navigation__log-in-link")
        .setAttribute(
          "href",
          this._accountComponent.getAttribute("login-link")
        );
    }

    if (this._accountToggle === null) {
      // Create account toggle
      const fullName = this._accountComponent.getAttribute("full-name");
      if (fullName) {
        this._accountOuterWrapper.prepend(
          this._createAccountToggle(
            fullName,
            this._accountComponent.getAttribute("avatar-url")
          )
        );
        this._accountOuterWrapper.classList.add(
          "pfe-navigation__account-wrapper--logged-in"
        );
        this._accountToggle.setAttribute(
          "aria-controls",
          this._accountDropdownWrapper.id
        );
        this._addCloseDropdownAttributes(
          this._accountToggle,
          this._accountDropdownWrapper
        );

        this._accountToggle.addEventListener("click", this._accountToggleClick);

        // Recalculate secondary links breakpoint
        this._menuBreakpoints.secondaryLinks = null;
      }
    } else {
      // Deal with account toggle changes
      if (mutationItem.type === "attributes") {
        if (mutationItem.attributeName === "avatar-url") {
          this._accountToggle
            .querySelector("pfe-avatar")
            .setAttribute(
              "src",
              this._accountComponent.getAttribute("avatar-url")
            );
        }
        if (mutationItem.attributeName === "full-name") {
          this._accountToggle
            .querySelector("pfe-avatar")
            .setAttribute(
              "full-name",
              this._accountComponent.getAttribute("full-name")
            );
        }
      }
    }

    // Unset the secondaryLinks bound because it will update with an account toggle
    // Then recalculate the JS breakpoints
    this._menuBounds.secondaryLinksLeft = null;
    window.setTimeout(this._calculateMenuBreakpoints, 0);
  }

  /**
   * Handle the slot change event
   */
  _processAccountSlotChange() {
    const slottedElements = this.getSlot("account");
    let customAccountDropdown;
    if (slottedElements) {
      // Check for an account component
      for (let index = 0; index < slottedElements.length; index++) {
        if (
          slottedElements[index].tagName.toUpperCase() ===
            "PFE-NAVIGATION-ACCOUNT" ||
          slottedElements[index].tagName.toUpperCase() === "RH-ACCOUNT-DROPDOWN"
        ) {
          // We have one, make sure it's in the right location in the Shadow DOM
          if (
            this._accountSlot.parentElement.id !==
            this._accountDropdownWrapper.id
          ) {
            this._accountDropdownWrapper.appendChild(this._accountSlot);
          }
          this._accountComponent = slottedElements[index];
          this._processAccountDropdownChange();
          this._accountOuterWrapper.hidden = false;
        }
        if (
          slottedElements[index].tagName.toUpperCase() ===
          "PFE-NAVIGATION-DROPDOWN"
        ) {
          customAccountDropdown = slottedElements[index];
        }
      }
      // If we don't have an account dropdown, move the slot so it can behave as a top level link
      if (!this._accountComponent) {
        this._accountOuterWrapper.hidden = true;
        if (
          this._accountSlot.parentElement.id !== this._shadowDomOuterWrapper.id
        ) {
          this._shadowDomOuterWrapper.appendChild(this._accountSlot);
        }
      }

      // Add dropdown functionlity to pfe-navigation-dropdown
      if (customAccountDropdown) {
        this._processCustomDropdowns([customAccountDropdown]);
      }
    }
    // If we don't have slotted elements we can hide the dropdown wrapper
    else {
      this._accountOuterWrapper.hidden = true;
    }
  }

  /**
   * Gets the last focusable element in a mobile-slider so we can trap focus
   * @param {object} mobileSwipeParent DOM Element that is slotted and has the mobile-slider attribute
   * @return {object} DOM Reference to last focusable element
   */
  _getLastFocusableItemInMobileSlider(mobileSwipeParent) {
    const dropdown = mobileSwipeParent.querySelector(
      ".pfe-navigation__dropdown"
    );
    let focusableChildren = null;
    if (dropdown) {
      focusableChildren = dropdown.querySelectorAll(this._focusableElements);
    }
    if (focusableChildren.length) {
      const toggle = mobileSwipeParent.querySelector(
        ".pfe-navigation__secondary-link"
      );
      const firstFocusableElement = focusableChildren[0];
      const lastFocusableElement =
        focusableChildren[focusableChildren.length - 1];

      // Initialize arrays for first and last elements and events if they don't exist
      if (!this._mobileSliderFocusTrapElements[toggle.id]) {
        this._mobileSliderFocusTrapElements[toggle.id] = [];
      }
      if (!this._mobileSliderFocusTrapEvents[toggle.id]) {
        this._mobileSliderFocusTrapEvents[toggle.id] = [];
      }

      // If there was any change in the first or last element, redo everything
      if (
        !this._mobileSliderFocusTrapElements[toggle.id] ||
        this._mobileSliderFocusTrapElements[toggle.id]["last"] !==
          lastFocusableElement ||
        !this._mobileSliderFocusTrapElements[toggle.id] ||
        this._mobileSliderFocusTrapElements[toggle.id]["first"] !==
          firstFocusableElement
      ) {
        // Preventing issues in IE11 & Edge
        if (
          _isCrustyBrowser() &&
          this._mobileSliderMutationObservers[toggle.id]
        ) {
          this._mobileSliderMutationObservers[toggle.id].disconnect();
        }

        // Cleanup any previous last focusable elements
        const previousLastFocusableElement = this
          ._mobileSliderFocusTrapElements[toggle.id]
          ? this._mobileSliderFocusTrapElements[toggle.id]["last"]
          : null;
        if (previousLastFocusableElement) {
          previousLastFocusableElement.removeEventListener(
            "keydown",
            this._mobileSliderFocusTrapEvents[toggle.id]["last"]
          );
        }

        // Setup new last focusable element
        this._mobileSliderFocusTrapElements[toggle.id]["last"] =
          lastFocusableElement;
        this._mobileSliderFocusTrapEvents[toggle.id]["last"] = (event) => {
          if (event.key === "Tab") {
            if (this.breakpoint === "mobile") {
              if (!event.shiftKey) {
                event.preventDefault();
                firstFocusableElement.focus();
              }
            }
          }
        };
        lastFocusableElement.addEventListener(
          "keydown",
          this._mobileSliderFocusTrapEvents[toggle.id]["last"]
        );

        // Handle first focusable element
        // Cleanup any previous first focusable elements
        const previousFirstFocusableElement = this
          ._mobileSliderFocusTrapElements[toggle.id]
          ? this._mobileSliderFocusTrapElements[toggle.id]["first"]
          : null;
        if (previousFirstFocusableElement) {
          previousFirstFocusableElement.removeEventListener(
            "keydown",
            this._mobileSliderFocusTrapEvents[toggle.id]["first"]
          );
        }

        // Setup new first focusable element
        this._mobileSliderFocusTrapElements[toggle.id]["first"] =
          firstFocusableElement;
        this._mobileSliderFocusTrapEvents[toggle.id]["first"] = (event) => {
          if (event.key === "Tab") {
            if (this.breakpoint === "mobile") {
              if (event.shiftKey) {
                event.preventDefault();
                lastFocusableElement.focus();
              }
            }
          }
        };
        firstFocusableElement.addEventListener(
          "keydown",
          this._mobileSliderFocusTrapEvents[toggle.id]["first"]
        );

        // Reconnecting mutationObserver for IE11 & Edge
        if (
          _isCrustyBrowser() &&
          this._mobileSliderMutationObservers[toggle.id]
        ) {
          this._mobileSliderMutationObservers[toggle.id].observe(dropdown, {
            subtree: true,
            childList: true,
          });
        }
      }
    } else {
      this.log(
        "Couldn't find any focusable children in a mobile-slide element",
        mobileSwipeParent
      );
    }
  }
}

PFElement.create(PfeNavigation);

class PfeNavigationDropdown extends PFElement {
  static get version() {
    return "1.0.127";
  }

  get html() {
    return `<style>.element-invisible,.sr-only,.visually-hidden{position:absolute;width:1px;height:1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}:host{display:block}:host([hidden]){display:none}:host(.pfe-navigation__dropdown--default-styles) #dropdown-container{display:block;width:calc(100% + 32px);max-width:1136px;max-width:1136px;max-width:var(--pfe-navigation--content-max-width,1136px);margin-left:-16px;margin-right:-16px;padding-top:12px;padding-bottom:12px;-moz-column-count:auto;column-count:auto;gap:0;grid-column:1/-1;width:100%;margin:0;padding:0}@media (min-width:768px){:host(.pfe-navigation__dropdown--default-styles) #dropdown-container{display:block;-moz-column-count:3;column-count:3;gap:32px;gap:32px;gap:var(--pfe-navigation--gutter,32px);padding-top:12px;padding-bottom:12px;margin:0;padding:0}}@media (min-width:1200px){:host(.pfe-navigation__dropdown--default-styles) #dropdown-container{display:flex;flex-wrap:wrap;-moz-column-count:auto;column-count:auto;padding-top:32px;padding-bottom:32px;margin:0;padding:0}@supports (display:grid){:host(.pfe-navigation__dropdown--default-styles) #dropdown-container{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:32px;gap:32px;gap:var(--pfe-navigation--gutter,32px);grid-auto-flow:row}}}.pfe-navigation--collapse-main-menu :host(.pfe-navigation__dropdown--default-styles) #dropdown-container,:host(.pfe-navigation--collapse-main-menu) :host(.pfe-navigation__dropdown--default-styles) #dropdown-container{display:block;-moz-column-count:3;column-count:3;gap:32px;gap:32px;gap:var(--pfe-navigation--gutter,32px);padding-top:12px;padding-bottom:12px;margin:0;padding:0}.pfe-navigation--collapse-secondary-links :host(.pfe-navigation__dropdown--default-styles) #dropdown-container,:host(.pfe-navigation--collapse-secondary-links) :host(.pfe-navigation__dropdown--default-styles) #dropdown-container{display:block;width:calc(100% + 32px);max-width:1136px;max-width:1136px;max-width:var(--pfe-navigation--content-max-width,1136px);margin-left:-16px;margin-right:-16px;padding-top:12px;padding-bottom:12px;-moz-column-count:auto;column-count:auto;gap:0;margin:0;padding:0}
</style><div id="dropdown-container">
  <slot></slot>
</div>`;
  }

  static get properties() {
    return {"icon":{"title":"Icon","type":"string","enum":[],"default":"","prefixed":true},"name":{"title":"Name","type":"string","enum":[],"default":"","prefixed":true},"alerts":{"title":"Alerts","type":"string","enum":[],"default":"","prefixed":true},"state":{"title":"State","type":"string","enum":[],"default":"","prefixed":true},"height":{"title":"Height","type":"string","enum":[],"default":"","prefixed":true}};
  }

  static get slots() {
    return {"default":{"title":"Default slot","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"raw"}]}}};
  }
  static get tag() {
    return "pfe-navigation-dropdown";
  }

  get schemaUrl() {
    return "pfe-navigation-dropdown.json";
  }

  get templateUrl() {
    return "pfe-navigation-dropdown.html";
  }

  get styleUrl() {
    return "pfe-navigation-dropdown.css";
  }

  static get events() {
    return {};
  }

  static get properties() {
    return {
      name: {
        title: "Button text/Dropdown name",
        type: String,
      },
      icon: {
        title: "What icon to use, must be available in pfe-icon",
        type: String,
      },
      dropdownWidth: {
        type: String,
        title:
          "Width of the dropdown, 'single' or 'full' for single column, or full screen width",
        default: "full",
        values: ["single", "full"],
      },
      alerts: {
        type: String,
        title: "Adds bubble next to icon with the value of the attribute",
      },
    };
  }

  static get slots() {
    return {};
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeNavigationDropdown, { type: PfeNavigationDropdown.PfeType });

    // Make sure 'this' is set to the component in our methods
    this._processDom = this._processDom.bind(this);

    // Setting up vars
    this.processDomObserverConfig = {
      subtree: true,
      childList: true,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // Process DOM on connect
    this._processDom();
    // Observe in case there are updates
    this._processDomMutationObserver = new MutationObserver(this._processDom);
    this._processDomMutationObserver.observe(
      this,
      this.processDomObserverConfig
    );
  }

  /*
   * @note v1.x markup:
   * 1.x secondary links with special slots should appear in dropdown
   * Have to run this in a mutation observer in case we're in an Angular context
   * @see https://medium.com/patternfly-elements/more-resilientweb-components-in-angular-or-anywhere-else-with-mutationobserver-72a91cd7cf22
   */
  _processDom() {
    // Preventing issues in IE11 & Edge
    if (_isCrustyBrowser() && this._processDomMutationObserver) {
      this._processDomMutationObserver.disconnect();
    }

    // Iterate over children and create new slots based on old nav slots
    for (let index = 0; index < this.children.length; index++) {
      const child = this.children[index];
      const childSlot = child.getAttribute("slot");

      if (
        childSlot &&
        !this.shadowRoot.querySelector(`[slot="${childSlot}"]`)
      ) {
        const newSlot = document.createElement("slot");
        newSlot.setAttribute("name", childSlot);
        this.shadowRoot
          .getElementById("dropdown-container")
          .appendChild(newSlot);
      }

      // Hide the trigger, since we don't use it in this version of nav
      const trigger = this.querySelector('[slot="trigger"]');
      if (trigger) {
        trigger.hidden = true;
      }

      // Unhide tray which is generally the default
      const tray = this.querySelector('[slot="tray"]');
      if (tray) {
        tray.hidden = false;
      }

      // Reconnecting mutationObserver for IE11 & Edge
      if (_isCrustyBrowser() && this._processDomMutationObserver) {
        this._processDomMutationObserver.observe(this, lightDomObserverConfig);
      }
    }
  }
}

PFElement.create(PfeNavigationDropdown);

export default PfeNavigation;

