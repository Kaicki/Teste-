let data = [];

function loadMovies(){
  fetch('movies.json')
    .then(r=>r.json())
    .then(d=>{
      data = d;
      setBanner(data[0].thumbnail, data[0].title, "");
      renderMovies();
    });
}

function loadSeries(){
  fetch('series.json')
    .then(r=>r.json())
    .then(d=>{
      data = d;
      setBanner(data[0].thumbnail, data[0].name, data[0].description);
      renderSeries();
    });
}

// BANNER
function setBanner(img, title, desc){
  const banner = document.getElementById('banner');
  banner.style.backgroundImage = `url(${img})`;
  document.getElementById('bannerTitle').innerText = title;
  document.getElementById('bannerDesc').innerText = desc;
}

// FILMES
function renderMovies(){
  const rows = document.getElementById('rows');
  rows.innerHTML = '';

  const genres = [...new Set(data.map(i => i.genre))];

  genres.forEach(g => {
    const section = document.createElement('div');
    section.innerHTML = `<h2 class='text-xl mb-3 mt-6'>${g}</h2>`;

    const row = document.createElement('div');
    row.className = 'row flex gap-3 overflow-x-auto';

    data.filter(i => i.genre === g).forEach(item => {
      const card = document.createElement('div');
      card.className = 'min-w-[220px] cursor-pointer hover:scale-110 transition';

      card.innerHTML = `
        <img src="${item.thumbnail}" class="rounded">
        <p class="mt-2 text-sm">${item.title}</p>
      `;

      card.onclick = () => play(item.video_url);
      row.appendChild(card);
    });

    section.appendChild(row);
    rows.appendChild(section);
  });
}

// SÉRIES
function renderSeries(){
  const rows = document.getElementById('rows');
  rows.innerHTML = '';

  data.forEach(series => {
    const container = document.createElement('div');
    container.className = 'mb-8';

    container.innerHTML = `
      <h2 class="text-2xl font-bold">${series.name}</h2>
      <p class="text-gray-400 mb-3">${series.description}</p>
    `;

    series.seasons.forEach(season => {
      const title = document.createElement('h3');
      title.className = 'text-xl mt-4 mb-2';
      title.innerText = `Temporada ${season.season}`;
      container.appendChild(title);

      season.episodes.forEach(ep => {
        const div = document.createElement('div');
        div.className = 'mb-2 p-3 bg-gray-800 rounded cursor-pointer';

        div.innerHTML = `
          <p class="font-bold">${ep.title}</p>
          <p class="text-gray-400 text-sm">${ep.description}</p>
        `;

        div.onclick = () => play(ep.video_url);
        container.appendChild(div);
      });
    });

    rows.appendChild(container);
  });
}

// PLAYER
function play(url){
  const v = document.createElement('video');
  v.src = url;
  v.controls = true;
  v.autoplay = true;

  v.style.position = 'fixed';
  v.style.top = 0;
  v.style.left = 0;
  v.style.width = '100%';
  v.style.height = '100%';
  v.style.background = 'black';

  document.body.appendChild(v);
}
