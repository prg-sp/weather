export default class Weather {
	constructor() {
		this.client_apia = 'put_your_own_thing';
	}
	async get(city, country) {
		const response = await fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${this.client_apia}`,
		);
		const respData = response.json();
		return respData;
	}
}
