import PFElement from '../../../@patternfly/pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: RhTable 0.0.19
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

// @todo See if there are more a11y features we should take from: https://dequeuniversity.com/library/aria/table-sortable
// @todo See if <dialog> tag could be useful for the maximized table
// @todo Bug where fullscreen button doesn't show up sometimes in smaller reflow (hard to replicate)
// @todo Pagination?
// @todo Search?
// @todo move to pfe-tools/pfe 2.0
// @todo after pfe 2.0 write tests
//    - Test to make sure full screen button shows up when table scrolls
//    - Tests for sorting results

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

class RhTable extends PFElement {
  static get version() {
    return "0.0.19";
  }

  get html() {
    return `<style>*{-webkit-box-sizing:border-box;box-sizing:border-box}:host{position:relative;display:block;width:auto;width:var(--rh-table--wrappers--width,auto)}:host([hidden]){display:none}:host(.rh-table--expanded-vertically){--rh-table--maxHeight:max-content}#wrapper{overflow:auto;width:auto;width:var(--rh-table--wrappers--width,auto);max-width:100%;max-height:-webkit-max-content;max-height:-moz-max-content;max-height:max-content;max-height:var(--rh-table--maxHeight,-webkit-max-content);max-height:var(--rh-table--maxHeight,-moz-max-content);max-height:var(--rh-table--maxHeight,max-content);scrollbar-color:#8e8e8e #d6d6d6}#wrapper::-webkit-scrollbar{width:.625rem;height:.625rem}#wrapper::-webkit-scrollbar,#wrapper::-webkit-scrollbar-track{background-color:#d6d6d6}#wrapper::-webkit-scrollbar-thumb{background-color:#8e8e8e}#wrapper.table-full-screen{position:fixed;top:40px;right:0;bottom:40px;left:0;z-index:1;overflow:scroll;margin:0;width:100%;max-height:90vh;padding:40px;background-color:#fff}@media (min-width:1400px){#wrapper.table-full-screen{padding:40px 160px}}#wrapper.table-full-screen .full-screen{right:40px}.overlay{position:fixed;top:0;left:0;z-index:-1;display:block;width:100%;height:100%;background:rgba(21,21,21,.5);background:var(--pfe-table--overlay--Background,rgba(21,21,21,.5))}.overlay[hidden]{display:none}.visually-hidden{position:absolute;overflow:hidden;clip:rect(0,0,0,0);width:1px;height:1px;padding:0;border:0;white-space:nowrap}button{border:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#f0efef;cursor:pointer}button:focus{outline:2px dashed #000;outline:var(--rh-table--button--outline--focus,2px dashed #000)}.rh-table__expand-vertical-button,.rh-table__full-screen-button{position:absolute;right:calc(0px + 8px);right:calc(var(--rh-table--scrollbar--width,0px) + 8px);z-index:1;width:1.75rem;height:1.75rem;padding:6px;color:#8a8a8a;background:#f0efef}:host(.full-screen) .rh-table__expand-vertical-button,:host(.full-screen) .rh-table__full-screen-button{display:none}.rh-table__expand-vertical-button svg,.rh-table__full-screen-button svg{width:1rem;height:1rem}.rh-table__expand-vertical-button:focus,.rh-table__expand-vertical-button:hover,.rh-table__full-screen-button:focus,.rh-table__full-screen-button:hover{color:#06c}.rh-table__expand-vertical-button{top:calc(1.75rem + 8px)}:host(.rh-table--expanded-vertically) .rh-table__expand-vertical-button{background:#2b9af3;color:#fff}.rh-table__expand-vertical-button path,.rh-table__expand-vertical-button svg{fill:currentColor}.rh-table__close-full-screen-button{position:fixed;top:80px;right:40px;z-index:10;display:none;width:2rem;height:2rem;padding:0;background:#f0efef}:host(.full-screen) .rh-table__close-full-screen-button{display:block}.rh-table__close-full-screen-button svg{width:2rem;height:2rem}
/*# sourceMappingURL=rh-table.min.css.map */
</style><div id="wrapper">
  <button class="rh-table__sort-button" hidden title="Sort in descending order">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path
        class="arrow--up"
        d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224z"
      />
      <path
        class="arrow--down"
        d="M311.9 335.1l-132.4 136.8C174.1 477.3 167.1 480 160 480c-7.055 0-14.12-2.702-19.47-8.109l-132.4-136.8C-9.229 317.8 3.055 288 27.66 288h264.7C316.9 288 329.2 317.8 311.9 335.1z"
      />
    </svg>
  </button>
  <button class="rh-table__full-screen-button full-screen" hidden title="Maximize the table">
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="expand-arrows-alt"
      class="svg-inline--fa fa-expand-arrows-alt fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M448 344v112a23.94 23.94 0 0 1-24 24H312c-21.39 0-32.09-25.9-17-41l36.2-36.2L224 295.6 116.77 402.9 153 439c15.09 15.1 4.39 41-17 41H24a23.94 23.94 0 0 1-24-24V344c0-21.4 25.89-32.1 41-17l36.19 36.2L184.46 256 77.18 148.7 41 185c-15.1 15.1-41 4.4-41-17V56a23.94 23.94 0 0 1 24-24h112c21.39 0 32.09 25.9 17 41l-36.2 36.2L224 216.4l107.23-107.3L295 73c-15.09-15.1-4.39-41 17-41h112a23.94 23.94 0 0 1 24 24v112c0 21.4-25.89 32.1-41 17l-36.19-36.2L263.54 256l107.28 107.3L407 327.1c15.1-15.2 41-4.5 41 16.9z"
      ></path>
    </svg>
  </button>
  <button class="rh-table__expand-vertical-button" hidden title="Expand to full height">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512">
      <path d="M182.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 109.3V402.7L86.6 361.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7V109.3l41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96z"/>
    </svg>
  </button>
  <slot></slot>
</div>
<button class="rh-table__close-full-screen-button full-screen--close" title="Restore table to original size">
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
    <path fill="#F0EFEF" d="M0 0h28v28H0z" />
    <g clip-path="url(#a)">
      <path
        d="M12.25 15h-3.5a.75.75 0 0 0-.531 1.281l1.028.969-3.1 3.103a.502.502 0 0 0 0 .706l.794.794a.502.502 0 0 0 .706 0l3.103-3.103.972 1.031A.749.749 0 0 0 13 19.25v-3.5a.748.748 0 0 0-.75-.75Zm3.5-2h3.5a.751.751 0 0 0 .531-1.281l-1.031-.969 3.103-3.103a.502.502 0 0 0 0-.706l-.794-.794a.502.502 0 0 0-.706 0L17.25 9.25l-.972-1.031A.749.749 0 0 0 15 8.75v3.5c0 .416.334.75.75.75Zm3 4.25 1.031-.972A.749.749 0 0 0 19.25 15h-3.5a.748.748 0 0 0-.75.75v3.5a.751.751 0 0 0 1.281.531l.969-1.028 3.103 3.103a.502.502 0 0 0 .706 0l.794-.794a.502.502 0 0 0 0-.706L18.75 17.25Zm-7.031-9.028-.97 1.028-3.102-3.103a.502.502 0 0 0-.706 0l-.794.794a.502.502 0 0 0 0 .706L9.25 10.75l-1.031.972A.749.749 0 0 0 8.749 13h3.5c.416 0 .75-.334.75-.75v-3.5c0-.666-.809-1-1.28-.528Z"
        fill="#9B9B9B"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(6 6)" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
</button>
<div class="overlay" hidden></div>`;
  }

  static get properties() {
    return {"compact-mode":{"title":"Compact-mode","type":"string","enum":[],"default":"","prefixed":true},"sortable-cols":{"title":"Sortable-cols","type":"string","enum":[],"default":"","prefixed":true}};
  }

  static get slots() {
    return {"default":{"title":"Default slot","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"raw"}]}}};
  }
  static get tag() {
    return "rh-table";
  }

  static get properties() {
    return {};
  }

  static get slots() {
    return {};
  }

  get schemaUrl() {
    return "rh-table.json";
  }

  get templateUrl() {
    return "rh-table.html";
  }

  get styleUrl() {
    return "rh-table.scss";
  }

  static get events() {
    return {
      sorted: `${this.tag}:sorted`,
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get observedAttributes() {
    return ["compact-mode", "sortable-cols"];
  }

  constructor() {
    super(RhTable, { type: RhTable.PfeType });
    // NO DOM ACCESS

    this.table = null;
    this._shadowWrapper = this.shadowRoot.getElementById("wrapper");
    this.canFullScreen = true;
    this.isFullscreen = false;
    this._fullScreenButton =
      this.shadowRoot.querySelector(".rh-table__full-screen-button");
    this._expandButton = this.shadowRoot.querySelector('.rh-table__expand-vertical-button');
    this._fullScreenCloseButton = this.shadowRoot.querySelector(".rh-table__close-full-screen-button");
    this._overlay = this.shadowRoot.querySelector(".overlay");
    this._expandUnpressed = true;
    this.hovered = {
      hoveredCoordinates: null,
      styleElement: null,
      styleSheet: null,
      checkInterval: null,
    };

    this.docLang;
    this._sortHeadings = null;
    this.tableSortValues = { heading: [], values: [] };
    this.tableCellValues = {};
    this.sortable = null;
    this.lastSortCol = null;
    this.resizeDebounce = 250;
    this.sortOrder = "az";

    // Used to trap focus in maximized table
    this._focusableElements =
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    // Used to track
    this._previousFirstFocusableElement = null;
    this._focusTrapCallbacks = {
      first: null,
      last: null,
    };

    this.translations = {
      maximizeTable: {
        en: "Maximize the table",
        ko: "테이블 크기 최대화",
        jp: "表の最大化表示",
        zh: "最大化表",
        zh_cn: "最大化表",
        fr: "Agrandir Table",
        it: "Visualizza la tabella a schermo pieno",
        es: "Maximizar la tabla",
        de: "Tabelle vergrößern",
        pt: "Maximizar a tabela",
      },
      closeFullscreen: {
        en: "Restore table to original size",
        ko: "전체 화면 표시 닫기",
        jp: "表の全画面表示の終了",
        zh: "关闭全屏显示表",
        zh_cn: "关闭全屏显示表",
        fr: "Fermer Table Plein écran",
        it: "Esci dalla modalità a schermo pieno",
        es: "Minimizar la tabla",
        de: "Vollbildtabelle schließen",
        pt: "Fechar a tabela em tela cheia",
      },
      sortAscending: {
        en: "Sort by ascending order",
        ko: "Sort by ascending order",
        jp: "Sort by ascending order",
        zh: "Sort by ascending order",
        zh_cn: "Sort by ascending order",
        fr: "Sort by ascending order",
        it: "Sort by ascending order",
        es: "Sort by ascending order",
        de: "Sort by ascending order",
        pt: "Sort by ascending order",
      },
      sortDescending: {
        en: "Sort by descending order",
        ko: "Sort by descending order",
        jp: "Sort by descending order",
        zh: "Sort by descending order",
        zh_cn: "Sort by descending order",
        fr: "Sort by descending order",
        it: "Sort by descending order",
        es: "Sort by descending order",
        de: "Sort by descending order",
        pt: "Sort by descending order",
      },
    };

    // Ensure 'this' is tied to the component object in these member functions
    const functionsToBind = [
      "_processLightDom",
      "_rowAndColumnHighlight",
      "_popstateListener",
      "_toggleFullScreen",
      "_sortData",
      "_getCSSStyleSheetById",
      "_checkForScroll",
      "_handleEscPress",
      "_getTranslatedString",
      "setupFocusTrap",
      "removeFocusTrap",
      "_trapFocusInMaximizedTable",
    ];

    for (let index = 0; index < functionsToBind.length; index++) {
      const functionName = functionsToBind[index];
      if (this[functionName]) {
        this[functionName] = this[functionName].bind(this);
      } else {
        this.error("Tried to bind a function that doesn't exist", functionName);
      }
    }

    this._resizeListener = debounce(this._checkForScroll, this.resizeDebounce);
    this._overlay.addEventListener("click", () =>
      this._toggleFullScreen(false)
    );
    this._fullScreenCloseButton.addEventListener("click", () =>
      this._toggleFullScreen(false)
    );
  }

  connectedCallback() {
    super.connectedCallback();
    // BEGIN DOM ACCESS

    this._sortButtonBoilerplate = this.shadowRoot.querySelector(
      ".rh-table__sort-button"
    );

    // Make sure pointers are set
    this.table = this.table ? this.table : this.querySelector("table");
    this._sortHeadings = this.table.querySelectorAll(".sort-button");

    // check to see if the table has a top heading
    this.topHeading = this.getAttribute("top-heading");

    // check to see if the table is sortable
    this.sortable = this.getAttribute("sortable");

    // check to see if the full screen button is disabled
    this.canFullScreen = this.stringToBool(this.getAttribute("full-screen"));

    // Make an unique id for use on table id, style tag id, etc.
    const newId = Math.random().toString(36).substring(2, 9);
    this.dataset.id = newId;
    // If we don't have an ID on the table, set one
    if (!this.id) {
      this.id = `rh-table--${newId}`;
    }

    if (this.canFullScreen) {
      window.addEventListener("resize", this._resizeListener);
      this._fullScreenButton.addEventListener("click", () =>
        this._toggleFullScreen(true)
      );
      this._expandButton.addEventListener('click', () => {
        this._expandUnpressed = false;
        if (this.classList.contains('rh-table--expanded-vertically')) {
          this.classList.remove('rh-table--expanded-vertically');
        }
        else {
          this.classList.add('rh-table--expanded-vertically');
        }
        this._checkForScroll();
      });
    }

    // Get the docLang if it wasn't set and the doc has one
    if (
      !this.docLang &&
      document &&
      document.documentElement &&
      document.documentElement.lang
    ) {
      this.docLang = document.documentElement.lang.toLowerCase();
    }

    // Add correct translation for expand text
    const maximizeTableString = this._getTranslatedString("maximizeTable");
    if (this._fullScreenButton && maximizeTableString) {
      this._fullScreenButton.setAttribute("title", maximizeTableString);
    } else {
      this.warn(
        "Was unable to translate assistive text on maximize table button"
      );
    }

    // Add correct translation for collapse text
    const closeFullscreenString = this._getTranslatedString("closeFullscreen");
    if (closeFullscreenString && this._fullScreenCloseButton) {
      this._fullScreenCloseButton.setAttribute("title", closeFullscreenString);
    } else {
      this.warn(
        "Was unable to translate assistive text on collapse table button"
      );
    }

    // fullScreenButton.value = `rh-table--${newId}`;

    this._processLightDom();

    // this.addEventListener(RhTable.events.sorted, this._sortedHandler);
  }

  disconnectedCallback() {
    // this.removeEventListener(RhTable.events.sorted, this._sortedHandler);
    this.table.removeEventListener("mouseover", this._rowAndColumnHighlight);
    window.removeEventListener("resize", this._resizeListener);
    this._overlay.removeEventListener("click", () =>
      this._toggleFullScreen(false)
    );
    this._fullScreenCloseButton.removeEventListener("click", () =>
      this._toggleFullScreen(false)
    );
  }

  stringToBool(string) {
    if (string === "false" || string === "f") {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Get trnaslated string
   * @param {string} stringName The index value for the string in this.translations
   * @returns Translated string
   */
  _getTranslatedString(stringName) {
    if (
      this.translations[stringName] &&
      this.translations[stringName][this.docLang]
    ) {
      return this.translations[stringName][this.docLang];
    } else if (
      this.translations[stringName] &&
      this.translations[stringName]["en"]
    ) {
      this.warn(`Could not get translated string for ${stringName}`);
      return this.translations[stringName]["en"];
    }
    this.warn(
      `Could not get translated string for ${stringName}, or english version, docLang is set to ${this.docLang}`
    );
  }

  // Process the attribute change
  // attributeChangedCallback(attr, oldValue, newValue) {
  //   super.attributeChangedCallback(attr, oldValue, newValue);
  // }

  _trapFocusInMaximizedTable() {
    if (this.isFullscreen) ;
  }

  /**
   * Keeps a keyboard user from getting outside of the maximzed table overlay
   */
  setupFocusTrap() {
    const queryFirstFocusableElement = this.querySelector(
      this._focusableElements
    );
    const lastFocusableElement = this._fullScreenCloseButton;
    const firstFocusableElement = queryFirstFocusableElement
      ? queryFirstFocusableElement
      : this._fullScreenCloseButton;

    // Set var so we can remove the listener later
    this._previousFirstFocusableElement = firstFocusableElement;
    // There is only one focusable element in the maximized table
    if (firstFocusableElement === lastFocusableElement) {
      this._focusTrapCallbacks.first = (event) => {
        if (this.isFullscreen && event.key === "Tab") {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      };
      firstFocusableElement.addEventListener(
        "keydown",
        this._focusTrapCallbacks.first
      );

      this._focusTrapCallbacks.last = null;
    } else {
      // Setup first focusable element
      this._focusTrapCallbacks.first = (event) => {
        if (this.isFullscreen && event.key === "Tab" && event.shiftKey) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      };
      firstFocusableElement.addEventListener(
        "keydown",
        this._focusTrapCallbacks.first
      );

      // Setup last focusable element
      this._focusTrapCallbacks.last = (event) => {
        if (this.isFullscreen && event.key === "Tab" && !event.shiftKey) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      };
      lastFocusableElement.addEventListener(
        "keydown",
        this._focusTrapCallbacks.last
      );
    }
  }

  /**
   * Remove event listeners for focus trap
   */
  removeFocusTrap() {
    if (this._previousFirstFocusableElement && this._focusTrapCallbacks.first) {
      this._previousFirstFocusableElement.removeEventListener(
        "keydown",
        this._focusTrapCallbacks.first
      );
    }
    if (this._fullScreenCloseButton && this._focusTrapCallbacks.last) {
      this._fullScreenCloseButton.removeEventListener(
        "keydown",
        this._focusTrapCallbacks.last
      );
    }
  }

  /**
   * Catch when the URL has changed and close the full screen table if content isn't contained
   */
  _popstateListener() {
    // Figure out if the URL update has a hash
    if (location.hash) {
      // If it does and the referenced element isn't in this table, close full screen
      if (!this.querySelector(location.hash)) {
        this._toggleFullScreen(false);
      }
    }
  }

  /**
   * Open or close the full screen mode of the table
   * @param {boolean} setToFullscreen Desired state
   */
  _toggleFullScreen(setToFullscreen) {
    // Maximize table
    if (setToFullscreen) {
      // Make sure page layout doesn't change when table gets removed from document flow
      this.style.height = `${this.offsetHeight}px`;
      // @todo Retire non-BEM class
      this.classList.add("full-screen", "rh-table--full-screen");
      document.body.classList.add("rh-table--is-full-screen");
      this._shadowWrapper.classList.add("table-full-screen");
      this._overlay.hidden = false;
      window.addEventListener("keydown", this._handleEscPress, true);
      this.table.focus();
      this.isFullscreen = true;
      this.setupFocusTrap();
      // Listener that closes full screen if a link outside of the table is clicked
      window.addEventListener('popstate', this._popstateListener);
    }
    // Restore table to original size
    else {
      this.removeAttribute("style");
      // @todo Retire non-BEM class
      this.classList.remove("full-screen", "rh-table--full-screen");
      document.body.classList.remove("rh-table--is-full-screen");
      this._shadowWrapper.classList.remove("table-full-screen");
      this._overlay.hidden = true;
      window.removeEventListener("keydown", this._handleEscPress, true);
      this.removeFocusTrap();
      window.removeEventListener('popstate', this._popstateListener);
      this.isFullscreen = false;
    }
  }

  /**
   * Handle keyboard inputs
   * @param {object} event Event object from event listener
   */
  _handleEscPress(event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    switch (event.key) {
      case "Esc": // IE/Edge specific value
      case "Escape":
        // check to see if table is full screen
        if (this.isFullscreen) {
          // if it is, close it
          this._toggleFullScreen(false);
        }
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }

  /**
   * Sort the data based on column heading
   * @param {object} event Event object from event listener
   */
  _sortData(event) {
    const thisCell = event.target.closest("td, th");
    let row, col;
    if (thisCell) {
      row = thisCell.dataset.row - 1;
      col = thisCell.dataset.col - 1;
    } else {
      console.warn("Wasn't able to get column information to sort");
      return;
    }

    // check to see if this is re-sorting a row/col that has been sorted
    // already to swap the direction of the values if it has
    if (this.lastSortCol === col && this.sortOrder === "az") {
      this.sortOrder = "za";
    } else {
      this.sortOrder = "az";
    }
    thisCell.classList.add(`sort-${this.sortOrder}`);
    this.lastSortCol = col;

    function checkIfLetters(value) {
      const regex = RegExp("^d");
      return regex.test(value);
    }
    let sortedData;

    if (this.sortOrder === "az") {
      sortedData = this.tableSortValues.sort((a, b) => {
        let aParam = a[col].innerText;
        let bParam = b[col].innerText;
        const aIsLetters = checkIfLetters(aParam);
        const bIsLetters = checkIfLetters(bParam);
        if (typeof aParam === "string" && aIsLetters && bIsLetters) {
          aParam = aParam.toUpperCase(); // ignore upper and lowercase
          bParam = bParam.toUpperCase(); // ignore upper and lowercase
        }

        if (aParam < bParam) {
          return -1;
        }
        if (aParam > bParam) {
          return 1;
        }
        // names must be equal
        return 0;
      });
    } else if (this.sortOrder === "za") {
      sortedData = this.tableSortValues.sort(function (a, b) {
        let aParam = a[col].innerText;
        let bParam = b[col].innerText;

        const aIsLetters = checkIfLetters(aParam);
        const bIsLetters = checkIfLetters(bParam);
        if (typeof aParam === "string" && aIsLetters && bIsLetters) {
          aParam = aParam.toUpperCase(); // ignore upper and lowercase
          bParam = bParam.toUpperCase(); // ignore upper and lowercase
        }

        if (aParam < bParam) {
          return 1;
        }
        if (aParam > bParam) {
          return -1;
        }
        // names must be equal
        return 0;
      });
    }

    // wrapper for the rows
    const wrapper = document.createElement("tbody");

    for (let rowIndex = 0; rowIndex < sortedData.length; rowIndex++) {
      // make a new row to insert the cells
      const rowWrapper = document.createElement("tr");
      const originalRow = sortedData[rowIndex][0].initialRow;
      let rowData = Object.values(this.tableCellValues[originalRow]);
      rowWrapper.append(...rowData);
      wrapper.appendChild(rowWrapper);
    }

    // Update DOM state (classes, aria, etc)
    if (this.sortOrder) {
      const ariaSortedValue =
        this.sortOrder === "az" ? "descending" : "ascending";
      thisCell.setAttribute("aria-sort", ariaSortedValue);

      // Remove sorted-by on old headings
      const sortedByHeadings = this.table.querySelectorAll(
        ".rh-table__header--sorted-by"
      );
      for (let index = 0; index < sortedByHeadings.length; index++) {
        const sortedByHeading = sortedByHeadings[index];
        sortedByHeading.classList.remove(
          "rh-table__header--sorted-by",
          "rh-table__header--sorted-by--az",
          "rh-table__header--sorted-by--za"
        );
        sortedByHeading.removeAttribute("aria-sort");
      }

      // Add it to our new cell
      thisCell.classList.add("rh-table__header--sorted-by");
      const sortButton = thisCell.querySelector(".rh-table__sort-button");
      let sortText;
      switch (ariaSortedValue) {
        case "descending":
          sortText = this._getTranslatedString("sortAscending");
          if (sortButton && sortText)
            sortButton.setAttribute("title", sortText);
          thisCell.classList.add("rh-table__header--sorted-by--za");
          break;
        case "ascending":
          sortText = sortText = this._getTranslatedString("sortDescending");
          if (sortButton && sortText)
            sortButton.setAttribute("title", sortText);
          thisCell.classList.add("rh-table__header--sorted-by--az");
          break;
      }
    }

    const tbody = this.querySelector("tbody");
    tbody.parentElement.replaceChild(wrapper, tbody);
  }

  /**
   * Get the CSSSTyleSheet object by HTML Element's ID
   * @param {string} stylesheetId HTML id of stylesheet element inDOM
   * @returns {CSSStyleSheet} The CSSStyleSheet object associated with the HTML Element
   */
  _getCSSStyleSheetById(stylesheetId) {
    const styleElement = this.querySelector(`#${stylesheetId}`);
    if (styleElement && styleElement.sheet) {
      return styleElement.sheet;
    }
  }

  /**
   * Removes all style rules from provided stylesheet
   * @param {CSSSTyleSheet} stylesheet
   */
  _deleteAllRules(stylesheet) {
    // Get rid of old styles
    // Tried using a for loop, wasn't successful
    while (stylesheet.cssRules.length > 0) {
      stylesheet.deleteRule(0);
    }
  }

  /**
   * Function to highlight row, column, and currently hovered cell
   * Uses the CSSOM to add styles instead of doing a bunch of DOM Updates
   * @param {object} event Event object from event listener
   */
  _rowAndColumnHighlight(event) {
    // Get the nearest table cell
    let thisCell = event.target;
    if (thisCell.tagName !== "th" || thisCell.tagName !== "td") {
      thisCell = thisCell.closest("th, td");
    }
    if (!thisCell) return;

    // Get coordinates and add hover behavior
    const row = thisCell.dataset.row;
    const col = thisCell.dataset.col;
    if (event.target && row && col) {
      // If we're on the same cell as last time this was run we can avoid extra work
      if ([row, col] === this.hovered.hoveredCoordinates) {
        return;
      }

      this.hovered.hoveredCoordinates = [row, col];

      if (this.hovered.checkInterval) {
        clearInterval(this.hovered.checkInterval);
      }

      if (!this.hovered.styleElement) {
        this.hovered.styleElement = document.createElement("style");
        this.hovered.styleElement.id = `hoverStyles--${this.dataset.id}`;
        this.append(this.hovered.styleElement);
        this.hovered.styleSheet = this._getCSSStyleSheetById(
          this.hovered.styleElement.id
        );
      }

      // Remove all previous styles
      this._deleteAllRules(this.hovered.styleSheet);
      // @todo Don't like hardcoding fallback colors in JS, not sure what a better option is though
      const colHover = `#${this.id} [data-col="${col}"] {
          background: var(--rh-table--hoveredCol--Background, #EFF7FC);
        }`;
      const rowHover = `#${this.id} [data-row="${row}"] {
          background: var(--rh-table--hoveredRow--Background, #F3F3F3);
        }`;
      const intersectionHover = `#${this.id} [data-col="${col}"][data-row="${row}"] {
          background: var(--rh-table--hoveredIntersection--Background, #E0EDF4)
        }`;

      // Add styles
      this.hovered.styleSheet.insertRule(colHover, 0);
      this.hovered.styleSheet.insertRule(rowHover, 1);
      this.hovered.styleSheet.insertRule(intersectionHover, 2);

      /**
       * Remove row/col highlight if element is no longer hovered over
       */
      const hoverCheck = () => {
        // Uses CSS pseudo state to see what element is currently hovered
        const isHovered =
          thisCell ===
          thisCell.parentElement.querySelector(`[data-col="${col}"]:hover`);
        if (!isHovered) {
          this._deleteAllRules(this.hovered.styleSheet);
          this.hovered.hoveredCoordinates = null;
          clearInterval(this.hovered.checkInterval);
        }
      };
      this.hovered.checkInterval = setInterval(hoverCheck, 500);
    }
  }

  /**
   * Check to see if table scrolls, if so show/enable full screen functionality
   */
  _checkForScroll() {
    const hasVerticalScroll = this._shadowWrapper.scrollHeight > this._shadowWrapper.clientHeight;
    const hasHorizontalScroll = this._shadowWrapper.scrollWidth > this._shadowWrapper.clientWidth;
    if (
      this.table &&
      this._shadowWrapper &&
      hasVerticalScroll || hasHorizontalScroll
    ) {
      this.style.setProperty('--rh-table--scrollbar--width', `${this._shadowWrapper.offsetWidth - this._shadowWrapper.clientWidth}px`);
      // Respects full screen option preference and minimize DOM changes
      if (this.canFullScreen) {
        if (this._fullScreenButton.hidden) this._fullScreenButton.hidden = false;
        if (this._expandButton.hidden && hasVerticalScroll) this._expandButton.hidden = false;
      }
      // Check for attribute to minimize DOM changes
      if (!this._shadowWrapper.hasAttribute('tabindex')) {
        this._shadowWrapper.setAttribute('tabindex', '0');
      }
    } else {
      // Don't hide expand and fullscreen if table can be un-expanded
      if (this._expandUnpressed) {
        // Check for attribute to minimize DOM changes
        if (!this._fullScreenButton.hidden) this._fullScreenButton.hidden = true;
        if (!this._expandButton.hidden) this._expandButton.hidden = true;
      }
      // Check for attribute to minimize DOM changes
      if (this._shadowWrapper.hasAttribute('tabindex')) {
        this._shadowWrapper.removeAttribute('tabindex');
      }
    }
  }

  /**
   * Add HTML and behaviors necessary for sort
   * @param {HTMLElement} columnHeader Sortable column header
   */
  _processSortableColumn(columnHeader) {
    // Quick exit if it's been processed
    if (columnHeader.classList.contains("sortable--processed")) {
      return;
    }

    const sortButton = this._sortButtonBoilerplate.cloneNode("true");

    // Remove hidden which is on the boilerplate
    sortButton.hidden = false;

    // Move any nodes (text node or Element) into the sort button
    for (let index = 0; index < columnHeader.childNodes.length; index++) {
      const childNode = columnHeader.childNodes[index];
      sortButton.prepend(childNode);
    }

    // Add proper assistive text to the sort button
    const sortText = this._getTranslatedString("sortDescending");
    if (sortButton && sortText) {
      sortButton.setAttribute("title", sortText);
    }

    // Add sort button to DOM and update column header
    columnHeader.append(sortButton);
    columnHeader.classList.add("sortable");

    sortButton.addEventListener("click", this._sortData);

    // Add our init class so we don't re-init
    columnHeader.classList.add("sortable--processed");
  }

  /**
   * Get the table's data and update table's html
   * Makes a copy of the table, enhance the copy, gets the data for sorting
   */
  _processLightDom() {
    if (this.table && !this.classList.contains("rh-table--processed")) {
      //--------------------------------------------------
      // Begin best time to manipulate the table's markup
      // Modify elements when they're in not in the DOM yet
      //--------------------------------------------------

      const newTable = this.table.cloneNode(true);
      this.tableSortValues = [];

      // Set data attributes for column and row index
      // Iterate over rows
      const tableRows = newTable.querySelectorAll("tr");
      for (let rowIndex = 0; rowIndex < tableRows.length; rowIndex++) {
        // @todo Handle row/col spanning
        // Iterate over cells in each row
        const tableRow = tableRows[rowIndex];
        const tableCells = tableRow.querySelectorAll("td, th");

        let tableRowValues = [];
        // if the table is sortable, this adds the rows to an object for sorting
        if (this.sortable) {
          this.tableCellValues[rowIndex] = Array.from(tableCells);
        }
        for (let colIndex = 0; colIndex < tableCells.length; colIndex++) {
          const tableCell = tableCells[colIndex];

          // Set col & row metadata
          tableCell.dataset.row = rowIndex + 1;
          tableCell.dataset.col = colIndex + 1;

          if (tableCell.innerText.length > 75) {
            tableCell.classList.add("content--lg");
          } else if (tableCell.innerText.length > 30) {
            tableCell.classList.add("content--md");
          } else {
            tableCell.classList.add("content--sm");
          }

          // If the table isn't sortable, don't bother pulling any of the data for sorting
          if (this.sortable) {
            const sortableCols = this.sortable.split(",");

            if (
              rowIndex === 0 &&
              sortableCols.includes((colIndex + 1).toString())
            ) {
              this._processSortableColumn(tableCell);
            }

            tableRowValues.push({
              initialCol: colIndex,
              initialRow: rowIndex,
              innerText: tableCell.innerText.trim(),
            });

            // dump every cell into an object for lookup when sorting
            this.tableCellValues[rowIndex][colIndex] = tableCell;
          }
        }
        if (this.sortable) {
          if (rowIndex !== 0) {
            this.tableSortValues.push(tableRowValues);
          }
        }
      }

      //--------------------------------------------------
      // End best time to manipulate the table's markup
      //--------------------------------------------------
      this.replaceChild(newTable, this.table);
      this.table = newTable;

      if (this.table) {
        this._sortHeadings = this.table.querySelectorAll(".sort-button");
      }

      // Setup row/col hover effects
      this.table.addEventListener("mouseover", this._rowAndColumnHighlight);
      this._checkForScroll();
      this.classList.add("rh-table--processed");
    }
  }

  // _sortedHandler(event) {
  //   this.emitEvent(RhTable.events.sorted, {
  //     detail: {},
  //   });
  // }
}

PFElement.create(RhTable);

export default RhTable;

