var _PfTextInput_instances, _PfTextInput_internals, _PfTextInput_derivedLabel, _PfTextInput_input_get, _PfTextInput_onInput, _PfTextInput_setValidityFromInput;
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { css } from "lit";
const styles = css `:host{--pf-c-form-control--Color:var(--pf-global--Color--100, #151515);--pf-c-form-control--FontSize:var(--pf-global--FontSize--md, 1rem);--pf-c-form-control--LineHeight:var(--pf-global--LineHeight--md, 1.5);--pf-c-form-control--BorderWidth:var(--pf-global--BorderWidth--sm, 1px);--pf-c-form-control--BorderTopColor:var(--pf-global--BorderColor--300, #f0f0f0);--pf-c-form-control--BorderRightColor:var(--pf-global--BorderColor--300, #f0f0f0);--pf-c-form-control--BorderBottomColor:var(--pf-global--BorderColor--200, #8a8d90);--pf-c-form-control--BorderLeftColor:var(--pf-global--BorderColor--300, #f0f0f0);--pf-c-form-control--BorderRadius:0;--pf-c-form-control--BackgroundColor:var(--pf-global--BackgroundColor--100, #fff);--pf-c-form-control--Width:100%;--pf-c-form-control--Height:calc(var(--pf-c-form-control--FontSize) * var(--pf-c-form-control--LineHeight) + var(--pf-c-form-control--BorderWidth) * 2 + var(--pf-c-form-control--PaddingTop) + var(--pf-c-form-control--PaddingBottom));--pf-c-form-control--inset--base:var(--pf-global--spacer--sm, 0.5rem);--pf-c-form-control--PaddingTop:calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-global--BorderWidth--sm, 1px));--pf-c-form-control--PaddingBottom:calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-global--BorderWidth--sm, 1px));--pf-c-form-control--PaddingRight:var(--pf-c-form-control--inset--base);--pf-c-form-control--PaddingLeft:var(--pf-c-form-control--inset--base);--pf-c-form-control--hover--BorderBottomColor:var(--pf-global--primary-color--100, #06c);--pf-c-form-control--focus--BorderBottomWidth:var(--pf-global--BorderWidth--md, 2px);--pf-c-form-control--focus--PaddingBottom:calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-c-form-control--focus--BorderBottomWidth));--pf-c-form-control--focus--BorderBottomColor:var(--pf-global--primary-color--100, #06c);--pf-c-form-control--m-expanded--BorderBottomWidth:var(--pf-global--BorderWidth--md, 2px);--pf-c-form-control--m-expanded--PaddingBottom:calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-c-form-control--focus--BorderBottomWidth));--pf-c-form-control--m-expanded--BorderBottomColor:var(--pf-global--primary-color--100, #06c);--pf-c-form-control--placeholder--Color:var(--pf-global--Color--dark-200, #6a6e73);--pf-c-form-control--placeholder--child--Color:var(--pf-global--Color--100, #151515);--pf-c-form-control--disabled--Color:var(--pf-global--disabled-color--100, #6a6e73);--pf-c-form-control--disabled--BackgroundColor:var(--pf-global--disabled-color--300, #f0f0f0);--pf-c-form-control--disabled--BorderColor:transparent;--pf-c-form-control--readonly--BackgroundColor:var(--pf-global--disabled-color--300, #f0f0f0);--pf-c-form-control--readonly--hover--BorderBottomColor:var(--pf-global--BorderColor--200, #8a8d90);--pf-c-form-control--readonly--focus--PaddingBottom:calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-global--BorderWidth--sm, 1px));--pf-c-form-control--readonly--focus--BorderBottomWidth:var(--pf-global--BorderWidth--sm, 1px);--pf-c-form-control--readonly--focus--BorderBottomColor:var(--pf-global--BorderColor--200, #8a8d90);--pf-c-form-control--readonly--m-plain--BackgroundColor:transparent;--pf-c-form-control--readonly--m-plain--inset--base:0;--pf-c-form-control--success--BorderBottomWidth:var(--pf-global--BorderWidth--md, 2px);--pf-c-form-control--success--PaddingBottom:calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-c-form-control--success--BorderBottomWidth));--pf-c-form-control--success--BorderBottomColor:var(--pf-global--success-color--100, #3e8635);--pf-c-form-control--success--PaddingRight:var(--pf-global--spacer--xl, 2rem);--pf-c-form-control--success--BackgroundPositionX:calc(100% - var(--pf-c-form-control--PaddingLeft));--pf-c-form-control--success--BackgroundPositionY:center;--pf-c-form-control--success--BackgroundPosition:var(--pf-c-form-control--success--BackgroundPositionX) var(--pf-c-form-control--success--BackgroundPositionY);--pf-c-form-control--success--BackgroundSizeX:var(--pf-c-form-control--FontSize);--pf-c-form-control--success--BackgroundSizeY:var(--pf-c-form-control--FontSize);--pf-c-form-control--success--BackgroundSize:var(--pf-c-form-control--success--BackgroundSizeX) var(--pf-c-form-control--success--BackgroundSizeY);--pf-c-form-control--success--BackgroundUrl:url('data:image/svg+xml;charset=utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"%3E%3Cpath fill="%235ba352" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/%3E%3C/svg%3E');--pf-c-form-control--m-warning--BorderBottomWidth:var(--pf-global--BorderWidth--md, 2px);--pf-c-form-control--m-warning--PaddingBottom:calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-c-form-control--m-warning--BorderBottomWidth));--pf-c-form-control--m-warning--BorderBottomColor:var(--pf-global--warning-color--100, #f0ab00);--pf-c-form-control--m-warning--PaddingRight:var(--pf-global--spacer--xl, 2rem);--pf-c-form-control--m-warning--BackgroundPositionX:calc(100% - calc(var(--pf-c-form-control--PaddingLeft) - 0.0625rem));--pf-c-form-control--m-warning--BackgroundPositionY:center;--pf-c-form-control--m-warning--BackgroundPosition:var(--pf-c-form-control--m-warning--BackgroundPositionX) var(--pf-c-form-control--m-warning--BackgroundPositionY);--pf-c-form-control--m-warning--BackgroundSizeX:1.25rem;--pf-c-form-control--m-warning--BackgroundSizeY:var(--pf-c-form-control--FontSize);--pf-c-form-control--m-warning--BackgroundSize:var(--pf-c-form-control--m-warning--BackgroundSizeX) var(--pf-c-form-control--m-warning--BackgroundSizeY);--pf-c-form-control--m-warning--BackgroundUrl:url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23f0ab00' d='M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'/%3E%3C/svg%3E");--pf-c-form-control--invalid--BorderBottomWidth:var(--pf-global--BorderWidth--md, 2px);--pf-c-form-control--invalid--PaddingBottom:calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-c-form-control--invalid--BorderBottomWidth));--pf-c-form-control--invalid--BorderBottomColor:var(--pf-global--danger-color--100, #c9190b);--pf-c-form-control--invalid--PaddingRight:var(--pf-global--spacer--xl, 2rem);--pf-c-form-control--invalid--BackgroundPositionX:calc(100% - var(--pf-c-form-control--PaddingLeft));--pf-c-form-control--invalid--BackgroundPositionY:center;--pf-c-form-control--invalid--BackgroundPosition:var(--pf-c-form-control--invalid--BackgroundPositionX) var(--pf-c-form-control--invalid--BackgroundPositionY);--pf-c-form-control--invalid--BackgroundSizeX:var(--pf-c-form-control--FontSize);--pf-c-form-control--invalid--BackgroundSizeY:var(--pf-c-form-control--FontSize);--pf-c-form-control--invalid--BackgroundSize:var(--pf-c-form-control--invalid--BackgroundSizeX) var(--pf-c-form-control--invalid--BackgroundSizeY);--pf-c-form-control--invalid--BackgroundUrl:url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23fe5142' d='M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'/%3E%3C/svg%3E");--pf-c-form-control--invalid--exclamation--Background:var(--pf-c-form-control--invalid--BackgroundUrl) var(--pf-c-form-control--invalid--BackgroundPosition)/var(--pf-c-form-control--invalid--BackgroundSize) no-repeat;--pf-c-form-control--invalid--Background:var(--pf-c-form-control--BackgroundColor) var(--pf-c-form-control--invalid--exclamation--Background);--pf-c-form-control--m-search--PaddingLeft:var(--pf-global--spacer--xl, 2rem);--pf-c-form-control--m-search--BackgroundPosition:var(--pf-c-form-control--PaddingRight);--pf-c-form-control--m-search--BackgroundSize:var(--pf-c-form-control--FontSize) var(--pf-c-form-control--FontSize);--pf-c-form-control--m-search--BackgroundUrl:url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23aaabac' d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'/%3E%3C/svg%3E");--pf-c-form-control--m-icon--PaddingRight:calc(var(--pf-c-form-control--inset--base) + var(--pf-c-form-control--m-icon--BackgroundSizeX) + var(--pf-c-form-control--m-icon--icon--spacer));--pf-c-form-control--m-icon--BackgroundUrl:none;--pf-c-form-control--m-icon--BackgroundPositionX:calc(100% - var(--pf-c-form-control--inset--base));--pf-c-form-control--m-icon--BackgroundPositionY:center;--pf-c-form-control--m-icon--BackgroundSizeX:var(--pf-c-form-control--FontSize);--pf-c-form-control--m-icon--BackgroundSizeY:var(--pf-c-form-control--FontSize);--pf-c-form-control--m-icon--icon--spacer:var(--pf-global--spacer--sm, 0.5rem);--pf-c-form-control--m-icon--icon--PaddingRight:calc(var(--pf-c-form-control--inset--base) + var(--pf-c-form-control--invalid--BackgroundSizeX) + var(--pf-c-form-control--m-icon--icon--spacer) + var(--pf-c-form-control--m-icon--BackgroundSizeX) + var(--pf-c-form-control--m-icon--icon--spacer));--pf-c-form-control--m-icon--icon--BackgroundPositionX:calc(var(--pf-c-form-control--m-icon--BackgroundPositionX) - var(--pf-c-form-control--m-icon--icon--spacer) - var(--pf-c-form-control--invalid--BackgroundSizeX));--pf-c-form-control--m-icon--invalid--BackgroundUrl:var(--pf-c-form-control--invalid--BackgroundUrl),var(--pf-c-form-control--m-icon--BackgroundUrl);--pf-c-form-control--m-icon--invalid--BackgroundPosition:var(--pf-c-form-control--invalid--BackgroundPosition),var(--pf-c-form-control--m-icon--icon--BackgroundPositionX) var(--pf-c-form-control--m-icon--BackgroundPositionY);--pf-c-form-control--m-icon--invalid--BackgroundSize:var(--pf-c-form-control--invalid--BackgroundSize),var(--pf-c-form-control--m-icon--BackgroundSizeX) var(--pf-c-form-control--m-icon--BackgroundSizeY);--pf-c-form-control--m-icon--success--BackgroundUrl:var(--pf-c-form-control--success--BackgroundUrl),var(--pf-c-form-control--m-icon--BackgroundUrl);--pf-c-form-control--m-icon--success--BackgroundPosition:var(--pf-c-form-control--success--BackgroundPosition),var(--pf-c-form-control--m-icon--icon--BackgroundPositionX) var(--pf-c-form-control--m-icon--BackgroundPositionY);--pf-c-form-control--m-icon--success--BackgroundSize:var(--pf-c-form-control--success--BackgroundSize),var(--pf-c-form-control--m-icon--BackgroundSizeX) var(--pf-c-form-control--m-icon--BackgroundSizeY);--pf-c-form-control--m-icon--m-warning--BackgroundUrl:var(--pf-c-form-control--m-warning--BackgroundUrl),var(--pf-c-form-control--m-icon--BackgroundUrl);--pf-c-form-control--m-icon--m-warning--BackgroundPosition:var(--pf-c-form-control--m-warning--BackgroundPosition),var(--pf-c-form-control--m-icon--icon--BackgroundPositionX) var(--pf-c-form-control--m-icon--BackgroundPositionY);--pf-c-form-control--m-icon--m-warning--BackgroundSize:var(--pf-c-form-control--m-warning--BackgroundSize),var(--pf-c-form-control--m-icon--BackgroundSizeX) var(--pf-c-form-control--m-icon--BackgroundSizeY);--pf-c-form-control--m-calendar--BackgroundUrl:url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23aaabac' d='M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z'/%3E%3C/svg%3E");--pf-c-form-control--m-clock--BackgroundUrl:url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23aaabac' d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z'/%3E%3C/svg%3E");--pf-c-form-control__select--PaddingRight:calc(var(--pf-global--spacer--lg, 1.5rem) + var(--pf-c-form-control--BorderWidth) + var(--pf-c-form-control--BorderWidth));--pf-c-form-control__select--PaddingLeft:calc(var(--pf-global--spacer--sm, 0.5rem) - var(--pf-c-form-control--BorderWidth));--pf-c-form-control__select--BackgroundUrl:url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%23urrentColor' d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'/%3E%3C/svg%3E");--pf-c-form-control__select--BackgroundSize:.625em;--pf-c-form-control__select--BackgroundPositionX:calc(100% - var(--pf-global--spacer--md, 1rem) + 1px);--pf-c-form-control__select--BackgroundPositionY:center;--pf-c-form-control__select--BackgroundPosition:var(--pf-c-form-control__select--BackgroundPositionX) var(--pf-c-form-control__select--BackgroundPositionY);--pf-c-form-control__select--success--PaddingRight:var(--pf-global--spacer--3xl, 4rem);--pf-c-form-control__select--success--BackgroundPosition:calc(var(--pf-c-form-control__select--BackgroundPositionX) - var(--pf-global--spacer--lg, 1.5rem));--pf-c-form-control__select--m-warning--PaddingRight:var(--pf-global--spacer--3xl, 4rem);--pf-c-form-control__select--m-warning--BackgroundPosition:calc(var(--pf-c-form-control__select--BackgroundPositionX) - var(--pf-global--spacer--lg, 1.5rem) + 0.0625rem);--pf-c-form-control__select--invalid--PaddingRight:var(--pf-global--spacer--3xl, 4rem);--pf-c-form-control__select--invalid--BackgroundPosition:calc(var(--pf-c-form-control__select--BackgroundPositionX) - var(--pf-global--spacer--lg, 1.5rem));--pf-c-form-control--textarea--Width:var(--pf-c-form-control--Width);--pf-c-form-control--textarea--Height:auto;--pf-c-form-control--textarea--success--BackgroundPositionY:var(--pf-c-form-control--PaddingLeft);--pf-c-form-control--textarea--m-warning--BackgroundPositionY:var(--pf-c-form-control--PaddingLeft);--pf-c-form-control--textarea--invalid--BackgroundPositionY:var(--pf-c-form-control--PaddingLeft);--pf-c-form-control--m-icon-sprite--success--BackgroundUrl:url(/v4/images/status-icon-sprite.4fee9fefc3971799d2dd4de0a15617f0.svg#success);--pf-c-form-control--m-icon-sprite--m-warning--BackgroundUrl:url(/v4/images/status-icon-sprite.4fee9fefc3971799d2dd4de0a15617f0.svg#warning);--pf-c-form-control--m-icon-sprite--invalid--BackgroundUrl:url(/v4/images/status-icon-sprite.4fee9fefc3971799d2dd4de0a15617f0.svg#invalid);--pf-c-form-control--m-icon-sprite__select--BackgroundUrl:url(/v4/images/status-icon-sprite.4fee9fefc3971799d2dd4de0a15617f0.svg#select);--pf-c-form-control--m-icon-sprite--m-search--BackgroundUrl:url(/v4/images/status-icon-sprite.4fee9fefc3971799d2dd4de0a15617f0.svg#search);--pf-c-form-control--m-icon-sprite--m-calendar--BackgroundUrl:url(/v4/images/status-icon-sprite.4fee9fefc3971799d2dd4de0a15617f0.svg#calendar);--pf-c-form-control--m-icon-sprite--m-clock--BackgroundUrl:url(/v4/images/status-icon-sprite.4fee9fefc3971799d2dd4de0a15617f0.svg#clock);--pf-c-form-control--m-icon-sprite__select--BackgroundSize:var(--pf-c-form-control--FontSize);--pf-c-form-control--m-icon-sprite__select--BackgroundPositionX:calc(100% - var(--pf-global--spacer--md, 1rem) + 7px);--pf-c-form-control--m-icon-sprite__select--success--BackgroundPosition:calc(100% - var(--pf-global--spacer--md, 1rem) + 1px - var(--pf-global--spacer--lg, 1.5rem));--pf-c-form-control--m-icon-sprite__select--m-warning--BackgroundPosition:calc(100% - var(--pf-global--spacer--md, 1rem) - var(--pf-global--spacer--lg, 1.5rem) + 0.0625rem);--pf-c-form-control--m-icon-sprite__select--invalid--BackgroundPosition:calc(100% - var(--pf-global--spacer--md, 1rem) - var(--pf-global--spacer--lg, 1.5rem));display:inline-block;max-width:calc(100% - var(--pf-c-form-control--PaddingRight) - var(--pf-c-form-control--PaddingLeft))}input{color:var(--pf-c-form-control--Color);width:var(--pf-c-form-control--Width);padding:var(--pf-c-form-control--PaddingTop) var(--pf-c-form-control--PaddingRight) var(--pf-c-form-control--PaddingBottom) var(--pf-c-form-control--PaddingLeft);font-size:var(--pf-c-form-control--FontSize);line-height:var(--pf-c-form-control--LineHeight);background-color:var(--pf-c-form-control--BackgroundColor);background-repeat:no-repeat;border:var(--pf-c-form-control--BorderWidth) solid;border-color:var(--pf-c-form-control--BorderTopColor) var(--pf-c-form-control--BorderRightColor) var(--pf-c-form-control--BorderBottomColor) var(--pf-c-form-control--BorderLeftColor);border-radius:var(--pf-c-form-control--BorderRadius);height:var(--pf-c-form-control--Height);text-overflow:ellipsis;appearance:none;-moz-appearance:none;-webkit-appearance:none}input:disabled{--pf-c-form-control--BackgroundColor:var(--pf-c-form-control--disabled--BackgroundColor);color:var(--pf-c-form-control--disabled--Color);cursor:not-allowed;border-color:var(--pf-c-form-control--disabled--BorderColor)}input:hover{--pf-c-form-control--BorderBottomColor:var(--pf-c-form-control--hover--BorderBottomColor)}input::placeholder{color:var(--pf-c-form-control--placeholder--Color)}:host([left-truncated]){position:relative}:host([left-truncated]) input:not(:focus){direction:rtl;text-overflow:ellipsis}:host([readonly]) input{background-color:var(--pf-c-form-control--readonly--BackgroundColor)}:host([readonly][plain]){--pf-c-form-control--readonly--BackgroundColor:var(--pf-c-form-control--readonly--m-plain--BackgroundColor);--pf-c-form-control--inset--base:var(--pf-c-form-control--readonly--m-plain--inset--base)}:host([readonly][plain]) input{border-color:transparent}:host(:invalid){--pf-c-form-control--PaddingRight:var(--pf-c-form-control--invalid--PaddingRight);--pf-c-form-control--BorderBottomColor:var(--pf-c-form-control--invalid--BorderBottomColor)}:host(:invalid) input{padding-bottom:var(--pf-c-form-control--invalid--PaddingBottom);background-image:var(--pf-c-form-control--invalid--BackgroundUrl);background-position:var(--pf-c-form-control--invalid--BackgroundPosition);background-size:var(--pf-c-form-control--invalid--BackgroundSize);border-bottom-width:var(--pf-c-form-control--invalid--BorderBottomWidth)}:host([custom-icon-url]),:host([icon]){--pf-c-form-control--PaddingRight:var(--pf-c-form-control--m-icon--PaddingRight)}:host([custom-icon-url]) input,:host([icon]) input{background-image:var(--pf-c-form-control--m-icon--BackgroundUrl);background-position:var(--pf-c-form-control--m-icon--BackgroundPositionX) var(--pf-c-form-control--m-icon--BackgroundPositionY);background-size:var(--pf-c-form-control--m-icon--BackgroundSizeX) var(--pf-c-form-control--m-icon--BackgroundSizeY)}:host([icon=calendar]){--pf-c-form-control--m-icon--BackgroundUrl:var(--pf-c-form-control--m-calendar--BackgroundUrl)}:host([icon=clock]){--pf-c-form-control--m-icon--BackgroundUrl:var(--pf-c-form-control--m-clock--BackgroundUrl)}:host([validated=success]){--pf-c-form-control--PaddingRight:var(--pf-c-form-control--success--PaddingRight);--pf-c-form-control--BorderBottomColor:var(--pf-c-form-control--success--BorderBottomColor)}:host([validated=success]) input{padding-bottom:var(--pf-c-form-control--success--PaddingBottom);background-image:var(--pf-c-form-control--success--BackgroundUrl);background-position:var(--pf-c-form-control--success--BackgroundPosition);background-size:var(--pf-c-form-control--success--BackgroundSize);border-bottom-width:var(--pf-c-form-control--success--BorderBottomWidth)}:host([validated=warning]){--pf-c-form-control--PaddingRight:var(--pf-c-form-control--m-warning--PaddingRight);--pf-c-form-control--BorderBottomColor:var(--pf-c-form-control--m-warning--BorderBottomColor)}:host([validated=warning]) input{padding-bottom:var(--pf-c-form-control--m-warning--PaddingBottom);background-image:var(--pf-c-form-control--m-warning--BackgroundUrl);background-position:var(--pf-c-form-control--m-warning--BackgroundPosition);background-size:var(--pf-c-form-control--m-warning--BackgroundSize);border-bottom-width:var(--pf-c-form-control--m-warning--BorderBottomWidth)}`;
function getLabelText(label) {
    if (label.hidden) {
        return '';
    }
    else {
        const ariaLabel = label.getAttribute?.('aria-label');
        return ariaLabel ?? label.textContent;
    }
}
/**
 * A **text input** is used to gather free-form text from a user.
 *
 * @cssprop --pf-c-form-control--Color - {@default var(--pf-global--Color--100, #151515)}
 * @cssprop --pf-c-form-control--FontSize - {@default var(--pf-global--FontSize--md, 1rem)}
 * @cssprop --pf-c-form-control--LineHeight - {@default var(--pf-global--LineHeight--md, 1.5)}
 * @cssprop --pf-c-form-control--BorderWidth - {@default var(--pf-global--BorderWidth--sm, 1px)}
 * @cssprop --pf-c-form-control--BorderTopColor - {@default var(--pf-global--BorderColor--300, #f0f0f0)}
 * @cssprop --pf-c-form-control--BorderRightColor - {@default var(--pf-global--BorderColor--300, #f0f0f0)}
 * @cssprop --pf-c-form-control--BorderBottomColor - {@default var(--pf-global--BorderColor--200, #8a8d90)}
 * @cssprop --pf-c-form-control--BorderLeftColor - {@default var(--pf-global--BorderColor--300, #f0f0f0)}
 * @cssprop --pf-c-form-control--BorderRadius - {@default 0}
 * @cssprop --pf-c-form-control--BackgroundColor - {@default var(--pf-global--BackgroundColor--100, #fff)}
 * @cssprop --pf-c-form-control--Width - {@default 100%}
 * @cssprop --pf-c-form-control--Height - {@default calc(var(--pf-c-form-control--FontSize) * var(--pf-c-form-control--LineHeight) + var(--pf-c-form-control--BorderWidth) * 2 + var(--pf-c-form-control--PaddingTop) + var(--pf-c-form-control--PaddingBottom))}
 * @cssprop --pf-c-form-control--inset--base - {@default var(--pf-global--spacer--sm, 0.5rem)}
 * @cssprop --pf-c-form-control--PaddingTop - {@default calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-global--BorderWidth--sm, 1px))}
 * @cssprop --pf-c-form-control--PaddingBottom - {@default calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-global--BorderWidth--sm, 1px))}
 * @cssprop --pf-c-form-control--PaddingRight - {@default var(--pf-c-form-control--inset--base)}
 * @cssprop --pf-c-form-control--PaddingLeft - {@default var(--pf-c-form-control--inset--base)}
 * @cssprop --pf-c-form-control--hover--BorderBottomColor - {@default var(--pf-global--primary-color--100, #06c)}
 * @cssprop --pf-c-form-control--focus--BorderBottomWidth - {@default var(--pf-global--BorderWidth--md, 2px)}
 * @cssprop --pf-c-form-control--focus--PaddingBottom - {@default calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-c-form-control--focus--BorderBottomWidth))}
 * @cssprop --pf-c-form-control--focus--BorderBottomColor - {@default var(--pf-global--primary-color--100, #06c)}
 * @cssprop --pf-c-form-control--m-expanded--BorderBottomWidth - {@default var(--pf-global--BorderWidth--md, 2px)}
 * @cssprop --pf-c-form-control--m-expanded--PaddingBottom - {@default calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-c-form-control--focus--BorderBottomWidth))}
 * @cssprop --pf-c-form-control--m-expanded--BorderBottomColor - {@default var(--pf-global--primary-color--100, #06c)}
 * @cssprop --pf-c-form-control--placeholder--Color - {@default var(--pf-global--Color--dark-200, #6a6e73)}
 * @cssprop --pf-c-form-control--placeholder--child--Color - {@default var(--pf-global--Color--100, #151515)}
 * @cssprop --pf-c-form-control--disabled--Color - {@default var(--pf-global--disabled-color--100, #6a6e73)}
 * @cssprop --pf-c-form-control--disabled--BackgroundColor - {@default var(--pf-global--disabled-color--300, #f0f0f0)}
 * @cssprop --pf-c-form-control--disabled--BorderColor - {@default transparent}
 * @cssprop --pf-c-form-control--readonly--BackgroundColor - {@default var(--pf-global--disabled-color--300, #f0f0f0)}
 * @cssprop --pf-c-form-control--readonly--hover--BorderBottomColor - {@default var(--pf-global--BorderColor--200, #8a8d90)}
 * @cssprop --pf-c-form-control--readonly--focus--PaddingBottom - {@default calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-global--BorderWidth--sm, 1px))}
 * @cssprop --pf-c-form-control--readonly--focus--BorderBottomWidth - {@default var(--pf-global--BorderWidth--sm, 1px)}
 * @cssprop --pf-c-form-control--readonly--focus--BorderBottomColor - {@default var(--pf-global--BorderColor--200, #8a8d90)}
 * @cssprop --pf-c-form-control--readonly--m-plain--BackgroundColor - {@default transparent}
 * @cssprop --pf-c-form-control--readonly--m-plain--inset--base - {@default 0}
 * @cssprop --pf-c-form-control--success--BorderBottomWidth - {@default var(--pf-global--BorderWidth--md, 2px)}
 * @cssprop --pf-c-form-control--success--PaddingBottom - {@default calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-c-form-control--success--BorderBottomWidth))}
 * @cssprop --pf-c-form-control--success--BorderBottomColor - {@default var(--pf-global--success-color--100, #3e8635)}
 * @cssprop --pf-c-form-control--success--PaddingRight - {@default var(--pf-global--spacer--xl, 2rem)}
 * @cssprop --pf-c-form-control--success--BackgroundPositionX - {@default calc(100% - var(--pf-c-form-control--PaddingLeft))}
 * @cssprop --pf-c-form-control--success--BackgroundPositionY - {@default center}
 * @cssprop --pf-c-form-control--success--BackgroundPosition - {@default var(--pf-c-form-control--success--BackgroundPositionX) var(--pf-c-form-control--success--BackgroundPositionY)}
 * @cssprop --pf-c-form-control--success--BackgroundSizeX - {@default var(--pf-c-form-control--FontSize)}
 * @cssprop --pf-c-form-control--success--BackgroundSizeY - {@default var(--pf-c-form-control--FontSize)}
 * @cssprop --pf-c-form-control--success--BackgroundSize - {@default var(--pf-c-form-control--success--BackgroundSizeX) var(--pf-c-form-control--success--BackgroundSizeY)}
 * @cssprop --pf-c-form-control--success--BackgroundUrl - {@default url('data:image/svg+xml;charset=utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"%3E%3Cpath fill="%235ba352" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/%3E%3C/svg%3E')}
 * @cssprop --pf-c-form-control--m-warning--BorderBottomWidth - {@default var(--pf-global--BorderWidth--md, 2px)}
 * @cssprop --pf-c-form-control--m-warning--PaddingBottom - {@default calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-c-form-control--m-warning--BorderBottomWidth))}
 * @cssprop --pf-c-form-control--m-warning--BorderBottomColor - {@default var(--pf-global--warning-color--100, #f0ab00)}
 * @cssprop --pf-c-form-control--m-warning--PaddingRight - {@default var(--pf-global--spacer--xl, 2rem)}
 * @cssprop --pf-c-form-control--m-warning--BackgroundPositionX - {@default calc(100% - calc(var(--pf-c-form-control--PaddingLeft) - 0.0625rem))}
 * @cssprop --pf-c-form-control--m-warning--BackgroundPositionY - {@default center}
 * @cssprop --pf-c-form-control--m-warning--BackgroundPosition - {@default var(--pf-c-form-control--m-warning--BackgroundPositionX) var(--pf-c-form-control--m-warning--BackgroundPositionY)}
 * @cssprop --pf-c-form-control--m-warning--BackgroundSizeX - {@default 1.25rem}
 * @cssprop --pf-c-form-control--m-warning--BackgroundSizeY - {@default var(--pf-c-form-control--FontSize)}
 * @cssprop --pf-c-form-control--m-warning--BackgroundSize - {@default var(--pf-c-form-control--m-warning--BackgroundSizeX) var(--pf-c-form-control--m-warning--BackgroundSizeY)}
 * @cssprop --pf-c-form-control--m-warning--BackgroundUrl - {@default url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23f0ab00' d='M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'/%3E%3C/svg%3E")}
 * @cssprop --pf-c-form-control--invalid--BorderBottomWidth - {@default var(--pf-global--BorderWidth--md, 2px)}
 * @cssprop --pf-c-form-control--invalid--PaddingBottom - {@default calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-c-form-control--invalid--BorderBottomWidth))}
 * @cssprop --pf-c-form-control--invalid--BorderBottomColor - {@default var(--pf-global--danger-color--100, #c9190b)}
 * @cssprop --pf-c-form-control--invalid--PaddingRight - {@default var(--pf-global--spacer--xl, 2rem)}
 * @cssprop --pf-c-form-control--invalid--BackgroundPositionX - {@default calc(100% - var(--pf-c-form-control--PaddingLeft))}
 * @cssprop --pf-c-form-control--invalid--BackgroundPositionY - {@default center}
 * @cssprop --pf-c-form-control--invalid--BackgroundPosition - {@default var(--pf-c-form-control--invalid--BackgroundPositionX) var(--pf-c-form-control--invalid--BackgroundPositionY)}
 * @cssprop --pf-c-form-control--invalid--BackgroundSizeX - {@default var(--pf-c-form-control--FontSize)}
 * @cssprop --pf-c-form-control--invalid--BackgroundSizeY - {@default var(--pf-c-form-control--FontSize)}
 * @cssprop --pf-c-form-control--invalid--BackgroundSize - {@default var(--pf-c-form-control--invalid--BackgroundSizeX) var(--pf-c-form-control--invalid--BackgroundSizeY)}
 * @cssprop --pf-c-form-control--invalid--BackgroundUrl - {@default url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23fe5142' d='M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'/%3E%3C/svg%3E")}
 * @cssprop --pf-c-form-control--invalid--exclamation--Background - {@default var(--pf-c-form-control--invalid--BackgroundUrl) var(--pf-c-form-control--invalid--BackgroundPosition) / var(--pf-c-form-control--invalid--BackgroundSize) no-repeat}
 * @cssprop --pf-c-form-control--invalid--Background - {@default var(--pf-c-form-control--BackgroundColor) var(--pf-c-form-control--invalid--exclamation--Background)}
 * @cssprop --pf-c-form-control--m-search--PaddingLeft - {@default var(--pf-global--spacer--xl, 2rem)}
 * @cssprop --pf-c-form-control--m-search--BackgroundPosition - {@default var(--pf-c-form-control--PaddingRight)}
 * @cssprop --pf-c-form-control--m-search--BackgroundSize - {@default var(--pf-c-form-control--FontSize) var(--pf-c-form-control--FontSize)}
 * @cssprop --pf-c-form-control--m-search--BackgroundUrl - {@default url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23aaabac' d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'/%3E%3C/svg%3E")}
 * @cssprop --pf-c-form-control--m-icon--PaddingRight - {@default calc(var(--pf-c-form-control--inset--base) + var(--pf-c-form-control--m-icon--BackgroundSizeX) + var(--pf-c-form-control--m-icon--icon--spacer))}
 * @cssprop --pf-c-form-control--m-icon--BackgroundUrl - {@default none}
 * @cssprop --pf-c-form-control--m-icon--BackgroundPositionX - {@default calc(100% - var(--pf-c-form-control--inset--base))}
 * @cssprop --pf-c-form-control--m-icon--BackgroundPositionY - {@default center}
 * @cssprop --pf-c-form-control--m-icon--BackgroundSizeX - {@default var(--pf-c-form-control--FontSize)}
 * @cssprop --pf-c-form-control--m-icon--BackgroundSizeY - {@default var(--pf-c-form-control--FontSize)}
 * @cssprop --pf-c-form-control--m-icon--icon--spacer - {@default var(--pf-global--spacer--sm, 0.5rem)}
 * @cssprop --pf-c-form-control--m-icon--icon--PaddingRight - {@default calc(var(--pf-c-form-control--inset--base) + var(--pf-c-form-control--invalid--BackgroundSizeX) + var(--pf-c-form-control--m-icon--icon--spacer) + var(--pf-c-form-control--m-icon--BackgroundSizeX) + var(--pf-c-form-control--m-icon--icon--spacer))}
 * @cssprop --pf-c-form-control--m-icon--icon--BackgroundPositionX - {@default calc(var(--pf-c-form-control--m-icon--BackgroundPositionX) - var(--pf-c-form-control--m-icon--icon--spacer) - var(--pf-c-form-control--invalid--BackgroundSizeX))}
 * @cssprop --pf-c-form-control--m-icon--invalid--BackgroundUrl - {@default var(--pf-c-form-control--invalid--BackgroundUrl), var(--pf-c-form-control--m-icon--BackgroundUrl)}
 * @cssprop --pf-c-form-control--m-icon--invalid--BackgroundPosition - {@default var(--pf-c-form-control--invalid--BackgroundPosition), var(--pf-c-form-control--m-icon--icon--BackgroundPositionX) var(--pf-c-form-control--m-icon--BackgroundPositionY)}
 * @cssprop --pf-c-form-control--m-icon--invalid--BackgroundSize - {@default var(--pf-c-form-control--invalid--BackgroundSize), var(--pf-c-form-control--m-icon--BackgroundSizeX) var(--pf-c-form-control--m-icon--BackgroundSizeY)}
 * @cssprop --pf-c-form-control--m-icon--success--BackgroundUrl - {@default var(--pf-c-form-control--success--BackgroundUrl), var(--pf-c-form-control--m-icon--BackgroundUrl)}
 * @cssprop --pf-c-form-control--m-icon--success--BackgroundPosition - {@default var(--pf-c-form-control--success--BackgroundPosition), var(--pf-c-form-control--m-icon--icon--BackgroundPositionX) var(--pf-c-form-control--m-icon--BackgroundPositionY)}
 * @cssprop --pf-c-form-control--m-icon--success--BackgroundSize - {@default var(--pf-c-form-control--success--BackgroundSize), var(--pf-c-form-control--m-icon--BackgroundSizeX) var(--pf-c-form-control--m-icon--BackgroundSizeY)}
 * @cssprop --pf-c-form-control--m-icon--m-warning--BackgroundUrl - {@default var(--pf-c-form-control--m-warning--BackgroundUrl), var(--pf-c-form-control--m-icon--BackgroundUrl)}
 * @cssprop --pf-c-form-control--m-icon--m-warning--BackgroundPosition - {@default var(--pf-c-form-control--m-warning--BackgroundPosition), var(--pf-c-form-control--m-icon--icon--BackgroundPositionX) var(--pf-c-form-control--m-icon--BackgroundPositionY)}
 * @cssprop --pf-c-form-control--m-icon--m-warning--BackgroundSize - {@default var(--pf-c-form-control--m-warning--BackgroundSize), var(--pf-c-form-control--m-icon--BackgroundSizeX) var(--pf-c-form-control--m-icon--BackgroundSizeY)}
 * @cssprop --pf-c-form-control--m-calendar--BackgroundUrl - {@default url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23aaabac' d='M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z'/%3E%3C/svg%3E")}
 * @cssprop --pf-c-form-control--m-clock--BackgroundUrl - {@default url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23aaabac' d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z'/%3E%3C/svg%3E")}
 * @cssprop --pf-c-form-control__select--PaddingRight - {@default calc(var(--pf-global--spacer--lg, 1.5rem) + var(--pf-c-form-control--BorderWidth) + var(--pf-c-form-control--BorderWidth))}
 * @cssprop --pf-c-form-control__select--PaddingLeft - {@default calc(var(--pf-global--spacer--sm, 0.5rem) - var(--pf-c-form-control--BorderWidth))}
 * @cssprop --pf-c-form-control__select--BackgroundUrl - {@default url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%23urrentColor' d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'/%3E%3C/svg%3E")}
 * @cssprop --pf-c-form-control__select--BackgroundSize - {@default .625em}
 * @cssprop --pf-c-form-control__select--BackgroundPositionX - {@default calc(100% - var(--pf-global--spacer--md, 1rem) + 1px)}
 * @cssprop --pf-c-form-control__select--BackgroundPositionY - {@default center}
 * @cssprop --pf-c-form-control__select--BackgroundPosition - {@default var(--pf-c-form-control__select--BackgroundPositionX) var(--pf-c-form-control__select--BackgroundPositionY)}
 * @cssprop --pf-c-form-control__select--success--PaddingRight - {@default var(--pf-global--spacer--3xl, 4rem)}
 * @cssprop --pf-c-form-control__select--success--BackgroundPosition - {@default calc(var(--pf-c-form-control__select--BackgroundPositionX) - var(--pf-global--spacer--lg, 1.5rem))}
 * @cssprop --pf-c-form-control__select--m-warning--PaddingRight - {@default var(--pf-global--spacer--3xl, 4rem)}
 * @cssprop --pf-c-form-control__select--m-warning--BackgroundPosition - {@default calc(var(--pf-c-form-control__select--BackgroundPositionX) - var(--pf-global--spacer--lg, 1.5rem) + 0.0625rem)}
 * @cssprop --pf-c-form-control__select--invalid--PaddingRight - {@default var(--pf-global--spacer--3xl, 4rem)}
 * @cssprop --pf-c-form-control__select--invalid--BackgroundPosition - {@default calc(var(--pf-c-form-control__select--BackgroundPositionX) - var(--pf-global--spacer--lg, 1.5rem))}
 * @cssprop --pf-c-form-control--textarea--Width - {@default var(--pf-c-form-control--Width)}
 * @cssprop --pf-c-form-control--textarea--Height - {@default auto}
 * @cssprop --pf-c-form-control--textarea--success--BackgroundPositionY - {@default var(--pf-c-form-control--PaddingLeft)}
 * @cssprop --pf-c-form-control--textarea--m-warning--BackgroundPositionY - {@default var(--pf-c-form-control--PaddingLeft)}
 * @cssprop --pf-c-form-control--textarea--invalid--BackgroundPositionY - {@default var(--pf-c-form-control--PaddingLeft)}
 * @cssprop --pf-c-form-control--m-icon-sprite--success--BackgroundUrl - {@default url(/v4/images/status-icon-sprite.4fee9fefc3971799d2dd4de0a15617f0.svg#success)}
 * @cssprop --pf-c-form-control--m-icon-sprite--m-warning--BackgroundUrl - {@default url(/v4/images/status-icon-sprite.4fee9fefc3971799d2dd4de0a15617f0.svg#warning)}
 * @cssprop --pf-c-form-control--m-icon-sprite--invalid--BackgroundUrl - {@default url(/v4/images/status-icon-sprite.4fee9fefc3971799d2dd4de0a15617f0.svg#invalid)}
 * @cssprop --pf-c-form-control--m-icon-sprite__select--BackgroundUrl - {@default url(/v4/images/status-icon-sprite.4fee9fefc3971799d2dd4de0a15617f0.svg#select)}
 * @cssprop --pf-c-form-control--m-icon-sprite--m-search--BackgroundUrl - {@default url(/v4/images/status-icon-sprite.4fee9fefc3971799d2dd4de0a15617f0.svg#search)}
 * @cssprop --pf-c-form-control--m-icon-sprite--m-calendar--BackgroundUrl - {@default url(/v4/images/status-icon-sprite.4fee9fefc3971799d2dd4de0a15617f0.svg#calendar)}
 * @cssprop --pf-c-form-control--m-icon-sprite--m-clock--BackgroundUrl - {@default url(/v4/images/status-icon-sprite.4fee9fefc3971799d2dd4de0a15617f0.svg#clock)}
 * @cssprop --pf-c-form-control--m-icon-sprite__select--BackgroundSize - {@default var(--pf-c-form-control--FontSize)}
 * @cssprop --pf-c-form-control--m-icon-sprite__select--BackgroundPositionX - {@default calc(100% - var(--pf-global--spacer--md, 1rem) + 7px)}
 * @cssprop --pf-c-form-control--m-icon-sprite__select--success--BackgroundPosition - {@default calc(100% - var(--pf-global--spacer--md, 1rem) + 1px - var(--pf-global--spacer--lg, 1.5rem))}
 * @cssprop --pf-c-form-control--m-icon-sprite__select--m-warning--BackgroundPosition - {@default calc(100% - var(--pf-global--spacer--md, 1rem) - var(--pf-global--spacer--lg, 1.5rem) + 0.0625rem)}
 * @cssprop --pf-c-form-control--m-icon-sprite__select--invalid--BackgroundPosition - {@default calc(100% - var(--pf-global--spacer--md, 1rem) - var(--pf-global--spacer--lg, 1.5rem))}
 */
let PfTextInput = class PfTextInput extends LitElement {
    constructor() {
        super(...arguments);
        _PfTextInput_instances.add(this);
        /** Trim text on left */
        this.leftTruncated = false;
        this.plain = false;
        /** Flag to show if the input is disabled. */
        this.disabled = false;
        /** Flag to show if the input is required. */
        this.required = false;
        /** Flag to show if the input is read only. */
        this.readonly = false;
        /** Value of the input. */
        this.value = '';
        _PfTextInput_internals.set(this, this.attachInternals());
        _PfTextInput_derivedLabel.set(this, '');
    }
    willUpdate() {
        /** A best-attempt based on observed behaviour in FireFox 115 on fedora 38 */
        __classPrivateFieldSet(this, _PfTextInput_derivedLabel, this.accessibleLabel ||
            __classPrivateFieldGet(this, _PfTextInput_internals, "f").ariaLabel ||
            Array.from(__classPrivateFieldGet(this, _PfTextInput_internals, "f").labels)
                .reduce((acc, label) => `${acc}${getLabelText(label)}`, ''), "f");
    }
    render() {
        return html `
      <input id="input"
             @input="${__classPrivateFieldGet(this, _PfTextInput_instances, "m", _PfTextInput_onInput)}"
             ?disabled="${this.matches(':disabled') || this.disabled}"
             ?readonly="${this.readonly}"
             ?required="${this.required}"
             aria-label="${__classPrivateFieldGet(this, _PfTextInput_derivedLabel, "f")}"
             type="${ifDefined(this.type)}"
             .value="${this.value}"
             style="${ifDefined(this.customIconUrl && styleMap({
            backgroundImage: `url('${this.customIconUrl}')`,
            backgroundSize: this.customIconDimensions,
        }))}">
    `;
    }
    async formDisabledCallback() {
        await this.updateComplete;
        this.requestUpdate();
    }
    setCustomValidity(message) {
        __classPrivateFieldGet(this, _PfTextInput_internals, "f").setValidity({}, message);
    }
    checkValidity() {
        __classPrivateFieldGet(this, _PfTextInput_instances, "m", _PfTextInput_setValidityFromInput).call(this);
        return __classPrivateFieldGet(this, _PfTextInput_internals, "f").checkValidity();
    }
    reportValidity() {
        __classPrivateFieldGet(this, _PfTextInput_instances, "m", _PfTextInput_setValidityFromInput).call(this);
        return __classPrivateFieldGet(this, _PfTextInput_internals, "f").reportValidity();
    }
};
_PfTextInput_internals = new WeakMap();
_PfTextInput_derivedLabel = new WeakMap();
_PfTextInput_instances = new WeakSet();
_PfTextInput_input_get = function _PfTextInput_input_get() {
    return this.shadowRoot?.getElementById('input') ?? null;
};
_PfTextInput_onInput = function _PfTextInput_onInput(event) {
    const { value } = event.target;
    this.value = value;
    __classPrivateFieldGet(this, _PfTextInput_internals, "f").setFormValue(value);
};
_PfTextInput_setValidityFromInput = function _PfTextInput_setValidityFromInput() {
    __classPrivateFieldGet(this, _PfTextInput_internals, "f").setValidity(__classPrivateFieldGet(this, _PfTextInput_instances, "a", _PfTextInput_input_get)?.validity, __classPrivateFieldGet(this, _PfTextInput_instances, "a", _PfTextInput_input_get).validationMessage);
};
PfTextInput.styles = [styles];
PfTextInput.formAssociated = true;
PfTextInput.shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'left-truncated' })
], PfTextInput.prototype, "leftTruncated", void 0);
__decorate([
    property({ reflect: true })
], PfTextInput.prototype, "validated", void 0);
__decorate([
    property({ reflect: true })
], PfTextInput.prototype, "icon", void 0);
__decorate([
    property({ reflect: true, attribute: 'accessible-label' })
], PfTextInput.prototype, "accessibleLabel", void 0);
__decorate([
    property({ reflect: true, attribute: 'custom-icon-url' })
], PfTextInput.prototype, "customIconUrl", void 0);
__decorate([
    property({ reflect: true, attribute: 'custom-icon-dimensions' })
], PfTextInput.prototype, "customIconDimensions", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], PfTextInput.prototype, "plain", void 0);
__decorate([
    property({ reflect: true })
], PfTextInput.prototype, "type", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], PfTextInput.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], PfTextInput.prototype, "required", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], PfTextInput.prototype, "readonly", void 0);
__decorate([
    property()
], PfTextInput.prototype, "value", void 0);
PfTextInput = __decorate([
    customElement('pf-text-input')
], PfTextInput);
export { PfTextInput };
