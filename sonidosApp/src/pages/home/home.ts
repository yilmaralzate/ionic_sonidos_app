import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { ANIMALES } from "../../data/data.animales";
import { Animal } from "../../interfaces/animal.interface";

//Puedo importar el refresher desde ionic-angular para ver todos sus metodos
import { Refresher, reorderArray } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:any[] = [];
  audio = new Audio();
  audioTiempo:any;
  ordenamiento:boolean = false;

  constructor() {
    this.animales = ANIMALES.slice(0); //Se llama desde el *ngFor
  }

  playSound( animal:Animal ){
    
    //console.log(animal);
    
    this.pausarAudio(animal);

  if(animal.reproduciendo)
  {
    animal.reproduciendo = false;
    return; //Se sale para no continuar ejecutando
  }

  this.audio.src = animal.audio;

  this.audio.load();
  this.audio.play();

  animal.reproduciendo = true; //Este activa el *ngIf y pone el icono pause ----> true

  //Cuando se termina el audio entonces pone en false el flag de reproduciendo
  this.audioTiempo = setTimeout(() => {
    animal.reproduciendo = false; //Esta activa el *ngIf y pone el icono play ----> !true
  }, animal.duracion * 1000);

  }

  private pausarAudio( animalSelec:Animal ){
    
    clearTimeout( this.audioTiempo ); //Cancela el SetTimeout :)    
    this.audio.pause();
    this.audio.currentTime = 0;

    for(let animal of this.animales){

      if(animal.nombre != animalSelec.nombre){
        animal.reproduciendo = false;
      }

    }

  }

  //Si es public no se le pone nada pero si es privado se le pone el private
  borrar_animal(idx:number){
    this.animales.splice(idx,1); //Borrar 1 dato enla posicion idx
  }

  refrescar_animales(evento_refresher:Refresher){
    setTimeout(() => {
      console.log("Recargado...");
      this.animales = ANIMALES.slice(0); //Recarga el arreglo con los animales de la base de datos data.animales
      evento_refresher.complete();
    }, 1500);
  }

  reordenar_item(evento_reorder:any){
    console.log(evento_reorder); //Muestra lo que retorna el evento_reorder

    this.animales = reorderArray(this.animales, evento_reorder);
  }

}
