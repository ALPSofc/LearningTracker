import React, { createContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { checkNewBadges } from '../utils/gamification';
import { allBadges } from '../data/badges';
import i18n from '../i18n';
import {
  updateTrackWithProgress,
  generateActivity,
  createNewTrack,
  createNewGoal,
  updateOverallProgress
} from '../utils/dataUtils';

import toast from 'react-hot-toast';

export const DataContext = createContext(undefined);

const INITIAL_STATE = {
  userName: 'Visitante',
  tracks: [],
  xp: 0,
  streak: 0,
  unlockedBadges: [],
  lastLogin: null,
  activityLog: []
};

const MAX_LOG_SIZE = 10;

const loadInitialData = () => {
  try {
    const saved = window.localStorage.getItem('learningTrackerData');
    if (saved) {
      return { ...INITIAL_STATE, ...JSON.parse(saved) };
    }
  } catch (error) {
    console.error("Falha ao carregar dados do localStorage", error);
  }
  return INITIAL_STATE;
};

export function DataProvider({ children }) {
  const [data, setData] = useLocalStorage('learningTrackerData', loadInitialData);

  const updateUserName = useCallback((name) => {
    setData(prev => ({ ...prev, userName: name }));
  }, [setData]);

  const resetProgress = useCallback(() => {
    setData(INITIAL_STATE);
  }, [setData]);

  const addTrack = useCallback((trackName) => {
    const newTrack = createNewTrack(trackName);
    const newLogEntry = generateActivity('TRACK_ADD', { name: trackName });

    setData(prev => ({
      ...prev,
      tracks: [newTrack, ...prev.tracks],
      activityLog: [newLogEntry, ...prev.activityLog].slice(0, MAX_LOG_SIZE)
    }));
  }, [setData]);

  const deleteTrack = useCallback((trackId) => {
    setData(prev => ({
      ...prev,
      tracks: prev.tracks.filter(track => track.id !== trackId)
    }));
  }, [setData]);

  const editTrackTitle = useCallback((trackId, newTitle) => {
    if (!newTitle || newTitle.trim() === '') return;
    setData(prev => ({
      ...prev,
      tracks: prev.tracks.map(track =>
        track.id === trackId ? { ...track, name: newTitle.trim() } : track
      )
    }));
  }, [setData]);

  const addGoalToTrack = useCallback((trackId, goalTitle) => {
    const newGoal = createNewGoal(goalTitle);

    setData(prev => {
      const newTracks = prev.tracks.map(track => {
        if (track.id === trackId) {
          const updatedGoals = [...track.goals, newGoal];
          return updateTrackWithProgress({ ...track, goals: updatedGoals });
        }
        return track;
      });

      const newLogEntry = generateActivity('GOAL_ADD', { name: goalTitle });

      return {
        ...prev,
        tracks: newTracks,
        activityLog: [newLogEntry, ...prev.activityLog].slice(0, MAX_LOG_SIZE)
      };
    });
  }, [setData]);

  const updateGoal = useCallback((trackId, goalId, newDoneStatus) => {
    let xpChange = 0;

    const track = data.tracks.find(t => t.id === trackId);
    const goal = track?.goals.find(g => g.id === goalId);

    if (!goal || goal.done === newDoneStatus) return;
    xpChange = newDoneStatus ? 10 : -10;

    setData(prevData => {
      let newLogEntries = [];

      const newTracks = prevData.tracks.map(t => {
        if (t.id === trackId) {
          const updatedGoals = t.goals.map(g =>
            g.id === goalId ? { ...g, done: newDoneStatus } : g
          );

          return updateTrackWithProgress({ ...t, goals: updatedGoals });
        }
        return t;
      });

      if (newDoneStatus === true) {
        newLogEntries.push(generateActivity('GOAL_COMPLETE', { name: goal.title }));
      }

      const newState = {
        ...prevData,
        tracks: newTracks,
        xp: Math.max(0, prevData.xp + xpChange),
        lastLogin: new Date().toISOString()
      };

      const newBadges = checkNewBadges(newState);
      let finalBadges = newState.unlockedBadges;

      if (newBadges.length > 0) {
        newBadges.forEach(badgeId => {
          const badge = allBadges[badgeId];
          if (badge) {
            newLogEntries.push(generateActivity('BADGE_EARNED', { name: i18n.t(badge.nameKey) }));
          }
        });
        finalBadges = [...newState.unlockedBadges, ...newBadges];
        const newBadgeNames = newBadges
          .map(id => i18n.t(allBadges[id]?.nameKey))
          .filter(Boolean)
          .join(', ');
        
        toast.success(i18n.t('alertNewBadge', { names: newBadgeNames }));
      }

      return {
        ...newState,
        unlockedBadges: finalBadges,
        activityLog: [...newLogEntries, ...prevData.activityLog].slice(0, MAX_LOG_SIZE)
      };
    });
  }, [data.tracks, setData, i18n]);

  const deleteGoal = useCallback((trackId, goalId) => {
    setData(prev => {
      const newTracks = prev.tracks.map(track => {
        if (track.id === trackId) {
          const updatedGoals = track.goals.filter(goal => goal.id !== goalId);
          return updateTrackWithProgress({ ...track, goals: updatedGoals });
        }
        return track;
      });
      return { ...prev, tracks: newTracks };
    });
  }, [setData]);

  const editGoalTitle = useCallback((trackId, goalId, newTitle) => {
    if (!newTitle || newTitle.trim() === '') return;
    setData(prev => {
      const newTracks = prev.tracks.map(track => {
        if (track.id === trackId) {
          const updatedGoals = track.goals.map(goal =>
            goal.id === goalId ? { ...goal, title: newTitle.trim() } : goal
          );
          return { ...track, goals: updatedGoals };
        }
        return track;
      });
      return { ...prev, tracks: newTracks };
    });
  }, [setData]);

  const overallProgress = useMemo(() => updateOverallProgress(data.tracks), [data.tracks]);

  const value = useMemo(() => ({
    ...data,
    overallProgress,
    updateUserName,
    resetProgress,
    addTrack,
    deleteTrack,
    editTrackTitle,
    addGoalToTrack,
    updateGoal,
    deleteGoal,
    editGoalTitle,
  }), [data, overallProgress, updateUserName, resetProgress, addTrack, deleteTrack, editTrackTitle, addGoalToTrack, updateGoal, deleteGoal, editGoalTitle]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}