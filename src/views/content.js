import {
  getLiveMatchesByCompetitionId,
  getFinishedMatchesByCompetitionId,
  getScheduledMatchesByCompetitionId,
  getStandingsByCompetitionId,
  getTeamsByCompetitionId,
  getTeamById
} from '../scripts/api';
import {
  renderLoading,
  renderScheduleItem,
  renderStandingTable,
  renderTeam,
  renderTeamDetail
} from './template';

const loadLiveMatches = async leagueId => {
  const schedules = await getLiveMatchesByCompetitionId(leagueId);

  let liveMatchesHTML = '';

  if (schedules.length) {
    schedules.forEach(item => {
      liveMatchesHTML += renderScheduleItem(item);
    });
  }

  return liveMatchesHTML;
}

const loadFinishedMatches = async leagueId => {
  const schedules = await getFinishedMatchesByCompetitionId(leagueId);

  let finishedMatchesHTML = '';

  if (schedules.length) {
    schedules.forEach(item => {
      finishedMatchesHTML += renderScheduleItem(item);
    });
  }

  return finishedMatchesHTML;
}

const loadScheduledMatches = async leagueId => {
  const schedules = await getScheduledMatchesByCompetitionId(leagueId);

  let scheduledMatchesHTML = '';

  if (schedules.length) {
    schedules.forEach(item => {
      scheduledMatchesHTML += renderScheduleItem(item);
    });
  } else {
    scheduledMatchesHTML = `<p class="center-align">Scheduled match not found.</p>`;
  }

  return scheduledMatchesHTML;
}

const loadAllMatches = async leagueId => {
  const allMatchesElement = document.querySelector('#all-matches');
  allMatchesElement.innerHTML = renderLoading();

  try {
    const finishedMatches = await loadFinishedMatches(leagueId);
    const liveMatches = await loadLiveMatches(leagueId);
    const scheduledMatches = await loadScheduledMatches(leagueId);

    allMatchesElement.innerHTML = '';

    if (liveMatches.length) {
      const liveMatchesElement = document.createElement('div');
      liveMatchesElement.setAttribute('class', 'row container');
      liveMatchesElement.innerHTML = `
        <p class="center-align">LIVE MATCHES</p>
        ${liveMatches}
      `;

      allMatchesElement.appendChild(liveMatchesElement);
    }

    const finishedMatchesElement = document.createElement('div');
    finishedMatchesElement.setAttribute('class', 'row container');
    finishedMatchesElement.innerHTML = `
      <p class="center-align">FINISHED MATCHES</p>
      ${finishedMatches}
    `;
    
    allMatchesElement.appendChild(finishedMatchesElement);

    const scheduledMatchesElement = document.createElement('div');
    scheduledMatchesElement.setAttribute('class', 'row container');
    scheduledMatchesElement.innerHTML = `
      <p class="center-align">SCHEDULED MATCHES</p>
      ${scheduledMatches}
    `;
    
    allMatchesElement.appendChild(scheduledMatchesElement);
  } catch (err) {
    allMatchesElement.innerHTML = `
      <p class="center-align">Error when fetching the data.</p>
      <p class="center-align">Please try again.</p>
    `;
  }
}

const loadStandings = async leagueId => {
  const standingsElement = document.querySelector('#standings');
  standingsElement.innerHTML = renderLoading();

  try {
    const standings = await getStandingsByCompetitionId(leagueId);
    standingsElement.innerHTML = '';
    standingsElement.appendChild(renderStandingTable(standings));
  } catch(err) {
    standingsElement.innerHTML = `
      <p class="center-align">Error when fetching the data.</p>
      <p class="center-align">Please try again.</p>
    `;
  }
}

const loadTeams = async leagueId => {
  const teamsElement = document.querySelector('#teams');
  teamsElement.innerHTML = renderLoading();

  try {
    const teams = await getTeamsByCompetitionId(leagueId);
    
    teamsElement.innerHTML = '';

    const teamsHTML = document.createElement('div');
    teamsHTML.setAttribute('class', 'row container');
    teams.forEach(item => {
      teamsHTML.innerHTML += renderTeam(item);
    });

    teamsElement.appendChild(teamsHTML);
  } catch(err) {
    teamsElement.innerHTML = `
      <p class="center-align">Error when fetching the data.</p>
      <p class="center-align">Please try again.</p>
    `;
  }
}

const loadTeamDetail = async teamId => {
  const teamContentElement = document.querySelector('.team-content');
  teamContentElement.innerHTML = renderLoading();

  try {
    const team = await getTeamById(teamId);

    teamContentElement.innerHTML = '';

    teamContentElement.innerHTML = renderTeamDetail(team);
  } catch(err) {
    teamContentElement.innerHTML = `
      <p class="center-align">Error when fetching the data.</p>
      <p class="center-align">Please try again.</p>
    `;
  }
}

export { loadAllMatches, loadStandings, loadTeams, loadTeamDetail }
