import '../main.css';
import UI from './ui';
import Storage from './storage';
import Weather from './weather';

const changeLoc = document.getElementById('btn');
const modal = document.querySelector('#modal');

let ui = new UI();
let storage = new Storage();

const city = storage.getLocation().city;
const country = storage.getLocation().country;

let weather = new Weather(city, country);

function init() {
	showAll(city, country);
	listeners();
}

function listeners() {
	//go to form in order to change city
	changeLoc.addEventListener('click', () => {
		ui.modal();
	});

	//while in form click to change city
	modal.addEventListener('click', (e) => {
		e.preventDefault();
		if (e.target.classList.contains('btn--change')) {
			const city = document.getElementById('ch-city').value;
			const country = document.getElementById('ch-country').value;

			weather.changeCity(city, country);
			showAll(city, country);
		}
	});

	//esc from with mouse click on 'x' button
	modal.addEventListener('click', (e) => {
		if (e.target.classList.contains('btn--close')) {
			ui.closeModal();
			ui.removeAlert();
		}
	});

	//esc form with 'esc' key
	document.addEventListener('keyup', (e) => {
		if (e.keyCode == '27') {
			ui.closeModal();
			ui.removeAlert();
		}
	});
}

function showAll(city, country) {
	if (city == '') return ui.alert("City can't be empty!");

	weather
		.get()
		.then((data) => {
			if (data.cod != '200') {
				ui.alert(data.message);
				ui.clearInput();
				return;
			}

			storage.setLocation(city, country);
			ui.closeModal();
			ui.removeAlert();
			ui.paint(data);
		})
		.catch((err) => console.error(err));
}

document.addEventListener('DOMContentLoaded', init);
