const BASE_URL = 'https://api.football-data.org/v2';
const API_TOKEN = '394dd37dbc2c4a1e92b0773f5fcd2777';

const fetchData = async url => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Auth-Token': API_TOKEN
    }
  });

  if (response.status !== 200) {
    throw new Error('Cannot fetch data');
  }

  const data = await response.json();

  return data;
}

const getLiveMatchesByCompetitionId = async competitionId => {
  const results = await fetchData(`${BASE_URL}/competitions/${competitionId}/matches?status=LIVE`);
  const schedules = results.matches.slice(0, 4);
  return schedules;
}

const getFinishedMatchesByCompetitionId = async competitionId => {
  const results = await fetchData(`${BASE_URL}/competitions/${competitionId}/matches?status=FINISHED`);
  const schedules = results.matches.reverse().slice(0, 4);
  return schedules;
}

const getScheduledMatchesByCompetitionId = async competitionId => {
  const results = await fetchData(`${BASE_URL}/competitions/${competitionId}/matches?status=SCHEDULED`);
  const schedules = results.matches.slice(0, 4);
  return schedules;
}

const getStandingsByCompetitionId = async competitionId => {
  const results = await fetchData(`${BASE_URL}/competitions/${competitionId}/standings`);
  const standings = results.standings[0].table;
  return standings;
}

const getTeamsByCompetitionId = async competitionId => {
  const results = await fetchData(`${BASE_URL}/competitions/${competitionId}/teams`);
  const teams = results.teams;
  return teams;
}

const getTeamById = async teamId => {
  const results = await fetchData(`${BASE_URL}/teams/${teamId}`);
  return results;
}

export {
  getLiveMatchesByCompetitionId,
  getFinishedMatchesByCompetitionId,
  getScheduledMatchesByCompetitionId,
  getStandingsByCompetitionId,
  getTeamsByCompetitionId,
  getTeamById
}
