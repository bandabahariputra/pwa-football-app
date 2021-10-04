import { loadAllMatches, loadStandings, loadTeams } from './content';

const loadContent = page => {
  const selects = document.querySelectorAll('select');
  M.FormSelect.init(selects);
  
  if (page === 'home') {
    loadAllMatches(2021);

    const matchScheduleSelect = document.querySelector('#match-schedule-league');
    matchScheduleSelect.addEventListener('change', event => {
      const leagueId = event.target.value;
      loadAllMatches(leagueId);
    });
  }

  if (page === 'standings') {
    loadStandings(2021);

    const standingsSelect = document.querySelector('#standings-league');
    standingsSelect.addEventListener('change', event => {
      const leagueId = event.target.value;
      loadStandings(leagueId);
    });
  }

  if (page === 'teams') {
    loadTeams(2021);

    const teamsSelect = document.querySelector('#league');
    teamsSelect.addEventListener('change', event => {
      const leagueId = event.target.value;
      loadTeams(leagueId);
    })
  }
}

const loadNav = () => {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status !== 200) return;

      // Load menu
      document.querySelectorAll('.topnav, .sidenav').forEach(elm => {
        elm.innerHTML = xhttp.responseText;
      });

      // Load page
      document.querySelectorAll('.topnav a, .sidenav a').forEach(elm => {
        elm.addEventListener('click', event => {
          // Close sidenav
          const sidenav = document.querySelector('.sidenav');
          M.Sidenav.getInstance(sidenav).close();

          // Load page
          const page = event.target.getAttribute('href').substr(1);
          loadPage(page);
        });
      });
    }
  }

  xhttp.open('GET', './partials/nav.html', true);
  xhttp.send();
}

const loadPage = page => {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
      const content = document.querySelector('.content');

      if (content) {
        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status === 404) {
          content.innerHTML = '<p class="center-align">Halaman tidak ditemukan.</p>';
        } else {
          content.innerHTML = '<p class="center-align">Upss... halaman tidak dapat diakses.</p>';
        }
  
        loadContent(page);
      }
    }
  }

  xhttp.open('GET', `./pages/${page}.html`, true);
  xhttp.send();
}

export { loadNav, loadPage }
