import React from 'react';
import ReactDOM from 'react-dom';
import { ICSetupProvider } from './contexts/ICSetup';
import { StylingProvider } from './contexts/Styling';

const App = () => {
  return (
    <div>
      App
    </div>
  )
}

ReactDOM.render(
  <ICSetupProvider>
    <StylingProvider>
      <App />
    </StylingProvider>
  </ICSetupProvider>,
  document.getElementById('root')
);
