var ChatBase = require("./chat.base");
var _buferGetUserByIp = {};

/**
 * Класс отвечающий за сохранение данных по пользователемя
 */
class ChatUser extends ChatBase {

    constructor() {
        super();
        this.name = 'user'
        this.models = require('./models').getModels();
    }

    /**
     * Активизируем или удаляем пользователя из чата
     * @param bool value 
     */
    _activeUser(value) {
        var self = this;
        return new Promise((resolve, reject) => {
            this.models.Users.findOrCreate({
                where: { ip: this.currentIP },
                defaults: { active: value }
            }).spread((user, created) => {
                if (!created) {
                    user.updateAttributes({
                        active: value
                    }).then(() => {
                        return resolve(user, self);
                    }).catch((error) => {
                        return reject(error, self);
                    })
                } else {
                    return resolve(user, self);
                }
            });
        });
    }

    /**
     * Сменить статус на подключенного
     */
    actionLogin() {
        this.log("login", this.currentIP);
        return this._activeUser(true);
    }

    /**
     * Сменить статуст на отлогининого
     */
    actionLogout() {
        this.log("logout", this.currentIP);
        return this._activeUser(false);
    }

    /**
     * Получить пользователя по IP
     * @param string ip 
     */
    static getUserByIp(ip) {
        return new Promise((resolve, reject) => {
            if (_buferGetUserByIp.hasOwnProperty(ip)) {
                resolve(_buferGetUserByIp[ip]);
            }

            require('./models').getModels().Users.find({ 'ip': ip })
                .then((user) => {
                    _buferGetUserByIp[ip] = user;
                    resolve(user);
                })
                .catch((error) => reject(error))
        });
    }

    getListLoginUser() {
        return this.models.Users.findAll({
            where: { active: true }
        })
    }
}
module.exports = ChatUser;