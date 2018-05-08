export default function reducer(state = {
    getAllContents: [],
    selectItem:[]
}, action) {
    switch (action.type) {
        // ------------------------------------------------------------------
        case "GET_ALL_CONTENTS": {
            return {
                ...state,
                getAllContents: action.payload.getAllContents
            }
        }
        // ------------------------------------------------------------------
        case "SELECT_ONE_ITEM": {
            return {
                ...state,
                selectItem: action.payload.selectItem
            }
        }
        default:
            return state
    }
}