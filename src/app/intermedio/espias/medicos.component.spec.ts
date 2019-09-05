import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';
import { of, EMPTY, throwError } from 'rxjs';

describe('MedicosComponent', () => {

    let component: MedicosComponent;
    const service = new MedicosService(null);

    beforeEach( () => component = new MedicosComponent(service));

    it('Init: Debe cargar los médicos', () => {
        spyOn(service, 'getMedicos').and.callFake(() => {
            return of(['medico1', 'medico2', 'medico3']);
        });

        component.ngOnInit();

        expect(component.medicos.length).toBeGreaterThan(0);
    });

    it('Debe llamar al servidor para agregar un médico', () => {
        const spy = spyOn(service, 'agregarMedico').and.callFake( () => {
            return EMPTY;
        });

        component.agregarMedico();

        expect(spy).toHaveBeenCalled();
    });

    it('Debe agregar un nuevo médico al arreglo de médicos', () => {
        const medico = { id: 1, nombre: 'Juan' };
        const spy = spyOn(service, 'agregarMedico')
            .and.returnValue( of(medico) );

        component.agregarMedico();

        expect(component.medicos.indexOf(medico)).toBeGreaterThanOrEqual(0);
    });

    it('Si falla la adición, la propiedad mensajeError debe ser igual al error del servicio', () => {
        const myError = 'No se pudo agregar el médico';
        const spy = spyOn(service, 'agregarMedico')
            .and.returnValue( throwError(myError) );

        component.agregarMedico();

        expect(component.mensajeError).toBe(myError);
    });

    it('Debe llamar al servidor para borrar un médico', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        const spy = spyOn(service, 'borrarMedico')
            .and.returnValue(EMPTY);

        component.borrarMedico('1');

        expect(spy).toHaveBeenCalledWith('1');
    });

    it('No debe llamar al servidor para borrar un médico', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        const spy = spyOn(service, 'borrarMedico')
            .and.returnValue(EMPTY);

        component.borrarMedico('1');

        expect(spy).not.toHaveBeenCalledWith('1');
    });
});
