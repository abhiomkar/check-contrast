import { html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

interface LogoOptions {
  title: string,
  subtitle: string | TemplateResult
  classes: Object,
}

export const logo = ({ classes, title, subtitle }: Partial<LogoOptions> = {}) => {
  const rootClasses = classMap(Object.assign({}, {
    'logo-root': true,
  }, classes));

  const svgLogo = html`
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <path d="M23.8461538,12 C23.8461538,5.46307692 18.5369231,0.153846154 12,0.153846154 C5.46307692,0.153846154 0.153846154,5.46307692
      0.153846154,12 C0.153846154,18.5369231 5.46307692,23.8461538 12,23.8461538 C18.5369231,23.8461538 23.8461538,18.5369231 23.8461538,12
      Z M4.46153846,18.0738462 C3.11538462,16.4153846 2.30769231,14.3046154 2.30769231,12 C2.30769231,9.70615385 3.12615385,7.60615385
      4.46153846,5.93692308 L4.46153846,18.0738462 Z M18.0738462,4.46153846 L5.92615385,4.46153846 C7.58461538,3.11538462 9.69538462,2.30769231
      12,2.30769231 C14.3046154,2.30769231 16.4153846,3.11538462 18.0738462,4.46153846 Z M12,14.7246154 L7.95076923,6.61538462 L16.06,6.61538462
      L12,14.7246154 Z M17.3846154,8.76923077 L17.3846154,17.3846154 L13.0769231,17.3846154 L17.3846154,8.76923077 Z M10.9230769,17.3846154
      L6.61538462,17.3846154 L6.61538462,8.76923077 L10.9230769,17.3846154 Z M18.0738462,19.5384615 C16.4046154,20.8846154 14.2938462,21.6923077
      12,21.6923077 C9.70615385,21.6923077 7.58461538,20.8846154 5.92615385,19.5384615 L18.0738462,19.5384615 Z M21.6923077,12 C21.6923077,14.3046154
      20.8846154,16.4153846 19.5384615,18.0738462 L19.5384615,5.93692308 C20.8738462,7.60615385 21.6923077,9.70615385 21.6923077,12 Z" id="mdc-logo-path"></path>
    </defs>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(-29.000000, -48.000000)">
        <g>
          <g transform="translate(0.000000, 44.000000)">
            <g transform="translate(29.000000, 0.000000)">
              <g transform="translate(0.000000, 4.000000)">
                <mask fill="white">
                  <use xlink:href="#mdc-logo-path"></use>
                </mask>
                <use fill="#5F6367" fill-rule="nonzero" xlink:href="#mdc-logo-path"></use>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>`;

  return html`
      <div class=${rootClasses}>
        <div class="logo-title-container">
          ${svgLogo}
          <div class="logo-title">${title}</div>
        </div>
        <div>
          <div class="logo-subtitle">
            ${subtitle}
          </div>
        </div>
      </div>`;
}
