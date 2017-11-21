const Utils = require('./utils');

/**
 * Базовый класс
 */
class ChatBase {

    constructor() {
        this.name = 'base'; // Имя класса        
    }

    /**
     * Вернет IP адрес текущего запроса
     */
    get currentIP() {
        if (typeof this._currentIP !== 'undefined') {
            return this._currentIP;
        }

        this._currentIP = Utils.getIP(this.request.connection.remoteAddress);

        // IP пустой смотрим не передали ли в заголовке
        if (Utils.emptyIP(this._currentIP)) {
            var forwared = this._request.headers['x-forwarded-for'];
            if (!Utils.empty(forwared)) {
                this._currentIP = decodeURIComponent(forwared)
            }
        }

        if (Utils.empty(this._currentIP)) {
            return '255.255.255.255';
        } else {
            return this._currentIP;
        }
    }

    /**
     * Выводим логи
     */
    log() {
        var arr = [
            this.name,
            (new Date).toISOString()
        ];

        for (var i = 0, len = arguments.length; i < len; i++) {
            arr.push(arguments[i]);
        }

        Utils.showMessageColor('\x1b[43;34m %s \x1b[47;30m %s \x1b[0m\n', arr);
    }

    /**
     * Ответить c определенным кодом
     */
    respondEnd(codeEnd, data) {
        if (typeof codeEnd == "undefined") {
            codeEnd = 200;
        }

        this.respond.writeHead(codeEnd, {
            'access-control-allow-origin': '*'
        });

        if (typeof codeEnd == "undefined") {
            this.respond.write(JSON.stringify({ succecc: true }));
        } else {
            this.respond.write(JSON.stringify(data));
        }

        this.respond.end();
    }

    /**
     * Запрос
     */
    set request(req) {
        this._request = req;
        this._currentIP = undefined;
    }

    /**
     * 
     * @param {*} request 
     * @param {*} respond 
     */
    process(request, respond) {
        this.request = request;
        this.respond = respond;
        return this;
    }

    get request() {
        return this._request;
    }

    /**
     * Ответ
     */
    set respond(res) {
        this._respond = res;
    }

    get respond() {
        return this._respond;
    }

}

module.exports = ChatBase;