import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../task.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetDataService {

  constructor(private http: HttpClient) { }

  load() {
    return this.http.get<Task[]>(`https://jsonplaceholder.typicode.com/todosa?_start=0&_limit=3`).pipe(
      catchError((error: Error) => {
        console.log('inside widget http service catch error');
        return throwError(() => {
          console.log('Error rethrown by Widget Service')
          return new Error('Error from load Task API call')})
      })
    )
  }

  addTaskSync(task: Task): Task | never {
    if (task.id === 0) {
      throw Error(`Value zero (0) is not allowed as a task id`);
    }
    return task;
  }
}
