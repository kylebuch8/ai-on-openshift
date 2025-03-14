var _a;
import { __decorate } from "tslib";
import { expect, fixture, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { query } from 'lit/decorators/query.js';
import { ReactiveElement, html, render } from 'lit';
import { ComboboxController } from '../combobox-controller.js';
function press(key) {
    return async function () {
        await sendKeys({ press: key });
    };
}
class TestCombobox extends ReactiveElement {
    constructor() {
        super(...arguments);
        this.controller = ComboboxController.of(this, {
            multi: false,
            getItems: () => this.options,
            isItem: item => item instanceof HTMLOptionElement,
            getFallbackLabel: () => 'options',
            getListboxElement: () => this.listbox ?? null,
            getToggleButton: () => this.button ?? null,
            getComboboxInput: () => this.combobox ?? null,
            isExpanded: () => !this.listbox.hidden,
            requestShowListbox: () => void (this.listbox.hidden = false),
            requestHideListbox: () => void (this.listbox.hidden = true),
            setItemActive: (item, active) => item.classList.toggle('active', active),
            setItemSelected: (item, selected) => item.selected = selected,
        });
    }
    /** List of options */
    get options() {
        return [
            ...new Set([
                this.placeholder,
                ...this.querySelectorAll('option'),
                ...this.renderRoot.querySelectorAll('option'),
            ]),
        ].filter(x => !!x);
    }
    get selected() {
        return this.options.filter(x => x.selected);
    }
    get activeOption() {
        return this.options.find(x => x.classList.contains('active'));
    }
    update(changed) {
        render(this.render(), this.renderRoot);
        super.update(changed);
        this.placeholder.inert = !!this.controller.selected.length;
    }
    connectedCallback() {
        super.connectedCallback();
        const root = this.renderRoot.getRootNode();
        root.adoptedStyleSheets = [...root.adoptedStyleSheets ?? [], _a.styles];
    }
    static async test() {
        let element;
        const updateComplete = () => element.updateComplete;
        const { template } = this;
        if (!template) {
            throw new Error(`${this.constructor.name} must implement template`);
        }
        beforeEach(async function () {
            element = await fixture(template);
        });
        describe('Tab', function () {
            beforeEach(press('Tab'));
            beforeEach(updateComplete);
            it('focuses the combobox', async function () {
                expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
            });
            describe('Tab', function () {
                beforeEach(press('Tab'));
                beforeEach(updateComplete);
                beforeEach(nextFrame);
                it('does not focus the toggle button', async function () {
                    expect(await a11ySnapshot()).to.not.axContainQuery({ focused: true });
                });
            });
            describe('ArrowDown', function () {
                beforeEach(press('ArrowDown'));
                beforeEach(updateComplete);
                it('expands the listbox', async function () {
                    expect(await a11ySnapshot())
                        .to.axContainRole('listbox')
                        .and
                        .to.axContainQuery({ role: 'combobox', expanded: true });
                });
                it('maintains DOM focus on the combobox', async function () {
                    expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
                });
                it('sets active state on the placeholder', function () {
                    expect(element.activeOption).to.equal(element.placeholder);
                });
                describe('Enter', function () {
                    beforeEach(press('Enter'));
                    beforeEach(updateComplete);
                    it('maintains DOM focus on the combobox', async function () {
                        expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
                    });
                    it('selects nothing', function () {
                        expect(element.selected).to.have.length(0);
                    });
                });
                describe('ArrowDown', function () {
                    beforeEach(press('ArrowDown'));
                    beforeEach(updateComplete);
                    it('maintains DOM focus on the combobox', async function () {
                        expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
                    });
                    it('sets active state on the 1st option', function () {
                        expect(element.activeOption).to.have.text('1');
                    });
                    describe('Enter', function () {
                        beforeEach(press('Enter'));
                        beforeEach(updateComplete);
                        it('maintains DOM focus on the combobox', async function () {
                            expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
                        });
                        it('selects the first option', function () {
                            expect(element.selected).to.have.length(1);
                            expect(element.selected.at(0)).to.have.text('1');
                        });
                        it('collapses the listbox', async function () {
                            expect(await a11ySnapshot())
                                .to.not.axContainRole('listbox')
                                .and
                                .to.axContainQuery({ role: 'combobox', expanded: false });
                        });
                    });
                });
                describe('Escape', function () {
                    beforeEach(press('Escape'));
                    beforeEach(updateComplete);
                    it('collapses the listbox', async function () {
                        expect(await a11ySnapshot())
                            .to.not.axContainRole('listbox')
                            .and
                            .to.axContainQuery({ role: 'combobox', expanded: false });
                    });
                    it('maintains DOM focus on the combobox', async function () {
                        expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
                    });
                });
            });
        });
    }
    ;
}
_a = TestCombobox;
TestCombobox.styles = new CSSStyleSheet();
(() => {
    _a.styles.replaceSync(/* css */ `
      option {
        &.active {
          outline: 1px solid black;
        }
        &[selected] {
          background: lightblue;
        }
      }
    `);
})();
__decorate([
    query('#listbox')
], TestCombobox.prototype, "listbox", void 0);
__decorate([
    query('#button')
], TestCombobox.prototype, "button", void 0);
__decorate([
    query('#combobox')
], TestCombobox.prototype, "combobox", void 0);
__decorate([
    query('#placeholder')
], TestCombobox.prototype, "placeholder", void 0);
let XComboboxCrossRoot = class XComboboxCrossRoot extends TestCombobox {
    /** List of options */
    get options() {
        return [
            ...new Set([
                this.placeholder,
                ...this.querySelectorAll('option'),
            ]),
        ].filter(x => !!x);
    }
    render() {
        return html `
      <div id="toggle">
        <input id="combobox">
        <button id="button">Show Options</button>
      </div>
      <div id="listbox">
        <option id="placeholder" aria-disabled="true">Select an Option</option>
        ${this.controller.renderItemsToShadowRoot()}
        <div ?hidden=${!ComboboxController.supportsCrossRootActiveDescendant}>
          <slot></slot>
        </div>
      </div>
    `;
    }
};
XComboboxCrossRoot.template = html `
    <x-combobox-cross-root>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
      <option>9</option>
      <option>10</option>
    </x-combobox-cross-root>
  `;
XComboboxCrossRoot = __decorate([
    customElement('x-combobox-cross-root')
], XComboboxCrossRoot);
let XComboboxLight = class XComboboxLight extends TestCombobox {
    createRenderRoot() {
        return this;
    }
    render() {
        return html `
      <input id="combobox">
      <button id="button">Show Options</button>
      <div id="listbox">
        <option id="placeholder" aria-disabled="true">Select an Option</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
      </div>`;
    }
};
XComboboxLight.template = html `
    <x-combobox-light></x-combobox-light>
  `;
XComboboxLight = __decorate([
    customElement('x-combobox-light')
], XComboboxLight);
let XComboboxShadow = class XComboboxShadow extends TestCombobox {
    render() {
        return html `
      <input id="combobox">
      <button id="button">Show Options</button>
      <div id="listbox">
        <option id="placeholder" aria-disabled="true">Select an Option</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
      </div>`;
    }
};
XComboboxShadow.template = html `
    <x-combobox-shadow></x-combobox-shadow>
  `;
XComboboxShadow = __decorate([
    customElement('x-combobox-shadow')
], XComboboxShadow);
describe('ComboboxController', function () {
    describe('Cross-root ARIA', XComboboxCrossRoot.test.bind(XComboboxCrossRoot));
    describe('Light-DOM only', XComboboxLight.test.bind(XComboboxLight));
    describe('Shadow-DOM only', XComboboxShadow.test.bind(XComboboxShadow));
});
//# sourceMappingURL=combobox-controller.spec.js.map