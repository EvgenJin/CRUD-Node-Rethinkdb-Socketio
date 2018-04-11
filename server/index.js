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
        // обновления не включать
        // r.table('messages')
        //     .changes()
        //     .run(conn)
        //     .then(cursor => {
        //         cursor.each((err, data) => {
        //             const message = data.new_val
        //             io.sockets.emit('changes', message)

        //         });
        //     });
        io.on('connection', (client) => {
            // добавить запись
            client.on('messages', (body) => {
                const {
                    name, message, date
                } = body;
                const data = {
                    name, message, date
                };
                r.table('messages').insert(data).run(conn);
            });
            // удалить запись
            client.on('delete',id => {
                r.table('messages').get(id).delete()
                .run(conn)
            }),
            // график тест
            // r.table('messages')
            // .run(conn)
            // .then(cursor => {
            //     cursor.toArray((err, data) => {
            //         let dates = data.map(function (date, index, array) {
            //             return date.date;                      
            //        });
            //        let messages = data.map(function (message, index, array) {
            //         return message.message;                     
            //       });
            //        data = {
            //         dates, messages
            //        }
            //         io.sockets.emit('map',data)
            //     });
            // });
            // фильтр основной
            client.on('test',(dates) => {
                const {
                    date1,date2
                } = dates;
                r.table('messages')
                .filter(
                r.row('date').ge(date1)
                .and(r.row('date').le(date2)))
                .run(conn)
                .then(cursor => {
                    cursor.toArray((err, message) => {
                        io.sockets.emit('test',message);
                    });
                });
            })
        });
    });        
        server.listen(8000, () => console.log('ready on localhost:8000'));
        // server.listen(8000);
        // console.log('ready on localhost:8000');        
        io.on('connection', function (socket) {
            console.log('A client is connected!');   
        });

    