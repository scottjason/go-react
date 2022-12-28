import * as React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Form } from './Form';

type View = 'sign-in' | 'create-account';

const Authentication = (): JSX.Element => {
  const [view, setView] = React.useState<View>('sign-in');
  const { clear } = useAuth();

  const onToggleView = (): void => {
    const nextView = view === 'sign-in' ? 'create-account' : 'sign-in';
    if (nextView !== view) {
      console.log('calling clear');
      clear();
      setView(nextView);
    }
  };

  return (
    <div className='bg-black flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8 '>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='logo image'
          />
          <h2 className='mt-6 text-slate-50 text-center text-3xl font-normal tracking-wide'>
            {view === 'sign-in' ? 'sign in to your account' : 'create an account'}
          </h2>
        </div>
        <Form view={view} onToggleView={onToggleView} />
      </div>
    </div>
  );
};

export default Authentication;
