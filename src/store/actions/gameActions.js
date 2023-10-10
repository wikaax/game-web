export const CreateGame = (game) => {
    return (dispatch, getState) => {
        // make async call to database
        dispatch({ type: 'CREATE_GAME', game });
    }
};