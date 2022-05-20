import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'validText', async: false })
export class IsValidCharacter implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const isValidChar = !!text.replace(/\.\.+/g, '').replace(/[.*+\-?^${}()|[\]\\@#$%\']/g, '');
    return isValidChar;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Text ($value) must not contain invalid characters';
  }
}
