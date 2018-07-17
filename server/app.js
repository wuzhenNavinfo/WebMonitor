import express from 'express'
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import router from './routes';
import http from 'http';

var debug = require('debug')('myapp:server');

const cluster = require('cluster');
const cpuNums = require('os').cpus().length;

const listeningPort = 5000;

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/* 增加跨域处理 */
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
};
app.use(allowCrossDomain);

router(app);
//
// app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500).send('出错啦:' + err.stack);
});

/***************************cluster -- begin********************************/
if(cluster.isMaster){
    for(let i=0;i<cpuNums;i++){
        cluster.fork();
    }
    cluster.on('exit',(worker)=>{
        console.log(`worker${worker.id} exit.`)
    });
    cluster.on('fork',(worker)=>{
        console.log(`fork：worker${worker.id}`)
    });
    cluster.on('listening',(worker,addr)=>{
        console.log(`worker${worker.id} listening on ${addr.address}:${addr.port}`)
    });
    cluster.on('online',(worker)=>{
        console.log(`worker${worker.id} is online now`)
    });
}else{
    app.listen(listeningPort);
}

/***************************cluster -- end********************************/
//
// /*****************************************************/
// /**
//  * Get port from environment and store in Express.
//  */
//
// var port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);
//
// /**
//  * Create HTTP server.
//  */
//
// var server = http.createServer(app);
//
// /**
//  * Listen on provided port, on all network interfaces.
//  */
//
// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);
//
// /**
//  * Normalize a port into a number, string, or false.
//  */
//
// function normalizePort(val) {
//     var port = parseInt(val, 10);
//
//     if (isNaN(port)) {
//         // named pipe
//         return val;
//     }
//
//     if (port >= 0) {
//         // port number
//         return port;
//     }
//
//     return false;
// }
//
// /**
//  * Event listener for HTTP server "error" event.
//  */
//
// function onError(error) {
//     if (error.syscall !== 'listen') {
//         throw error;
//     }
//
//     var bind = typeof port === 'string' ?
//         'Pipe ' + port :
//         'Port ' + port;
//
//     // handle specific listen errors with friendly messages
//     switch (error.code) {
//         case 'EACCES':
//             console.error(bind + ' requires elevated privileges');
//             process.exit(1);
//             break;
//         case 'EADDRINUSE':
//             console.error(bind + ' is already in use');
//             process.exit(1);
//             break;
//         default:
//             throw error;
//     }
// }
//
// /**
//  * Event listener for HTTP server "listening" event.
//  */
//
// function onListening() {
//     var addr = server.address();
//     var bind = typeof addr === 'string' ?
//         'pipe ' + addr :
//         'port ' + addr.port;
//     console.log('Listening on ' + bind);
//     debug('Listening on ' + bind);
// }