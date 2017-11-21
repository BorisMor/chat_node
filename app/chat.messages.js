var ChatBase = require("./chat.base");
var ChatUser = require("./chat.users");


/**
 * Класс отвечающий за сохранение данных по пользователемя
 */
class ChatMessages extends ChatBase {

    constructor() {
        super();
        this.name = 'messages'
        this.models = require('./models').getModels();
    }

    /**
     * Записать сообщение
     * @param string ip 
     * @param string txtMessage Текст сообщения
     */
    saveMessage(ip, txtMessage) {
        var self = this;
        return new Promise((resolve, reject) => {
            ChatUser.getUserByIp(ip).then((user) => {
                self.models.Messages.build({
                        message: txtMessage,
                        user_id: user.id
                    }).save()
                    .then((message) => resolve(message))
                    .catch((error) => reject(error));
            }).catch((error) => reject(error));
        });
    }
}

module.exports = ChatMessages;