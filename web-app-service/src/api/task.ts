import axios from 'axios';
import { API_URL } from '../config/config';

export const getTasks = async ()=>{
    return axios.get(`${API_URL}/tasks`);
}

export const createTask = async (payload:any)=>{
    return axios.post(`${API_URL}/tasks/create`, payload);
}

export const editTask = async (taskId:string|number, payload:any)=>{
    return axios.put(`${API_URL}/tasks/${taskId}`, payload);
}

export const deleteTask = async (taskId:string|number)=>{
    return axios.delete(`${API_URL}/tasks/${taskId}`);
}