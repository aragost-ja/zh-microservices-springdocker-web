import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { todosvc } from '../environments/environment';

import 'rxjs/add/operator/map';

import { Todo } from './todo';

@Injectable()
export class TodoService {

  private serviceUrl = todosvc.url + '/todo';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  private todosList;

  constructor(private http: Http) { }

  getTodos(): Observable<Todo[]> {
    console.log(`Retrieving todos from ${this.serviceUrl}`);

    if (!this.todosList) {
      this.todosList = new ReplaySubject(1);
      this.refreshTodos();
    }

    return this.todosList;
  }

  refreshTodos(): void {
    this.http.get(this.serviceUrl)
      .map(response => response.json() as Todo[])
      .subscribe(
        data => {
          this.todosList.next(data);
        },
        error => {
          this.todosList.error(error);
          this.todosList = new ReplaySubject(1);
        }
      );
  }

}
