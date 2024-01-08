import React, { useState } from 'react';

function SidebarLinkGroup({
  children,
  activecondition,
}) {

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <li className={`py-2 rounded-sm mb-0.5 last:mb-0 ${activecondition && 'secondaryDark'}`}>
      {children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;