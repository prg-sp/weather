import toCelcius from './utils';

export default class UI {
	constructor() {
		this.city = document.getElementById('w-city');
		this.country = document.getElementById('w-country');
		this.celcius = document.getElementById('w-celcius');
		this.humi = document.getElementById('w-humidity');
		this.wind = document.getElementById('w-wind');
		this.desc = document.getElementById('w-description');
		this.img = document.getElementById('w-img');
		this.count = 0;
	}

	paint(data) {
		let celcius = toCelcius(data.main.temp);
		this.city.textContent = data.name;
		this.country.textContent = data.sys.country;
		this.celcius.textContent = celcius;
		this.wind.textContent = data.wind.speed;
		this.humi.textContent = data.main.humidity;
		this.desc.textContent = data.weather[0].description;
		this.img.setAttribute(
			'src',
			`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
		);
	}

	clearInput() {
		const delInput = document.querySelectorAll('.data-clear');

		delInput.forEach((el) => {
			el.value = '';
		});
	}

	modal() {
		const modalContainer = document.querySelector('#modal');
		const modal = document.createElement('div');

		modal.className = 'close-modal';

		let output = `
			<form class='form'>
				<div class="form__group">
					<input
						type="text"
						name="city"
						id="ch-city"
						class="form__input data-clear"
						placeholder="new city"
					/>
				</div>
				<div class="form__group">
					<input
						type="text"
						name="country"
						id="ch-country"
						class="form__input data-clear"
						placeholder="new country (optional)"
					/>
				</div>
				<button class='btn btn--change'>Change</button>
				<button class='btn btn--close'>X</button>
			</form>
`;
		modal.innerHTML = output;
		modalContainer.append(modal);
	}

	closeModal() {
		const modalContainer = document.querySelector('#modal');
		if (modalContainer.firstElementChild) {
			modalContainer.firstElementChild.remove();
		}
	}

	alert(msg, cls) {
		const alert = document.querySelector('.alert');
		const elem = document.createElement('div');
		const randTop = Math.floor(Math.random() * 10);
		const randLeft = Math.floor(Math.random() * 10);
		this.count++;

		elem.className = `alerm`;
		elem.style.cssText = `
				top:${randTop}%;
				left:4${randLeft}%;
			`;

		let output = `
				${msg} ... \n Unluckiness level: ${this.count} \n
			`;
		elem.textContent = output;
		alert.append(elem);

		setTimeout(() => {
			this.removeAlertButOne();
			this.count = 0;
		}, 2000);
	}

	removeAlertButOne() {
		const alerm = document.querySelectorAll('.alerm');
		alerm.forEach((x) => (x.nextSibling ? x.remove() : x));
	}

	removeAlert() {
		const alerm = document.querySelectorAll('.alerm');
		this.count = 0;

		alerm.forEach((x) => x.remove());
	}

	showSpinner() {
		const spinner = document.getElementById('spinner');
		// spinner.setAttribute('src', 'loading.gif');
		spinner.removeAttribute('hidden');
		console.log('spinner on');
	}

	hideSpinner() {
		const spinner = document.getElementById('spinner');

		// spinner.removeAttribute('src');
		spinner.setAttribute('hidden', '');
		console.log('spinner off');
	}
}
