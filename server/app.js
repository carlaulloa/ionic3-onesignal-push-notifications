var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var OneSignal = require('onesignal-node');

const APP_ID = "YOUR_APP_ID_ONESIGNAL";
const API_KEY = "YOUR_API_KEY_ONESIGNAL";
const USER_KEY = "YOUR_USER_KEY_ONESIGNAL";

const DEVICE_IDS = ["DEVICE_TOKENS"];

var myClient = new OneSignal.Client({
	userAuthKey: USER_KEY,
	app: { appAuthKey: API_KEY, appId: APP_ID }
});

router.post('/', (req,res) => {
	console.log('Create notification');
	var not = req.body; // {title:"title",message: "message"};
	var firstNotification = new OneSignal.Notification({
    	contents: {
        	en: not.message
    	}
	});
	firstNotification.setParameter('headings', {"en": not.title});
	firstNotification.setParameter('data', {"type": "alert"});
	firstNotification.setTargetDevices(DEVICE_IDS);
	myClient.sendNotification(firstNotification, function (err, httpResponse,data) {
   		if (err) {
       		res.status(500).json({err: err});
   		} else {
       		console.log(data, httpResponse.statusCode);
       		res.status(httpResponse.statusCode).json(data);
   		}
	});
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/notifications',router);

app.listen(port, () => {
	console.log('Listening at port ' + port);
});