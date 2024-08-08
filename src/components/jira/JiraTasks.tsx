import { IoAddOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { Task, TaskStatus } from '../../interfaces';
import { SingleTask } from './SingleTask';
import classNames from 'classnames';
import { useTasks } from '../../hooks/use-jira-tasks';

interface Props {
  title: string;
  status: TaskStatus
  tasks: Task[]
}

export const JiraTasks = ({ title, tasks, status }: Props) => {
  const { handleDragLeave, handleDragOver, handleDrop, hanldeAddTask, isDragging, onDragOver } = useTasks(status)

  return (
    <div
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={
        classNames(
          "!text-black relative flex flex-col border-2 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",
          {
            'border-blue-500 border-dotted': isDragging,
            'border-green-500': onDragOver && isDragging
          }
        )
      }>


      {/* Task Header */}
      <div className="relative flex flex-row justify-between">

        <div className="flex items-center justify-center">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: '50px' }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button
          onClick={hanldeAddTask}
        >
          <IoAddOutline />
        </button>

      </div>

      {/* Task Items */}
      {
        tasks.map((task) => (
          <SingleTask key={task.id} task={task} />
        ))
      }
    </div>
  );
};