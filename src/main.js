import './app.css';
import App from './App.svelte';
import { auth } from './store/user';

await auth.refresh();

const app = new App({
  target: document.getElementById('app'),
});

export default app;
