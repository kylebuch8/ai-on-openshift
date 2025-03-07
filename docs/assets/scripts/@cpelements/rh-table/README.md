# PatternFly Element | Rh table element

Make tables less terrible

## Usage

Describe how best to use this web component along with best practices.

```html
<rh-table>
  <table class="tableblock frame-all grid-all spread">
    <caption class="title">
      Applications
    </caption>
    <colgroup>
      <col style="width: 25%" />
      <col style="width: 25%" />
      <col style="width: 50%" />
    </colgroup>
    <thead>
      <tr>
        <th class="tableblock halign-left valign-top"
          id="table4_th_name"
          scope="col">
          Name
        </th>
        <th class="tableblock halign-left valign-top"
          id="table4_th_category"
          scope="col">
          Category
        </th>
        <th class="tableblock halign-left valign-top"
          id="table4_th_description"
          scope="col">
          Description
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="tableblock halign-left valign-top" headers="table4_th_name">
          <p class="tableblock">Firefox</p>
        </td>
        <td class="tableblock halign-left valign-top" headers="table4_th_category">
          <p class="tableblock">Browser</p>
        </td>
        <td class="tableblock halign-left valign-top" headers="table4_th_description">
          <p class="tableblock">
            Mozilla Firefox is an open-source web browser. It’s designed
            for standards compliance, performance, portability.
          </p>
        </td>
      </tr>
      <tr>
        <td class="tableblock halign-left valign-top" headers="table4_th_name">
          <p class="tableblock">Arquillian</p>
        </td>
        <td class="tableblock halign-left valign-top" headers="table4_th_category">
          <p class="tableblock">Testing</p>
        </td>
        <td class="tableblock halign-left valign-top" headers="table4_th_description">
          <p class="tableblock">
            An innovative and highly extensible testing platform.
            Empowers developers to easily create real, automated tests.
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</rh-table>
```

## Slots

This only has a default slot which 1 table should occupy.
## Attributes

- `sortable`: Defines which columns can be sorted. This is 1 indexed, not 0 indexed, so the first column will be `sortable="1"`
- `full-screen`: Boolean attribute to set if the component is able to be viewed full screen. Defaults to `true`. Usable options are `true`, `t`, `false`, `f`.

## CSS Variables

```
--rh-table--maxHeight
```
If set it will constrain the table's height and the user will have to scroll to see the rest. If the table can go full screen (see `full-screen` attribute) it will also add an "expand" button that will add a class to the table and try to replace `--rh-table--maxHeight`'s value with `max-content`. Light DOM styling may be necssary to help depending on how `--rh-table--maxHeight` is set.

```
--rh-table--button--outline--focus
```
Focus style for buttons that are in the shadowRoot of the component. Currently set to `2px dashed black`, but check rh-table.scss for the latest and greatest.

```
--rh-table--wrappers--width
```
Set the table wrapper's width, defaults to `auto`. Applies to `rh-table` and a wrapper div in the shadow DOM.

```
--rh-table--scrollbar--width
```
Avoid messing with this, it's used to layout the fullcreen and expand button and set by JS.

<!-- ## Events

Describe any events that are accessible external to the web component. There is no need to describe all the internal-only functions.

### rh-table:sorted -->

## Dependencies

- `/dist/rh-table--lightdom.css` is required for the styling

## Dev

    `npm start`

## Test

    `npm run test`

## Build

    `npm run build`

## Demo

From the PFElements root directory, run:

    `npm run demo`

## Code style

Rh table (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
