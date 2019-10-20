import Player from "../entities/Player";
import Monster from "../entities/Monster";

// manage the game ui

// player stats
let playerLvl = null;
let playerXp = null;
let playerHp = null;
let playerAtk = null;
let playerDef = null;
let playerAcc = null;
let playerDge = null;

// player equipment
let playerWeapon = null;
let playerArmor = null;
let playerJewel = null;

// player inventory
let playerInv = null;

// enemy stats
let enemyType = null;
let enemyLvl = null;
let enemyHp = null;

// log
let log = null;

window.onload = () => {
  // player stat refs
  playerLvl = document.getElementById('level');
  playerXp = document.getElementById('experience');
  playerHp = document.getElementById('hp');
  playerAtk = document.getElementById('attack');
  playerDef = document.getElementById('defense');
  playerAcc = document.getElementById('accuracy');
  playerDge = document.getElementById('dodge');
  clearPlayerStats();

  // player equipment refs
  playerWeapon = document.getElementById('weapon');
  playerArmor = document.getElementById('armor');
  playerJewel = document.getElementById('jewel');

  // player inventory ref
  playerInv = document.getElementById('inventory');

  // enemy stat refs
  enemyType = document.getElementById('enemy-type');
  enemyLvl = document.getElementById('enemy-level');
  enemyHp = document.getElementById('enemy-hp');
  clearEnemy();

  // log ref
  log = document.getElementById('log');
  clearLog();
}

/**
 * Clear a UI stat element
 * @param {HTMLElement} element the stat element to clear
 */
const clearStat = (element) => element.innerText = '-';

/**
 * Clear all player stats in the UI
 */
const clearPlayerStats = () => {
  [playerLvl, playerXp, playerHp, playerAtk, playerDef, playerAcc, playerDge].forEach(clearStat);
}

/**
 * Update the UI with the latest player stats
 * @param {Player} player the player entity to update the UI with
 */
const updatePlayerStats = (player) => {
  playerLvl.innerText = player.stats.level;
  playerXp.innerText = `${player.stats.xp} / ${player.stats.xpToNextLevel}`;
  playerHp.innerText = `${player.stats.hp} / ${player.stats.maxHp}`;
  playerAtk.innerText = player.stats.attack;
  playerDef.innerText = player.stats.defense;
  playerAcc.innerText = player.stats.accuracy;
  playerDge.innerText = player.stats.dodge;
}

/**
 * Clear all enemy info in the UI
 */
const clearEnemy = () => {
  [enemyType, enemyLvl, enemyHp].forEach(clearStat);
}

/**
 * Update the UI with info for the given enemy monster
 * @param {Monster} monster the enemy monster to update the UI with
 */
const updateEnemy = (monster) => {
  enemyType.innerText = monster.type;
  enemyLvl.innerText = monster.stats.level;
  enemyHp.innerText = `${monster.stats.hp} / ${monster.stats.maxHp}`;
}

/**
 * Clear the log in the UI
 */
const clearLog = () => {
  while(log.firstChild) {
    log.removeChild(log.firstChild);
  }
}

/**
 * Add a message to the top of the log
 * @param {string} msg the message to add
 */
const addLogMessage = (msg) => {
  const div = document.createElement('div');
  div.innerText = msg;
  log.prepend(div);

  if (log.children.length > 20) {
    log.removeChild(log.lastChild);
  }
}

export default {
  clearPlayerStats,
  updatePlayerStats,
  clearEnemy,
  updateEnemy,
  clearLog,
  addLogMessage
}
