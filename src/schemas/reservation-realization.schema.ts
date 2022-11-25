import Joi from "joi";

export const RealizationSchema = Joi.object({
    reservation_id: Joi.number().required(),
    biometric: Joi.string().min(3).required(),
});
