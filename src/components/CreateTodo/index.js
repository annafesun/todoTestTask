import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Input, Row } from 'antd'
//components
import Todo from '../Todo'
//slice
import { TodoActions } from '../../store/reducers/todo/slice'
//selectors
import { getTodoSelector } from '../../store/reducers/todo/selectors'
//utils
import { LS } from '../../utilits/LocalStorage'
//constants
import { TODOS } from '../../constants/localStorage'
//styles
import styles from './index.module.css'

const CreatePost = ({}) => {
  const dispatch = useDispatch()
  const todos = useSelector(getTodoSelector)

  const [todo, setTodo] = useState({
    title: '',
  })

  const addTodo = () => {
    if (todo.title) {
      dispatch(TodoActions.addTodo(todo))
      setTodo({ title: '' })
    }
  }

  useEffect(() => {
    const LStodos = LS.get(TODOS)
    if (LStodos) {
      dispatch(TodoActions.addTodos(LStodos))
    }
  }, [])

  return (
      <div className={styles.createPost}>
        <div className={styles.borderTodo}>
          <p className={styles.borderTodoText}>Todos ({todos.length})</p>
          <Row gutter={[0, 24]}>
            <Col span={24}>
              <Row gutter={[16, 8]}>
                <Col
                    md={16}
                    xs={24}
                >
                  <Input
                      onChange={(e) => setTodo((prev) => (
                          { ...prev, title: e.target.value }
                      ))}
                      value={todo.title}
                      placeholder="Enter todo name"
                  />
                </Col>

                <Col
                    md={8}
                    xs={24}
                >
                  <Button
                      block
                      type="primary"
                      className={styles.btnSubmit}
                      onClick={addTodo}
                  >
                    Create TODO
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={[16, 20]}>
                {todos?.map(({ title, id, tasks }) => (
                    <Col
                        key={id}
                        span={24}
                        sm={12}
                        lg={8}
                    >
                      <Todo
                          id={id}
                          tasks={tasks}
                          title={title}
                      />
                    </Col>
                ))}
                {!todos?.length && <p className={styles.notList}>Please create your first TODO!</p>}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
  )
}

export default CreatePost