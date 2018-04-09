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
        //             console.log(message)
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
                console.log(data)
                r.table('messages').insert(data).run(conn);
            });

            client.on('delete',id => {
                r.table('messages').get(id).delete()
                .run(conn)
                console.log(id)
            }),

             r.table('messages')
            .run(conn)
            .then(cursor => {
                cursor.toArray((err, message) => {
                    console.log(message)
                });
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
/*
        <!DOCTYPE html>
        <html>
        <body>
        
        <p>Click the button to get the square root of each element in the array.</p>
        
        <button onclick="myFunction()">Try it</button>
        
        <p id="demo"></p>
        <p id="demo1"></p>
        
        <script>
        var numbers = [{date:'01.01.2018',message:'1'},{date:'01.02.2018',message:'2'}];
        
        var task_names = numbers.map(function (number, index, array) {
             return number.date;
        });
        var task_message = numbers.map(function (number, index, array) {
             return number.message;
        });
        
        function myFunction() {
            x = document.getElementById("demo")
            x.innerHTML = task_names
            y = document.getElementById("demo1")
            y.innerHTML = task_message
        }
        
        </script>
        
        </body>
        </html>
*/

        io.on('connection', function (socket) {
            console.log('A client is connected!');   
        });

    