import React from 'react'
import styled from 'styled-components'

const NEW_TODO_MAX_LENGTH = 42
const NEW_TODO_WARNING_LENGTH = 25

const Input = styled.input`
  border: 2px solid rgba(255, 255, 255, 0.5);
  font-size: 1.75em;
  padding: 0.25em 0.5em;
  color: white;
  border-radius: 0.25em;
  background: transparent;
  transition: all 0.1s;
  position: relative;
  width: 50px;

  & + ul {
    border-radius: 0.25em 0.25em 0 0;
  }
`

const Form = styled.form`
  position: relative;
  display: flex;

  &:after {
    content: attr(data-remaining);
    display: block;
    position: absolute;
    right: 10px;
    top: 50%;
    padding: 6px;
    border-radius: 50%;
    transform: translateY(-50%);
    z-index: 3;
    text-align: center;
    min-width: 20px;
  }

  input {
    padding-right: 45px !important;
    width: 100%;
  }
`

interface IProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function NewTodo({ value, onChange, onSubmit }: IProps) {
  return (
    <Form
      onSubmit={onSubmit}
      data-remaining={NEW_TODO_MAX_LENGTH - value.length}
    >
      <Input
        type="text"
        autoFocus={false}
        placeholder="New Todo..."
        value={value}
        maxLength={NEW_TODO_MAX_LENGTH}
        onChange={onChange}
      />
    </Form>
  )
}
