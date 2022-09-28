export interface TaskFormProps {
    open?: boolean;
    type?: string;
    onClose?: ()=>void;
    taskId?: any;
    taskSaveHandler?:({}:any)=>void;
    taskDetails?:TaskPayloadProps | any;
}

export interface TaskPayloadProps{
    taskId?: string|number;
    completed: boolean;
    title: string;
    subtasks?: [SubtasksProps] | [];
};

interface SubtasksProps{
    subtaskId?: string | number;
    title?: string;
    completed?: string;
};