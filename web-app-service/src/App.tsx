import React from 'react';
import './App.css';
import PageHeader from './components/Header/Header';
import { Layout } from 'antd';
import Tasks from './pages/Tasks';

const { Content } = Layout;

function App() {
  return (
    <>
      <PageHeader />
      <Content className='container'>
        <Tasks />
      </Content>
    </>
  );
}

export default App;
