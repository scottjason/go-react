import * as React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const signInReqUrl = '/api/sign-in';
const createAcctReqUrl = '/api/create-account';

const Form = (props: any): JSX.Element => {
  const navigate = useNavigate();
  const emailRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();
  const { err, res, clear, onSubmit, onChange } = useAuth();

  const { view, onToggleView } = props;
  const reqUrl: string = view === 'sign-in' ? signInReqUrl : createAcctReqUrl;
  const isSignInView: boolean = view === 'sign-in';

  React.useEffect((): void => {
    if (res.status === 200) {
      navigate('/dashboard');
    }
    (): void => {
      clear();
    };
  }, [res]);

  React.useEffect((): void => {
    if (err) {
      console.log('handle err', err);
    }
  }, [err]);

  const onToggle = (): void => {
    if (emailRef.current) {
      emailRef.current.value = '';
    }
    if (passwordRef.current) {
      passwordRef.current.value = '';
    }
    onToggleView();
  };

  return (
    <form onSubmit={(e) => onSubmit(e, reqUrl)} className='mt-8 space-y-6' noValidate>
      <input type='hidden' name='remember' defaultValue='true' />
      <div className='-space-y-px rounded-md shadow-sm'>
        <div>
          <label htmlFor='email-address' className='sr-only'>
            Email address
          </label>
          <input
            ref={emailRef}
            id='email-address'
            name='email'
            type='email'
            autoComplete='email'
            required
            className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
            placeholder='Email address'
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor='password' className='sr-only'>
            Password
          </label>
          <input
            ref={passwordRef}
            id='password'
            name='password'
            type='password'
            autoComplete='current-password'
            required
            className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
            placeholder='Password'
            onChange={onChange}
          />
        </div>
      </div>
      <div>
        <button
          type='submit'
          id='submit-btn'
          className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
            <svg
              className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z'
                clipRule='evenodd'
              />
            </svg>
          </span>
          {view === 'sign-in' ? 'SIGN IN' : 'CREATE ACCOUNT'}
        </button>
        <div onClick={onToggle} id='toggle-opts' className='mt-6 text-slate-50 text-center'>
          {isSignInView && (
            <>
              <p>Don&apos;t have an account? </p>
              <p>CREATE ACCOUNT</p>
            </>
          )}
          {!isSignInView && (
            <>
              <p>Have an account?</p>
              <p>SIGN IN</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export { Form };
