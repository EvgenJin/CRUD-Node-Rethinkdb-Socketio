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
<<<<<<< HEAD
        //     r.db('timeline').table("messages")
        //     .filter(function(post) {
        //       return 
        //         post("date").ge('2017-11-13T00:00:00.000Z')
        //         .and
        //         (post("date").le('2018-12-01T00:00:00.000Z'));
        //   })
        // показать все записи
        io.on('connection', (client) => {
            r.table('messages')
                .run(conn)
                .then(cursor => {
                    cursor.each((err, message) => {
                        io.sockets.emit('messages', message);
                    });
                });
=======

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
>>>>>>> 33636000f74e1ae8f38b35c621a8acda9aa439d5
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

<<<<<<< HEAD
            client.on('test', (body) => {
                const {
                    date1,date2
                } = body;
                const req = {
                    date1,date2
                };
                console.log(date1 + "-----" + date2)
=======
            client.on('test',(dates) => {
                const {
                    date1,date2
                } = dates;
                console.log(date1 + '-----' + date2)
>>>>>>> 33636000f74e1ae8f38b35c621a8acda9aa439d5
                r.table('messages')
                .filter(
                r.row('date').ge(date1)
                .and(r.row('date').le(date2)))                    
                .run(conn)
                .then(cursor => {
<<<<<<< HEAD
                    cursor.toArray((err,message) => {
                        io.sockets.emit('test',message)
                    })
                })
            });
        });
        server.listen(8000, () => console.log('Заходи на localhost:8000'));
=======
                    cursor.toArray((err, message) => {
                        io.sockets.emit('test',message);
                        // console.log(message)
                    });
                });
            })
        });
        // отладка
        });        

        server.listen(8000, () => console.log('ready on localhost:8000'));

>>>>>>> 33636000f74e1ae8f38b35c621a8acda9aa439d5
        // server.listen(8000);
        // console.log('ready on localhost:8000');
        
        // use socket.io
        // var io = require('socket.io').listen(server);
        // console.log('socket on localhost:8000');

        io.on('connection', function (socket) {
            console.log('A client is connected!');   
        });

    })