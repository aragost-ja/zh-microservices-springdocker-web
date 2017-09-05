import { Component, OnInit  } from '@angular/core';

import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayAddTodo: boolean = false;
  newTodo: Todo = new Todo();

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

  showAddTodo(): void {
    this.displayAddTodo = !this.displayAddTodo;
    console.log("Adding new Todo");
  }

  saveTodo(): void {
    console.log("Adding todo " + this.newTodo.title);
    this.todoService.create(this.newTodo).subscribe(
      createdTodo => {
        console.log("Created new todo with id " + createdTodo.id);
        this.displayAddTodo = false;
        this.newTodo = new Todo();
        this.todoService.refreshTodos();
      },
      error => console.log("Error" + error)
    );
  }

}
