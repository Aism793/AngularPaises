import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  buscar( termino: string): void { 
    this.hayError = false;
    this.termino = termino;
    //console.log(this.termino);

    //Para que un observable se dispare, tengo que usar un suscribe
    this.paisService.buscarCapital(this.termino)
    .subscribe((paises) => {
      console.log(paises);
      this.paises = paises;

    }, (err) => {
      console.log('Error');
      console.log(err);
      this.hayError = true;
      this.paises = [];
    });
  }

  
}
