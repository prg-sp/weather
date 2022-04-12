import '../main.css';
import UI from './ui';
import Storage from './storage';
import Weather from './weather';

const hero = document.querySelector('.hero__img');
const btn = document.getElementById('btn');
const container = document.querySelector('.container');

let ui = new UI();
let storage = new Storage();
let weather = new Weather();

function init() {
	listeners();

	// ui.city.innerHTML = localStorage.getItem('city');
	// ui.country.innerHTML = localStorage.getItem('country');
	showAll();
}

function listeners() {
	btn.addEventListener('click', () => {
		ui.modal();
	});

	container.addEventListener('click', (e) => {
		if (e.target.classList.contains('btn-danger')) {
			ui.closeModal();
		}
	});

	container.addEventListener('keyup', (e) => {
		if (e.keyCode == '27') {
			ui.closeModal();
		}
	});

	container.addEventListener('click', (e) => {
		e.preventDefault();
		if (e.target.classList.contains('btn-ch-val')) {
			let change_city = document.getElementById('ch-city');
			let change_country = document.getElementById('ch-country');
			let city = document.getElementById('w-city');
			let country = document.getElementById('w-country');

			let s1 = change_city.value;
			let s2 = change_country.value;

			storage.setVal(s1, s2);
			ui.clearInput();
			ui.city.innerHTML = storage.getVal('city');
			ui.country.innerHTML = storage.getVal('country');
			console.log(`Po paieskos paketimo: `);
			console.log(localStorage);
			ui.closeModal();
			showAll();
		}
	});
}

function showAll() {
	console.log(`Fetch:`);
	console.log(localStorage);
	let city = localStorage.getItem('city');
	let country = localStorage.getItem('country');
	console.log(city);
	console.log(country);

	weather
		.get(city, country)
		.then((data) => {
			console.log(data);
			if (data.cod == '404') {
				ui.alert(data.message);
			} else {
				ui.removeAlert();
				ui.showCity(data);
				ui.showCountry(data);
				ui.showCelcius(data);
				ui.showHumi(data);
				ui.showDesc(data);
				ui.showIcon(data);
				storage.setVal(data.name, data.sys.country);
			}
		})
		.catch((err) => console.log(err));
}

document.addEventListener('DOMContentLoaded', init);
