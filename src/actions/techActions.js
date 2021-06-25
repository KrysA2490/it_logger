import { GET_TECHS, ADD_TECH, DELETE_TECH, SET_LOADING, TECHS_ERROR} from './types'


//Get techs from server
    //makes request, get data, dispatch to reducer, change the state
    export const getTechs = () => async dispatch => {
        try {
            setLoading();
    
            const res = await fetch('/techs');
            const data = await res.json();
    
            dispatch({
                type: GET_TECHS,
                payload: data
            })
            
        } catch (err) {
            dispatch({
                type: TECHS_ERROR,
                payload: err.response.statusText
            })
        }
    }

//Add tech to server
export const addTech = (tech) => async dispatch => {
    try {
        setLoading();

        const res = await fetch('/techs', { 
            method: 'POST',
            body: JSON.stringify(tech),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();

        dispatch({
            type: ADD_TECH,
            payload: data
        })
        
    } catch (err) {
        dispatch({
            type: TECHS_ERROR,
            payload: err.response.statusText
        })
    }
}

//Delete tech
export const deleteTech = (id) => async dispatch => {
    try {
        setLoading();

        await fetch(`/techs/${id}`, { 
            method: 'DELETE'
        });
        
        dispatch({
            type: DELETE_TECH,
            payload: id
        })
        
    } catch (err) {
        dispatch({
            type: TECHS_ERROR,
            payload: err.response.statusText
        })
    }
}
//Set loading to true 
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}