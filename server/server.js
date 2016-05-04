const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const r = require('rethinkdb');
const path = require('path');
var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
	if (err) throw err;
	connection = conn;
	console.log('connected to db')
});

// Connecting to postgres

var pg = require('pg');
server.listen(9000);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'client/index.html'));
});

io.on('connection', function (socket) {
	//socket.on('fetchConversations', (data) => {
	//	r.db('test').table('conversations').filter(r.row('userId').contains(data.id)).run(connection, (err, cursor) => {
	//		if (err) throw err;
	//		cursor.toArray(function(err, result) {
	//			if (err) throw err;
	//			console.log(JSON.stringify(result, null, 2));
	//		});
	//	})
	//});
	console.log('new user connected');

	socket.on('createConversation', (data) => {
		console.log('createConversation', data)
	});

	socket.on('stockPurchase', (data) => {
		console.log('saving stock purchase: ', data);
		r.db('test').table('stocks').insert(data).run(connection);
	});

	r.db('test').table('stocks').changes().run(connection, function(err, cursor) {
		if (err) throw err;
		cursor.each((err, res) => {
			socket.emit('successStockPurchase', formatStock(res))
		});
	});


	r.db('test').table('messages').changes().run(connection, function(err, cursor) {
		if (err) throw err;
		cursor.each((err, res) => {
			console.log('emitting ', formatMsg(res));
			socket.emit('message', formatMsg(res))
		});
	});



	socket.on('joinConversation', (data) => {
		console.log('joining this')
		socket.join(data);
		setTimeout(() => {
			io.in(data).emit('message', 'joined data room')
		}, 1000)

	});

  socket.on('sendMessage', function (data) {
    console.log('sendMessage', data);
		r.db('test').table('messages').insert(data).run(connection);
  });
});

function formatStock(cursor) {
	var doc = cursor.new_val;
	return {
		stockName: doc.stockName,
		stockQuantity: doc.stockQuantity
	}
}


function formatMsg(cursor) {
	var doc = cursor.new_val;
	return {
		user: doc.user,
		message: doc.message
	}
}
