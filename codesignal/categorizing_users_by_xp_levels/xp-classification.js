function solution(points) {
    // Define the level ranges and priorities
    const levelDefinitions = [
        { name: "Ninja", min: 50000, max: Infinity, priority: 5 },
        { name: "Captain", min: 10000, max: 49999, priority: 4 },
        { name: "Warrior", min: 5000, max: 9999, priority: 3 },
        { name: "Soldier", min: 1000, max: 4999, priority: 2 },
        { name: "Recruit", min: 0, max: 999, priority: 1 }
    ];
    
    // Count users in each level
    const levelCounts = {};
    
    // Initialize counts for all levels to 0
    levelDefinitions.forEach(level => {
        levelCounts[level.name] = {
            count: 0,
            priority: level.priority
        };
    });
    
    // Count users in each level
    points.forEach(xp => {
        for (const level of levelDefinitions) {
            if (xp >= level.min && xp <= level.max) {
                levelCounts[level.name].count++;
                break; // Once we find the correct level, we can stop checking
            }
        }
    });
    
    // Convert to array of strings and filter out levels with no users
    const result = [];
    for (const [levelName, data] of Object.entries(levelCounts)) {
        if (data.count > 0) {
            result.push({
                text: `${levelName} - ${data.count}`,
                count: data.count,
                priority: data.priority
            });
        }
    }
    
    // Sort by count (descending) and then by level priority (descending)
    result.sort((a, b) => {
        if (a.count !== b.count) {
            return b.count - a.count; // Sort by count descending
        }
        return b.priority - a.priority; // In case of a tie, sort by level priority (higher first)
    });
    
    // Return just the text strings
    return result.map(item => item.text);
}
