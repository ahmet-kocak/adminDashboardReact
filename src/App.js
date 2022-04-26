// redux
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createStore,compose,applyMiddleware} from "redux";
import {Provider} from "react-redux";
import rootReducer from './reducer/rootReducer';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';



const allEnhancers=compose(
     applyMiddleware(thunk,logger),
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const store = createStore(rootReducer, allEnhancers)
// ----------------------------------------------------------------------

export default function App() {
  return (<Provider store={store}>
    <ThemeProvider>
      
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
      
    </ThemeProvider></Provider>
  );
}
