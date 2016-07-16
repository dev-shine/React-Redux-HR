import { CONFIG } from '../config/index'

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