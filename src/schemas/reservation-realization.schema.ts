import Joi from "joi";

export const RealizationSchema = Joi.object({
    reservation_uuid: Joi.string().uuid().required(),
    biometric: Joi.string().min(3).required(),
});
