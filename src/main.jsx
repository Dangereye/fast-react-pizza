// React
import React from 'react';

// React DOM
import ReactDOM from 'react-dom/client';

// React Redux
import { Provider } from 'react-redux';

// Store
import store from './store.js';

// Components
import App from './App.jsx';

// CSS
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
