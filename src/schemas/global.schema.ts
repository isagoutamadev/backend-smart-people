import Joi from "joi";

export const UUIDSchema = Joi.object({
    uuid: Joi.string().uuid().required(),
}).unknown(true);