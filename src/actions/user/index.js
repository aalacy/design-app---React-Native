import { AsyncStorage } from 'react-native';
import { USER, COMMON, MAIN } from '../../config/types';
import axios, { post, put, get } from 'axios';

const BASE_URL = 'https://digiidrobe.com/';
const SIGNIN_URL ='api/auth/login';
export const SIGNUP_URL = 'api/auth/register';
export const SIGNUP_SOCIAL_URL = 'api/auth/register_social';
const USER_SETTING = 'api/user_settings';
const GET_BRANDS = 'api/brands?is_feature=1';
const GET_CELEBRITIES = 'api/celebrities';

export const CHECK_EMAIL_URL = 'api/check_email';

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const signIn = (email, password) => {
	return (dispatch) => {
		return post(`${BASE_URL}${SIGNIN_URL}`, {
			email, 
			password,
		}).then(res => {
			dispatch({ type: USER.LOGIN, payload: { token: res.data.token, user: res.data.user }});
			return "success";
		}).catch(err => {	
			dispatch({ type: USER.LOGIN, payload: { error: err.response.data.message }});
			return err.response.data.message;
		});
	}
}

export const signUp = (user, url) => {
	return (dispatch) => {
		console.log(user);
		const config = {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		};	
		return post(`${BASE_URL}${url}`, user, config).then(res => {
			console.log('success', res.data);
			dispatch({ type: USER.SIGNUP, payload: { token: res.data.token, user: res.data.user }});
			return "Successfully Done.";
		}).catch(err => {	
			console.log(err.response);
			return "err";
			// dispatch({ type: USER.SIGNUP, payload: { error: err.response.data.message }});
			// return err.response.data.message;
		});
	}
}

export const userSetting = (setting) => {
	return (dispatch) => {
      	return storage.load({ key: 'token' }).then(ret => {
      	 	const config = {
				headers: {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + ret.token,
				},
			};
			return put(`${BASE_URL}${USER_SETTING}`, setting, config)
				.then(res => {
					 storage.save({ key: 'setting', data: { setting: res }})
					return {data: res.data, status: 'success'};
				}).catch(err => {
					return { status: err.response.data.message};
				})
      	}).catch (err => {
	      	return err.message;
		});
	}
}

export const getBrands = () => {
	return (dispatch) => {
		return storage.load({ key: 'token' }).then(ret => {
	  	 	const config = {
				headers: {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + ret.token,
				},
			};
			return get(`${BASE_URL}${GET_BRANDS}`, config)
				.then(res => {
					dispatch({ type: MAIN.BRANDS, payload: { brands: res.data.data }});
				}).catch(err => {
					return err.response.data.message;
				})
	  	}).catch (err => {
	      	return err.message;
		});
	}
}

export const getCelebrities = () => {
	return (dispatch) => {
		return storage.load({ key: 'token' }).then(ret => {
	  	 	const config = {
				headers: {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + ret.token,
				},
			};
			return get(`${BASE_URL}${GET_CELEBRITIES}`, config)
				.then(res => {
					dispatch({ type: MAIN.CELEBRITIES, payload: { celebrities: res.data.data }});
				}).catch(err => {
					return err.response.data.message;
				})
	  	}).catch (err => {
	      	return err.message;
		});
	}
}

export const checkAuthed = () => {
	return (dispatch) => {
		
	}
}

export const signOut = () => {
	return (dispatch) => {
		
	}
}