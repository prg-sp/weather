export default class Storage {
	setVal(name, country) {
		localStorage.setItem('city', name);
		localStorage.setItem('country', country);
	}

	getVal(key) {
		localStorage.getItem(key);
	}

	clearAllVal() {
		localStorage.clear();
	}
}
