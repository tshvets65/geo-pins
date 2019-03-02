const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return { ...state, currentUser: action.payload }

        case 'AUTH_USER':
            return { ...state, isAuth: action.payload }

        case 'SIGNOUT_USER':
            return { ...state, isAuth: false, currentUser: null }

        case 'CREATE_DRAFT':
            return { ...state, draft: { latitude: 0, longitude: 0 } }

        case 'UPDATE_DRAFT_LOCATION':
            return { ...state, draft: action.payload }

        case 'DELETE_DRAFT':
            return { ...state, draft: null }

        case 'GET_PINS':
            return { ...state, pins: action.payload }

        case 'CREATE_PIN':
            return { ...state, pins: [...state.pins, action.payload] }

        default:
            return state
    }
}

export default reducer