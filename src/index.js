import React, { Fragment, useContext } from 'react';
import ReactDOM from 'react-dom';
import { ICSetupProvider, icSetupContext } from './contexts/ICSetup';
import { StylingProvider } from './contexts/Styling';

const App = () => {
  const { staticSetup, dynamicSetup, executeRAWFunction } = useContext(icSetupContext);
  return (
    <Fragment>
      {!!staticSetup && !!dynamicSetup && (
        <div>
          
          {/* Header */}
          <div>
            {staticSetup.content.layout.headerButtons.map((button, idx) => (
              <button key={idx} onClick={() => {
                executeRAWFunction(button.action);
              }}>{ button.label }</button>
            ))}
          </div>

          {/* Content */}
          <div>
            {dynamicSetup.content.title}
          </div>

        </div>
      )}
    </Fragment>
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
