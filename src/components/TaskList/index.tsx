

import clipboardLogo from '../../assets/clipboard.png'
import { TaskItem } from '../TaskItem';

import styles from './styles.module.css'

export interface Task {
  id: number;
  content: string;
  done: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onSwitchTaskStatus: (id: number) => void;
  onRemoveTask: (id: number) => void;
}

export function TaskList({ tasks, onSwitchTaskStatus, onRemoveTask }: TaskListProps) {

  const taskAmount = tasks.length
  const taskListIsEmpty = taskAmount === 0
  const doneTaskAmount = tasks.filter(task => task.done).length

  const doneTaskText = taskAmount > 0 ? `${doneTaskAmount} de ${taskAmount}` : '0'

  return (
    <div className={styles.container}>
      <header>
        <strong>Tarefas criadas <span>{taskAmount}</span></strong>
        <strong className={styles.purple}>Concluídas <span>{doneTaskText}</span></strong>
      </header>
      
      {taskListIsEmpty && (          
        <div className={styles.emptyTaskList}>
          <img src={clipboardLogo} alt="Icon de prancheta" />
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>  
      )}    
      
      {!taskListIsEmpty && (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onSwitchTaskStatus={onSwitchTaskStatus}
              onRemoveTask={onRemoveTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}