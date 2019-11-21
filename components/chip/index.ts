import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

interface ChipOptions {
  iconName: string,
  label: string,
  classes: Object,
}

export const chip = ({ iconName, label, classes }: Partial<ChipOptions> = {}) => {
  const rootClasses = classMap(Object.assign({}, {
    'mdc-chip': true,
  }, classes));

  return html`
    <div class=${rootClasses} role="row">
    <div class="mdc-chip__ripple"></div>
    <span class="material-icons mdc-chip__icon mdc-chip__icon--leading">${iconName}</span>
      <span role="gridcell">
        <span role="button" class="mdc-chip__text">${label}</span>
      </span>
    </div>`;
};
