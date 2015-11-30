import React from 'react';
import App from './containers/App';
import { render } from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

render(<App />, document.getElementById('root'));
