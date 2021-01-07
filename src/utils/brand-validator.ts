import { BrandValidator } from "../presentation/protocols/brand-validator";

export class BrandValidatorAdapter implements BrandValidator {
    private brands = [
        "Chevrolet",
        "Volkswagen",
        "Fiat",
        "Renault",
        "Ford",
        "Toyota",
        "Hyundai",
        "Jeep",
        "Honda",
        "Nissan",
        "Citroën",
        "Mitsubishi",
        "Peugeot",
        "Chery",
        "BMW",
        "Mercedes Benz",
        "Kia",
        "Audi",
        "Volvo",
        "Land Rover",
    ];

    constructor() {
        this.brands = this.brands.map(item => item.toLowerCase());
    }

    isValid(brandToValidate: string): boolean {
        const brandToValidateLower = brandToValidate.toLowerCase();
        const brandToValidateIndex = this.brands.indexOf(brandToValidateLower);
        return brandToValidateIndex > -1;
    }
}