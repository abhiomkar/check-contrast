import { html, directive } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { MDCTextField } from '@material/textfield';
import { getId } from '../common/util';
import { registerConnectedCallback } from '../common/render';

interface TextFieldOptions {
  id: string,
  label: string,
  placeholder: string,
  classes: Object,
  leadingIconName: string,
  trailingIconName: string,
  value: string,
  ariaLabel: string,
  outlined: boolean,
  helperText: string,
  characterLimit: number,
}

interface InputOptions {
  labelId: string,
  ariaLabel: string,
  placeholder: string,
  value: string,
  characterLimit: number,
}

const input = ({ labelId, ariaLabel, placeholder, value, characterLimit }: Partial<InputOptions> = {}) => {
  return html`<input
    type="text"
    class="mdc-text-field__input"
    id=${labelId}
    aria-label=${ariaLabel || null}
    placeholder=${placeholder || ''}
    maxlength=${characterLimit || ''}
    value=${value || ''}
    />`;
};

const initTextField = directive(() => (part) => {
  registerConnectedCallback(() => MDCTextField.attachTo(part.committer.element));
});

export const textField = ({ classes, outlined, leadingIconName, trailingIconName, ariaLabel, placeholder, helperText, label, value, characterLimit }: Partial<TextFieldOptions> = {}) => {
  const rootClasses = classMap(Object.assign({}, {
    'mdc-text-field': true,
    'mdc-text-field--default': !outlined,
    'mdc-text-field--outlined': outlined,
    'mdc-text-field--with-leading-icon': !!leadingIconName,
    'mdc-text-field--with-trailing-icon': !!trailingIconName,
  }, classes));
  const labelId = getId();
  const floatingLabelClasses = classMap({
    'mdc-floating-label': true,
    'mdc-floating-label--float-above': !!value,
  });
  const notchedOutlineClasses = classMap({
    'mdc-notched-outline': true,
    'mdc-notched-outline--notched': !!value,
  })

  if (outlined) {
    return html`
    <div class="mdc-text-field-container">
      <div class=${rootClasses} .onRender=${initTextField()}>
        ${icon({ iconName: leadingIconName })}
        ${input({ labelId, ariaLabel, placeholder, value, characterLimit })}
        ${icon({ iconName: trailingIconName })}
        <div class=${notchedOutlineClasses}>
          <div class="mdc-notched-outline__leading"></div>
          <div class="mdc-notched-outline__notch">
            <label class=${floatingLabelClasses}>${label}</label>
          </div>
          <div class="mdc-notched-outline__trailing"></div>
        </div>
      </div>
      ${helperLine({ helperText, characterLimit, value })}
    </div>`
  } else {
    return html`
    <div class="mdc-text-field-container">
      <div class=${rootClasses} .onRender=${initTextField()}>
        ${icon({ iconName: leadingIconName })}
        ${input({ labelId, ariaLabel, placeholder, value, characterLimit })}
        <label class=${floatingLabelClasses} for=${labelId}>${label}</label>
        ${icon({ iconName: trailingIconName })}
        <div class="mdc-line-ripple"></div>
      </div>
      ${helperLine({ helperText, characterLimit, value })}
    </div>`;
  }
}

interface IconOptions {
  iconName: string,
  isButton: boolean,
}

const icon = ({ iconName, isButton }: Partial<IconOptions> = {}) => {
  if (!iconName) {
    return null;
  }

  return html`<span
    class="material-icons mdc-text-field__icon"
    tabindex=${isButton ? 0 : null}
    role=${isButton ? 'button' : null}>
      ${iconName}
    </span>`;
};

interface HelperLineOptions {
  helperText: string,
  characterLimit: number,
  value: string,
}

const helperLine = ({ helperText, characterLimit, value }: Partial<HelperLineOptions> = {}) => {
  return html`
<div class="mdc-text-field-helper-line">
  <div class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent">${helperText}</div>
  ${characterCounter({ characterLimit, value })}
</div>`;
};

interface CharacterCounterOptions {
  characterLimit: number,
  value: string,
}

const characterCounter = ({ characterLimit, value }: Partial<CharacterCounterOptions> = {}) => {
  if (!characterLimit) {
    return null;
  }
  const length = value ? value.length : 0;
  const counter = `${length} / ${characterLimit}`;

  return html`<div class="mdc-text-field-character-counter">${counter}</div>`;
}
