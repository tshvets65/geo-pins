const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return { ...state, currentUser: action.payload }

        case 'AUTH_USER':
            return { ...state, isAuth: action.payload }

        case 'SIGNOUT_USER':
            return { ...state, isAuth: false, currentUser: null }

        default:
            return state
    }
}

export default reducer