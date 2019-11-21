import { html, directive } from 'lit-html';
import {MDCRipple} from '@material/ripple';
import { classMap } from 'lit-html/directives/class-map';
import { registerConnectedCallback } from '../common/render';

interface IconButtonOptions {
  iconName: string,
  ariaLabel: string,
  classes: Object,
}

const initRipple = directive(() => (part) => {
  registerConnectedCallback(() => {
    const ripple = MDCRipple.attachTo(part.committer.element);
    ripple.unbounded = true;
  });
});

export const iconButton = ({iconName, ariaLabel, classes}: Partial<IconButtonOptions> = {}) => {
  const rootClasses = classMap(Object.assign({}, {
      'mdc-icon-button': true,
      'material-icons': true,
  }, classes));

  return html`
  <button class=${rootClasses} aria-label=${ariaLabel} .onRender=${initRipple()}>
    ${iconName}
  </button>`;
}
