import { useDispatch } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Checkbox, Row } from 'antd'
import { CloseSquareOutlined } from '@ant-design/icons'
//slice
import { TodoActions } from '../../store/reducers/todo/slice'
//styles
import styles from './index.module.css'
import classnames from 'classnames'

const Task = ({ todoId, taskId, task, done, numeration}) => {
  const dispatch = useDispatch()
  const [isActive, setActive] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef()

  const handleBlur = (taskId) => {
    setActive(false)
    if (inputValue) {
      dispatch(TodoActions.editTask({
        todoId,
        taskId,
        text: inputValue,
        done
      }))
      setInputValue('')
    }
  }

  const handleChangeStatus = () => {
    dispatch(TodoActions.editTask({
      todoId,
      taskId,
      done: !done,
      text: task
    }))
  }

  const activeTask = (e) => {
    e.preventDefault()
    setActive(true)
  }

  const removeTask = (id, taskId) => {
    dispatch(TodoActions.removeTask(id, taskId))
  }

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isActive])

  return (
      <div
          className={classnames(
              styles.task,
              { [styles.done]: done }
          )}
          key={taskId}
      >
        <div className={styles.taskText}>

          {isActive
              ?
              <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onBlur={() => handleBlur(taskId)}
                  type="text"
              />
              :
              <a
                  onClick={activeTask}
                  className={styles.tooltip}
                  href="#"
              >
                {task}
                <span>Click to change your task</span>
              </a>
          }
        </div>
         <div>
           <Checkbox
               className={styles.checkbox}
               checked={done}
               onChange={handleChangeStatus}
           />
           <Button
               size="small"
               onClick={() => removeTask({ id: todoId, taskId })}
               alt="minus"
           >
             <CloseSquareOutlined />
           </Button>
         </div>
      </div>
  )
}

export default Task
