import { Component, OnInit } from '@angular/core';
import { MedicosService } from './medicos.service';

@Component({
  selector: 'app-medicos',
  template: `
    <p>
      medicos works!
    </p>
  `,
  styles: []
})
export class MedicosComponent implements OnInit {

  public medicos: any[] = [];
  public mensajeError: string;

  constructor( public medicosService: MedicosService ) { }

  ngOnInit() {
    this.medicosService.getMedicos()
          .subscribe( medicos => this.medicos = medicos );
  }

  agregarMedico() {
    const medico = { nombre: 'Médico Juan Carlos' };

    this.medicosService.agregarMedico(medico)
          .subscribe(
            medicoDB => this.medicos.push(medicoDB),
            err => this.mensajeError = err
          );
  }

  borrarMedico(id: string) {
    const confirmar = confirm('Estas seguro que desea borrar este médico');

    if ( confirmar ) {
      this.medicosService.borrarMedico( id );
    }

  }

}
