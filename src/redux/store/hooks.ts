import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from './index'

/*
* Typescript specific hooks that produce typed dispatch and selector hooks.
* As per the react-redux documentation: https://react-redux.js.org/tutorials/typescript-quick-start#define-typed-hooks
*/
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector