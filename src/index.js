import React from 'react';
import ReactDOM from 'react-dom';
import RandomDecision from './containers/RandomDecision';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.defaults.baseURL = process.env.RANDOM_DECISION_API;

ReactDOM.render(<RandomDecision />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();