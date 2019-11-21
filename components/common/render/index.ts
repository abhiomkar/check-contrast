import {render as litHtmlRender} from 'lit-html';

const connectedCallbacks = [];

export const registerConnectedCallback = (callback: Function) => {
  connectedCallbacks.push(callback);
}

export const render = (result: unknown,
  container: Element|DocumentFragment) => {
  litHtmlRender(result, container);
  connectedCallbacks.forEach((callback) => callback());
};
