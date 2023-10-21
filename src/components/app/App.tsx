import './App.scss';
import { Header } from '../header/header/header';

export function App() {
  return (
    <main className="main-wrapper">
      <Header></Header>
      <div className='container'>content
        <div>side</div>
      </div>
    </main>
  );
}
