import * as React from 'react';

const noop = () => undefined;
const defaultContext: TodosContext = {
  todos: [],
  createTodo: noop,
};

export const TodosContext = React.createContext<TodosContext>(defaultContext);

const TodosProvider: React.FC = (props: any) => {
  const [todos, setTodos] = React.useState<Todos>(defaultContext.todos);
  const createTodo = (newTodo: Todo) => setTodos((todos) => [...todos, newTodo]);

  return (
    <TodosContext.Provider
      value={{
        todos,
        createTodo,
      }}
    >
      {props?.children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
