

import classNames from 'classnames';
import { Check, Circle, Trash } from 'phosphor-react';
import { Task } from '../TaskList';

import styles from './styles.module.css'


interface TaskListProps {
  task: Task;
  onSwitchTaskStatus: (id: number) => void;
  onRemoveTask: (id: number) => void;
}

export function TaskItem({ task, onSwitchTaskStatus, onRemoveTask }: TaskListProps) {

  const handleSwitchTaskStatus = () => {
    onSwitchTaskStatus(task.id)
  }
  
  const handleRemoveTask = () => {
    onRemoveTask(task.id)
  }

  return (
    <li
      key={task.id}
      className={classNames(styles.item, task.done ? styles.done : '')}
    >
      <button
        className={styles.checkButton}
        title="Deletar tarefa"
        onClick={handleSwitchTaskStatus}
      >
        {task.done ? <Check size={16} weight="bold" /> : <Circle size={24} weight="bold" />}
      </button>

      <p>{task.content}</p>
      
      <button
        className={styles.trashButton}
        title="Deletar tarefa"
        onClick={handleRemoveTask}
      >
        <Trash size={16} />
      </button>
    </li>
  );
}