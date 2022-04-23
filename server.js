const express = require('express');
const app = express();
require('dotenv').config();
const fetch = require('node-fetch');
const port = process.env.PORT || 3000;

app.use(express.static('public'));

// app.get('/orai/:city/:country', async (req, res) => {
app.get('/orai/:cityCountry', async (req, res) => {
	const cityCountry = req.params.cityCountry.split(',');

	console.log(cityCountry);

	const city = cityCountry[0];
	const country = cityCountry[1];
	const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${process.env.APP_KEY}`;
	const response = await fetch(url);
	const respData = await response.json();
	res.json(respData);
});

//pasjungimas serverio
app.listen(port, (err) => {
	if (err) {
		console.log(`Problema:...${err}`);
		return;
	}
	console.log(`kaip ir servina...is porto: ${port}`);
});
