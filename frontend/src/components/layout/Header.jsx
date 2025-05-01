import React from 'react';
import logo from '../../assets/logo.png';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
export default function Header() {

  const items = [
    {
      label: 'דף הבית',
      icon: 'pi pi-home'
    },
    {
      label: 'שירים',
      icon: 'pi pi-play-circle'
    },
    
  ];

  const start = <img alt="logo" src={logo} height="80" className="mr-2"></img>;

  return (
    <div className="header">
      <Menubar model={items} start={start}  />
    </div>
  );
}
