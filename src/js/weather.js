export default class Weather {
	constructor(city, country) {
		this.client_apia = 'put_your_own_thing';
		this.city = city;
		this.country = country;
	}

	async get() {
		const response = await fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&APPID=${this.client_apia}`,
		);
		const respData = response.json();
		return respData;
	}

	changeCity(city, country) {
		this.city = city;
		this.country = country;
	}
}
