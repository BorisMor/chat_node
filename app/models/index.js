/**
 * Загрузить все модели 
 * @param {*} strConnectSequelize Строка конекта до базы
 */

var cfg = require('../../config');
const Utils = require('../utils');

class ModelData {
    constructor() {
        this._sequelize = undefined;
        this.initSequelize();
    }

    /**
     * Подгружаем модели
     */
    _loadModel() {
        if (Utils.empty(this._sequelize)) {
            throw new Error("not initilize Sequelize")
        }

        this.Users = new require('./users')(this._sequelize);
        this.Messages = new require('./messages')(this._sequelize);
    }

    initSequelize() {
        if (typeof this._sequelize != 'undefined') {
            return this._sequelize;
        }

        const Sequelize = require('sequelize');
        this._sequelize = new Sequelize(cfg.strConnectSequelize);
        this._loadModel();


        this._sequelize.sync().then(function() {
            console.log('Database looks fine.')
        }).catch(function(err) {
            console.log(err, "Error with the database update!")
        });

        return this._sequelize;
    }
}

var _modelData = null;

exports.getModels = function() {
    if (!_modelData) {
        _modelData = new ModelData();
    }
    return _modelData;
};