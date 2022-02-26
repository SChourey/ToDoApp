import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter, ToDoInterface } from '../models';

@Injectable()
export class ToDoListService {
  constructor(private http: HttpClient) {}

  addToDoList(toDoList: ToDoInterface) {
    return this.http.post('http://localhost:3001/todos', toDoList);
  }

  deleteToDoList(id: number) {
    return this.http.delete(`http://localhost:3001/todos/${id}`);
  }

  updateToDoList(toDoList: ToDoInterface) {
    return this.http.put<ToDoInterface[]>(
      `http://localhost:3001/todos`,
      toDoList
    );
  }

  public getToDoList(filterSortVal?: Filter): Observable<ToDoInterface[]> {
    let url = 'http://localhost:3001/todos?';
    if (filterSortVal && Object.keys(filterSortVal).length) {
      for (const key of Object.keys(filterSortVal)) {
        url = url + key + '=' + filterSortVal[key as keyof Filter];
      }
    }

    console.log(url);
    return this.http.get<ToDoInterface[]>(url);
  }
}
