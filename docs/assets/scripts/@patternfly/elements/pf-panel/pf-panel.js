var _PfPanel_slots;
import { __classPrivateFieldGet, __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { css } from "lit";
const styles = css `:host{--pf-c-panel--Width:auto;--pf-c-panel--MinWidth:auto;--pf-c-panel--MaxWidth:none;--pf-c-panel--ZIndex:auto;--pf-c-panel--BackgroundColor:var(--pf-global--BackgroundColor--100, #fff);--pf-c-panel--BoxShadow:none;--pf-c-panel--before--BorderWidth:0;--pf-c-panel--before--BorderColor:var(--pf-global--BorderColor--100, #d2d2d2);--pf-c-panel--m-bordered--before--BorderWidth:var(--pf-global--BorderWidth--sm, 1px);--pf-c-panel--m-raised--BoxShadow:var(--pf-global--BoxShadow--md, 0 0.25rem 0.5rem 0rem rgba(3, 3, 3, 0.12), 0 0 0.25rem 0 rgba(3, 3, 3, 0.06));--pf-c-panel--m-raised--ZIndex:var(--pf-global--ZIndex--sm, 200);--pf-c-panel__header--PaddingTop:var(--pf-global--spacer--md, 1rem);--pf-c-panel__header--PaddingRight:var(--pf-global--spacer--md, 1rem);--pf-c-panel__header--PaddingBottom:var(--pf-global--spacer--md, 1rem);--pf-c-panel__header--PaddingLeft:var(--pf-global--spacer--md, 1rem);--pf-c-panel__main--MaxHeight:none;--pf-c-panel__main--Overflow:visible;--pf-c-panel__main-body--PaddingTop:var(--pf-global--spacer--md, 1rem);--pf-c-panel__main-body--PaddingRight:var(--pf-global--spacer--md, 1rem);--pf-c-panel__main-body--PaddingBottom:var(--pf-global--spacer--md, 1rem);--pf-c-panel__main-body--PaddingLeft:var(--pf-global--spacer--md, 1rem);--pf-c-panel__footer--PaddingTop:var(--pf-global--spacer--md, 1rem);--pf-c-panel__footer--PaddingRight:var(--pf-global--spacer--md, 1rem);--pf-c-panel__footer--PaddingBottom:var(--pf-global--spacer--md, 1rem);--pf-c-panel__footer--PaddingLeft:var(--pf-global--spacer--md, 1rem);--pf-c-panel__footer--BoxShadow:none;--pf-c-panel--m-scrollable__main--MaxHeight:18.75rem;--pf-c-panel--m-scrollable__main--Overflow:auto;--pf-c-panel--m-scrollable__footer--BoxShadow:0 -0.3125rem 0.25rem -0.25rem rgba(3, 3, 3, 0.16);position:relative;z-index:var(--pf-c-panel--ZIndex);width:var(--pf-c-panel--Width);min-width:var(--pf-c-panel--MinWidth);max-width:var(--pf-c-panel--MaxWidth);background-color:var(--pf-c-panel--BackgroundColor);box-shadow:var(--pf-c-panel--BoxShadow);display:block}:host([variant=bordered])::before{position:absolute;inset:0;pointer-events:none;content:"";border:var(--pf-c-panel--m-bordered--before--BorderWidth,var(--pf-global--BorderWidth--sm,1px)) solid var(--pf-c-panel--before--BorderColor,var(--pf-global--BorderColor--100,#d2d2d2))}:host([variant=raised])::before{position:absolute;inset:0;pointer-events:none;content:"";box-shadow:var(--pf-c-panel--m-raised--BoxShadow,0 .25rem .5rem 0 rgba(3,3,3,.12),0 0 .25rem 0 rgba(3,3,3,.06));z-index:var(--pf-c-panel--m-raised--ZIndex,var(--pf-global--ZIndex--sm,200))}:host([variant=raised]){--pf-c-panel--BoxShadow:var(--pf-c-panel--m-raised--BoxShadow,\n    var(--pf-global--BoxShadow--md, 0 0.25rem 0.5rem 0rem rgba(3, 3, 3, 0.12), 0 0 0.25rem 0 rgba(3, 3, 3, 0.06)));--pf-c-panel--ZIndex:var(--pf-c-panel--m-raised--ZIndex,\n    var(--pf-global--ZIndex--sm, 200))}:host([scrollable]){--pf-c-panel__main--MaxHeight:var(--pf-c-panel--m-scrollable__main--MaxHeight);--pf-c-panel__main--Overflow:var(--pf-c-panel--m-scrollable__main--Overflow);--pf-c-panel__footer--BoxShadow:var(--pf-c-panel--m-scrollable__footer--BoxShadow)}[hidden]{display:none!important}slot{display:block}slot:not([name]){max-height:var(--pf-c-panel__main--MaxHeight);overflow:var(--pf-c-panel__main--Overflow);padding:var(--pf-c-panel__main-body--PaddingTop,var(--pf-global--spacer--md,1rem)) var(--pf-c-panel__main-body--PaddingRight,var(--pf-global--spacer--md,1rem)) var(--pf-c-panel__main-body--PaddingBottom,var(--pf-global--spacer--md,1rem)) var(--pf-c-panel__main-body--PaddingLeft,var(--pf-global--spacer--md,1rem))}slot[name=header]{padding:var(--pf-c-panel__header--PaddingTop) var(--pf-c-panel__header--PaddingRight) var(--pf-c-panel__header--PaddingBottom) var(--pf-c-panel__header--PaddingLeft)}slot[name=footer]{padding:var(--pf-c-panel__footer--PaddingTop) var(--pf-c-panel__footer--PaddingRight) var(--pf-c-panel__footer--PaddingBottom) var(--pf-c-panel__footer--PaddingLeft);box-shadow:var(--pf-c-panel__footer--BoxShadow)}hr{--pf-c-divider--BorderWidth--base:var(--pf-global--BorderWidth--sm, 1px);--pf-c-divider--BorderColor--base:var(--pf-c-divider--BackgroundColor);--pf-c-divider--Height:var(--pf-c-divider--BorderWidth--base);--pf-c-divider--BackgroundColor:var(--pf-global--BorderColor--100, #d2d2d2);--pf-c-divider--after--BackgroundColor:var(--pf-c-divider--BorderColor--base);--pf-c-divider--after--FlexBasis:100%;--pf-c-divider--after--Inset:0%;--pf-c-divider--m-vertical--after--FlexBasis:100%;--pf-c-divider--m-horizontal--Display:flex;--pf-c-divider--m-horizontal--FlexDirection:row;--pf-c-divider--m-horizontal--after--Height:var(--pf-c-divider--Height);--pf-c-divider--m-horizontal--after--Width:auto;--pf-c-divider--m-vertical--Display:inline-flex;--pf-c-divider--m-vertical--FlexDirection:column;--pf-c-divider--m-vertical--after--Height:auto;--pf-c-divider--m-vertical--after--Width:var(--pf-c-divider--BorderWidth--base);--pf-hidden-visible--visible--Display:var(--pf-c-divider--Display);--pf-c-divider--Display:var(--pf-c-divider--m-horizontal--Display);--pf-c-divider--FlexDirection:var(--pf-c-divider--m-horizontal--FlexDirection);--pf-c-divider--after--Width:var(--pf-c-divider--m-horizontal--after--Width);--pf-c-divider--after--Height:var(--pf-c-divider--m-horizontal--after--Height);width:100%;height:auto;display:var(--pf-c-divider--Display);flex-direction:var(--pf-c-divider--FlexDirection);align-items:center;align-self:stretch;flex-shrink:0;justify-content:center;border:0}hr::after{align-self:stretch;width:var(--pf-c-divider--after--Width);height:var(--pf-c-divider--after--Height);content:"";background-color:var(--pf-c-divider--after--BackgroundColor);justify-self:center;padding:0;margin:0;flex-basis:calc(var(--pf-c-divider--after--FlexBasis) - var(--pf-c-divider--after--Inset) * 2)}::slotted(:is(p,h1,h2,h3,h4,h5,h6):first-of-type){margin-block-start:0}::slotted(:is(p,h1,h2,h3,h4,h5,h6):last-of-type){margin-block-end:0}::slotted(:is(p,h1,h2,h3,h4,h5,h6):is(:last-of-type,:first-of-type)){margin-block:0}`;
/**
 * The **panel** component is a container that supports flexible content layouts. It can
 * be used to house other components such as fields, forms, videos, buttons, and more.
 * The panel should not be confused with the [drawer](https://www.patternfly.org/v4/components/drawer/design-guidelines/)
 * component, which allows you to surface information via a collapsable container.
 *
 * @slot header - Place header content here
 * @slot - Place main content here
 * @slot footer - Place footer content here
 */
let PfPanel = class PfPanel extends LitElement {
    constructor() {
        super(...arguments);
        this.scrollable = false;
        _PfPanel_slots.set(this, new SlotController(this, 'header', null, 'footer'));
    }
    render() {
        const hasHeader = __classPrivateFieldGet(this, _PfPanel_slots, "f").hasSlotted('header');
        const hasFooter = __classPrivateFieldGet(this, _PfPanel_slots, "f").hasSlotted('footer');
        return html `
      <slot name="header" role="region" ?hidden="${!hasHeader}"></slot>
      <hr role="presentation" ?hidden="${!hasHeader}">
      <slot></slot>
      <slot name="footer" role="region" ?hidden="${!hasFooter}"></slot>
    `;
    }
};
_PfPanel_slots = new WeakMap();
PfPanel.styles = [styles];
__decorate([
    property({ type: Boolean, reflect: true })
], PfPanel.prototype, "scrollable", void 0);
__decorate([
    property({ reflect: true })
], PfPanel.prototype, "variant", void 0);
PfPanel = __decorate([
    customElement('pf-panel')
], PfPanel);
export { PfPanel };
