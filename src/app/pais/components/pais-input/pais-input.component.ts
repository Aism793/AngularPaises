import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
})
export class PaisInputComponent implements OnInit {

  //Siemore es importante indicar el tipo del evento que se va a emitir, en este caso el término es string
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() placeholder: string = '';

  debouncer: Subject<string> = new Subject();//Pertenece a rxjs no a Angular

  termino: string = '';

  buscar(){
    this.onEnter.emit(this.termino);
  }

  constructor() { }

  //Se dispara una única vez cuando el componente es creado
  ngOnInit(){
    this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(valor => {
      this.onDebounce.emit(valor);
      //console.log('debouncer', valor);
    })
  }

  teclaPresionada(): void {
    this.debouncer.next(this.termino);
  }

}

