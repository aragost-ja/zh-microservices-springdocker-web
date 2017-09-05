import { Component, OnInit  } from '@angular/core';

import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  numPendingTodos: number;
  numCompletedTodos: number;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(
      todos => {
        console.log("Loaded " + todos.length + " todos");
        this.numPendingTodos = 0;
        this.numCompletedTodos = 0;
        for (let t of todos) {
          if (t.completed) {
            this.numCompletedTodos++;
          } else {
            this.numPendingTodos++;
          }
        }
      }
    );
  }

}
