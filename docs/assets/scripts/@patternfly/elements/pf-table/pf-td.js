var _PfTd_instances, _PfTd_onClick;
import { __classPrivateFieldGet, __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { css } from "lit";
const styles = css `:host(:empty),:host([compound-expand]){padding:0}:host([compound-expand]:hover){--pf-c-table__compound-expansion-toggle__button--before--BorderRightWidth:var(--pf-c-table__compound-expansion-toggle__button--before--border-width--base);--pf-c-table__compound-expansion-toggle__button--before--BorderLeftWidth:var(--pf-c-table__compound-expansion-toggle__button--before--border-width--base);--pf-c-table__compound-expansion-toggle__button--after--BorderTopWidth:var(--pf-c-table__compound-expansion-toggle__button--after--border-width--base)}:host([compound-expand]:focus-within){outline-offset:var(--pf-c-table__button--OutlineOffset)}:host([compound-expand][expanded]){--pf-c-table__compound-expansion-toggle__button--before--BorderRightWidth:var(--pf-c-table__compound-expansion-toggle__button--before--border-width--base);--pf-c-table__compound-expansion-toggle__button--before--BorderLeftWidth:var(--pf-c-table__compound-expansion-toggle__button--before--border-width--base);--pf-c-table__compound-expansion-toggle__button--after--BorderTopWidth:var(--pf-c-table__compound-expansion-toggle__button--after--border-width--base);--pf-c-table__compound-expansion-toggle__button--before--Left:0}@media (-webkit-min-device-pixel-ratio:0){:host([compound-expand]:focus-within){outline-style:auto;outline-color:-webkit-focus-ring-color}}@media (min-width:768px){:host{padding:1.5rem 1rem}}button{position:relative;width:100%;padding:var(--pf-c-table--cell--PaddingTop) var(--pf-c-table--cell--PaddingRight) var(--pf-c-table--cell--PaddingBottom) var(--pf-c-table--cell--PaddingLeft);font-size:inherit;font-weight:inherit;color:var(--pf-c-table__button--Color);text-align:left;white-space:inherit;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;background-color:var(--pf-c-table__button--BackgroundColor);border:0;min-width:100%;min-height:100%;overflow:hidden}button::after,button::before{position:absolute;inset-inline-end:0;content:"";border-style:solid;border-width:0;border-block-start-width:0px}button::before{inset-block-start:0;inset-block-end:var(--pf-c-table__compound-expansion-toggle__button--before--Bottom);inset-inline-start:var(--pf-c-table__compound-expansion-toggle__button--before--Left);border-color:var(--pf-c-table__compound-expansion-toggle__button--before--BorderColor);border-inline-start-width:var(--pf-c-table__compound-expansion-toggle__button--before--BorderLeftWidth);border-inline-end-width:var(--pf-c-table__compound-expansion-toggle__button--before--BorderRightWidth)}:host([expanded]){border-bottom:var(--pf-c-table--BackgroundColor) solid var(--pf-c-table__compound-expansion-toggle__button--before--border-width--base);z-index:1}button::after{inset-block-start:var(--pf-c-table__compound-expansion-toggle__button--after--Top);inset-inline-start:var(--pf-c-table__compound-expansion-toggle__button--after--Left);pointer-events:none;border-color:var(--pf-c-table__compound-expansion-toggle__button--after--BorderColor);border-block-start-width:var(--pf-c-table__compound-expansion-toggle__button--after--BorderTopWidth)}button:active,button:focus,button:hover{outline:0}button:active{color:var(--pf-c-table__button--active--Color)}button:focus{color:var(--pf-c-table__button--focus--Color)}button:hover{color:var(--pf-c-table__button--hover--Color)}`;
import { RequestExpandEvent } from './pf-tr.js';
/**
 * Table data cell
 * @slot - Place element content here
 */
let PfTd = class PfTd extends LitElement {
    constructor() {
        super(...arguments);
        _PfTd_instances.add(this);
        this.expanded = false;
    }
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute('role', 'cell');
    }
    render() {
        return this.compoundExpand ? html `
      <button @click="${__classPrivateFieldGet(this, _PfTd_instances, "m", _PfTd_onClick)}">
        <slot></slot>
      </button>
    ` : html `
      <slot></slot>
    `;
    }
};
_PfTd_instances = new WeakSet();
_PfTd_onClick = function _PfTd_onClick() {
    const row = this.closest('pf-tr');
    const cell = this.compoundExpand;
    const event = !row ? new RequestExpandEvent()
        : new RequestExpandEvent(row.expanded === cell || cell || false, row);
    this.dispatchEvent(event);
};
PfTd.styles = [styles];
__decorate([
    property({ attribute: 'compound-expand' })
], PfTd.prototype, "compoundExpand", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], PfTd.prototype, "expanded", void 0);
PfTd = __decorate([
    customElement('pf-td')
], PfTd);
export { PfTd };
