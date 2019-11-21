import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { getId } from '../common/util';

interface CheckboxOptions {
  label: string,
  checked: boolean,
  classes: Object,
}

export const checkbox = ({ label, checked, classes }: Partial<CheckboxOptions> = {}) => {
  const rootClasses = classMap(Object.assign({}, {
    'mdc-checkbox': true,
    'mdc-checkbox--selected': checked,
  }, classes));

  const labelId = getId();

  return html`
  <div class="mdc-checkbox-container">
    <div class=${rootClasses}>
      <input type="checkbox" id=${labelId}
            class="mdc-checkbox__native-control" ?checked=${checked} />
      <div class="mdc-checkbox__background">
        <svg class="mdc-checkbox__checkmark"
            viewbox="0 0 24 24">
          <path class="mdc-checkbox__checkmark-path"
                fill="none"
                d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
        </svg>
        <div class="mdc-checkbox__mixedmark"></div>
      </div>
      <div class="mdc-checkbox__ripple"></div>
    </div>
    <label class="mdc-checkbox-label" for=${labelId}>${label}</label>
  </div>`;
}
