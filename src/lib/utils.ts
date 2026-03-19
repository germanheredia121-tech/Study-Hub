
export const getProgress = (path: 'dsa' | 'flutter' | 'fullstack' | 'nextjs' | 'database' | 'english' | 'jobhunting') => {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(`study_progress_${path}`);
    return stored ? JSON.parse(stored) : {};
};

export const markModuleComplete = (path: 'dsa' | 'flutter' | 'fullstack' | 'nextjs' | 'database' | 'english' | 'jobhunting', moduleId: string) => {
    const current = getProgress(path);
    current[moduleId] = true;
    localStorage.setItem(`study_progress_${path}`, JSON.stringify(current));
    // Notify same-window components
    window.dispatchEvent(new Event('progress_updated'));
};

export const isModuleUnlocked = (path: 'dsa' | 'flutter' | 'fullstack' | 'nextjs' | 'database' | 'english' | 'jobhunting', moduleId: string, modules: any[]) => {
    const index = modules.findIndex(m => m.id === moduleId);
    if (index === 0) return true;
    const prevModule = modules[index - 1];
    const progress = getProgress(path);
    return !!progress[prevModule.id];
};
