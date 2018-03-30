const http = require('http');
const socketIO = require('socket.io');
const r = require('rethinkdb');
const config = require('./config.json');

const db = Object.assign(config.rethinkdb, {  
    db: 'timeline'
});
// const server = http.Server(app);  
const server = http.createServer(function(request, response){});
const io = socketIO(server);

r.connect(db)  
    .then(conn => {
        // обновления
        // r.table('messages')
        //     .changes()
        //     .run(conn)
        //     .then(cursor => {
        //         cursor.each((err, data) => {
        //             const message = data.new_val;
        //             io.sockets.emit('messages', message);
        //         });
        //     });

        // показать все записи
        io.on('connection', (client) => {
            // все записи
            // r.table('messages')
            //     .run(conn)
            //     .then(cursor => {
            //         cursor.each((err, message) => {
            //             io.sockets.emit('messages', message);
            //         });
            //     });
            // добавить запись
            client.on('messages', (body) => {
                const {
                    name, message, date
                } = body;
                const data = {
                    name, message, date
                    // : new Date()
                };
                console.log(data)
                r.table('messages').insert(data).run(conn);
            });

            client.on('test',(dates) => {
                const {
                    date1,date2
                } = dates;
                console.log(date1 + '-----' + date2)
                r.table('messages')
                .filter(
                r.row('date').ge(date1)
                .and(r.row('date').le(date2)))                    
                .run(conn)
                .then(cursor => {
                    cursor.toArray((err, message) => {
                        io.sockets.emit('test',message);
                        // console.log(message)
                    });
                });
            })
        });

        });        

        server.listen(8000, () => console.log('ready on localhost:8000'));

        // server.listen(8000);
        // console.log('ready on localhost:8000');
        
        // use socket.io
        // var io = require('socket.io').listen(server);
        // console.log('socket on localhost:8000');

        io.on('connection', function (socket) {
            console.log('A client is connected!');   
        });

    