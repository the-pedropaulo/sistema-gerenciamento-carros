import { IsNotEmpty, IsEmail, IsPhoneNumber, MinLength, MaxLength } from 'class-validator';

export class CreateClientDto {
    @IsNotEmpty()
    name: string;

    @MaxLength(11)
    @MinLength(11)
    @IsNotEmpty()
    cpf: string;

    @MinLength(5)
    @IsNotEmpty()
    password: string;

    @IsPhoneNumber('BR')
    @IsNotEmpty()
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    address: {
        cep: string;
        street: string;
        number: string;
        complement:  string;
        district:  string;
        city: string;
        uf:  string;
    }
}
