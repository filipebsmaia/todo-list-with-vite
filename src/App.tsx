import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Task, TaskList } from './components/TaskList'

import { PlusCircle } from 'phosphor-react'

import styles from './App.module.css'

import './global.css'

function App() {
  const [newTaskText, setNewTaskText] = useState<string>('')
  const [tasks, setTasks] = useState<Task[]>(() => JSON.parse(localStorage.getItem('todo-list') || '[]'))

  const sortByDone = (a: Task, b: Task) => Number(a.done) - Number(b.done);
  
  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(tasks))
  }, [tasks])

  const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value)
  }
  
  const handleNewTaskInvalid = (event: InvalidEvent<HTMLInputElement>) => {
    event.target.setCustomValidity('Este campo é obrigatório')
  }
  
  const handleCreateNewTask = (event: FormEvent) => {
    event.preventDefault()

    setTasks(state => [...state, {
      id: Date.now(),
      content: newTaskText,
      done: false
    }].sort(sortByDone))

    setNewTaskText('')
  }

  const switchTaskStatus = (id: number) => {
    setTasks(state => state.map(task => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done  
        }
      }
      return task
    }).sort(sortByDone))
  }

  const removeTask = (id: number) => {
    setTasks(state => state.filter(task => task.id !== id))
  }
  
  const isNewTaskEmpty = newTaskText.trim().length === 0;

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <form
          className={styles.taskForm}
          onSubmit={handleCreateNewTask}
        >
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button
            type="submit"
            disabled={isNewTaskEmpty}
          >
            Criar
            <PlusCircle size={16} />
          </button>
        </form>
        <TaskList
          tasks={tasks}
          onSwitchTaskStatus={switchTaskStatus}
          onRemoveTask={removeTask}
        />
      </div>
    </div>
  )
}

export default App
