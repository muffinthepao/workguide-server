const Joi = require("joi");

const validators = {

    joinValidator: Joi.object({
        fullName: Joi.string().min(3).max(30).label("Full Name").required(),
        preferredName: Joi.string().min(3).max(30).label("Preferred Name").required(),
        email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).label("Email").required(),
        password: Joi.string().min(3).label("Password").required(),
        confirmPassword: Joi.string().equal(Joi.ref("password")).required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' })
    }),
    
    loginValidator: Joi.object ({
        email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).label("Email").required(),
        password: Joi.string().min(3).label("Password").required(),
    }),

    // editValidator: Joi.object ({
    //     fullName: Joi.string().min(3).max(30).label("Full Name"),
    //     preferredName: Joi.string().min(3).max(30).label("Preferred Name"),
    //     email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).label("Email"),
    // }),

    // changePasswordValidator: Joi.object ({
    //     currentPassword: Joi.string().min(4).label("Current Password").required(),
    //     newPassword: Joi.string().min(4).label("New Password").required(),
    //     confirmNewPassword: Joi.string().equal(Joi.ref("newPassword")).required()
    //     .label('Confirm new password')
    //     .messages({ 'any.only': '{{#label}} does not match' })
    // })
}

module.exports = validators