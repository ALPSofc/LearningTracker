
const generateUniqueId = () => `id_${Math.random().toString(36).substring(2, 9)}`;

export const calculateTrackProgress = (track) => {
    const goals = track.goals || []; 
    const totalGoals = goals.length;

    if (totalGoals === 0) {
        return { progress: 0, doneCount: 0 };
    }

    const doneCount = goals.filter(goal => goal.done).length;
    const progress = Math.round((doneCount / totalGoals) * 100);

    return { progress, doneCount };
};

export const updateTrackWithProgress = (track) => {
    const { progress } = calculateTrackProgress(track);
    return {
        ...track,
        progress: progress,
    };
};

export const updateOverallProgress = (tracks) => {
    const validTracks = tracks || []; 
    if (validTracks.length === 0) {
        return 0;
    }

    const totalProgress = validTracks.reduce((sum, track) => sum + (track.progress || 0), 0);
    const overallProgress = Math.round(totalProgress / validTracks.length);

    return overallProgress;
};

export const createNewTrack = (name) => ({
    id: generateUniqueId(),
    name: name,
    progress: 0,
    goals: [],
    createdAt: new Date().toISOString(),
});

export const createNewGoal = (name) => ({
    id: generateUniqueId(),
    title: name,
    done: false,
    createdAt: new Date().toISOString(),
});

export const generateActivity = (type, payload) => {
    return {
        id: generateUniqueId(),
        type,
        payload,
        timestamp: new Date().toISOString(),
    };
};