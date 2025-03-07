(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global = global || self, global.PfeProgressIndicator = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && Object.prototype.hasOwnProperty.call(PFElement, 'default') ? PFElement['default'] : PFElement;

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  /*!
   * PatternFly Elements: PfeProgressIndicator 1.12.3
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

  var PfeProgressIndicator = function (_PFElement) {
    inherits(PfeProgressIndicator, _PFElement);
    createClass(PfeProgressIndicator, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host([indeterminate]) ::slotted(*){position:absolute;overflow:hidden;clip:rect(0,0,0,0);height:1px;width:1px;margin:-1px;padding:0;border:0}:host([hidden]){display:none}:host([indeterminate]){animation:spin 1s linear infinite;-webkit-animation:spin 1s linear infinite;-moz-animation:spin 1s linear infinite;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);border-width:4px;border-width:var(--pfe-theme--surface--border-width--heavy,4px);border-color:rgba(0,0,0,.25);border-color:var(--pfe-progress-indicator--background-color,rgba(0,0,0,.25));border-top-color:rgba(0,0,0,.75);border-top-color:var(--pfe-progress-indicator--foreground-color,rgba(0,0,0,.75));border-radius:100%;display:inline-block;height:2rem;height:var(--pfe-progress-indicator--Height,2rem);margin:0 auto;position:relative;width:2rem;width:var(--pfe-progress-indicator--Width,2rem);vertical-align:middle;visibility:visible}:host([size=sm]){height:1rem;width:1rem;border-width:calc(4px * .75);border-width:calc(var(--pfe-theme--surface--border-width--heavy,4px) * .75)}:host([size=md]){height:2rem;width:2rem;border-width:calc(4px * 1);border-width:calc(var(--pfe-theme--surface--border-width--heavy,4px) * 1)}:host([size=xl]){height:4rem;width:4rem;border-width:calc(4px * 1.5);border-width:calc(var(--pfe-theme--surface--border-width--heavy,4px) * 1.5)}@-webkit-keyframes spin{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}} /*# sourceMappingURL=pfe-progress-indicator.min.css.map */</style>\n<slot></slot>";
      }

      // @TODO: Deprecating in 1.0 release
      // Injected at build-time

    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-progress-indicator.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-progress-indicator.scss";
      }
    }, {
      key: "schemaUrl",
      get: function get() {
        return "pfe-progress-indicator.json";
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.12.3";
      }
    }, {
      key: "schemaProperties",
      get: function get() {
        return { "indeterminate": { "title": "Status", "type": "boolean", "default": true, "prefixed": true }, "size": { "title": "Size", "type": "string", "enum": ["sm", "md", "xl"], "default": "md" } };
      }

      // Injected at build-time

    }, {
      key: "slots",
      get: function get() {
        return { "content": { "title": "Content", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "raw" }] } } };
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-progress-indicator";
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          indeterminate: {
            title: "Indeterminate",
            type: Boolean
          },
          // @TODO: Deprecated in 1.0
          oldIndeterminate: {
            alias: "indeterminate",
            attr: "pfe-indeterminate"
          },
          size: {
            title: "Size",
            type: String,
            values: ["sm", "md", "xl"],
            default: "md"
          }
        };
      }
    }]);

    function PfeProgressIndicator() {
      classCallCheck(this, PfeProgressIndicator);

      var _this = possibleConstructorReturn(this, (PfeProgressIndicator.__proto__ || Object.getPrototypeOf(PfeProgressIndicator)).call(this, PfeProgressIndicator));

      _this._init = _this._init.bind(_this);
      _this._slot = _this.shadowRoot.querySelector("slot");
      _this._slot.addEventListener("slotchange", _this._init);
      return _this;
    }

    createClass(PfeProgressIndicator, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeProgressIndicator.prototype.__proto__ || Object.getPrototypeOf(PfeProgressIndicator.prototype), "connectedCallback", this).call(this);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        get(PfeProgressIndicator.prototype.__proto__ || Object.getPrototypeOf(PfeProgressIndicator.prototype), "disconnectedCallback", this).call(this);
        this._slot.removeEventListener("slotchange", this._init);
      }
    }, {
      key: "_init",
      value: function _init() {
        var firstChild = this.children[0];

        if (!firstChild) {
          this.warn("You do not have a backup loading message.");
        }
      }
    }]);
    return PfeProgressIndicator;
  }(PFElement);

  PFElement.create(PfeProgressIndicator);

  return PfeProgressIndicator;

})));

