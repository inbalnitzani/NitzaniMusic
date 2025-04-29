import React from 'react';
import logo from '../../assets/logo.png';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
export default function Header() {

  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home'
    },
    {
      label: 'Features',
      icon: 'pi pi-star'
    },
    
  ];

  const start = <img alt="logo" src={logo} height="80" className="mr-2"></img>;

  return (
    <div className="card">
      <Menubar model={items} start={start}  />
    </div>
  );
}
