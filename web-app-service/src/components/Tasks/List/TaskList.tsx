import React, { useEffect } from 'react';
import { DeleteOutlined, EditOutlined, EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Table, Space, Tag, Button, Typography, Tooltip, Modal, message } from 'antd';
import { deleteTask, getTasks } from '../../../api/task';
import Loading from '../../Loading/Loading';
import TaskForm from '../Form/TaskForm';
import './TaskList.css';

const { confirm } = Modal;
const { Title } = Typography;

const TaskList = () => {
  const [allTasks, setAllTasks] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [drawer, setDrawer] = React.useState<any>({ open: false, type: '' });
  const [selectedTaskDetails, setSelectedTastDetails] = React.useState({});

  useEffect(() => {
    setLoading(true);
    getTasks()
      .then(res => setAllTasks(res.data))
      .catch(err => message.error(err?.message || 'Unable to fetch tasks'))
      .finally(() => setLoading(false))
  }, []);

  if (loading) {
    return <Loading />
  }

  const title = 'Tasks';
  const locale = {
    emptyText: 'No Data Found!',
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_: any, record: { taskId: string | number; title: string }) => <Button type='link' onClick={() => openSlider(record.taskId, 'view')}>{record.title}</Button>,
    },
    {
      title: 'Completed',
      dataIndex: 'completed',
      key: 'completed',
      render: (_: any, { completed }: any) => {
        let color = completed ? 'green' : 'volcano';
        return (
          <Tag color={color}>
            {completed ? 'completed' : "not-completed"}
          </Tag>
        );
      }
    },
    {
      title: 'Has SubTask',
      key: 'subTaskId',
      dataIndex: 'subTaskId',
      render: (_: any, { SubTasks }: any) => {
        let color = SubTasks?.length ? 'green' : 'volcano';
        return (
          <Tag color={color}>
            {SubTasks?.length ? 'yes' : "no"}
          </Tag>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: { taskId: string | number; }) => (
        <Space size="middle">
          <Tooltip placement="top" title='Preview'>
            <EyeOutlined onClick={() => openSlider(record?.taskId, 'view')} />
          </Tooltip>
          <Tooltip placement="top" title='Edit'>
            <EditOutlined onClick={() => openSlider(record?.taskId, 'edit')} style={{ color: "#4E89FF" }} />
          </Tooltip>
          <Tooltip placement="top" title='Delete'>
            <DeleteOutlined onClick={() => deleteTaskModalHandler(record.taskId)} style={{ color: '#b71a25' }} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const closeSlider = () => {
    setDrawer({ open: false, type: '' });
  };

  const taskSaveHandler = (task: any) => {
    task = task[0]?.taskId ? task[0] : task;

    const filteredTasks = allTasks?.filter((oldTask: any) => oldTask?.taskId !== task?.taskId);
    setAllTasks([task, ...filteredTasks]);
  };

  const openSlider = (taskId: string | number | null, type: string) => {
    if (taskId) {
      const filteredTask = allTasks.filter((task: any) => task.taskId === taskId);
      setSelectedTastDetails(filteredTask[0]);
      setDrawer({ open: true, type });
    } else {
      setSelectedTastDetails({});
      setDrawer({ open: true, type });
    }
  };

  const deleteTaskModalHandler = (taskId: string | number) => {
    const data = {
      title: 'Are you sure to delete this task?',
      description: 'When clicked the OK button, this dialog will be closed after 1 second',
      itemId: taskId
    }
    ConfirmationModal({ ...data });
  };

  const ConfirmationModal = ({ title, description, itemId }: any) => {
    confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      content: description,

      onOk() {
        deleteTask(itemId)
          .then(res => {
            message.success('Task successfully deleted');
            const filterTasks = allTasks?.filter((task: any) => task.taskId !== itemId);
            setAllTasks(filterTasks);
          }
          ).catch(err => message.error(err?.message || 'Unable to delete the task'));
      },
      onCancel() { },
    });
  };

  return (
    <>
      <TaskForm taskDetails={selectedTaskDetails} onClose={closeSlider} type={drawer.type} taskSaveHandler={taskSaveHandler} open={drawer.open} />
      <div className='tasksList'>
        <div className="tasksHeader">
          <Title level={2}>{title}</Title>
          <Button
            onClick={() => openSlider(null, 'create')}
            type="primary"
            style={{
              marginBottom: 5,
            }}
          >
            Create Task
          </Button>
        </div>
        <Table locale={locale} columns={columns} dataSource={allTasks} scroll={{ y: 250, }} pagination={{ pageSize: 10, }} rowKey="taskId" />
      </div>
    </>
  )
};

export default TaskList;