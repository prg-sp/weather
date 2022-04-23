export default class Weather {
	constructor(city, country) {
		this.city = city;
		this.country = country;
	}

	async get() {
		// padarai 'endpoint't.y.: vietoj weather ir url ir localthost url' ,apdarai : "GET /foo-weather" endpoint
		const response = await fetch(`/orai/${this.city},${this.country}`);
		const respData = await response.json();
		return respData;
	}

	changeCity(city, country) {
		this.city = city;
		this.country = country;
	}
}
