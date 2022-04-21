import { Button, Col, Form, Input, Row } from 'antd'
import { useDispatch } from 'react-redux'
//slice
import { TodoActions } from '../../../store/reducers/todo/slice'
//styles
import styles from './index.module.css'

const CreateTaskForm = ({ todoId, lastTaskId }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const onFinish = (task) => {
    if (task.task) {
      dispatch(TodoActions.addTask({ todoId, task, lastTaskId }))
      form.resetFields()
    }
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
      <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
      >
        <Row gutter={[12, 12]}>
          <Col
              span={24}
              md={12}
          >
            <Form.Item
                name="task"
                label="Task"
            >
              <Input
                  width="100%"
              />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
             <Row gutter={10}>
               <Col span={12}>
                 <Button
                     block
                     size="small"
                     className={styles.buttonAdd}
                     type="primary"
                     htmlType="submit"
                 >
                   Add task
                 </Button>
               </Col>
               <Col span={12}>
                 <Button
                     block
                     size="small"
                     htmlType="button"
                     onClick={onReset}
                 >
                   Reset
                 </Button>
               </Col>
             </Row>

          </Col>
        </Row>
      </Form>
  )
}

export default CreateTaskForm