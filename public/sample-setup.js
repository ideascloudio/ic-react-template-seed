window.IC_SAMPLE_SETUP = {
  "title": "Webapp title",
  "favicon": "FAVICON_URL",
  "styling": {
    "look": {
      "shadow": true,
      "rounded": true
    },
    "colorPalette": {
      "primaryColors": [
        "#3e76df"
      ],
      "complementary": {
        "white": "#FEFEFE",
        "black": "#222222",
        "light": "#F6F7FE",
        "dark": "#333333"
      }
    },
    "fonts": {
      "titles": "\"Quicksand\", sans-serif",
      "default": "\"Poppins\", sans-serif"
    }
  },
  "static": {
    // START: Demo setup
    "layout": {
      "headerButtons": [
        {
          "label": "Button 1",
          "action": {
            "fnKey": "goToState",
            "params": {
              "stateName": "state-1",
              "stateParams": {}
            }
          }
        },
        {
          "label": "Button 2",
          "action": {
            "fnKey": "goToState",
            "params": {
              "stateName": "state-2",
              "stateParams": {}
            }
          }
        }
      ]
    }
    // END: Demo setup
  },
  "states": [
    {
      "key": "state-1",
      "params": {
        "stores": [],
        "content": {
          "title": "State 1"
        }
      }
    },
    {
      "key": "state-2",
      "params": {
        "stores": [],
        "content": {
          "title": "State 2"
        }
      }
    }
  ]
}