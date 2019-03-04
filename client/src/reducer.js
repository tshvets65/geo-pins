const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return { ...state, currentUser: action.payload }

        case 'AUTH_USER':
            return { ...state, isAuth: action.payload }

        case 'SIGNOUT_USER':
            return { ...state, isAuth: false, currentUser: null }

        case 'CREATE_DRAFT':
            return { ...state, currentPin: null, draft: { latitude: 0, longitude: 0 } }

        case 'UPDATE_DRAFT_LOCATION':
            return { ...state, draft: action.payload }

        case 'DELETE_DRAFT':
            return { ...state, draft: null }

        case 'GET_PINS':
            return { ...state, pins: action.payload }

        case 'CREATE_PIN':
            return { ...state, pins: [...state.pins, action.payload] }

        case 'SET_PIN':
            return { ...state, currentPin: action.payload, draft: null }

        case 'DELETE_PIN':
            const filteredPins = state.pins.filter(pin => pin._id !== action.payload)
            return { ...state, pins: filteredPins }

        case 'CREATE_COMMENT':
            const updatedPins = state.pins.map(pin => pin._id === action.payload._id ? action.payload : pin)
            return { ...state, pins: updatedPins, currentPin: action.payload }

        default:
            return state
    }
}

export default reducer