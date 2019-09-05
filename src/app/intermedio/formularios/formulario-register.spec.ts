import { FormularioRegister } from './formulario-register';
import { FormBuilder } from '@angular/forms';

describe('Formuarios', () => {
    let component: FormularioRegister;

    beforeEach( () => component = new FormularioRegister(new FormBuilder()));

    it('Debe crear formulario con 2 campos - email y password', () => {
        expect(component.form.contains('email')).toBeTruthy();
        expect(component.form.contains('password')).toBeTruthy();
    });

    it('El email debe ser obligatorio', () => {
        const control = component.form.get('email');
        control.setValue('');

        expect(control.valid).toBeFalsy();
    });

    it('El email debe ser un email válido', () => {
        const control = component.form.get('email');
        control.setValue('test@test.com');

        expect(control.valid).toBeTruthy();
    });
});
