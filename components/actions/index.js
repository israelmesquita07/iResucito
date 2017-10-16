export const INITIALIZE_DONE = 'INITIALIZE_DONE';
export const SET_SALMOS_FILTER = 'SET_SALMOS_FILTER';
export const SET_SALMO_CONTENT = 'SET_SALMO_CONTENT';
export const SET_ABOUT_VISIBLE = 'SET_ABOUT_VISIBLE';
export const SET_SETTINGS_VALUE = 'SET_SETTINGS_VALUE';
export const SET_LIST_CHOOSER_SALMO = 'SET_LIST_CHOOSER_SALMO';
export const SET_LIST_ADD_VISIBLE = 'SET_LIST_ADD_VISIBLE';
export const SET_LIST_CREATE_NEW = 'SET_LIST_CREATE_NEW';
export const LIST_CREATE_NAME = 'LIST_CREATE_NAME';
export const LIST_CREATE = 'LIST_CREATE';
export const LIST_ADD_SALMO = 'LIST_ADD_SALMO';
export const LIST_REMOVE_SALMO = 'LIST_REMOVE_SALMO';
export const LIST_DELETE = 'LIST_DELETE';
export const LIST_SHARE = 'LIST_SHARE';

export const decideSalmoAddDialog = salmo => {
  return (dispatch, getState) => {
    let state = getState();
    var hasLists =
      state.ui
        .get('lists')
        .keySeq()
        .count() > 0;
    if (hasLists) {
      dispatch({ type: SET_LIST_CHOOSER_SALMO, salmo: salmo });
    } else {
      dispatch({ type: SET_LIST_ADD_VISIBLE, visible: true, salmo: salmo });
    }
  };
};
