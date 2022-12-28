import * as React from 'react';

const noop = () => undefined;
const asyncNoop = async () => undefined;

const defaultContext: AuthContext = {
  res: {},
  err: null,
  email: '',
  password: '',
  clear: noop,
  onChange: noop,
  onSubmit: asyncNoop,
};

const AuthContext = React.createContext<AuthContext>(defaultContext);

const AuthProvider: React.FC = (props: any) => {
  const [res, setRes] = React.useState({});
  const [err, setErr] = React.useState<unknown>(null);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  /*
   * Minimum eight characters,
   * at least one uppercase letter,
   * one lowercase letter, one number and one special character:
   */
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  /*
   * From Google AngularJS
   * Full source code: https://bit.ly/2FHMUVz
   */
  const emailRegex =
    /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

  const isValidPayload = (): boolean => {
    return emailRegex.test(email) && passwordRegex.test(password);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.currentTarget;
    const text = target.value;
    const eventName = target.name;
    if (eventName === 'email') {
      setEmail(text);
    } else if (eventName === 'password') {
      setPassword(text);
    }
  };

  const clear = (): void => {
    setEmail('');
    setPassword('');
    setErr(null);
    setRes({});
  };

  const onSubmit = async (e: React.FormEvent, reqUrl: string): Promise<void> => {
    e.preventDefault();
    if (isValidPayload()) {
      try {
        const body = {
          email,
          password,
        };
        const opts = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        };
        const response = await fetch(reqUrl, opts);
        const { status } = response;
        const data = await response.json();
        setRes({ status, data });
      } catch (e: unknown) {
        setErr(e);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        password,
        onChange,
        onSubmit,
        err,
        res,
        clear,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext<AuthContext>(AuthContext);
export { AuthProvider };
