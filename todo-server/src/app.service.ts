import { Injectable } from '@nestjs/common';
import { ToDoErrorInterface, ToDoInterface } from './types';
import * as fs from 'fs';
import * as path from 'path';
import { v4 } from 'uuid';

@Injectable()
export class AppService {
  static filePath = path.join(__dirname, '/data/todoList.json');
  async readTodoJsonFile() {
    return new Promise<string>((resolve, reject) => {
      fs.readFile(AppService.filePath, 'utf8', (err, jsonString) => {
        if (err) reject(err);
        else resolve(jsonString);
      });
    });
  }

  async writeTodoJsonFile(fileContent) {
    return new Promise<string>((resolve, reject) => {
      fs.writeFile(AppService.filePath, JSON.stringify(fileContent), (err) => {
        if (err) reject(err.message);
        resolve('success');
      });
    });
  }

  async getTodos(
    title?: string,
  ): Promise<ToDoInterface[] | ToDoErrorInterface> {
    return new Promise<ToDoInterface[]>(async (resolve, reject) => {
      try {
        const resp = await this.readTodoJsonFile();
        const todos = JSON.parse(resp);
        if (title) {
          resolve(
            todos.filter(
              (todo) =>
                todo.title.toLowerCase().indexOf(title.toLowerCase()) >= 0,
            ),
          );
        } else {
          resolve(todos);
        }
      } catch (err) {
        reject({ message: err.message, status: 500 });
      }
    });
  }

  async addTodo(
    body: ToDoInterface,
  ): Promise<ToDoInterface | ToDoErrorInterface> {
    return new Promise<ToDoInterface>(async (resolve, reject) => {
      try {
        const resp = await this.readTodoJsonFile();
        const todos = JSON.parse(resp);
        body.id = v4();
        todos.push(body);

        const writeResponse = await this.writeTodoJsonFile(todos);
        if (writeResponse === 'success') {
          resolve(body);
        }
      } catch (err) {
        reject({ message: err.message, status: 500 });
      }
    });
  }

  async updateTodo(
    body: ToDoInterface,
  ): Promise<ToDoInterface | ToDoErrorInterface> {
    return new Promise<ToDoInterface>(async (resolve, reject) => {
      try {
        const resp = await this.readTodoJsonFile();
        const todos = JSON.parse(resp);
        const newTodosData = todos.map((todo) => {
          if (todo.id != body.id) {
            return todo;
          } else {
            return body;
          }
        });

        const writeResponse = await this.writeTodoJsonFile(newTodosData);
        if (writeResponse === 'success') {
          resolve(body);
        }
      } catch (err) {
        reject({ message: err.message, status: 500 });
      }
    });
  }

  async deleteTodo(id): Promise<boolean | ToDoErrorInterface> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const resp = await this.readTodoJsonFile();
        const todos = JSON.parse(resp);
        const newTodosData = todos.filter((todo) => todo.id != id);
        if (newTodosData.length === todos.length) {
          reject({ message: 'Not Found' });
        }

        const writeResponse = await this.writeTodoJsonFile(newTodosData);
        if (writeResponse === 'success') {
          resolve(true);
        }
      } catch (err) {
        reject({ message: err.message, status: 500 });
      }
    });
  }
}
