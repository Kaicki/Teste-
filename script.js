let data = [];

function loadMovies(){
  fetch('movies.json')
    .then(r=>r.json())
    .then(d=>{
      data = d;
      renderMovies();
    });
}

function loadSeries(){
  fetch('series.json')
    .then(r=>r.json())
    .then(d=>{
      data = d;
      renderSeries();
    });
}

// ===== FILMES =====
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
        <img src='${item.thumbnail}' class='rounded'>
        <p class='mt-2 text-sm'>${item.title}</p>
      `;

      card.onclick = () => play(item.video_url);
      row.appendChild(card);
    });

    section.appendChild(row);
    rows.appendChild(section);
  });
}

// ===== SÉRIES =====
function renderSeries(){
  const rows = document.getElementById('rows');
  rows.innerHTML = '';

  data.forEach(series => {
    const card = document.createElement('div');
    card.className = 'mb-6 p-4 bg-gray-900 rounded cursor-pointer hover:bg-gray-800';

    card.innerHTML = `
      <h2 class='text-xl font-bold'>${series.name}</h2>
      <p class='text-gray-400'>${series.description}</p>
    `;

    card.onclick = () => loadSeriesData(series.id);
    rows.appendChild(card);
  });
}

// ===== CARREGA SÉRIE COMPLETA =====
function loadSeriesData(id){
  fetch(`series_${id}.json`)
    .then(r=>r.json())
    .then(series=>{
      const rows = document.getElementById('rows');
      rows.innerHTML = `<h1 class='text-2xl mb-4'>${series.name}</h1>`;

      series.seasons.forEach(season => {

        const title = document.createElement('h2');
        title.className = 'text-xl mt-6 mb-2';
        title.innerText = `Temporada ${season.season}`;
        rows.appendChild(title);

        season.episodes.forEach(ep => {
          const div = document.createElement('div');
          div.className = 'mb-3 p-3 bg-gray-800 rounded cursor-pointer';

          div.innerHTML = `
            <p class='font-bold'>${ep.title}</p>
            <p class='text-gray-400 text-sm'>${ep.description}</p>
          `;

          div.onclick = () => play(ep.video_url);
          rows.appendChild(div);
        });

      });
    });
}

// ===== PLAYER =====
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
