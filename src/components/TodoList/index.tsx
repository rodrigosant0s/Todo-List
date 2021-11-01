import React, { useEffect, useState } from 'react'

import { BsTrashFill } from 'react-icons/bs'
import { ImCheckboxUnchecked } from 'react-icons/im'
import { ImCheckboxChecked } from 'react-icons/im'

import { observer } from 'mobx-react-lite'
import { TodoStoreImpl } from '../../store/TodoStore'

import styles from './styles.module.scss'


type TodoListProps = {
    todoStore: TodoStoreImpl
}


export const TodoList: React.FC<TodoListProps> = observer(({ todoStore }) => {
    const [value, setValue] = useState<string>('');

    const checkedIcon = <ImCheckboxChecked className={styles.CheckboxIcon} />
    const uncheckedIcon = <ImCheckboxUnchecked className={styles.CheckboxIcon} />
    const trashIcon = <BsTrashFill className={styles.trashIcon} />


    useEffect(() => {
        if (JSON.parse(localStorage.getItem("todos-items")!) !== null) {
            todoStore.todos = JSON.parse(localStorage.getItem("todos-items")!)
        }
    }, []);


    return <div className={styles.todoListWrapper}>

        <div className={styles.box}>
            <span className={styles.title}> Todo - List </span>

            <input
                placeholder='Insira sua tarefa'
                className={styles.inputField}
                onChange={event => setValue(event.target.value)}
                value={value}
                type="text" />

            <button className={styles.button} onClick={() => { `${todoStore.addTodo(value)} ${setValue('')}` }}>Adicionar</button>
            <span className={styles.StatusCompleted}>Completed: {todoStore.status.completed}</span>
            <span className={styles.StatusRemaining}>Remaining: {todoStore.status.remaining}</span>

        </div>

        <div>
            <ul className={styles.todoList}>
                {todoStore.todos.map(todo => {
                    return <li key={todo.id} className={todo.completed ? styles.done : styles.todo}
                        onClick={() => { todoStore.toggleTodo(todo.id) }}>

                        <span>{todo.completed ? checkedIcon : uncheckedIcon}</span>‏‏‎{todo.title}

                        <span className={styles.trashIconWrapper}
                            onClick={() => { todoStore.deleteTodo(todo.id) }}>
                            {trashIcon}
                        </span>
                    </li>
                })}
            </ul>
        </div>
    </div>

});