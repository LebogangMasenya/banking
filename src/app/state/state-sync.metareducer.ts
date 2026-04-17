import { ActionReducer, INIT, UPDATE } from "@ngrx/store";

export function localStorageSyncMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state,action) => {
        const nextState = reducer(state, action);

        if(action.type === INIT || action.type === UPDATE) {
            const savedState = localStorage.getItem('app_state');
            return savedState ? JSON.parse(savedState) : nextState;
        }

        localStorage.setItem('app_state', JSON.stringify(nextState));

        return nextState;
    }
}