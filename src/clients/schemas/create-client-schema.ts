import * as Joi from 'joi';

import { CreateClientDto } from '../dto/create-client.dto';

export const CreateClientSchema = Joi.object<CreateClientDto>({
  name: Joi.string().required().messages({
    'string.empty': 'O nome é obrigatório',
    'any.required': 'O nome é obrigatório',
  }),
  cpf: Joi.string().lowercase().required().messages({
    'string.empty': 'O cpf é obrigatória',
    'any.required': 'O cpf é obrigatória',
  }),
  password: Joi.string().lowercase().required().messages({
    'string.empty': 'a senha é obrigatório',
    'string.lowercase': 'a senha deve ser em minúsculo',
    'any.required': 'A senha é obrigatório',
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'O telefone é obrigatório',
    'any.required': 'O telefone é obrigatório',
  }),
  email: Joi.string().lowercase().required().messages({
    'string.empty': 'O email é obrigatório',
    'string.lowercase': 'O email deve ser em minúsculo',
    'any.required': 'O email é obrigatório',
  }),
  address: Joi.object({
    cep: Joi.string().required().messages({
        'string.empty': 'O cep é obrigatório',
        'any.required': 'O cep é obrigatório',
    }),
    street: Joi.string().required().messages({
        'string.empty': 'A rua é obrigatório',
        'any.required': 'A rua é obrigatório',
    }),
    number: Joi.string().lowercase().required().messages({
        'string.empty': 'O número da casa é obrigatório',
        'any.required': 'O número da casa é obrigatório',
    }),
    district: Joi.string().lowercase().required().messages({
        'string.empty': 'O bairro é obrigatório',
        'any.required': 'O bairro é obrigatório',
    }),
    city: Joi.string().lowercase().required().messages({
        'string.empty': 'A cidade é obrigatório',
        'string.lowercase': 'A cidade deve ser em minúsculo',
        'any.required': 'A cidade é obrigatório',
    }),
    uf: Joi.string().uppercase().required().messages({
        'string.empty': 'O UF é obrigatório',
        'string.lowercase': 'O UF deve ser em maiusculo',
        'any.required': 'O UF é obrigatório',
    })
  })
  
});
  

