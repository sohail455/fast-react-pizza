import React from 'react';
import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base =
    'disabled:bg-slate-600 disabled:text-white focus: inline-block rounded-full bg-yellow-400  font-semibold uppercase tracking-wide ring-offset-2 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 ';
  const style = {
    primary: base + ' px-4 py-3 ',
    small: base + ' px-3 py-2 text-3 text-[13px]',
    secondry:
      'disabled:bg-slate-600 px-4 py-3 border-2 border-stone-300 disabled:text-white focus: inline-block rounded-full bg-transparent  font-semibold uppercase tracking-wide ring-offset-2 transition-colors duration-300 hover:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 ',
    round: base + ' px-2.5 py-0.5 text-3 ',
  };
  if (to)
    return (
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );
  if (onClick) {
    return (
      <button className={style[type]} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );
  }
  return (
    <button className={style[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
