import Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().integer().positive().default(7000),
  DATABASE_URL: Joi.string().trim().uri().required(),
  JWT_SECRET: Joi.string().trim().min(10).required(),
  TICKET_SECRET: Joi.string().trim().min(16).required(),
});
