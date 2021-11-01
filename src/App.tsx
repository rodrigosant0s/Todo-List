import { TodoList } from './components/TodoList/index';
import { TodoStore } from './store/TodoStore';

import styles from './app.module.scss'

function App() {
  return (
    <main className={styles.contentWrapper}>
      <TodoList todoStore={TodoStore}/>
    </main>
  )
}

export default App
