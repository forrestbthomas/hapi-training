var Hapi = require('hapi');
var Good = require('good');

var server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: 3000
});

server.route({
	method: 'GET',
	path: '/',
	handler: function(req, reply) {
		reply('root');
	}
});

server.route({
	method: 'GET',
	path: '/{id}',
	handler: function(req, reply) {
		reply(encodeURIComponent(req.params.id));
	}
});

server.register({
	register: Good,
	options: {
		reporters: [{
			reporter: require('good-console'),
			events: {
				response: '*',
				log: '*'
			}
		}]
	}
}, function(err) {
	if (err) {
		throw err;
	}
});

server.start(function() {
	server.log('hapi server running', server.info.uri);
});