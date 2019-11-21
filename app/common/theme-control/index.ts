import { customElement, html, LitElement, property, css, unsafeCSS } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import styles from './theme-control.scss';

@customElement('mdc-theme-control')
export class Button extends LitElement {
  @property({type: String})
  classes  = '';

  get rootClasses() {
    return classMap({
      'mdc-theme-control': true,
      ...this.classes && {[this.classes]: true},
    });
  }

  static get styles() {
    return [css`${unsafeCSS(styles)}`];
  }

  render() {
    return html`
      <div class=${this.rootClasses}>
        <div class="row">
          <mdc-logo>Density Demo</mdc-logo>
        </div>

        <div class="row">
          <div class="control">
            <span class="control-label">Density scale</span>
            <mdc-toggle-button class="density-scale-toggle-button">
              <mdc-toggle-button-option value="default" selected>Default</mdc-toggle-button-option>
              <mdc-toggle-button-option value="comfortable">Comfortable</mdc-toggle-button-option>
              <mdc-toggle-button-option value="compact">Compact</mdc-toggle-button-option>
            </mdc-toggle-button>
          </div>

          <div class="control">
            <span class="control-label">Shape</span>
            <mdc-toggle-button class="rounded-shape-toggle-button">
              <mdc-toggle-button-option value="default" selected>Default</mdc-toggle-button-option>
              <mdc-toggle-button-option value="rounded">Rounded</mdc-toggle-button-option>
            </mdc-toggle-button>
          </div>
        </div>
      </div>
      `;
  }
}
