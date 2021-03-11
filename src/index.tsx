import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import { HashRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
// FixedGlobalStyle, ThemedGlobalStyle
import { ThemeProvider, FixedGlobalStyle } from './theme'
{/* <React.StrictMode></React.StrictMode> */ }
ReactDOM.render(
  <>
    <FixedGlobalStyle />
    <ThemeProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
