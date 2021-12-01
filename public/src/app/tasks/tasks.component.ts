import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  taskList: any[] = []
  taskById: any;
  showingTask= false;
  editOneTask=false;
  editTask: any;
  newTask:any;
  _id:string = "";


  constructor( private _taskService: TaskService ) { }

  ngOnInit(): void {
    this.oneTask('');
    this.newTask = {
      title : "",
      description : "",
      completed : "",
    };

    this.editTask = {
      title : "",
      description : "",
      completed : "",
    };
  }


  createNewTask( event: any ): void{
    event.preventDefault();

    let observable = this._taskService.createAndReturnTask( this.newTask )

    observable.subscribe( (data:any ) => {
      this.taskList.push( data );
    })
  }

  getAllTasks(): void {
    this._taskService.getAllTasks()
    .subscribe((data:any)=>{
      this.taskList = data;
      console.log("This will get all the tasks");
      console.log(data);
    });
  }

  oneTask( _id:string ): void{
    let observable = this._taskService.oneTask( _id );
    
    observable.subscribe( (data:any) =>{
      this.taskById = data;
      console.log("One result By ID: ", this.taskById);
    });
  }

  onShow(event:any){
    let id:string = event.target.id;
    this.oneTask(id);
    this.showingTask=true;
  }

  onEdit(event:any){
    let id:string = event.target.id;
    this.oneTask(id);
    this.editOneTask=true;
  }
  /*
  updateOneTask(event:any):void{

    let observable = this._taskService.updateTask( this.taskById, this.editTask )
    console.log("look",this.taskById);
    observable.subscribe( (data:any ) => {
      console.log(data);
    })
  }*/

  updateOneTask(event:any):void{
    let observable = this._taskService.updateTask(this.taskById._id, this.editTask)
    console.log("look here: ",this.taskById._id);
    observable.subscribe((data:any)=>{
      console.log(data);
      //this.taskList.push( data );
  })
}

  destroy(event:any){
    let id:string = event.target.id;
    console.log(id);
    let observable =this._taskService.destroyTask(id);
    observable.subscribe((data:any)=>{
      this.taskList.pop( );
    })

  }

}
