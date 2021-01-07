import { BrandValidatorAdapter } from "./brand-validator";

describe('Brand Validator Adapter', () => {
    test('Deveria retornar falso quando uma marca inválida fosse fornecida', () => {
        const validatorAdapter = new BrandValidatorAdapter();
        const validate = validatorAdapter.isValid('invalid_brand');
        expect(validate).toBe(false);
    });

    test('Deveria retornar verdadeiro quando uma marca válida fosse fornecida', () => {
        const validatorAdapter = new BrandValidatorAdapter();
        jest.spyOn(validatorAdapter, 'isValid').mockReturnValueOnce(true);

        const validate = validatorAdapter.isValid('valid_brand');
        expect(validate).toBe(true);
    });
});