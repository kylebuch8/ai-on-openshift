import { BaseLabel } from './BaseLabel.js';
import '@patternfly/elements/pf-button/pf-button.js';
export type LabelVariant = ('filled' | 'outline');
export type LabelColor = ('blue' | 'cyan' | 'green' | 'orange' | 'purple' | 'red' | 'grey' | 'gold');
/**
 * The **label** component allows users to add specific element captions for user
 * clarity and convenience.
 *
 * @summary Allows users to display meta data in a stylized form.
 *
 * @fires close - when a removable label's close button is clicked
 *
 * @cssprop {<length>} --pf-c-label--FontSize   {@default `0.875em`}
 *
 * @cssprop {<length>} --pf-c-label--PaddingTop     {@default `0.25rem`}
 * @cssprop {<length>} --pf-c-label--PaddingRight   {@default `0.5rem`}
 * @cssprop {<length>} --pf-c-label--PaddingBottom  {@default `0.25rem`}
 * @cssprop {<length>} --pf-c-label--PaddingLeft    {@default `0.5rem`}
 *
 * @cssprop {<color>} --pf-c-label--Color           {@default `#151515`}
 * @cssprop {<color>} --pf-c-label--BackgroundColor {@default `#f5f5f5`}
 *
 * @cssprop {<length>} --pf-c-label--BorderRadius {@default `30em`}
 *
 * @cssprop {<length>} --pf-c-label__content--MaxWidth            {@default `100%`}
 * @cssprop {<color>} --pf-c-label__content--Color                {@default `#151515`}
 * @cssprop {<length>} --pf-c-label__content--before--BorderWidth {@default `1px`}
 * @cssprop {<color>} --pf-c-label__content--before--BorderColor  {@default `#d2d2d2`}
 *
 * @cssprop {<color>} --pf-c-label--m-outline__content--Color  {@default `#151515`}
 * @cssprop {<color>} --pf-c-label--m-outline--BackgroundColor {@default `#ffffff`}
 *
 * @cssprop {<color>} --pf-c-label--m-blue__content--Color                {@default `#002952`}
 * @cssprop {<color>} --pf-c-label--m-blue--BackgroundColor               {@default `#e7f1fa`}
 * @cssprop {<color>} --pf-c-label--m-blue__content--before--BorderColor  {@default `#bee1f4`}
 * @cssprop {<color>} --pf-c-label--m-outline--m-blue__content--Color      {@default `#06c`}
 *
 * @cssprop {<color>} --pf-c-label--m-cyan__content--Color                {@default `#3b1f00`}
 * @cssprop {<color>} --pf-c-label--m-cyan--BackgroundColor               {@default `#f2f9f9`}
 * @cssprop {<color>} --pf-c-label--m-cyan__content--before--BorderColor  {@default `#a2d9d9`}
 * @cssprop {<color>} --pf-c-label--m-outline--m-cyan__content--Color      {@default `#005f60`}
 *
 * @cssprop {<color>} --pf-c-label--m-green__content--Color                {@default `#1e4f18`}
 * @cssprop {<color>} --pf-c-label--m-green--BackgroundColor               {@default `#f3faf2`}
 * @cssprop {<color>} --pf-c-label--m-green__content--before--BorderColor  {@default `#bde5b8`}
 * @cssprop {<color>} --pf-c-label--m-outline--m-green__content--Color     {@default `#3e8635`}
 *
 * @cssprop {<color>} --pf-c-label--m-orange__content--Color                {@default `#003737`}
 * @cssprop {<color>} --pf-c-label--m-orange--BackgroundColor               {@default `#fff6ec`}
 * @cssprop {<color>} --pf-c-label--m-orange__content--before--BorderColor  {@default `#f4b678`}
 * @cssprop {<color>} --pf-c-label--m-outline--m-orange__content--Color     {@default `#8f4700`}
 *
 * @cssprop {<color>} --pf-c-label--m-purple__content--Color                {@default `#1f0066`}
 * @cssprop {<color>} --pf-c-label--m-purple--BackgroundColor               {@default `#f2f0fc`}
 * @cssprop {<color>} --pf-c-label--m-purple__content--before--BorderColor  {@default `#cbc1ff`}
 * @cssprop {<color>} --pf-c-label--m-outline--m-purple__content--Color     {@default `#6753ac`}
 *
 * @cssprop {<color>} --pf-c-label--m-red__content--Color                {@default `#7d1007`}
 * @cssprop {<color>} --pf-c-label--m-red--BackgroundColor               {@default `#faeae8`}
 * @cssprop {<color>} --pf-c-label--m-red__content--before--BorderColor  {@default `#c9190b`}
 * @cssprop {<color>} --pf-c-label--m-outline--m-red__content--Color     {@default `#c9190b`}
 *
 * @cssprop {<color>} --pf-c-label--m-gold__content--Color                {@default `#3d2c00`}
 * @cssprop {<color>} --pf-c-label--m-gold--BackgroundColor               {@default `#fdf7e7`}
 * @cssprop {<color>} --pf-c-label--m-gold__content--before--BorderColor  {@default `#f9e0a2`}
 * @cssprop {<color>} --pf-c-label--m-outline--m-gold__content--Color     {@default `#795600`}

 * @cssprop {<color>} --pf-c-label--m-blue__icon--Color {@default `#06c`}
 * @cssprop {<color>} --pf-c-label--m-cyan__icon--Color {@default `#009596`}
 * @cssprop {<color>} --pf-c-label--m-green__icon--Color {@default `#3e8635`}
 * @cssprop {<color>} --pf-c-label--m-orange__icon--Color {@default `#ec7a08`}
 * @cssprop {<color>} --pf-c-label--m-red__icon--Color {@default `#c9190b`}
 * @cssprop {<color>} --pf-c-label--m-gold__icon--Color {@default `#f0ab00`}
 *
 * @csspart icon - container for the label icon
 * @csspart close-button - container for removable labels' close button
 *
 * @slot icon
 *       Contains the labels's icon, e.g. web-icon-alert-success.
 *
 * @slot
 *       Must contain the text for the label.
 *
 * @cssprop {<length>} --pf-c-label--m-compact--PaddingTop     {@default `0`}
 * @cssprop {<length>} --pf-c-label--m-compact--PaddingRight   {@default `0.5rem`}
 * @cssprop {<length>} --pf-c-label--m-compact--PaddingBottom  {@default `0`}
 * @cssprop {<length>} --pf-c-label--m-compact--PaddingLeft    {@default `0.5rem`}
 */
export declare class PfLabel extends BaseLabel {
    static readonly styles: import("lit").CSSResult[];
    static readonly shadowRootOptions: ShadowRootInit;
    /**
     * Changes the style of the label.
     * - Filled: Colored background with colored border.
     * - Outline: White background with colored border.
     */
    variant: LabelVariant;
    /**
     * Changes the color of the label
     */
    color: LabelColor;
    /** Shorthand for the `icon` slot, the value is icon name */
    icon?: string;
    /** Flag indicating the label is compact */
    compact: boolean;
    /** Flag indicating the label text should be truncated */
    truncated: boolean;
    /** Flag indicating the label is removable */
    removable: boolean;
    /** Text label for a removable label's close button */
    closeButtonLabel?: string;
    render(): import("lit-html").TemplateResult<1>;
    protected renderDefaultIcon(): import("lit-html").TemplateResult<1> | "";
    protected renderSuffix(): import("lit-html").TemplateResult<1> | "";
}
declare global {
    interface HTMLElementTagNameMap {
        'pf-label': PfLabel;
    }
}
