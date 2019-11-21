import { customElement, html, LitElement, property, css, unsafeCSS } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import styles from './icon.scss';

@customElement('mdc-icon')
export class Icon extends LitElement {

  @property({type: String})
  classes = '';

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  get rootClasses() {
    return classMap({
      'material-icons': true,
      ...this.classes && {[this.classes]: true},
    });
  }

  render() {
    return html`<slot></slot>`;
  }
}
