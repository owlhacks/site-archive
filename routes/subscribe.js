var request = require('request');

exports.send_to_mailchimp = function(req, res) {
	var subscribe_url = "http://owlhacks.us9.list-manage.com/subscribe/post";
	request(subscribe_url, {form: {
							u: '2ba67714be28ca4bfea56f96a',
							id: '428f20bace',
							MERGE0: req.params.email,
							MERGE1: req.params.firstname,
							MERGE2: req.params.lastname}
						});
	res.status(200);
	console.log("Subscription sent!");
}
