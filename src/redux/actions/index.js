import { SET_INITIAL_VALUES, TRANSFER_CASH, NEXT_SCREEN } from '../constants/index';

export function setInitialValues(payload) {
    return { type: SET_INITIAL_VALUES, payload }
};

export function transferCash(payload) {
    return { type: TRANSFER_CASH, payload }
};

export function nextScreen(payload) {
    return { type: NEXT_SCREEN, payload }
};