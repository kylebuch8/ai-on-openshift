import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeDatetime 1.12.3
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

class PfeDatetime extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.12.3";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host{display:inline} /*# sourceMappingURL=pfe-datetime.min.css.map */</style>
<span></span>`;
  }

  static get tag() {
    return "pfe-datetime";
  }

  get styleUrl() {
    return "pfe-datetime.scss";
  }

  get templateUrl() {
    return "pfe-datetime.html";
  }

  get _dateTimeType() {
    return this.format || this.type || PfeDatetime.properties.format.default;
  }

  static get properties() {
    return {
      format: {
        title: "Format",
        type: String,
        values: ["local", "relative"],
        default: "local",
      },
      oldType: {
        alias: "format",
        attr: "type",
      },
      datetime: {
        title: "Date and time",
        type: String,
        observer: "_datetimeChanged",
        prefix: false,
      },
      timestamp: {
        title: "Timestamp",
        type: String,
        observer: "_timestampChanged",
        prefix: false,
      },
    };
  }

  constructor() {
    super(PfeDatetime);
  }

  _datetimeChanged(oldVal, newVal) {
    if (!Date.parse(newVal)) {
      return;
    }

    if (Date.parse(newVal) && this._datetime === Date.parse(newVal)) {
      return;
    }

    this.setDate(Date.parse(newVal));
  }

  _timestampChanged(oldVal, newVal) {
    if (this._timestamp === newVal) {
      this.log("early return");
      return;
    }

    this._timestamp = newVal;
    this.setDate(new Date(newVal * 1000));
  }

  setDate(date) {
    this._datetime = date;
    this.shadowRoot.querySelector("span").innerText = window.Intl ? this._getTypeString() : date.toLocaleString();
  }

  _getOptions() {
    const props = {
      weekday: {
        short: "short",
        long: "long",
      },
      day: {
        numeric: "numeric",
        "2-digit": "2-digit",
      },
      month: {
        short: "short",
        long: "long",
      },
      year: {
        numeric: "numeric",
        "2-digit": "2-digit",
      },
      hour: {
        numeric: "numeric",
        "2-digit": "2-digit",
      },
      minute: {
        numeric: "numeric",
        "2-digit": "2-digit",
      },
      second: {
        numeric: "numeric",
        "2-digit": "2-digit",
      },
      timeZoneName: {
        short: "short",
        long: "long",
      },
    };

    let options = {};

    for (const prop in props) {
      // converting the prop name from camel case to
      // hyphenated so it matches the attribute.
      // for example: timeZoneName to time-zone-name
      let attributeName = prop
        .replace(/[\w]([A-Z])/g, (match) => {
          return match[0] + "-" + match[1];
        })
        .toLowerCase();

      const value = props[prop][this.getAttribute(attributeName)];
      if (value) {
        options[prop] = value;
      }
    }

    if (this.getAttribute("time-zone")) {
      options.timeZone = this.getAttribute("time-zone");
    }

    return options;
  }

  _getTypeString() {
    const options = this._getOptions();
    const locale = this.getAttribute("locale") || navigator.language;
    let dt = "";
    switch (this._dateTimeType) {
      case "local":
        dt = new Intl.DateTimeFormat(locale, options).format(this._datetime);
        break;
      case "relative":
        dt = this._getTimeRelative(this._datetime - Date.now());
        break;
      default:
        dt = this._datetime;
    }
    return dt;
  }

  _getTimeRelative(ms) {
    const tense = ms > 0 ? "until" : "ago";
    let str = "just now";
    // Based off of Github Relative Time
    // https://github.com/github/time-elements/blob/master/src/relative-time.js
    const s = Math.round(Math.abs(ms) / 1000);
    const min = Math.round(s / 60);
    const h = Math.round(min / 60);
    const d = Math.round(h / 24);
    const m = Math.round(d / 30);
    const y = Math.round(m / 12);
    if (m >= 18) {
      str = y + " years";
    } else if (m >= 12) {
      str = "a year";
    } else if (d >= 45) {
      str = m + " months";
    } else if (d >= 30) {
      str = "a month";
    } else if (h >= 36) {
      str = d + " days";
    } else if (h >= 24) {
      str = "a day";
    } else if (min >= 90) {
      str = h + " hours";
    } else if (min >= 45) {
      str = "an hour";
    } else if (s >= 90) {
      str = min + " minutes";
    } else if (s >= 45) {
      str = "a minute";
    } else if (s >= 10) {
      str = s + " seconds";
    }
    return str !== "just now" ? `${str} ${tense}` : str;
  }
}

PFElement.create(PfeDatetime);

export default PfeDatetime;

