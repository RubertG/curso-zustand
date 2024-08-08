import { DragEvent, useState } from "react"
import Swal from "sweetalert2"
import { TaskStatus } from "../interfaces"
import { useTaskStore } from "../stores/tasks/task.store"

export const useTasks = (status: TaskStatus) => {
  const isDragging = useTaskStore((state) => !!state.draggingTaskId)
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop)
  const addTask = useTaskStore((state) => state.addTask)
  const [onDragOver, setOnDragOver] = useState(false)

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setOnDragOver(false)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setOnDragOver(true)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setOnDragOver(false)
    onTaskDrop(status)
  }

  const hanldeAddTask = async () => {
    const { isConfirmed, value: title } = await Swal.fire({
      title: 'Nueva Tarea',
      input: 'text',
      inputLabel: 'Nombre de la tarea',
      inputPlaceholder: 'Escribe una nueva tarea',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Tarea requerida'
        }
        return null
      }
    })

    if (!isConfirmed || !title) return

    addTask(title, status)
  }

  return {
    isDragging,
    onDragOver,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    hanldeAddTask
  }
}