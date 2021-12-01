import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: any[] = [];
  
  constructor( private _http:HttpClient ) {
    this.getAllTasks();
  }

  getAllTasks(){
    console.log( "Getting tasks from our localhost:7077" );
      return this._http.get( 'http://localhost:7077/' );
  }

  oneTask( _id:string ){
    return this._http.get(`http://localhost:7077/${_id}`)
  }
/*
  createTask( newTask: any ): void {
    this._http.post( "http://localhost:7077/new", newTask )
      .subscribe( (data: any) => {
        this.getAllTasks();
      });
  }*/

  createAndReturnTask( newTask: any ) {
    return  this._http.post( "http://localhost:7077/new", newTask );
  }

  updateTask( _id:string, editTask:any ){
    return this._http.put(`http://localhost:7077/edit/${_id}`, editTask )
  }

  destroyTask( id:string ){
    return this._http.delete(`http://localhost:7077/remove/${id}`)
  }

}
