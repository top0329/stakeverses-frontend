'use client';

import { ReactElement, createContext } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

import SuccessImage from '@/assets/images/success.png';
import WarningImage from '@/assets/images/warning.png';
import QuestionImage from '@/assets/images/question.png';
import FailImage from '@/assets/images/fail.png';

interface IToastContext {
  showToast: (type: string, str: string) => void;
}

export const ToastContext = createContext<IToastContext | undefined>(undefined);

const ToastProvider = ({ children }: { children: ReactElement }) => {
  const showToast = (type: string, str: string) => {
    switch (type) {
      case 'success':
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-96 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            onClick={() => toast.dismiss(t.id)}
            style={{
              backgroundColor: '#141414',
              padding: '16px',
              color: '#a5a5a5',
            }}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-center gap-4">
                <div className="pt-0.5">
                  <Image
                    className="h-10 w-10 rounded-full"
                    width={40}
                    height={40}
                    src={SuccessImage}
                    alt="success"
                  />
                </div>
                <div className="ml-3 flex items-center">
                  <p className="text-base font-medium text-light-gray">{str}</p>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() => toast.remove(t.id)}
                className="w-full border border-transparent rounded-full flex items-center justify-center text-sm font-medium text-light-gray hover:text-light-gray focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        ));
        break;
      case 'warning':
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-96 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            onClick={() => toast.dismiss(t.id)}
            style={{
              backgroundColor: '#141414',
              padding: '16px',
              color: '#a5a5a5',
            }}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-center gap-4">
                <div className="pt-0.5">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src={WarningImage}
                    width={40}
                    height={40}
                    alt="warning"
                  />
                </div>
                <div className="ml-3 flex items-center">
                  <p className="text-base font-medium text-light-gray">{str}</p>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() => toast.remove(t.id)}
                className="w-full border border-transparent rounded-full flex items-center justify-center text-sm font-medium text-light-gray hover:text-light-gray focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        ));
        break;
      case 'question':
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-96 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            onClick={() => toast.dismiss(t.id)}
            style={{
              backgroundColor: '#141414',
              padding: '16px',
              color: '#a5a5a5',
            }}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-center gap-4">
                <div className="pt-0.5">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src={QuestionImage}
                    width={40}
                    height={40}
                    alt="question"
                  />
                </div>
                <div className="ml-3 flex items-center">
                  <p className="text-base font-medium text-light-gray">{str}</p>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() => toast.remove(t.id)}
                className="w-full border border-transparent rounded-full flex items-center justify-center text-sm font-medium text-light-gray hover:text-light-gray focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        ));
        break;
      case 'fail':
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-96 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            onClick={() => toast.dismiss(t.id)}
            style={{
              backgroundColor: '#141414',
              padding: '16px',
              color: '#a5a5a5',
            }}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-center gap-4">
                <div className="pt-0.5">
                  <Image
                    className="h-10 w-10 rounded-full"
                    width={40}
                    height={40}
                    src={FailImage}
                    alt="fail"
                  />
                </div>
                <div className="ml-3 flex items-center">
                  <p className="text-base font-medium text-light-gray">{str}</p>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() => toast.remove(t.id)}
                className="w-full border border-transparent rounded-full flex items-center justify-center text-sm font-medium text-light-gray hover:text-light-gray focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        ));
        break;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
