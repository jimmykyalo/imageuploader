import { UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAIL } from './constants'
import axios from 'axios'
export const uploadImage = (image) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPLOAD_IMAGE_REQUEST
        })

        

        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post(
            `/upload/`,
            image,
            config
        )
        dispatch({
            type: UPLOAD_IMAGE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: UPLOAD_IMAGE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
} 