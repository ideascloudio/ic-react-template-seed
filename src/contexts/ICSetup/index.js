import React, { createContext, Fragment, useEffect, useState } from 'react';

export const icSetupContext = createContext();

export const ICSetupProvider = ({ children }) => {

  // States
  const [ staticSetup, setStaticSetup ] = useState();
  const [ dynamicSetup, setDynamicSetup ] = useState();

  // Setup
  useEffect(() => {

    // IC Setup
    window.ic.init({

      // Setup base functions and context
      precompileSetup: () => {
        window.ic.registerFunction('uiShowLoader', () => {
          document.getElementById('loader').style.display = 'flex';
        })
        window.ic.registerFunction('uiHideLoader', () => {
          document.getElementById('loader').style.display = 'none';
        })
      },

      // Setup static handler
      setupStatics: (scope) => {
        scope.onRender((params) => {
          setStaticSetup(params);
        })
      },
      
      // Setup states handler
      setupStates: (scope) => {
      
        // On state change 
        scope.onStateChange({
          onComplete: (params) => {
            setDynamicSetup(params);
          }
        })
      }
    })

  }, []);

  // Set style vars
  useEffect(() => {
    if (staticSetup) {
      staticSetup.styling.colorPalette = staticSetup.styling.colorPalette || {};
      staticSetup.styling.colorPalette.primaryColors = staticSetup.styling.colorPalette.primaryColors || []
      staticSetup.styling.colorPalette.secondaryColors = staticSetup.styling.colorPalette.secondaryColors || []
      staticSetup.styling.colorPalette.primaryColors.forEach((pc, idx)=> {
        document.documentElement.style.setProperty(`--ic-colors-primary-${idx+1}`, pc);
      });
      staticSetup.styling.colorPalette.secondaryColors.forEach((pc, idx)=> {
        document.documentElement.style.setProperty(`--ic-colors-secondary-${idx+1}`, pc);
      });
      Object.keys(staticSetup.styling.colorPalette.complementary).forEach(k => {
        document.documentElement.style.setProperty(`--ic-colors-complementary-${k}`, staticSetup.styling.colorPalette.complementary[k]);
      })
    }
  }, [staticSetup])


  return (
    <icSetupContext.Provider value={{
      staticSetup: staticSetup,
      dynamicSetup: dynamicSetup,
      executeRAWFunction: (fnSetup) => {
        window.ic.executeFunction(fnSetup);
      },
      executeFunction: (fnKey, fnParams) => {
        window.ic.executeFunction({
          fnKey: fnKey,
          params: fnParams,
        });
      },
      registerFunction: (fnKey, handler) => {
        window.ic.registerFunction(fnKey, handler);
      },
      setGlobalContextVariable: (key, value) => {
        window.ic.setGlobalContextVariable(key, value)
      },
      goToState: (stateKey, stateParams) => {
        window.ic.executeFunction({ 
          fnKey: 'goToState',
          params: {
            stateName: stateKey,
            stateParams: stateParams || {},
          }
        });
      },
      setStateDataGroupItem: (groupKey, key, value) => {
        return window.ic.setStateDataGroupItem(groupKey, key, value);
      },
      recompileState: () => {
        dynamicSetup.content = window.ic.compile(dynamicSetup.rawContent);
        setDynamicSetup(Object.assign({}, dynamicSetup))
      }
    }}>
      {!!staticSetup && !!dynamicSetup && (
        <Fragment>{ children }</Fragment>
      )}
    </icSetupContext.Provider>
  )
}