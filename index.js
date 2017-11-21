const ChatUser = require('./app/chat.users');
const ChatMessages = require('./app/chat.messages');

require('./app/models').getModels();

var express = require('express');
var app = express();
var server = app.listen(3000, () => {
    console.log('Chat on port 3000!');
});

// Для работы с сокетами
var sockets = require('./app/chat.socket').getSockets(server);

// Переопределяем обработку сообщение об новой записи в чате
sockets.onNewMessage = (data, workSocket) => {
    sockets.sendGlobalEvent('new_message', data, workSocket);
    (new ChatMessages).saveMessage(data.user, data.message);
}

// отдаем index файл
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Логинимся - получаем инф. по пользователю адрес
app.get('/login', (req, res) => {
    var obj = new ChatUser;
    obj.process(req, res);
    obj.actionLogin().then((user) => {
        obj.respondEnd(200, user.get())
    });
});

// список пользвоателей
app.get('/lits-user', (req, res) => {
    var obj = new ChatUser;
    obj.process(req, res);
    obj.getListLoginUser().then((list) => {
        var result = [];
        for (var i = 0, len = list.length; i < len; i++) {
            result.push(list[i].get());
        }
        obj.respondEnd(200, result)
    });
});

app.get('/logout', (req, res) => {
    (new ChatUser).process(req, res).actionLogout();
});