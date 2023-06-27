import { AsyncStorage } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager } from "react-native-fbsdk";

export const USER_KEY = 'digiidrobe';
const myApiKey = 'AIzaSyCOBiCms6zeg6-CDFrT5o-0-5jgXIyivZc';

export function validateEmail(email) {
	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
	return reg.test(email) === true;
}

export const onSignIn = () => storage.save({ key: USER_KEY, data: { status: 'true' }});

export const onSignOut = async () => {
	await storage.save({ key: USER_KEY, data: { status: 'false'}});
	await LoginManager.logOut();
	await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
}

export const isSignIn = async () => await storage.load({ key: USER_KEY });

export function geocoder(latitude, longitude) {
	return fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + myApiKey)
                .then((response) => response.json())
                .then((responseJson) => {
             return responseJson.results[0].formatted_address;
         }) 
}