import walkingDead from '../assets/fear-1.png';
import ruduo from '../assets/back-3.jpg';

export default class UI {
	constructor() {
		this.city = document.getElementById('w-city');
		this.country = document.getElementById('w-country');
		this.celcius = document.getElementById('w-celcius');
		this.humi = document.getElementById('w-humidity');
		this.desc = document.getElementById('w-description');
		this.img = document.getElementById('w-img');
		this.forma = document.querySelector('.container form');
		this.change_city = document.getElementById('ch-city');
		this.change_country = document.getElementById('ch-country');
		this.delInput = document.querySelectorAll('.data-clear');
	}

	showCity(data) {
		let output = `
${data.name}

		`;
		this.city.innerHTML = output;
	}

	showCountry(data) {
		let output = `
${data.sys.country}

		`;
		this.country.innerHTML = output;
	}

	showCelcius(data) {
		let output = `
${data.main.temp}

		`;
		this.celcius.innerHTML = output;
	}

	showHumi(data) {
		let output = `
${data.main.humidity}

		`;
		this.humi.innerHTML = output;
	}

	showDesc(data) {
		let output = `
${data.weather[0].description}

		`;
		this.desc.innerHTML = output;
	}

	clearInput() {
		this.delInput.forEach((el) => {
			el.value = '';
		});
	}

	modal() {
		const container = document.querySelector('.container');
		const modal = document.createElement('div');
		modal.className = 'bg-light p-3';
		modal.style.cssText =
			'opacity:.9;width:100vw;height:100vh;top:0;left:0;position:fixed;display:flex;align-items:center;justify-content:center';
		let output = `
			<button id='close' class="btn btn-danger m-3" style='position:absolute;right:0;top:0'>X</button>
			<form>
				<div class="form-group">
					<input
						type="text"
						name=""
						id="ch-city"
						class="data-clear"
						placeholder="new city"
					/>
				</div>
				<div class="form-group">
					<input
						type="text"
						name=""
						id="ch-country"
						class="data-clear"
						placeholder="new country"
					/>
				</div>
				<div class="form-group">
					<input id='change-value' class="btn-ch-val btn btn-primary" type="submit" value="change" />
				</div>
			</form>
`;
		modal.innerHTML = output;
		container.append(modal);
	}

	closeModal() {
		const container = document.querySelector('.container');
		container.lastElementChild.remove();
	}

	showIcon(data) {
		let icon = data.weather[0].description;
		if (icon == 'clear sky') {
			this.img.src = walkingDead;
		} else {
			this.img.src = ruduo;
		}
	}

	alert(msg) {
		let alert = document.querySelector('.alert');
		let elem = document.createElement('div');
		elem.className = 'container p-3 bg-dark';
		elem.style.cssText = 'position:fixed;color:white;top:20%;left:20%';
		let output = `
				${msg}...
				Mhm...nera tokios info. Bandyk dar karta!
			`;
		elem.innerHTML = output;
		alert.append(elem);
	}

	removeAlert() {
		let alert = document.querySelector('.alert');
		if (alert.firstElementChild) {
			alert.firstElementChild.remove();
		}
	}
}
