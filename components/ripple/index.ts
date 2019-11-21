import { customElement, html, LitElement, property, css, unsafeCSS } from 'lit-element';
import styles from './ripple.scss';

@customElement('mdc-ripple')
export class Ripple extends LitElement {
  static get styles() {
    return [css`${unsafeCSS(styles)}`];
  }

  render() {
    return html`
    <div class="component" tabindex="0">
      <div class="ripple-target"></div>
      <slot></slot>
    </div>`;
  }
}
