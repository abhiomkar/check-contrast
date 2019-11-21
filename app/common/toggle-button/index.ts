import { html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

interface ToggleButtonOptions {
  classes: string,
  children: TemplateResult,
  ariaLabel: string,
  ariaLabelledby: string,
  onChange: Function,
}

export const toggleButton = ({classes, children, onChange, ariaLabel, ariaLabelledby}: Partial<ToggleButtonOptions> = {}) => {
  const rootClasses = classMap({
    'mdc-toggle-button': true,
    ...classes && {[classes]: true},
  });

  return html`
    <div class=${rootClasses}
        @click=${onChange}
        role="radiogroup"
        aria-label=${ariaLabel || ''}
        aria-labelledby=${ariaLabelledby || ''}>
      ${children}
    </div>`;
}

interface ToggleButtonOptionOptions {
  selected: boolean,
  value: string,
  classes: string,
  label: string,
}

export const toggleButtonOption = ({selected, value, classes, label}: Partial<ToggleButtonOptionOptions> = {}) => {
  const rootClasses = classMap({
      'mdc-toggle-button-option': true,
      'mdc-toggle-button-option--selected': selected,
      ...classes && {[classes]: true},
    });

  return html`
    <div role="radio"
        tabindex="0"
        data-value=${value}
        class=${rootClasses}
        aria-checked=${selected ? 'true' : 'false'}>
      ${label}
    </div>
  `;
}
