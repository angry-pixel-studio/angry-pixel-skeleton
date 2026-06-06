import './style.css';
import { startGame } from '@angry-pixel-skeleton/game';

const params = new URLSearchParams(window.location.search);
const debug = Boolean(Number(params.get('debug')));

const container = document.querySelector('#app');
if (!(container instanceof HTMLElement)) throw new Error('Missing #app container');

startGame(container, debug);
