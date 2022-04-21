import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Card } from 'antd'
//components
import CreateTaskForm from './CreateTaskForm'
import Task from '../Task'
//slice
import { TodoActions } from '../../store/reducers/todo/slice'
//styles
import styles from './index.module.css'

const Todo = ({ id, title, tasks = [] }) => {
  const dispatch = useDispatch()

  const removeTodo = (id) => {
    dispatch(TodoActions.removeTodo(id))
  }

  const lastTaskId = tasks[tasks?.length - 1]?.id || 1

  return (
      <Card

          className={styles.post}
          title={title}
          bordered={false}
      >
        <CreateTaskForm
            todoId={id}
            lastTaskId={lastTaskId}
        />
        {tasks?.map(({ id: taskId, task, done }) => (
            <Task
                key={taskId}
                todoId={id}
                taskId={taskId}
                task={task}
                done={done}
            />
        ))}
        <Button
            className={styles.removeTodoBtn}
            type="primary"
            block
            onClick={() => removeTodo(id)}
        >
          Delete
        </Button>
      </Card>
  )
}

export default Todo