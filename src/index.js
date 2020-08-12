import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import Fastclick from 'fastclick';

import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';

bridge.send("VKWebAppInit", {});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

if ('ontouchstart' in document) {
	Fastclick.attach(document.body)
}