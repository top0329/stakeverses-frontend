import React, { ReactElement } from 'react';

interface ISpinnerContext {
  openSpin: (text: string) => void;
  closeSpin: () => void;
}

export const SpinnerContext = React.createContext<ISpinnerContext | undefined>(
  undefined
);

const SpinnerProvider = ({ children }: { children: ReactElement }) => {
  const [isSpin, setIsSpin] = React.useState(false);
  const [title, setTitle] = React.useState('');

  const openSpin = (text: string) => {
    setTitle(text);
    setIsSpin(true);
  };

  const closeSpin = () => {
    setIsSpin(false);
  };

  return (
    <SpinnerContext.Provider value={{ openSpin, closeSpin }}>
      {children}
      {isSpin && (
        <div
          className="spinner-wrapper !bg-[#041431b9]"
          style={{ backgroundColor: '#041431b9' }}
        >
          <div className="loader"></div>
          <div style={{ color: 'white' }}>{title}...</div>
        </div>
      )}
    </SpinnerContext.Provider>
  );
};

export default SpinnerProvider;
