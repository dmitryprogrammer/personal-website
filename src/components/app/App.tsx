import './App.scss';
import {Header} from '../header/header';

export function App() {
  return (
    <main className='main-wrapper'>
      <Header></Header>
      <div>content</div>
      <div>side</div>
    </main>
  );
}
