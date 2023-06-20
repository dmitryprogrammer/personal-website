import './App.scss';
import {Header} from '../header/header/header';

export function App() {
  return (
    <main className='container main-wrapper'>
      <Header></Header>
      <div>content</div>
      <div>side</div>
    </main>
  );
}
