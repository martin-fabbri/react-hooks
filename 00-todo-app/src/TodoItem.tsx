import React from 'react'
import styled from 'styled-components'
import Checkbox from './Checkbox'
import { ITodo } from './TodoApp'

const Button = styled.button`
  font-weight: 400;
  color: white;
  font-size: 0.75em;
  border: 1px solid transparent;
  background-color: transparent;
  margin: 5px;
  cursor: pointer;
`

const Item = styled.li`
  font-size: 1.75em;
  padding: 0.25em 0.25em 0.25em 0.5em;
  color: white;
  border-bottom: 1px solid white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-of-type {
    border-bottom: none;
  }
`

interface IProps {
  todo: ITodo
  onCompleteToggle: (id: number) => void
  onDelete: (id: number) => void
}

export default function TodoItem({ todo, onCompleteToggle, onDelete }: IProps) {
  const { id, completed, text } = todo;
  const handleCompletedToggle = () => {
    onCompleteToggle(id);
  }
  const handleTodoDelete = () => {
    onDelete(id);
  }
  return (
    <Item key={id}>
      <Checkbox
        id={id.toString()}
        label={text}
        checked={completed}
        onChange={handleCompletedToggle}
      />
      <Button onClick={handleTodoDelete}>x</Button>
    </Item>
  )
}
