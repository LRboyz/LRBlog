export const formatTime = (timestamp: number): string => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const ms = startOfDay.getTime();
    if (timestamp < ms) {
        return `${Math.ceil((ms - timestamp) / 86400000)}天前`;
    } else {
        const time = new Date(timestamp);
        return `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;
    }
};