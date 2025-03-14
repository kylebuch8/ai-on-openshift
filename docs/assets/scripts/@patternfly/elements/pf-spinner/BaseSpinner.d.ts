import { LitElement } from 'lit';
export type SpinnerSize = ('sm' | 'md' | 'lg' | 'xl');
/**
 * Base spinner class
 *
 * @cssprop {<length>} --pf-c-spinner--diameter                      {@default `3.375rem`}
 * @cssprop {<length>} --pf-c-spinner--Width                         {@default `3.375rem`}
 * @cssprop {<length>} --pf-c-spinner--Height                        {@default `3.375rem`}
 * @cssprop {<color>}  --pf-c-spinner--Color                         {@default `#06c`}
 * @cssprop {<length>} --pf-c-spinner--m-sm--diameter                {@default `0.625rem`}
 * @cssprop {<length>} --pf-c-spinner--m-md--diameter                {@default `1.125rem`}
 * @cssprop {<length>} --pf-c-spinner--m-lg--diameter                {@default `1.5rem`}
 * @cssprop {<length>} --pf-c-spinner--m-xl--diameter                {@default `3.375rem`}
 * @cssprop {<time>}   --pf-c-spinner--AnimationDuration             {@default `1.4s`}
 * @cssprop {<string>} --pf-c-spinner--AnimationTimingFunction       {@default `linear`}
 * @cssprop {<number>} --pf-c-spinner--stroke-width                  {@default `10`}
 * @cssprop {<color>}  --pf-c-spinner__path--Stroke                  {@default `#06c`}
 * @cssprop {<number>} --pf-c-spinner__path--StrokeWidth             {@default `10`}
 * @cssprop {<string>} --pf-c-spinner__path--AnimationTimingFunction {@default `ease-in-out`}
 */
export declare abstract class BaseSpinner extends LitElement {
    static readonly styles: import("lit").CSSResult[];
    /** Preset sizes for the spinner */
    size: SpinnerSize;
    /** Custom diameter of spinner set as CSS variable */
    diameter?: `${string}${'px' | '%' | 'rem' | 'em' | 'fr' | 'pt'}`;
    render(): import("lit-html").TemplateResult<1>;
}
