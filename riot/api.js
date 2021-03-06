const nodeFetch = require("node-fetch");
const { riotApiKey } = require("../secrets");

const fetch = (url, params) =>
  nodeFetch(url, {
    ...params,
    headers: { "X-Riot-Token": riotApiKey, ...(params?.headers || {}) },
  });

const getDDragonVersion = () =>
  resolveFetchRequest(fetch("https://ddragon.leagueoflegends.com/api/versions.json"));

const getSummonerByName = (name) =>
  resolveFetchRequest(
    fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`)
  );
const getLeaguesByAccountId = (accountId) =>
  resolveFetchRequest(
    fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${accountId}`)
  );
const getMatchesByAccountId = (accountId) =>
  resolveFetchRequest(
    fetch(`https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`)
  );
const getSpectatorInfoByAccountId = (accountId) =>
  resolveFetchRequest(
    fetch(`https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${accountId}`)
  );
const getMatchInfoById = (matchId) =>
  resolveFetchRequest(fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`));
const getEntriesByName = (accountId) =>
  resolveFetchRequest(
    fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${accountId}`)
  );
const getSummonerGames = (puuid, start, count) =>
  resolveFetchRequest(
    fetch(
      `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&start=${
        start || 0
      }&count=${count || 20}`
    )
  );

const getChampions = () =>
  resolveFetchRequest(
    fetch("http://ddragon.leagueoflegends.com/cdn/12.11.1/data/en_US/champion.json")
  );

const getChampionIcon = (championId) => {
  resolveFetchRequest(
    fetch(
      `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`
    )
  );
};

const resolveFetchRequest = (request) => {
  return new Promise((resolve, reject) => {
    request
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((err) => reject(err.json()));
  });
};

module.exports = {
  getChampionIcon,
  getSummonerByName,
  getLeaguesByAccountId,
  getMatchesByAccountId,
  getSpectatorInfoByAccountId,
  getMatchInfoById,
  getEntriesByName,
  getSummonerGames,
  getChampions,
  getDDragonVersion,
};
