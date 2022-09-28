import React, { useEffect, useState } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Space, Switch, message } from 'antd';
import { TaskPayloadProps } from '../../../types/TaskForm.types';
import { TITLE_VALIDATIONS } from '../../../constants/constants';
import { TaskFormProps } from '../../../types/TaskForm.types';
import { createTask, editTask } from '../../../api/task';
import DynamicFields from './DynamicFields';

const TaskForm: React.FC<TaskFormProps> = ({ open, type, onClose, taskSaveHandler, taskDetails }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const title = type === 'create' ?
    'Create Task' :
    type === 'edit' ?
      'Edit Task' :
      'Task Details';

  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      title: taskDetails?.title || '',
      details: taskDetails?.details || '',
      subtasks: taskDetails?.SubTasks || [],
      completed: taskDetails?.completed || false,
    });
  }, [taskDetails, form]);

  const onFinish = (values: TaskPayloadProps) => {
    setLoading(true);

    const payload = { ...values, subTasks: values.subtasks };

    if (taskDetails?.taskId) {
      editTask(taskDetails?.taskId, payload)
        .then(res => {
          closeHandler();
          taskSaveHandler?.(res.data.task);
          message.success('Task Updated successfully');
        }).catch(err => message.error(err?.message || 'There is an Error!')).finally(() => setLoading(false));
    } else {
      createTask(payload)
        .then(res => {
          closeHandler();
          taskSaveHandler?.(res.data.task);
          message.success('Task Created successfully');
        }).catch(err => message.error(err?.message || 'There is an Error!')).finally(() => setLoading(false));
    }
  }

  const closeHandler = () => {
    onClose?.();
  }

  const onFinishError = (values: any) => {
    message.error(values?.errorFields ? 'Error, please fill the required fields.' : 'There is an error!');
  };

  return (
    <div>
      <Drawer
        title={title}
        width={520}
        onClose={closeHandler}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        headerStyle={{
          background: '#141414',
          color: '#fff',
        }}
        getContainer={false}
        forceRender
      >
        <Form layout="vertical"
          name='task'
          initialValues={{
            title: '',
            completed: false,
            details: '',
            subtasks: []
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishError}
          autoComplete="off"
          form={form}
          style={{
            fontWeight: 'bold'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={TITLE_VALIDATIONS}
              >
                <Input disabled={type === 'view' ? true : false} placeholder="Please enter task title" maxLength={24} minLength={2} autoFocus />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="completed"
                label="Completed"
                valuePropName="checked"
              >
                <Switch
                  checkedChildren='Incomplete'
                  unCheckedChildren='complete'
                  disabled={type === 'view' ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="details"
                label="Details"
              >
                <Input.TextArea disabled={type === 'view' ? true : false} rows={4} placeholder="please task details" maxLength={256} showCount />
              </Form.Item>
            </Col>
          </Row>
          <DynamicFields subtasks={taskDetails?.SubTasks} type={type} />
          <Row gutter={16} style={{ height: '70px', justifyContent: 'end' }}>
            <Space>
              <Button style={{ borderRadius: '8px' }} type="primary" onClick={closeHandler} danger>Cancel</Button>
              {
                type !== 'view' && !loading && (
                  <Button style={{ borderRadius: '8px' }} type="primary" htmlType="submit">
                    Submit
                  </Button>
                )
              }
              {
                loading && (
                  <Button style={{ borderRadius: '8px' }} type="primary" disabled onClick={() => { }}>
                    Loading!
                  </Button>
                )
              }
            </Space>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default TaskForm;
