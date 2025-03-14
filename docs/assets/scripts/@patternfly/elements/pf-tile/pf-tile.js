import { __decorate } from "tslib";
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { BaseTile } from './BaseTile.js';
import { css } from "lit";
const styles = css `:host{position:relative;display:inline-grid;padding:var(--pf-c-tile--PaddingTop,var(--pf-global--spacer--lg,1.5rem)) var(--pf-c-tile--PaddingRight,var(--pf-global--spacer--lg,1.5rem)) var(--pf-c-tile--PaddingBottom,var(--pf-global--spacer--lg,1.5rem)) var(--pf-c-tile--PaddingLeft,var(--pf-global--spacer--lg,1.5rem));text-align:center;cursor:pointer;background-color:var(--pf-c-tile--BackgroundColor,var(--pf-global--BackgroundColor--100,var(--pf-global--BackgroundColor--light-100),#fff));grid-template-rows:-webkit-min-content;grid-template-rows:min-content;transition:var(--pf-c-tile--Transition, none);transform:translateY(var(--pf-c-tile--TranslateY,0))}:host::after,:host::before{position:absolute;pointer-events:none;content:""}:host::before{top:0;right:0;bottom:0;left:0;border:var(--pf-c-tile--before--BorderWidth,var(--pf-global--BorderWidth--sm,1px)) solid var(--pf-c-tile--before--BorderColor,var(--pf-global--BorderColor--100,#d2d2d2))}:host::after{right:0;bottom:0;left:0;height:var(--pf-c-tile--after--Height,var(--pf-global--BorderWidth--lg,3px));background-color:var(--pf-c-tile--after--BackgroundColor,transparent);transition:var(--pf-c-tile--after--Transition, none);transform:scaleY(var(--pf-c-tile--after--ScaleY,1)) translateY(var(--pf-c-tile--after--TranslateY,0))}:host(:hover){--pf-c-tile__title--Color:var(--pf-c-tile--hover__title--Color, var(--pf-global--primary-color--100, #06c));--pf-c-tile__icon--Color:var(--pf-c-tile--hover__icon--Color, var(--pf-global--primary-color--100, #06c));--pf-c-tile--after--BackgroundColor:var(--pf-c-tile--hover--after--BackgroundColor, var(--pf-global--active-color--400, #73bcf7))}:host(:focus){--pf-c-tile__title--Color:var(--pf-c-tile--focus__title--Color, var(--pf-global--primary-color--100, #06c));--pf-c-tile__icon--Color:var(--pf-c-tile--focus__icon--Color, var(--pf-global--primary-color--100, #06c));--pf-c-tile--after--BackgroundColor:var(--pf-c-tile--focus--after--BackgroundColor, var(--pf-global--active-color--400, #73bcf7))}:host(:active),:host([selected]){--pf-c-tile__title--Color:var(--pf-c-tile--m-selected__title--Color, var(--pf-global--primary-color--100, #06c));--pf-c-tile__icon--Color:var(--pf-c-tile--m-selected__icon--Color, var(--pf-global--primary-color--100, #06c));--pf-c-tile--TranslateY:var(--pf-c-tile--m-selected--TranslateY,\n                            calc(-1 * var(--pf-c-tile--m-selected--after--ScaleY, 2) * var(--pf-c-tile--m-selected--after--Height,\n                            var(--pf-global--BorderWidth--lg, 3px))));--pf-c-tile--Transition:var(--pf-c-tile--m-selected--Transition,\n                          var(--pf-global--Transition, all 250ms cubic-bezier(0.42, 0, 0.58, 1)));--pf-c-tile--after--Height:var(--pf-c-tile--m-selected--after--Height, var(--pf-global--BorderWidth--lg, 3px));--pf-c-tile--after--BackgroundColor:var(--pf-c-tile--m-selected--after--BackgroundColor, var(--pf-global--active-color--100, #06c));--pf-c-tile--after--Transition:var(--pf-c-tile--m-selected--after--Transition,\n                          var(--pf-global--Transition, all 250ms cubic-bezier(0.42, 0, 0.58, 1)));--pf-c-tile--after--ScaleY:var(--pf-c-tile--m-selected--after--ScaleY, 2)}:host([disabled]){--pf-c-tile--BackgroundColor:var(--pf-c-tile--m-disabled--BackgroundColor, var( --pf-global--disabled-color--300, #f0f0f0));--pf-c-tile__title--Color:var(--pf-c-tile--m-disabled__title--Color, var(--pf-global--disabled-color--100, #6a6e73));--pf-c-tile__body--Color:var(--pf-c-tile--m-disabled__body--Color,  var(--pf-global--disabled-color--100, #6a6e73));--pf-c-tile--before--BorderWidth:0;--pf-c-tile__icon--Color:var(--pf-c-tile--m-disabled__icon--Color, var(--pf-global--disabled-color--100, #6a6e73));pointer-events:none}[part=header]{display:flex;align-items:center;justify-content:center}[part=title]{color:var(--pf-c-tile__title--Color,var(--pf-global--Color--100,var(--pf-global--Color--dark-100,#151515)))}[part=body]{font-size:var(--pf-c-tile__body--FontSize, var(--pf-global--FontSize--xs, .75rem));color:var(--pf-c-tile__body--Color,var(--pf-global--Color--100,#151515))}[part=icon]{--_icon-size:var(--pf-c-tile__icon--FontSize: var(--pf-global--icon--FontSize--md, 1.125rem));--pf-icon--size:var(--_icon-size);margin-right:var(--pf-c-tile__icon--MarginRight,var(--pf-global--spacer--sm,.5rem));font-size:var(--_icon-size);color:var(--pf-c-tile__icon--Color,var(--pf-global--Color--100,#151515))}:host([stacked]) [part=header]{--pf-c-tile__icon--MarginRight:0;--_icon-size:var(--pf-c-tile__icon--FontSize, var(--pf-c-tile__header--m-stacked__icon--FontSize, var(--pf-global--icon--FontSize--lg, 1.5rem)));flex-direction:column;justify-content:initial}:host([stacked=lg]) [part=icon]{--_icon-size:var(--pf-c-tile__icon--FontSize, var(--pf-c-tile--m-display-lg__header--m-stacked__icon--FontSize, var(--pf-global--icon--FontSize--xl, 3.375rem)))}:host([stacked]) [part=icon]{display:flex;align-items:center;justify-content:center;margin-bottom:var(--pf-c-tile__header--m-stacked__icon--MarginBottom,var(--pf-global--spacer--xs,.25rem))}#body::slotted(:is(h1,h2,h3,h4,h5,h6,p)),#title::slotted(:is(h1,h2,h3,h4,h5,h6,p)){margin-block:0}`;
/**
 * A **tile** component is a form of selection that can be used in place of a
 * radio button and is commonly used in forms. A tile appears visually similar to a
 * [selectable card](../card/). However, tiles are used specifically when the user is selecting
 * a static option, whereas a selectable card triggers an action or opens a quickstart
 * or sidebar to provide additional information.
 *
 * @slot icon           - Icon expects a `<pf-icon>` or `<svg>`
 * @slot title          - the title of the tile should be a heading
 * @slot                - The content should be a paragraph
 *
 * @csspart icon        - container for the icon
 * @csspart title       - container for the title
 * @csspart body        - container for the body content
 *
 * @attr {'boolean'} selected       - selected variant
 * @attr {'md'|'lg'|null} stacked   - stacked variant
 *
 * @cssprop   {<length>} --pf-c-tile--PaddingTop      {@default `1.5rem`}
 * @cssprop   {<length>} --pf-c-tile--PaddingRight    {@default `1.5rem`}
 * @cssprop   {<length>} --pf-c-tile--PaddingBottom   {@default `1.5rem`}
 * @cssprop   {<length>} --pf-c-tile--PaddingLeft     {@default `1.5rem`}
 *
 * @cssprop   {<color>} --pf-c-tile--BackgroundColor  {@default `#FFFFFF`}
 *
 * @cssprop   --pf-c-tile--Transition {@default `none`}
 * @cssprop   --pf-c-tile--TranslateY {@default `0`}
 *
 * @cssprop   {<length>} --pf-c-tile--before--BorderWidth {@default `1px`}
 * @cssprop   {<color>} --pf-c-tile--before--BorderColor  {@default `#444548`}
 *
 * @cssprop   {<length>} --pf-c-tile--after--Height {@default `3px`}
 * @cssprop   {<color>} --pf-c-tile--after--BackgroundColor {@default `transparent`}
 *
 * @cssprop   --pf-c-tile--after--Transition {@default `none`}
 * @cssprop   --pf-c-tile--after--ScaleY {@default `1`}
 *
 * @cssprop   {<color>} --pf-c-tile__title--Color {@default `#06c`}
 * @cssprop   {<color>} --pf-c-tile__icon--Color {@default `#06c`}
 *
 * @cssprop   {<length>} --pf-c-tile__icon--MarginRight {@default `0`}
 * @cssprop   {<length>} --pf-c-tile__icon--FontSize {@default `1.5rem`}
 *
 * @cssprop   {<lenght>} --pf-c-tile__header--m-stacked__icon--MarginBottom {@default `0.25rem`}
 */
let PfTile = class PfTile extends BaseTile {
    constructor() {
        super(...arguments);
        this.selected = false;
    }
};
PfTile.styles = [styles];
__decorate([
    property({ reflect: true, type: Boolean })
], PfTile.prototype, "selected", void 0);
__decorate([
    property({ reflect: true })
], PfTile.prototype, "stacked", void 0);
PfTile = __decorate([
    customElement('pf-tile')
], PfTile);
export { PfTile };
