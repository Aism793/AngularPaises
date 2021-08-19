import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';//Permite recibir un observable y regresar otro. Tap dispara un efecto secundario
import { Country } from '../../interfaces/pais.interface';


import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;//Como no se inicializa pais, TS lo marca como error porque puede ser nulo, con ! le indico que sé lo que hago



  //ActivatedRoute trae todo lo necesario para poder suscribirnos a cualquier cambio de la URL
  constructor(private activatedRoute: ActivatedRoute,
              private paisService: PaisService) { }

  ngOnInit(): void {
    
    /* this.activatedRoute.params
    .subscribe(params => {
      console.log(params);
    })

    Lo puedo hacer de la anterior forma o también con desestructuración de objetos, como en el siguiente ejemplo */
    /* this.activatedRoute.params
    .subscribe(({id}) => {
      console.log(id);
      this.paisService.getPaisPorAlpha(id)
      .subscribe(pais => {
        console.log(pais);
      })
    })

    Otra forma de hacerlo */

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.paisService.getPaisPorAlpha(id)),
      tap(console.log)//El tap ya sabe que debe imprimir lo que reciba como respuesta. Por eso no se pone nada en el consoloe.log
    )
    .subscribe(pais => this.pais = pais);
  }

}
