import React, { Component } from 'react'
import { Container, List } from './Styled'
import NewTodo from './NewTodo'
import TodoItem from './TodoItem'

export interface ITodo {
  id: number
  text: string
  completed: boolean
}

interface IProps {}

interface IState {
  todos: ITodo[]
  newTodo: string
}

class TodoApp extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      todos: [],
      newTodo: '',
    }
  }

  componentWillMount(): void {
    const rawTodos = localStorage.getItem('data')
    if (rawTodos) {
      this.setState({
        ...this.state,
        todos: JSON.parse(rawTodos),
      })
    }
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
    const { todos } = this.state
    localStorage.setItem('data', JSON.stringify(todos))
  }

  handleNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodo: e.target.value,
    })
  }

  handleNewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.setState({
      ...this.state,
      todos: [
        ...this.state.todos,
        { id: Date.now(), text: this.state.newTodo, completed: false },
      ],
      newTodo: '',
    })
  }

  handleDelete = (id: number) => {
    const { todos } = this.state
    this.setState({
      ...this.state,
      todos: todos.filter(todo => todo.id !== id),
    })
  }

  handleCompletedToggle = (id: number) => {
    const { todos } = this.state
    this.setState({
      ...this.state,
      todos: todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })
  }

  render() {
    const { newTodo, todos } = this.state
    return (
      <Container>
        <NewTodo
          onSubmit={this.handleNewSubmit}
          value={newTodo}
          onChange={this.handleNewChange}
        />
        {todos.length > 0 && (
          <List>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onCompleteToggle={this.handleCompletedToggle}
                onDelete={this.handleDelete}
              />
            ))}
          </List>
        )}
        {todos.length === 0 && (
          <p>
            Empty list.
          </p>
        )}
      </Container>
    )
  }
}

export default TodoApp
