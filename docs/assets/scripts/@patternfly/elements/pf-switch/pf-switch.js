import { __decorate } from "tslib";
import { customElement } from 'lit/decorators/custom-element.js';
import { BaseSwitch } from './BaseSwitch.js';
import { css } from "lit";
const styles = css `:host([checked]) #container{color:var(--pf-c-switch__input--checked__label--Color,var(--pf-global--Color--dark-100,#151515));background-color:var(--pf-c-switch__input--checked__toggle--BackgroundColor,var(--pf-global--primary-color--100,#06c))}:host([checked]) #container::before{translate:var(--pf-c-switch__input--checked__toggle--before--TranslateX,calc(100% + var(--pf-c-switch__toggle-icon--Offset,0.125rem)))}:host(:disabled) #container{color:var(--pf-c-switch__input--disabled__label--Color,var(--pf-global--disabled-color--100,#6a6e73));background-color:var(--pf-c-switch__input--disabled__toggle--BackgroundColor,var(--pf-global--disabled-color--200,#d2d2d2))}:host(:disabled) #container::before{background-color:var(--pf-c-switch__input--disabled__toggle--before--BackgroundColor,var(--pf-global--palette--black-150,#f5f5f5))}:host([checked]:disabled) #container::before{translate:var(--pf-c-switch__input--checked__toggle--before--TranslateX,calc(100% + var(--pf-c-switch__toggle-icon--Offset,0.125rem)))}#container{width:var(--pf-c-switch__toggle--Width,calc(var(--pf-c-switch__toggle--Height,calc(var(--pf-c-switch--FontSize,var(--pf-global--FontSize--md,1rem)) * var(--pf-c-switch--LineHeight,var(--pf-global--LineHeight--md,1.5)))) + var(--pf-c-switch__toggle-icon--Offset,.125rem) + var(--pf-c-switch__toggle--before--Width,calc(var(--pf-c-switch--FontSize,var(--pf-global--FontSize--md,1rem)) - var(--pf-c-switch__toggle-icon--Offset,.125rem)))));height:var(--pf-c-switch__toggle--Height,calc(var(--pf-c-switch--FontSize,var(--pf-global--FontSize--md,1rem)) * var(--pf-c-switch--LineHeight,var(--pf-global--LineHeight--md,1.5))));background-color:var(--pf-c-switch__toggle--BackgroundColor,var(--pf-global--palette--black-500,#8a8d90));border-radius:var(--pf-c-switch__toggle--BorderRadius,var(--pf-c-switch__toggle--Height,calc(var(--pf-c-switch--FontSize,var(--pf-global--FontSize--md,1rem)) * var(--pf-c-switch--LineHeight,var(--pf-global--LineHeight--md,1.5)))))}#container::before{top:var(--pf-c-switch__toggle--before--Top,calc((var(--pf-c-switch__toggle--Height,calc(var(--pf-c-switch--FontSize,var(--pf-global--FontSize--md,1rem)) * var(--pf-c-switch--LineHeight,var(--pf-global--LineHeight--md,1.5)))) - var(--pf-c-switch__toggle--before--Height,var(--pf-c-switch__toggle--before--Width,calc(var(--pf-c-switch--FontSize,var(--pf-global--FontSize--md,1rem)) - var(--pf-c-switch__toggle-icon--Offset,.125rem)))))/ 2));left:var(--pf-c-switch__toggle--before--Left,var(--pf-c-switch__toggle--before--Top,calc((var(--pf-c-switch__toggle--Height,calc(var(--pf-c-switch--FontSize,var(--pf-global--FontSize--md,1rem)) * var(--pf-c-switch--LineHeight,var(--pf-global--LineHeight--md,1.5)))) - var(--pf-c-switch__toggle--before--Height,var(--pf-c-switch__toggle--before--Width,calc(var(--pf-c-switch--FontSize,var(--pf-global--FontSize--md,1rem)) - var(--pf-c-switch__toggle-icon--Offset,.125rem)))))/ 2)));width:var(--pf-c-switch__toggle--before--Width,calc(var(--pf-c-switch--FontSize,var(--pf-global--FontSize--md,1rem)) - var(--pf-c-switch__toggle-icon--Offset,.125rem)));height:var(--pf-c-switch__toggle--before--Height,var(--pf-c-switch__toggle--before--Width,calc(var(--pf-c-switch--FontSize,var(--pf-global--FontSize--md,1rem)) - var(--pf-c-switch__toggle-icon--Offset,.125rem))));background-color:var(--pf-c-switch__toggle--before--backgroundcolor,var(--pf-global--backgroundcolor--100,#fff));border-radius:var(--pf-c-switch__toggle--before--BorderRadius,var(--pf-global--BorderRadius--lg,30em));box-shadow:var(--pf-c-switch__toggle--before--BoxShadow,var(--pf-global--BoxShadow--md,0 .25rem .5rem 0 rgba(3,3,3,.12),0 0 .25rem 0 rgba(3,3,3,.06)));transition:var(--pf-c-switch__toggle--before--Transition,\n    var(--pf-c-switch__toggle--before--Transition, translate .25s ease 0s))}:host(:focus-within) #container{outline:var(--pf-c-switch__input--focus__toggle--OutlineWidth,var(--pf-global--BorderWidth--md,2px)) solid var(--pf-c-switch__input--focus__toggle--OutlineColor,var(--pf-global--primary-color--100,#06c));outline-offset:var(--pf-c-switch__input--focus__toggle--OutlineOffset,var(--pf-global--spacer--sm,0.5rem))}svg{margin-inline:var(--pf-c-switch__toggle-icon--Left,calc(var(--pf-c-switch--FontSize,var(--pf-global--FontSize--md,1rem)) * .4));font-size:var(--pf-c-switch__toggle-icon--FontSize,\n    calc(var(--pf-c-switch--FontSize,\n      var(--pf-global--FontSize--md, 1rem)) * .625));color:var(--pf-c-switch__toggle-icon--Color,var(--pf-global--Color--light-100,#fff))}`;
/**
 * A **switch** toggles the state of a setting (between on and off). Switches and
 * checkboxes can often be used interchangeably, but the switch provides a more
 * explicit, visible representation on a setting.
 *
 * @fires {Event} change - Fires when the switch selection changes.
 *
 * @cssprop --pf-c-switch--FontSize {@default `1rem`}
 * @cssprop {<length>} --pf-c-switch--ColumnGap {@default `1rem`}
 * @cssprop --pf-c-switch__toggle-icon--FontSize {@default `calc(1rem * .625)`}
 * @cssprop {<color>} --pf-c-switch__toggle-icon--Color {@default `#fff`}
 * @cssprop {<length>} --pf-c-switch__toggle-icon--Left {@default `1rem`}
 * @cssprop {<length>} --pf-c-switch__toggle-icon--Offset {@default `0.125rem`}
 * @cssprop {<number>} --pf-c-switch--LineHeight {@default `1.5`}
 * @cssprop {<length>} --pf-c-switch--Height {@default `auto`}
 * @cssprop {<color>} --pf-c-switch__input--checked__toggle--BackgroundColor {@default `#06c`}
 * @cssprop {<length>} --pf-c-switch__input--checked__toggle--before--TranslateX {@default `calc(100% + 0.125rem)`}
 * @cssprop {<color>} --pf-c-switch__input--checked__label--Color {@default `#151515`}
 * @cssprop {<color>} --pf-c-switch__input--not-checked__label--Color {@default `#6a6e73`}
 * @cssprop {<color>} --pf-c-switch__input--disabled__label--Color {@default `#6a6e73`}
 * @cssprop {<color>} --pf-c-switch__input--disabled__toggle--BackgroundColor {@default `#d2d2d2`}
 * @cssprop {<color>} --pf-c-switch__input--disabled__toggle--before--BackgroundColor {@default `#f5f5f5`}
 * @cssprop {<length>} --pf-c-switch__input--focus__toggle--OutlineWidth {@default `2px`}
 * @cssprop {<length>} --pf-c-switch__input--focus__toggle--OutlineOffset {@default `0.5rem`}
 * @cssprop {<color>} --pf-c-switch__input--focus__toggle--OutlineColor {@default `#06c`}
 * @cssprop {<length>} --pf-c-switch__toggle--Height {@default `calc(1rem * 1.5)`}
 * @cssprop {<color>} --pf-c-switch__toggle--BackgroundColor {@default `#8a8d90`}
 * @cssprop {<length>} --pf-c-switch__toggle--BorderRadius {@default `calc(1rem * 1.5)`}
 * @cssprop {<length>} --pf-c-switch__toggle--before--Width {@default `calc(1rem - 0.125rem)`}
 * @cssprop {<length>} --pf-c-switch__toggle--before--Height {@default `calc(1rem - 0.125rem)`}
 * @cssprop {<length>} --pf-c-switch__toggle--before--Top {@default calc((calc(1rem * 1.5) - calc(1rem - 0.125rem)) / 2)`}
 * @cssprop {<length>} --pf-c-switch__toggle--before--Left {@default `calc((calc(1rem * 1.5) - calc(1rem - 0.125rem)) / 2)`}
 * @cssprop {<color>} --pf-c-switch__toggle--before--BackgroundColor {@default `#fff`}
 * @cssprop {<length>} --pf-c-switch__toggle--before--BorderRadius {@default `30em`}
 * @cssprop --pf-c-switch__toggle--before--BoxShadow {@default `0 0.25rem 0.5rem 0rem rgba(3, 3, 3, 0.12), 0 0 0.25rem 0 rgba(3, 3, 3, 0.06)`}
 * @cssprop --pf-c-switch__toggle--before--Transition {@default `transform .25s ease 0s`}
 * @cssprop {<length>} --pf-c-switch__toggle--Width {@default `calc(calc(1rem * 1.5) + 0.125rem + calc(1rem - 0.125rem))`}
 */
let PfSwitch = class PfSwitch extends BaseSwitch {
};
PfSwitch.styles = [...BaseSwitch.styles, styles];
PfSwitch = __decorate([
    customElement('pf-switch')
], PfSwitch);
export { PfSwitch };
