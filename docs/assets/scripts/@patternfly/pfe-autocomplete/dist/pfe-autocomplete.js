import PFElement from '../../pfelement/dist/pfelement.js';
import '../../pfe-button/dist/pfe-button.js';

/*!
 * PatternFly Elements: PfeAutocomplete 1.12.3
 * @license
 * Copyright 2021 Red Hat, Inc.
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

const KEYCODE = {
  ENTER: 13,
  DOWN: 40,
  UP: 38,
  ESC: 27,
};

// use this variable to debounce api call when user types very fast
let throttle = false;

class PfeAutocomplete extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.12.3";
  }

  // Injected at build-time
  get html() {
    return `
<style>.sr-only{position:absolute;overflow:hidden;clip:rect(0,0,0,0);height:1px;width:1px;margin:-1px;padding:0;border:0}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#151515!important}}:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted--on-dark, #d2d2d2);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted--on-saturated, #d2d2d2);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, #fafafa);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, #fafafa);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #d2d2d2);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-saturated, underline);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-saturated, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-saturated, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-saturated, underline)}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted, #6a6e73);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}:host{display:block;position:relative;font-family:"Red Hat Text",RedHatText,Overpass,Overpass,Arial,sans-serif;font-family:var(--pfe-theme--font-family, "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif);--pfe-autocomplete--BoxShadow:var(--pfe-theme--box-shadow--inset, inset 0 0 0.625rem 0 #fafafa);--pfe-autocomplete--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-autocomplete--Border:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2)}:host([button-text]){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}:host([button-text]) #wrapper{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}:host([button-text]) #input-box-wrapper{position:relative}:host([button-text]) button.clear-search{width:40px;right:0}:host([button-text]) ::slotted(input[type=search]::-webkit-search-cancel-button){-webkit-appearance:none}#input-box-wrapper{border-color:#06c;border-color:var(--pfe-theme--color--feedback--info,#06c)}#input-box-wrapper ::slotted(input){width:100%;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-box-shadow:inset 0 0 .625rem 0 #fafafa!important;box-shadow:inset 0 0 .625rem 0 #fafafa!important;-webkit-box-shadow:var(--pfe-autocomplete--BoxShadow,var(--pfe-theme--box-shadow--inset,inset 0 0 .625rem 0 #fafafa))!important;box-shadow:var(--pfe-autocomplete--BoxShadow,var(--pfe-theme--box-shadow--inset,inset 0 0 .625rem 0 #fafafa))!important;padding-left:10px;padding-right:0;border-radius:2px;border-radius:var(--pfe-theme--ui--border-radius,2px);background-color:#fff;background-color:var(--pfe-autocomplete--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));border:1px solid #d2d2d2;border:var(--pfe-autocomplete--Border,var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2));font-size:1rem;font-size:var(--pfe-theme--font-size,1rem);font-family:"Red Hat Text",RedHatText,Overpass,Overpass,Arial,sans-serif;font-family:var(--pfe-theme--font-family, "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif);height:calc(20px * 2);height:calc(var(--pfe-theme--ui--element--size,20px) * 2);-webkit-transition:border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;opacity:1;outline:0}#input-box-wrapper ::slotted(input:disabled),#input-box-wrapper button:disabled{cursor:not-allowed;color:#ccc}#input-box-wrapper ::slotted(input:disabled){padding-right:10px}#input-box-wrapper ::slotted(input:focus),#input-box-wrapper button:focus{outline:0}#input-box-wrapper ::slotted(input),#input-box-wrapper button{-webkit-appearance:none}#input-box-wrapper ::slotted([type=search]::-ms-clear){display:none}#input-box-wrapper ::slotted(input[type=search]::-webkit-search-cancel-button),#input-box-wrapper ::slotted(input[type=search]::-webkit-search-decoration){-webkit-appearance:none}button{color:#6a6e73;color:var(--pfe-theme--color--ui-base,#6a6e73);background-color:transparent;border:none;position:absolute;top:0;bottom:0;cursor:pointer}button.clear-search{right:30px;width:20px;margin:2px 1px;background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff)}button.clear-search:hover{color:#6a6e73;color:var(--pfe-theme--color--ui-base,#6a6e73)}button.clear-search svg{width:14px;position:relative;top:2px;stroke:#d2d2d2;stroke:var(--pfe-theme--color--surface--border,#d2d2d2)}button.clear-search:focus svg,button.clear-search:hover svg{opacity:1;stroke:#06c;stroke:var(--pfe-theme--color--link,#06c)}button[disabled].clear-search:focus svg,button[disabled].clear-search:hover svg{stroke:#d2d2d2;stroke:var(--pfe-theme--color--surface--border,#d2d2d2)}button.search-button{margin-top:1px;margin-bottom:1px;right:1px;width:30px;background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff)}button.search-button svg{fill:#06c;fill:var(--pfe-theme--color--link,#06c);width:18px;position:relative;top:2px;stroke:#d2d2d2;stroke:var(--pfe-theme--color--surface--border,#d2d2d2)}button.search-button:focus svg,button.search-button:hover svg{fill:#004080;fill:var(--pfe-theme--color--link--hover,#004080)}button.search-button:disabled svg{fill:#d2d2d2;fill:var(--pfe-theme--color--ui-disabled,#d2d2d2)}pfe-button.search-button--textual{margin-left:16px}.loading{position:absolute;width:30px;right:52px;top:0;bottom:0}.loading svg{width:26px;padding-top:7px} /*# sourceMappingURL=pfe-autocomplete.min.css.map */</style>
<div id="wrapper">
  <div id="input-box-wrapper">
    <!-- Input box -->
    <slot></slot>

    <!-- loading icon -->
    <span class="loading" aria-hidden="true" hidden>
      <svg viewBox="0 0 40 40" enable-background="new 0 0 40 40">
        <path opacity="0.2" fill="#000"
          d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
          s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
          c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
        <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
          C22.32,8.481,24.301,9.057,26.013,10.047z">
          <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20"
            dur="0.5s" repeatCount="indefinite" />
        </path>
      </svg>
    </span>

    <!-- clear search button -->
    <button class="clear-search" type="button" aria-label="clear search query" hidden>
      <svg viewBox="0 0 40 40" enable-background="new 0 0 40 40">
        <line x1="5" y1="5" x2="35" y2="35" stroke-width="10" stroke-linecap="round" stroke-miterlimit="10"></line>
        <line x1="35" y1="5" x2="5" y2="35" stroke-width="10" stroke-linecap="round" stroke-miterlimit="10"></line>
      </svg>
    </button>

    <!-- Search button -->
    <button class="search-button" type="button" aria-label="Search" disabled>
      <svg viewBox="0 0 512 512">
        <path d="M256.233,5.756c-71.07,15.793-141.44,87.863-155.834,159.233c-11.495,57.076,0.3,111.153,27.688,154.335L6.339,441.172
      c-8.596,8.596-8.596,22.391,0,30.987l33.286,33.286c8.596,8.596,22.391,8.596,30.987,0L192.26,383.796
      c43.282,27.688,97.559,39.683,154.734,28.188c79.167-15.893,142.04-77.067,159.632-155.934
      C540.212,104.314,407.968-27.93,256.233,5.756z M435.857,208.37c0,72.869-59.075,131.944-131.944,131.944
      S171.969,281.239,171.969,208.37S231.043,76.426,303.913,76.426S435.857,135.501,435.857,208.37z" />
      </svg>
    </button>
  </div>
  <pfe-search-droplist id="dropdown"></pfe-search-droplist>
</div>

<!-- Search button (when [button-text] attr provided) -->
<pfe-button class="search-button--textual" hidden>
  <button class="search-button__text" aria-label="Search" disabled></button>
</pfe-button>`;
  }

  // @TODO: Deprecating in 1.0 release
  // Injected at build-time
  static get schemaProperties() {
    return {"debounce_timer":{"title":"Debounce","description":"The amount of time that should pass before the next API call is made","type":"string","prefixed":false},"init_value":{"title":"Initial value","description":"An initial value to show in the input field","type":"string","prefixed":false},"is_disabled":{"title":"Is disabled","description":"Disable the input","type":"boolean","prefixed":false},"button-text":{"title":"Button text","description":"Add button with text next to input field","type":"string","prefixed":false}};
  }

  // Injected at build-time
  static get slots() {
    return {"content":{"title":"Content","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"input"}]},"required":true}};
  }

  static get tag() {
    return "pfe-autocomplete";
  }

  get schemaUrl() {
    return "pfe-autocomplete.json";
  }

  get templateUrl() {
    return "pfe-autocomplete.html";
  }

  get styleUrl() {
    return "pfe-autocomplete.scss";
  }

  static get properties() {
    return {
      initValue: {
        title: "Initial Value",
        type: String,
        observer: "_initValueChanged",
      },
      loading: {
        title: "Loading",
        type: Boolean,
        default: false,
        observer: "_loadingChanged",
      },
      isDisabled: {
        title: "Is disabled",
        type: Boolean,
        default: false,
        observer: "_isDisabledChanged",
      },
      debounce: {
        title: "Debounce",
        type: Number,
        default: 300,
      },
      selectedValue: {
        title: "Selected value",
        type: String,
      },
      buttonText: {
        title: "Button text",
        type: String,
        observer: "_buttonTextChanged",
      },
    };
  }

  static get events() {
    return {
      search: `${this.tag}:search-event`,
      select: `${this.tag}:option-selected`,
      optionsShown: `${this.tag}:options-shown`,
      optionCleared: `${this.tag}:option-cleared`,
      slotchange: `slotchange`,
    };
  }

  constructor() {
    super(PfeAutocomplete);

    this._inputInit();

    this._slotchangeHandler = this._slotchangeHandler.bind(this);

    this._slot = this.shadowRoot.querySelector("slot");
    this._slot.addEventListener(PfeAutocomplete.events.slotchange, this._slotchangeHandler);

    // @TODO: Confirm this is translatable
    this._ariaAnnounceTemplate = "There are ${numOptions} suggestions. Use the up and down arrows to browse.";

    // clear button
    this._clearBtn = this.shadowRoot.querySelector(".clear-search");
    this._clearBtn.addEventListener("click", this._clear.bind(this));

    // search button
    this._searchBtn = this.shadowRoot.querySelector(".search-button");
    this._searchBtn.addEventListener("click", this._search.bind(this));

    // textual search button
    this._searchBtnTextual = this.shadowRoot.querySelector(".search-button--textual");
    this._searchBtnText = this.shadowRoot.querySelector(".search-button__text");
    this._searchBtnTextual.addEventListener("click", this._search.bind(this));

    this._dropdown = this.shadowRoot.querySelector("#dropdown");
    this._dropdown.data = [];

    this.activeIndex = null;

    this.addEventListener("keyup", this._inputKeyUp.bind(this));

    // these two events, fire search
    this.addEventListener(PfeAutocomplete.events.search, this._closeDroplist.bind(this));
    this.addEventListener(PfeAutocomplete.events.select, this._optionSelected.bind(this));
  }

  _inputInit() {
    // input box
    let slotNodes = this.shadowRoot.querySelector("slot").assignedNodes();
    let slotElems = slotNodes.filter((n) => n.nodeType === Node.ELEMENT_NODE);
    if (slotElems.length === 0) {
      console.error(`${PfeAutocomplete.tag}: There must be a input tag in the light DOM`);
      return;
    }
    this._input = slotElems[0];

    if (this._input.tagName.toLowerCase() !== "input") {
      console.error(`${PfeAutocomplete.tag}: The only child in the light DOM must be an input tag`);

      return;
    }

    this._input.addEventListener("input", this._inputChanged.bind(this));
    this._input.addEventListener("blur", this._closeDroplist.bind(this));

    this._input.setAttribute("role", "combobox");

    if (!this._input.hasAttribute("aria-label")) {
      this._input.setAttribute("aria-label", "Search");
    }

    this._input.setAttribute("aria-autocomplete", "list");
    this._input.setAttribute("aria-haspopup", "true");
    this._input.setAttribute("aria-owns", "droplist-items");
    this._input.setAttribute("aria-controls", "droplist-items");
    this._input.setAttribute("aria-expanded", "false");
    this._input.setAttribute("type", "search");
    this._input.setAttribute("autocomplete", "off");
    this._input.setAttribute("autocorrect", "off");
    this._input.setAttribute("autocapitalize", "off");
    this._input.setAttribute("spellcheck", "false");

    this._input.setAttribute(
      "style",
      `input[type=search]::-ms-clear { display: none; width : 0; height: 0; }input[type = search]:: -ms - reveal { display: none; width: 0; height: 0; }" nput[type="search"]::-webkit-search-decoration, input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-results-button, input[type="search"]::-webkit-search-results-decoration { display: none; }`
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("keyup", this._inputKeyUp);

    this.removeEventListener(PfeAutocomplete.events.search, this._closeDroplist);
    this.removeEventListener(PfeAutocomplete.events.select, this._optionSelected);
    this._slot.removeEventListener(PfeAutocomplete.events.slotchange, this._slotchangeHandler);
    if (this._input) {
      this._input.removeEventListener("input", this._inputChanged);
      this._input.removeEventListener("blur", this._closeDroplist);
    }

    this._clearBtn.removeEventListener("click", this._clear);
    this._searchBtn.removeEventListener("click", this._search);
    this._searchBtnTextual.removeEventListener("click", this._search);
  }

  _initValueChanged(oldVal, newVal) {
    if (newVal) {
      // set inputbox and buttons in the inner component
      this._input.value = newVal;
      if (newVal !== "" && !this.isDisabled) {
        this._searchBtn.removeAttribute("disabled");
        this._searchBtnTextual.removeAttribute("disabled");
        this._clearBtn.removeAttribute("hidden");
      } else {
        this._searchBtn.setAttribute("disabled", "");
        this._searchBtnTextual.setAttribute("disabled", "");
        this._clearBtn.setAttribute("hidden", "");
      }
    }
  }

  _loadingChanged() {
    if (!this.loading || this._input.value === "") {
      this.shadowRoot.querySelector(".loading").setAttribute("hidden", "");
    } else {
      this.shadowRoot.querySelector(".loading").removeAttribute("hidden");
    }
  }

  _isDisabledChanged() {
    if (this.isDisabled) {
      this._clearBtn.setAttribute("disabled", "");
      this._searchBtn.setAttribute("disabled", "");
      this._searchBtnTextual.setAttribute("disabled", "");
      this._input.setAttribute("disabled", "");
    } else {
      this._clearBtn.removeAttribute("disabled");
      this._searchBtn.removeAttribute("disabled");
      this._searchBtnTextual.removeAttribute("disabled");
      this._input.removeAttribute("disabled");
    }
  }

  _buttonTextChanged(oldVal, newVal) {
    if (oldVal === null) {
      this._searchBtn.setAttribute("hidden", "");
      this._searchBtnText.innerHTML = newVal || "Search";
      this._searchBtnTextual.removeAttribute("hidden");
    } else if (newVal === null || newVal === "") {
      this._searchBtnTextual.setAttribute("hidden", "");
      this._searchBtn.removeAttribute("hidden");
    } else {
      this._searchBtnText.innerHTML = newVal || "Search";
    }
  }

  _slotchangeHandler() {
    this._inputInit();
    this._dropdown._ariaAnnounceTemplate = this.getAttribute("aria-announce-template") || this._ariaAnnounceTemplate;
  }

  _inputChanged() {
    if (this._input.value === "") {
      this._searchBtn.setAttribute("disabled", "");
      this._searchBtnTextual.setAttribute("disabled", "");
      this._clearBtn.setAttribute("hidden", "");

      this._reset();
      return;
    } else {
      if (!this._input.hasAttribute("disabled")) {
        this._searchBtn.removeAttribute("disabled");
        this._searchBtnTextual.removeAttribute("disabled");
      }
      this._clearBtn.removeAttribute("hidden");
    }

    if (throttle === false) {
      throttle = true;

      window.setTimeout(() => {
        this._sendAutocompleteRequest(this._input.value);
        throttle = false;
      }, this.debounce);
    }
  }

  _clear() {
    this._input.value = "";
    this._clearBtn.setAttribute("hidden", "");
    this._searchBtn.setAttribute("disabled", "");
    this._searchBtnTextual.setAttribute("disabled", "");
    this._input.focus();
    this.emitEvent(PfeAutocomplete.events.optionCleared, {
      bubbles: true,
      composed: true,
      detail: { searchValue: "" },
    });
  }

  _search() {
    this._doSearch(this._input.value);
  }

  _closeDroplist() {
    this._dropdown.open = null;
    this._dropdown.removeAttribute("active-index");
    this._input.setAttribute("aria-expanded", "false");
  }

  _openDroplist() {
    this.activeIndex = null;
    this._dropdown.open = true;
    this._dropdown.setAttribute("active-index", null);
    this.emitEvent(PfeAutocomplete.events.optionsShown, {
      composed: true,
    });
    this._input.setAttribute("aria-expanded", "true");
  }

  _optionSelected(e) {
    let selectedValue = e.detail.optionValue;

    // update input box with selected value from options list
    this._input.value = selectedValue;

    // send search request
    this._doSearch(selectedValue);
  }

  _doSearch(searchQuery) {
    this.emitEvent(PfeAutocomplete.events.search, {
      detail: { searchValue: searchQuery },
      composed: true,
    });
    this._reset();
    this.selectedValue = searchQuery;
  }

  _sendAutocompleteRequest(input) {
    if (!this.autocompleteRequest) return;

    this.autocompleteRequest({ query: input }, this._autocompleteCallback.bind(this));
  }

  _autocompleteCallback(response) {
    this._dropdown.data = response;
    this._dropdown.reflow = true;
    response.length !== 0 ? this._openDroplist() : this._closeDroplist();
  }

  _reset() {
    this._dropdown.activeIndex = null;
    this._input.setAttribute("aria-activedescendant", "");
    this._dropdown.data = [];
    this._closeDroplist();
  }

  /**
   * Returns the HTML of the active element
   * @param {number} activeIndex Index of an element in the droplist
   * @return {string} The HTML inside of the given index as a string
   */
  _activeOption(activeIndex) {
    if (activeIndex === null || activeIndex === "null") return;
    return this._dropdown.shadowRoot.querySelector("li:nth-child(" + (parseInt(activeIndex, 10) + 1) + ")").innerHTML;
  }

  /**
   * Handle keyboard input, we care about arrow keys, enter, and escape
   * @param {object} e - keypress event
   */
  _inputKeyUp(e) {
    let key = e.keyCode;

    // Check to see if it's a key we care about
    if (
      this._dropdown.data.length === 0 &&
      key !== KEYCODE.DOWN &&
      key !== KEYCODE.UP &&
      key !== KEYCODE.ENTER &&
      key !== KEYCODE.ESC
    )
      return;

    let activeIndex = this._dropdown.activeIndex;
    let optionsLength = this._dropdown.data.length;

    if (key == KEYCODE.ESC) {
      this._closeDroplist();
    } else if (key === KEYCODE.UP) {
      if (!this._dropdown.open) {
        return;
      }

      activeIndex = activeIndex === null || activeIndex === "null" ? optionsLength : parseInt(activeIndex, 10);

      activeIndex -= 1;

      // Go to the last item if we're at -1 index
      if (activeIndex < 0) {
        activeIndex = optionsLength - 1;
      }

      // Get the HTML of the active element
      this._input.value = this._activeOption(activeIndex);
    } else if (key === KEYCODE.DOWN) {
      if (!this._dropdown.open) {
        return;
      }

      activeIndex = activeIndex === null || activeIndex === "null" ? -1 : parseInt(activeIndex, 10);
      activeIndex += 1;

      if (activeIndex > optionsLength - 1) {
        activeIndex = 0;
      }

      // Go to the last item if we're at -1 index
      this._input.value = this._activeOption(activeIndex);
    } else if (key === KEYCODE.ENTER) {
      if (this._activeOption(activeIndex)) {
        this.emitEvent(PfeAutocomplete.events.select, {
          detail: { optionValue: this._activeOption(activeIndex) },
          composed: true,
        });

        return;
      }

      let selectedValue = this._input.value;
      this._doSearch(selectedValue);
      return;
    }

    if (activeIndex !== null && activeIndex !== "null") {
      this._input.setAttribute("aria-activedescendant", "option-" + activeIndex);
    } else {
      this._input.setAttribute("aria-activedescendant", "");
    }

    this.activeIndex = activeIndex;
    this._dropdown.activeIndex = activeIndex;
  }
}

/*
* - Attributes ------------------------------------
* open               | Set when the combo box dropdown is open
* active-index       | Set selected option
* reflow             | Re-renders the dropdown

* - Events ----------------------------------------
* pfe-autocomplete:option-selected | Fires when an option is selected.
  event.details.optionValue contains the selected value.
*/

class PfeSearchDroplist extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.12.3";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host{position:relative;display:none;font-family:"Red Hat Text",RedHatText,Overpass,Overpass,Arial,sans-serif;font-family:var(--pfe-theme--font-family, "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif);font-size:1rem;font-size:var(--pfe-theme--font-size,1rem);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5)}:host([open]){display:block}:host([debug]) [aria-selected]{-webkit-box-shadow:inset 0 0 0 2px #a30000;box-shadow:inset 0 0 0 2px #a30000;-webkit-box-shadow:inset 0 0 0 var(--pfe-theme--ui--border-width--md,2px) var(--pfe-theme--color--feedback--critical,#a30000);box-shadow:inset 0 0 0 var(--pfe-theme--ui--border-width--md,2px) var(--pfe-theme--color--feedback--critical,#a30000)}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.droplist{position:absolute;top:100%;left:0;right:0;max-height:250px;z-index:9999;overflow-y:scroll;overflow-x:hidden;border:1px solid #ccc;background-color:#fff}ul{font-family:"Red Hat Text",RedHatText,Overpass,Overpass,Arial,sans-serif;font-family:var(--pfe-theme--font-family, "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif);font-size:1rem;font-size:var(--pfe-theme--font-size,1rem);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);border-top:none;margin:0;padding:0;list-style:none;cursor:pointer}ul li{display:list-item;cursor:pointer;padding:10px;margin:0}ul li.active{background-color:#f0f0f0;background-color:var(--pfe-theme--color--surface--lighter,#f0f0f0)} /*# sourceMappingURL=pfe-search-droplist.min.css.map */</style>
<div class="suggestions-aria-help sr-only" aria-hidden="false" role="status"></div>
<div class="droplist">
  <ul role="listbox" id="droplist-items" tabindex="-1">
  </ul>
</div>`;
  }

  static get tag() {
    return "pfe-search-droplist";
  }

  get templateUrl() {
    return "pfe-search-droplist.html";
  }

  get styleUrl() {
    return "pfe-search-droplist.scss";
  }

  static get properties() {
    return {
      open: {
        title: "Open",
        type: Boolean,
      },
      reflow: {
        title: "Reflow",
        type: Boolean,
        observer: "_renderOptions",
      },
      activeIndex: {
        title: "Active index",
        type: Number,
        observer: "_activeIndexChanged",
      },
    };
  }

  constructor() {
    super(PfeSearchDroplist);
  }

  connectedCallback() {
    super.connectedCallback();

    this._ariaAnnounce = this.shadowRoot.querySelector(".suggestions-aria-help");

    this.activeIndex = null;
    this._ul = this.shadowRoot.querySelector("ul");
    this._ul.addEventListener("mousedown", this._optionSelected.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._ul.removeEventListener("mousedown", this._optionSelected);
  }

  _optionSelected(e) {
    if (e.target.tagName === "LI") {
      this.emitEvent(PfeAutocomplete.events.select, {
        detail: { optionValue: e.target.innerText },
        composed: true,
      });
    }
  }

  _renderOptions() {
    let options = this.data;
    let ariaAnnounceText = "";

    if (this._ariaAnnounceTemplate) {
      ariaAnnounceText = this._ariaAnnounceTemplate.replace("${numOptions}", options.length);
    }

    this._ariaAnnounce.textContent = ariaAnnounceText;
    this._ariaAnnounce.setAttribute("aria-live", "polite");

    this._ul.innerHTML = `${options
      .map((item, index) => {
        return `<li id="option-${index}" role="option" tabindex="-1" value="${item}">${item}</li>`;
      })
      .join("")}`;
  }

  /**
   * Handle state changes when active droplist item has been changed
   */
  _activeIndexChanged() {
    // Make a quick exit if necessary
    if (!this.data || this.data.length === 0 || this.activeIndex === null || this.activeIndex === "null") return;

    // Previous element may not exist
    const previouslyActiveElement = this._ul.querySelector(".active");
    const activeOption = this._ul.querySelector("li:nth-child(" + (parseInt(this.activeIndex, 10) + 1) + ")");

    // Handle any element that should no longer be selected
    if (previouslyActiveElement) {
      previouslyActiveElement.classList.remove("active");
      previouslyActiveElement.removeAttribute("aria-selected");
    }

    // Update newly selected element to have proper attributes and settings
    activeOption.classList.add("active");
    // @note Set aria-selected on the active list item, should only occur on the list item that is being referenced
    // by the aria-activedescendant attribute. This attribute is required when creating a listbox autocomplete
    // component. It helps ensure that the screen reader user knows what element is active when moving through the
    // list of items with the arrow keys
    activeOption.setAttribute("aria-selected", "true");

    // scroll to selected element when selected item with keyboard is out of view
    let ulWrapper = this.shadowRoot.querySelector(".droplist");
    let activeOptionHeight = activeOption.offsetHeight;
    activeOptionHeight += parseInt(window.getComputedStyle(activeOption).getPropertyValue("margin-bottom"), 10);
    ulWrapper.scrollTop = activeOption.offsetTop - ulWrapper.offsetHeight + activeOptionHeight;

    return activeOption;
  }
}

PFElement.create(PfeSearchDroplist);
PFElement.create(PfeAutocomplete);

export default PfeAutocomplete;

