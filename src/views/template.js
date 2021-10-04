import { date, time } from '../helpers';

const renderLoading = () => {
  return `
    <div class="col s12 m12 l12 xl12 center-align">
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-gray-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
      <p class="flow-text">Please wait...</p>
    </div>
  `;
}

const renderScheduleItem = item => {
  const dateMatch = date(item.utcDate);
  const timeMatch = time(item.utcDate);
  const homeTeam = item.homeTeam.name;
  const awayTeam = item.awayTeam.name;

  let homeTeamScore = '?';
  let awayTeamScore = '?';

  if (item.status === 'FINISHED' || item.status === 'IN_PLAY' || item.status === 'PAUSED') {
    homeTeamScore = item.score.fullTime.homeTeam;
    awayTeamScore = item.score.fullTime.awayTeam;
  }

  let status = `${dateMatch} | ${timeMatch}`;

  if (item.status === 'IN_PLAY') status = 'LIVE';
  if (item.status === 'PAUSED') status = 'HALF TIME';
  
  return `
    <div class="col s12">
      <div class="card grey lighten-5">
        <div class="card-content">
          <div class="row center-align">
            <p>${status}</p>
          </div>
          <div class="row valign-wrapper">
            <div class="col s4 m5">
              <p class="right-align hide-on-small-only">${homeTeam}</p>
              <p class="center-align hide-on-med-and-up">${homeTeam}</p>
            </div>
            <div class="col s4 m2 center-align">
              <h5 class="score">
                ${homeTeamScore} - ${awayTeamScore}
              </h5>
            </div>
            <div class="col s4 m5">
              <p class="left-align hide-on-small-only">${awayTeam}</p>
              <p class="center-align hide-on-med-and-up">${awayTeam}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

const renderStandingTable = standings => {
  let standingItemHTML = '';
  standings.forEach(item => {
    standingItemHTML += `
      <tr>
        <td class="team">
          <span class="position">${item.position}</span>
          <img src="${item.team.crestUrl}" alt="${item.team.name}" class="team-emblem">
          <span>${item.team.name}</span>
        </td>
        <td>${item.playedGames}</td>
        <td>${item.won}</td>
        <td>${item.draw}</td>
        <td>${item.lost}</td>
        <td>${item.goalsFor}</td>
        <td>${item.goalsAgainst}</td>
        <td>${item.goalDifference}</td>
        <td>${item.points}</td>
      </tr>
    `;
  });

  const standingTableElement = document.createElement('div');
  standingTableElement.setAttribute('class', 'row container');
  standingTableElement.innerHTML = `
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <div class="table">
            <table>
              <thead>
                <tr>
                  <th>Club</th>
                  <th>MP</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                  <th>Pts</th>
                </tr>
              </thead>

              <tbody>
                ${standingItemHTML}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
  
  return standingTableElement;
}

const renderTeam = team => {
  return `
    <div class="col s6 m4 l3">
      <a href="./team.html?id=${team.id}">
        <div class="card">
          <div class="card-content center-align">
            <img src="${team.crestUrl}" alt="team-emblem" class="team-emblem">
            <p>${team.shortName}</p>
          </div>
        </div>
      </a>
    </div>
  `;
}

const renderTeamDetail = team => {
  return `
    <div class="row container">
      <div class="col s12">
        <div class="card">
          <div class="card-content center-align">
            <img src="${team.crestUrl}" alt="team-emblem" class="responsive-img">
            <h5>${team.name}</h5>
          </div>
        </div>
      </div>
    </div>
  `;
}

export { renderLoading, renderScheduleItem, renderStandingTable, renderTeam, renderTeamDetail }
