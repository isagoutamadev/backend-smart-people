import Joi from "joi";

export const UserBodySchema = Joi.object({
    user: Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).min(8).required(),
        password: Joi.string().min(8).required(),
        role_id: Joi.number().min(1).max(3).required(),
        is_active: Joi.number().min(0).max(1).required(),
        is_banned: Joi.number().min(0).max(1).required(),
    }).required(),
    employee: Joi.object({
        name: Joi.string().min(8).max(100).required(),
        branch_company_id: Joi.string().min(36).max(36).required(),
        district_id: Joi.number().required(),
        picture: Joi.string().allow("", null).max(100),
        address: Joi.string().allow("", null),
    })
});

export const UserSearchSchema = Joi.object({
    role_id: Joi.number().min(1).max(3),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).min(8).max(30),
}).unknown(true);