import Joi from "joi";

export const CreateInstitutionSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    district_id: Joi.number().min(1).required(),
    pic_id: Joi.number().min(1).required()
});