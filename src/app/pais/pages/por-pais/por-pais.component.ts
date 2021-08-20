import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li {
      cursor: pointer;
    }
    `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) { }

    buscar( termino: string): void { 
      this.hayError = false;
      this.termino = termino;
      this.mostrarSugerencias = false;
      //console.log(this.termino);

      //Para que un observable se dispare, tengo que usar un suscribe
      this.paisService.buscarPais(this.termino)
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

    sugerencias(termino: string): void {
      this.hayError = false;
      this.termino = termino;
      this.mostrarSugerencias = true;

      this.paisService.buscarPais(termino)
      .subscribe(paises => this.paisesSugeridos = paises.splice(0,5),
                (err)=> this.paisesSugeridos = [])
      
    }

    buscarSugerido(termino: string){
      this.buscar(termino);
     
    }

}
