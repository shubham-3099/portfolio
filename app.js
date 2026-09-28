const stories = [...document.querySelectorAll('.story')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function selectStory(id, scroll = true) {
 const target = stories.find(story => story.id === id);
 stories.forEach(story => {
  const active = story === target;
  story.classList.toggle('active', active);
  story.querySelector('.story-trigger').setAttribute('aria-expanded', String(active));
  story.querySelector('.story-body').hidden = !active;
  story.querySelector('.story-bottom > span').textContent = active ? '−' : '+';
 });
 if (target && scroll) requestAnimationFrame(() => target.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' }));
}
stories.forEach(story => story.querySelector('.story-trigger').addEventListener('click', () => {
 const id = story.classList.contains('active') ? '' : story.id;
 selectStory(id);
 history.replaceState(null, '', id ? '#' + id : '#stories');
}));
document.querySelectorAll('[data-open]').forEach(link => link.addEventListener('click', event => {
 event.preventDefault(); selectStory(link.dataset.open); history.replaceState(null, '', '#' + link.dataset.open);
 document.querySelector('#' + link.dataset.open + ' .story-trigger').focus({preventScroll:true});
}));
window.addEventListener('hashchange', () => selectStory(location.hash.slice(1), !!location.hash));
selectStory(location.hash.slice(1), !!location.hash);
document.getElementById('year').textContent = new Date().getFullYear();
