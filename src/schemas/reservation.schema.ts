import Joi from "joi";

export const ReservationSchema = Joi.object({
    institution: Joi.string().min(3).max(50).required(),
    institution_leader: Joi.string().min(3).max(50).required(),
    pic: Joi.string().min(2).max(50).required(),
    count: Joi.number().min(1).required(),
    reservation_time: Joi.string().isoDate().required(),
});

export const SearchReservationSchema = Joi.object({
    institution: Joi.string().min(3).max(50).required(),
    pic: Joi.string().min(3).max(50).required(),
    sort_by: Joi.string().allow("institution", "pic", "reservation_date", "reservation_count").required(),
});