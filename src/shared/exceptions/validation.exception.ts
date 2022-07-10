import { ValidationError } from '../interfaces/validation-error.interface';

export class ValidationException extends Error {
  constructor(public readonly details: ValidationError[]) {
    super();
  }
}
