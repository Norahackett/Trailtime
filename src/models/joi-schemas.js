import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");



export const UserSpec = Joi.object()
    .keys({
        firstName: Joi.string().example("Homer").required(),
        lastName: Joi.string().example("Simpson").required(),
        email: Joi.string().email().example("homer@simpson.com").required(),
        password: Joi.string().example("secret").required(),
        _id: IdSpec,
        __v: Joi.number()
    })
    .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserSpecPlus = UserSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserCredentialsSpec = Joi.object()
    .keys({
        email: Joi.string().email().example("homer@simpson.com").required(),
        password: Joi.string().example("secret").required(),
    })
    .label("UserCredentials");

export const TrailSpec = Joi.object()
    .keys({
        name: Joi.string().required().example("Carlow Way"),
        latitude: Joi.number().required().example("52"),
        longitude: Joi.number().required().example("-6.117"),
        description: Joi.string().required().example("easy hike"),
        traillistid: IdSpec,
    })
    .label("Trail");

export const TrailSpecPlus = TrailSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("TrailPlus");

export const TrailArraySpec = Joi.array().items(TrailSpecPlus).label("TrailArray");

export const TraillistSpec = Joi.object()
    .keys({
    name: Joi.string().required().example("Ulster Trailllist"),
        userid: IdSpec,
        trails: TrailArraySpec,
    })
    .label("Traillist");

export const TraillistSpecPlus = TraillistSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("TraillistPlus");

export const TraillistArraySpec = Joi.array().items(TraillistSpecPlus).label("TraillistArray");


export const JwtAuth = Joi.object()
    .keys({
        success: Joi.boolean().example("true").required(),
        token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
    })
    .label("JwtAuth");

