const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
const path = require("path");

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
	access_token: "<TEST-7950480841956488-103016-976e9c934728058a580a30254a62beb6-165463103>",
});


// PATH
app.use("/client/js", express.static(path.join(__dirname, "../client/js"), {
	setHeaders: (res) => {
	  res.setHeader("Content-Type", "text/javascript");
	},
}));

app.use("/client/media", express.static(path.join(__dirname, "../client/media"), {
	setHeaders: (res) => {
	  res.setHeader("Content-Type", "text/javascript");
	},
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/media")));
app.use(cors());


// GET
app.get("/", function () {
	(path.resolve(__dirname,  "../client/media/index.html"));
	res.send("El servidor de MP funciona");
});


// POST
app.post("http://localhost:8080/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:8080",
			"failure": "http://localhost:8080",
			"pending": "",
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

app.listen(8080, () => {
	console.log("The server is now running on Port 8080");
});