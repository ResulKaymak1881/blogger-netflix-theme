const rows = [
  {title: 'Popüler', label: ''},
  {title: 'Aksiyon', label: 'Aksiyon'},
  {title: 'Komedi', label: 'Komedi'}
];

rows.forEach(r => {
  fetch(`/feeds/posts/default/-/${r.label}?alt=json`)
  .then(res => res.json())
  .then(data => {
    if (!data.feed.entry) return;

    let html = `<div class="row"><h2>${r.title}</h2><div class="slider">`;

    data.feed.entry.forEach(p => {
      const img = p.media$thumbnail
        ? p.media$thumbnail.url.replace('s72', 's400')
        : 'https://via.placeholder.com/400x600';

      html += `
        <a class="card" href="${p.link.find(l => l.rel === 'alternate').href}">
          <img loading="lazy" src="${img}">
        </a>`;
    });

    html += '</div></div>';
    document.getElementById('rows').innerHTML += html;
  });
});
