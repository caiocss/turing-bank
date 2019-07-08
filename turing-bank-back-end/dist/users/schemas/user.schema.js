"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const autoIncrement = require("mongoose-auto-increment");
const keys_1 = require("../../config/keys");
const connection = mongoose.createConnection(keys_1.default.mongoURI);
autoIncrement.initialize(connection);
const SALT_WORK_FACTOR = 10;
exports.UserSchema = new mongoose.Schema({
    name: String,
    agency: { type: String, default: '01' },
    account: { type: Number },
    preferredName: String,
    email: String,
    cpf: { type: String, unique: true },
    balance: { type: Number, default: 0 },
    password: { type: String },
});
exports.UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'account', startAt: 100000,
    incrementBy: 1 });
exports.UserSchema.pre('save', function (next) {
    if (!this.isNew) {
        return next();
    }
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
//# sourceMappingURL=user.schema.js.map