import { action, computed, makeObservable, observable } from "mobx";


type TodoItem = {
    id: number;
    title: string;
    completed: boolean;
}


export class TodoStoreImpl {

    todos: TodoItem[] =  [];

    
    constructor() {
        makeObservable(this, {
            todos: observable,
            addTodo: action,
            toggleTodo: action,
            deleteTodo: action,
            status: computed,
        })
    }

    addTodo(title: string) {
        if (title.trim()) {
            const item: TodoItem = {
                id: +Math.random().toFixed(4),
                title,
                completed: false,
            };
            this.todos.push(item);
            localStorage.setItem('todos-items', JSON.stringify(this.todos));
        }
    }

    deleteTodo(id: number) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        localStorage.setItem('todos-items', JSON.stringify(this.todos));
    }

    toggleTodo(id: number) {
        const index = this.todos.findIndex(item => item.id === id);
        if (index > -1) {
            this.todos[index].completed = !this.todos[index].completed;
            localStorage.setItem('todos-items', JSON.stringify(this.todos));
        }
    }

    get status() {
        let completed = 0, remaining = 0;
        this.todos.forEach(todo => {
            if (todo.completed) {
                completed++;
            } else {
                remaining++;
            }
        });
        return { completed, remaining };
    }
}

export const TodoStore = new TodoStoreImpl()