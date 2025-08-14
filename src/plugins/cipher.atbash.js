import { register } from '../core/registry.js';

function atbashTransform(text) {
  const A='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return [...text].map(ch => {
    const idx = A.indexOf(ch.toUpperCase());
    if (idx === -1) return ch;
    const mapped = A[25 - idx];
    return ch === ch.toUpperCase() ? mapped : mapped.toLowerCase();
  }).join('');
}

register({
  id: 'cipher.atbash',
  category: 'cipher',
  label: 'Atbash',
  render() {
    const wrap = document.createElement('div');
    const labIn = document.createElement('label'); labIn.textContent = 'Text';
    const input = document.createElement('textarea');
    const labOut = document.createElement('label'); labOut.textContent = 'Ergebnis';
    const output = document.createElement('textarea'); output.readOnly = true;
    const btn = document.createElement('button'); btn.className='btn primary'; btn.textContent = 'Umwandeln';
    btn.onclick = () => { output.value = atbashTransform(input.value); };
    wrap.append(labIn, input, btn, labOut, output);
    return wrap;
  }
});
