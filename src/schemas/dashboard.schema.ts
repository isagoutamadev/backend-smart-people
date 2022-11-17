import Joi from "joi";

export const SearchDashboardSchema = Joi.object({
    start_date: Joi.string().isoDate(),
    end_Date: Joi.string().isoDate(),
    group_time: Joi.string().valid("daily", "monthly"),
}).unknown(true);