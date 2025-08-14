import { register } from '../core/registry.js';

function caesarTransform(text, shift) {
  const A='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const s = ((shift % 26) + 26) % 26;
  return [...text].map(ch => {
    const idx = A.indexOf(ch.toUpperCase());
    if (idx === -1) return ch;
    const mapped = A[(idx + s) % 26];
    return ch === ch.toUpperCase() ? mapped : mapped.toLowerCase();
  }).join('');
}

register({
  id: 'cipher.caesar',
  category: 'cipher',
  label: 'Caesar',
  render() {
    const wrap = document.createElement('div');
    const labIn = document.createElement('label'); labIn.textContent = 'Text';
    const input = document.createElement('textarea');
    const row = document.createElement('div'); row.className='row';
    const labShift = document.createElement('label'); labShift.textContent = 'Shift';
    const shift = document.createElement('input'); shift.type='number'; shift.value='13';
    const btn = document.createElement('button'); btn.className='btn primary'; btn.textContent = 'Verschieben';
    btn.onclick = () => {
      const n = Number(shift.value)||0;
      input.value = caesarTransform(input.value, n);
    };
    row.append(labShift, shift, btn);
    wrap.append(labIn, input, row);
    return wrap;
  }
});
