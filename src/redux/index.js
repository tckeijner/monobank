import store from './store/index';
import { setInitialValues } from './actions/index';

window.store = store;
window.setInitialValues = setInitialValues;