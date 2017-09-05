import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  displayEditTodo: boolean = false;
  selectedTodo: Todo = new Todo();

  todos: Observable<Todo[]>;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    console.log('Loading todos');
    this.todos = this.todoService.getTodos();
  }

  toggleDisplayEditTodo() {
    this.displayEditTodo = !this.displayEditTodo;
  }

  editTodo(todo: Todo): void {
    console.log("Editing Todo " + todo.id);
    this.selectedTodo = new Todo();
    this.selectedTodo.id = todo.id;
    this.selectedTodo.title = todo.title;
    this.selectedTodo.description = todo.description;
    this.selectedTodo.completed = todo.completed;
    this.displayEditTodo = true;
  }

  updateSelectedTodo() {
    this.todoService.update(this.selectedTodo).subscribe(
      updatedTodo => {
        this.todoService.refreshTodos();
        this.displayEditTodo = false;
      }
    );
  }

}
