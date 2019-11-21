import { html } from 'lit-html';
import { render } from '../../components/common/render';
import {button} from '../../components/button';
import './index.scss';

const app = () => {
  return html`
    ${button({label: 'Add to cart', unelevated: true, iconName: 'add_to_cart'})}
  `;
};

render(app(), document.querySelector('.app'));
