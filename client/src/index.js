import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';

import './reset.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const render = () => {
  logState();
  return ReactDOM.render(<App />, document.getElementById('root'));
}

render();
store.subscribe(render);
registerServiceWorker();


function logState() {
  console.log("%c State logged here...", "background: red; color: white;")
  console.log( store.getState() );
}
