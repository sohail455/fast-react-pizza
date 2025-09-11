import React from 'react';
import { Link } from 'react-router-dom';

function Button({ children, disabled, to }) {
  const className =
    'disabled:bg-slate-600 disabled:text-white focus: inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide ring-offset-2 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300';
  if (to)
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
