import { allBadges } from '../data/badges';

/**
 * @param {object} data
 * @returns {string[]}
 */
export function checkNewBadges(data) {
  const { tracks, unlockedBadges, streak } = data;
  const newBadges = [];

  const userBadgeIds = new Set(unlockedBadges);
  const totalGoalsDone = tracks.reduce((sum, track) => 
    sum + track.goals.filter(g => g.done).length, 0);
  
  if (totalGoalsDone >= 1 && !userBadgeIds.has(allBadges.FIRST_GOAL.id)) {
    newBadges.push(allBadges.FIRST_GOAL.id);
  }

  const completedTracks = tracks.filter(t => t.progress === 100);
  
  if (completedTracks.length >= 1 && !userBadgeIds.has(allBadges.FIRST_TRACK.id)) {
    newBadges.push(allBadges.FIRST_TRACK.id);
  }
  if (completedTracks.length >= 3 && !userBadgeIds.has(allBadges.THREE_TRACKS.id)) {
    newBadges.push(allBadges.THREE_TRACKS.id);
  }

  const htmlTrack = tracks.find(t => t.name.toLowerCase() === 'html' && t.progress === 100);
  if (htmlTrack && !userBadgeIds.has(allBadges.HTML_MASTER.id)) {
    newBadges.push(allBadges.HTML_MASTER.id);
  }

  if (streak >= 3 && !userBadgeIds.has(allBadges.STREAK_3.id)) {
    newBadges.push(allBadges.STREAK_3.id);
  }

  return newBadges;
}