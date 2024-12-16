import React from 'react';
import './App.scss';
import { Header } from '../header/header/header';

export default function App() {
  return (
    <main className="main-wrapper">
      <Header />
      <div className="container">
        content
        <div>side</div>
      </div>
    </main>
  );
}
