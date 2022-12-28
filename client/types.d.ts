interface User {
  id: number;
  todos: Todo[];
}

type Todo = {
  id: number;
  text: string;
  createdAt: number;
};

type Todos = Array<Todo>;

interface TodosContext {
  todos: Todo[];
  createTodo: (Todo) => void;
}

interface AuthContext {
  email?: string;
  password?: string;
  res: {
    status?: number;
    data?: Record<string, unknown>;
  };
  err: unknown;
  clear: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, x: string) => Promise<void>;
}
