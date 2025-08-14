import { register, list } from './registry.js';
import '../plugins/cipher.atbash.js';
import '../plugins/cipher.caesar.js';

const tabs = document.getElementById('tabs');
const app = document.getElementById('app');

function init() {
  const categories = [...new Set(list().map(p => p.category))];
  tabs.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'tab';
    btn.textContent = cat;
    btn.onclick = () => show(cat);
    tabs.appendChild(btn);
  });
  if (categories.length) {
    show(categories[0]);
    // mark first tab active
    tabs.querySelector('.tab').classList.add('active');
  }
}

function show(cat) {
  app.innerHTML = '';
  [...tabs.children].forEach(b => b.classList.toggle('active', b.textContent === cat));
  list(cat).forEach(plugin => {
    const sec = document.createElement('section');
    sec.className = 'card';
    const h2 = document.createElement('h2');
    h2.textContent = plugin.label;
    sec.appendChild(h2);
    sec.appendChild(plugin.render());
    app.appendChild(sec);
  });
}

init();
