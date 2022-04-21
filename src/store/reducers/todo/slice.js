import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    todos: [{
        id: 1,
        title: 'test task for company',
        tasks: [
            {
                id: 1,
                task: 'task 1',
                done: true,
            },
            {
                id: 2,
                task: 'task 2',
                done: false,
            }
        ]
    }]
}

const {actions, reducer} = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        addTodos: (state, {payload: todos}) => {
            state.todos = todos
        },
        addTodo: (state, {payload: todo}) => {
            state.todos.push({
                id: (state.todos[state.todos.length - 1]?.id || 0) + 1,
                ...todo
            })
        },
        removeTodo: (state, {payload: id}) => {
            state.todos = state.todos.filter(({id: todoId}) => todoId !== id)
        },
        addTask: (state, {payload: {task, todoId, lastTaskId}}) => {
            state.todos = state?.todos.map(todo => {
                if (todo.id === todoId) {
                    return {
                        ...todo,
                        tasks: [
                            ...(todo?.tasks || []),
                            {
                                ...task,
                                done: false,
                                id: lastTaskId + 1
                            }
                        ]
                    }
                }
                return todo
            })
        },
        removeTask: (state, {payload: {id: todoId, taskId}}) => {
            state.todos = state?.todos.map(todo => {
                if (todo.id === todoId) {
                    return {
                        ...todo,
                        tasks: todo?.tasks?.filter(({id}) => id !== taskId)
                    }
                }
                return todo
            })
        },
        editTask: (state, {payload: {todoId, taskId, text, done}}) => {
            state.todos = state?.todos?.map(todo => {
                if (todo.id === todoId) {
                    return {
                        ...todo,
                        tasks: todo?.tasks?.map((task) => {
                            if (task.id === taskId) {
                                return {
                                    ...task,
                                    task: text,
                                    done
                                }
                            }
                            return task
                        })
                    }
                }
                return todo
            })
        },
    }
})

export {actions as TodoActions}
export {reducer}