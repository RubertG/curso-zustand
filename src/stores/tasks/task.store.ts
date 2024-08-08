import { create, StateCreator } from "zustand";
import { Task, TaskStatus } from "../../interfaces";
import { devtools } from "zustand/middleware";
import {v4 as uuidv4} from 'uuid';

interface TaskState {
  draggingTaskId?: string
  tasks: Record<string, Task> // key: id, value: Task

  addTask: (title: string, status: TaskStatus) => void

  getTasksByStatus: (status: TaskStatus) => Task[]
  setDraggingTaskId: (taskId: string) => void
  removeDraggingTaskId: () => void
  changeTaskStatus: (taskId: string, status: TaskStatus) => void
  onTaskDrop: (status: TaskStatus) => void
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
  tasks: {
    "ABC-1": {
      id: "ABC-1",
      title: "Tarea 1",
      status: "open"
    },
    "ABC-2": {
      id: "ABC-2",
      title: "Tarea 2",
      status: "open"
    },
    "ABC-3": {
      id: "ABC-3",
      title: "Tarea 3",
      status: "in-progress"
    },
    "ABC-4": {
      id: "ABC-4",
      title: "Tarea 4",
      status: "open"
    }
  },

  getTasksByStatus: (status: TaskStatus) => {
    return Object.values(get().tasks).filter(task => task.status === status)
  },

  addTask: (title: string, status: TaskStatus) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      status
    }
    set(state => ({
      tasks: {
        ...state.tasks,
        [newTask.id]: newTask
      }
    }))
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId })
  },
  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined })
  },
  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = get().tasks[taskId]
    task.status = status
    
    if (task) {
      set(state =>  ({
        tasks: {
          ...state.tasks,
          [taskId]: task
        }
      }))
    }
  },
  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId

    if (!taskId) return

    get().changeTaskStatus(taskId, status)
    get().removeDraggingTaskId()
  }
})

export const useTaskStore = create<TaskState>()(
  devtools(
    storeApi
  )
)