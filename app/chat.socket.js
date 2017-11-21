const EVENT_LOGIN = 'login';
const EVENT_LOGOUT = 'logout';
const EVENT_NEW_MESSAGE = 'new_message'

class SocketData {
    constructor(server) {
        var self = this;
        this.io = require('socket.io').listen(server);

        this.io.on('connection', (socket) => {
            self._onConnection(socket)
        });
    }

    /**
     * Отправить всем кликентам сообщение
     * @param {*} nameEvent Название сообщения
     * @param {*} data Информация 
     * @param {*} socket Сокет
     */
    sendGlobalEvent(nameEvent, data, socket) {
        console.log("event " + nameEvent, data);
        socket.emit(nameEvent, data);
        socket.broadcast.emit(nameEvent, data);
    }

    // При логирование
    onLogin(data, socket) {
        this.sendGlobalEvent(EVENT_LOGIN, data, socket);
    }

    // При разлогирование
    onLogout(data, socket) {
        this.sendGlobalEvent(EVENT_LOGOUT, data, socket);
    }

    // При новом сообщение
    onNewMessage(data, socket) {
        this.sendGlobalEvent(EVENT_NEW_MESSAGE, data, socket);
    }

    _onConnection(socket) {
        var self = this;

        socket.on(EVENT_LOGIN, (data) => self.onLogin(data, socket));
        socket.on(EVENT_LOGOUT, (data) => self.onLogout(data, socket));
        socket.on(EVENT_NEW_MESSAGE, (data) => self.onNewMessage(data, socket));
    }
}

var _soketData = null;

exports.getSockets = function(server) {
    if (!_soketData) {
        _soketData = new SocketData(server);
    }
    return _soketData;
};