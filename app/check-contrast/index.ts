import { html, TemplateResult } from 'lit-html';
import { render } from '../../components/common/render';
import {button} from '../../components/button';
import {iconButton} from '../../components/icon-button';
import {textField} from '../../components/text-field';
import Color from 'color';
import './index.scss';

interface ColorInputOptions {
  id: string,
  label: string,
  color: string,
  onInput: Function,
  onTextInput: Function,
  fixButton: TemplateResult,
}

const colorInput = ({id, label, color, onInput, onTextInput, fixButton}: Partial<ColorInputOptions> = {}) => {
  return html`
  <div class="color-input">
    <label class="color-input-label" for=${id}>${label}</label>
    <div class="color-input-container">
      <div class="color-input-wrapper">
        ${textField({
          value: color,
          outlined: true,
          leadingIconName: ' ', // Purposefully empty whitespace char to place native color input.
          onInput: onTextInput,
          classes: {'color-input-text-field': true},
        })}
        <div class="color-native-input-mask">
          <input class="color-native-input" .value=${Color(color).hex()} @input=${onInput} type="color" id=${id} />
        </div>
      </div>
      ${fixButton}
    </div>
  </div>
  `;
};

const checkContrast = (foregroundColor, backgroundColor) => {
  const ratio = Color(backgroundColor).contrast(Color(foregroundColor));
  const isFloat = (n) => Number(n) === n && n % 1 !== 0;
  return isFloat(ratio) ? ratio.toFixed(2) : ratio;
}

enum ContrastRating {
  FAIL = 0,
  AA_LARGE = 3,
  AA = 4.5,
  AAA = 7,
}

/**
 * WCAG 2.0 level AA requires a contrast ratio of at least 4.5:1 for normal text
 * and 3:1 for large text. WCAG 2.1 requires a contrast ratio of at least 3:1
 * for graphics and user interface components (such as form input borders).
 * WCAG Level AAA requires a contrast ratio of at least 7:1 for normal text and
 * 4.5:1 for large text.
 * See https://webaim.org/resources/contrastchecker/
 */
const checkContrastRating = (foregroundColor, backgroundColor): ContrastRating => {
  const ratio = checkContrast(foregroundColor, backgroundColor);
  const {FAIL, AA_LARGE, AA, AAA} = ContrastRating;

  if (ratio < AA_LARGE) {
    return FAIL;
  } else if (ratio < AA) {
    return AA_LARGE;
  } else if (ratio < AAA) {
    return AA;
  } else {
    return AAA;
  }
}

const isColorValid = (color) => {
  try {
    Color(color);
  } catch {
    return false;
  }

  return true;
}

const onRender = () => {
};

const targetContrastRatio = ContrastRating.AAA;

const fixForegroundColor = () => {
  const {foregroundColor, backgroundColor} = state;
  let foreground = Color(foregroundColor);
  let background = Color(backgroundColor);

  const isBackgroundLight = background.isLight();

  while (Color(background).contrast(Color(foreground)) < targetContrastRatio) {
    foreground = isBackgroundLight ? foreground.darken(.05) : foreground.lighten(.05);
  }

  setState({foregroundColor: foreground.hex()});
  root.style.setProperty('--color-foreground', foreground.hex());
};

const fixBackgroundColor = () => {
  const {foregroundColor, backgroundColor} = state;
  let foreground = Color(foregroundColor);
  let background = Color(backgroundColor);

  const isForegroundLight = foreground.isLight();
  while (Color(background).contrast(Color(foreground)) < targetContrastRatio) {
    background =  isForegroundLight ? background.darken(.05) : background.lighten(.05);
  }

  setState({backgroundColor: background.hex()});
  root.style.setProperty('--color-background', background.hex());
};

const root = document.documentElement;

const app = ({foregroundColor, backgroundColor}: State) => {
  const contrastRating = checkContrastRating(foregroundColor, backgroundColor);
  let contrastRatingText = '';

  if (contrastRating === ContrastRating.FAIL) {
    contrastRatingText = 'Fail';
  } else if (contrastRating === ContrastRating.AA_LARGE) {
    contrastRatingText = 'AA Large';
  } else if (contrastRating === ContrastRating.AA) {
    contrastRatingText = 'AA';
  } else {
    contrastRatingText = 'AAA';
  }

  const foregroundFixButton = button({
    label: 'Fix',
    id: 'foreground-color-fix-button',
    outlined: true,
    classes: {'color-fix-button': true},
    onClick: fixForegroundColor,
  });

  const backgroundFixButton = button({
    label: 'Fix',
    id: 'background-color-fix-button',
    outlined: true,
    classes: {'color-fix-button': true},
    onClick: fixBackgroundColor,
  });

  return html`
  <div class="color-canvas" .onRender=${onRender()}>
    <div class="color-canvas-center">
      <div class="color-canvas-header">
        <div class="color-canvas-rating-row">
          <div class="color-contrast-rating-text">
            ${contrastRatingText}
          </div>
          <div class="color-contrast-ratio">
            ${checkContrast(foregroundColor, backgroundColor)}
          </div>
        </div>
        <div class="color-check-contrast-title">Check Contrast</div>
      </div>

      <div class="color-canvas-small-text">
        Choose <strong>foreground color</strong> and <strong>background color</strong> below
        to check color contrast. Fix contrast ratio by clicking on <i>Fix</i> button when failed.
      </div>
    </div>
  </div>
  <div class="color-input-panel">
    <div class="color-input-row">
      <div class="flex align-center">
        <div class="color-input-column">
          ${colorInput({
            label: 'Foreground color',
            id: 'foreground-color-input',
            color: foregroundColor,
            onInput: (event) => {
              setState({foregroundColor: event.target.value}, /** delay */ 500);
              root.style.setProperty('--color-foreground', event.target.value);
            },
            onTextInput: (event) => {
              const value = event.target.value;

              if (!isColorValid(value)) {
                return;
              }

              setState({foregroundColor: value});
              root.style.setProperty('--color-foreground', value);
            },
            fixButton: foregroundFixButton,
          })}
        </div>

        ${iconButton({
          iconName: 'swap_horizontal_circle_black',
          classes: {'color-swap-button': true},
          onClick: () => {
            setState({foregroundColor: state.backgroundColor, backgroundColor: state.foregroundColor});
            root.style.setProperty('--color-foreground', state.foregroundColor);
            root.style.setProperty('--color-background', state.backgroundColor);
          }
        })}
      </div>

      <div class="color-input-column">
        ${colorInput({
          label: 'Background color',
          id: 'background-color-input',
          color: backgroundColor,
          onInput: (event) => {
            setState({backgroundColor: event.target.value}, /** delay */ 500);
            root.style.setProperty('--color-background', event.target.value);
          },
          onTextInput: (event) => {
            const value = event.target.value;

            if (!isColorValid(value)) {
              return;
            }

            setState({backgroundColor: value});
            root.style.setProperty('--color-background', value);
          },
          fixButton: backgroundFixButton,
        })}
      </div>
    </div>
  </div>
  `;
};

interface State {
  foregroundColor: string,
  backgroundColor: string,
}

let state = {
  foregroundColor: getComputedStyle(root).getPropertyValue('--color-foreground'),
  backgroundColor: getComputedStyle(root).getPropertyValue('--color-background'),
};

const setState = (newState: Partial<State>, delay = 0) => {
  state = Object.assign({}, state, newState);
  renderWithState(state, delay);
}

let timer;

const renderWithState = (state: State, delay = 0) => {
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    render(app(state), document.querySelector('.app'));
  }, delay);
};

renderWithState(state);
