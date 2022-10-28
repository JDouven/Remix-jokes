import { NavLink } from '@remix-run/react';
import type { PropsWithChildren } from 'react';
import type { To } from 'react-router-dom';

interface BreadcrumbProps {
  to: To;
}

export default function Breadcrumb({
  to,
  children,
}: PropsWithChildren<BreadcrumbProps>) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? 'text-teal-500' : 'undefined')}
    >
      {children}
    </NavLink>
  );
}
