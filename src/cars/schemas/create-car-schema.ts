import * as Joi from 'joi';

import { CreateCarDto } from '../dto/create-car.dto';

export const CreateCarSchema = Joi.object<CreateCarDto>({
  name: Joi.string().required().messages({
    'string.empty': 'O nome é obrigatório',
    'any.required': 'O nome é obrigatório',
  }),
  brand: Joi.string().lowercase().required().messages({
    'string.empty': 'A marca é obrigatória',
    'string.lowercase': 'A marca deve ser em minúsculo',
    'any.required': 'A marca é obrigatória',
  }),
  model: Joi.string().lowercase().required().messages({
    'string.empty': 'O modelo é obrigatório',
    'string.lowercase': 'O modelo deve ser em minúsculo',
    'any.required': 'O modelo é obrigatório',
  }),
  year: Joi.string().required().messages({
    'string.empty': 'O ano é obrigatório',
    'any.required': 'O ano senha é obrigatório',
  }),
});


