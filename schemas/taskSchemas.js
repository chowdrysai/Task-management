
const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().required(),
  due_date: Joi.date().optional(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().max(255).optional(),
  description: Joi.string().optional(),
  due_date: Joi.date().optional(),
});

module.exports = { taskSchema, updateTaskSchema };
