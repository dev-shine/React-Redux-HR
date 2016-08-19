import { CONFIG } from '../config/index'
import * as _ from 'lodash'

export function notify( text ){
	alert( text )
}

export function fireAjax( method, url, data ){
	let URL = CONFIG.api_url + url
	let headers = {}
	if( method == 'GET' ){
		headers = {
			method : 'GET',
			mode: 'cors',
			cache: 'no-cache'
		}
	}else if( method == 'POST' ){
		let token = localStorage.getItem('hr_logged_user')
		data.token = token
		headers = {
			method : 'POST',
			mode: 'cors',
			cache: 'no-cache',
			body: JSON.stringify(data),
		}
	}

	if( data.action == "get_salary_details" ){
		let token = localStorage.getItem('hr_logged_user')
		URL = CONFIG.api_url_salary +'/salary_info.php?token=' + token
	}else if( data.action == "get_user_salary_details" ){
		let token = localStorage.getItem('hr_logged_user')
		URL = CONFIG.api_url_salary +'/salary_info.php?token=' + token + "&user_id=" + data.userid
	}else if( data.action == "add_user_salary" ){
		let token = localStorage.getItem('hr_logged_user')
		delete( data.action )
		data.token = token
		headers = {
			method : 'POST',
			mode: 'cors',
			cache: 'no-cache',
			body: JSON.stringify(data),
		}
		URL = CONFIG.api_url_salary +'/add_sal_structure.php'
	}else if( data.action == "add_user_holding" ){
		let token = localStorage.getItem('hr_logged_user')
		delete( data.action )
		data.token = token
		headers = {
			method : 'POST',
			mode: 'cors',
			cache: 'no-cache',
			body: JSON.stringify(data),
		}
		URL = CONFIG.api_url_salary +'/add_holding_info.php'
	}




	return fetch( URL, headers ).then( (response) => {
		if(response.status === 500){
			return new Promise( (resolve,reject) => {
				response.json().then((data) => {
					reject(data)
				})
			})
			
		}else if(response.status === 401){
			//alert('401 hai ')	;
		}else{
			return response.json()
		}
		
	})
}