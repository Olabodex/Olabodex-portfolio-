const themeButton = document.querySelector('#theme');
let storedTheme;
try { storedTheme = localStorage.getItem('portfolio-theme'); } catch {}
function setTheme(dark) {
  document.body.classList.toggle('dark', dark);
  themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  themeButton.setAttribute('aria-pressed', String(dark));
  document.querySelector('meta[name="theme-color"]').content = dark ? '#101111' : '#ffffff';
}
setTheme(storedTheme ? storedTheme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches);
themeButton.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark');
  setTheme(dark);
  try { localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light'); } catch {}
});
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('ponlebode64@gmail.com'); status.textContent = 'Email copied!'; }
  catch { status.textContent = 'Please copy the email address above.'; }
});
document.querySelector('#year').textContent = new Date().getFullYear();
const dialog = document.querySelector('#search-dialog');
const input = document.querySelector('#search-input');
const results = document.querySelector('#search-results');
const entries = [
 ['View resume PDF', 'resume/Ponle-Olabode-Resume.pdf', 'Resume'],
 ['Ladylikedee Shopify storefront', 'https://ladylikedee.com', 'Project'],
 ['Flight Management App Python', 'https://github.com/Olabodex/Flight-Magagenemt-App', 'Project'],
 ['Biometric authentication system', 'https://biometric-auth-system.vercel.app/', 'Project'],
 ['LinkedIn', 'https://www.linkedin.com/in/ponle-bode-08687925a/', 'Link'],
 ['Selected Work', '#projects', 'Section'], ['Experience', '#experience', 'Section'],
 ['Education', '#education', 'Section'], ['My toolkit', '#stack', 'Section'], ['Contact Olabode', '#contact', 'Section'],
 ['SaaS website', 'https://saas.infinityfreeapp.com', 'Project'],
 ['Interactive calculator', 'https://interactive-calculator-ashen.vercel.app/', 'Project'],
 ['ZJOX landing page', 'https://zjox-landing-page.free.nf/?i=1', 'Project'],
 ['GUI calculator', 'https://gui-calculato.vercel.app/', 'Project'],
 ['GitHub', 'https://github.com/Olabodex', 'Link'], ['Email', 'mailto:ponlebode64@gmail.com', 'Link']
];
function renderResults() {
 results.replaceChildren();
 const matches = entries.filter(entry => entry.join(' ').toLowerCase().includes(input.value.trim().toLowerCase()));
 for (const [label, href, kind] of matches) {
  const link = document.createElement('a'); link.href = href; link.textContent = label;
  if (href.startsWith('https:')) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  const category = document.createElement('span'); category.textContent = kind + ' ↗'; link.append(category);
  link.addEventListener('click', () => dialog.close()); results.append(link);
 }
 if (!matches.length) { const empty = document.createElement('p'); empty.className = 'no-results'; empty.textContent = 'No matches. Try “calculator”, “experience”, or “contact”.'; results.append(empty); }
}
function openSearch() { if (dialog.open) return; input.value = ''; renderResults(); dialog.showModal(); input.focus(); }
document.querySelectorAll('.search-trigger').forEach(button => button.addEventListener('click', openSearch));
document.querySelector('#close-search').addEventListener('click', () => dialog.close());
input.addEventListener('input', renderResults);
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
document.addEventListener('keydown', event => {
 if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); dialog.open ? dialog.close() : openSearch(); }
 if (!dialog.open) return;
 const links = [...results.querySelectorAll('a')]; const index = links.indexOf(document.activeElement);
 if (event.key === 'ArrowDown' && links.length) { event.preventDefault(); links[(index + 1) % links.length].focus(); }
 if (event.key === 'ArrowUp' && links.length) { event.preventDefault(); if (index <= 0) input.focus(); else links[index - 1].focus(); }
 if (event.key === 'Enter' && document.activeElement === input && links.length) { event.preventDefault(); links[0].click(); }
});
