function solution(points) {
  // Define the levels with their ranges and priorities
  const levels = {
    Recruit: { min: 0, max: 999, priority: 1, count: 0 },
    Soldier: { min: 1000, max: 4999, priority: 2, count: 0 },
    Warrior: { min: 5000, max: 9999, priority: 3, count: 0 },
    Captain: { min: 10000, max: 49999, priority: 4, count: 0 },
    Ninja: { min: 50000, max: Infinity, priority: 5, count: 0 },
  };

  // Count users in each level with a single pass through the points array
  for (const xp of points) {
    if (xp >= 50000) {
      levels["Ninja"].count++;
    } else if (xp >= 10000) {
      levels["Captain"].count++;
    } else if (xp >= 5000) {
      levels["Warrior"].count++;
    } else if (xp >= 1000) {
      levels["Soldier"].count++;
    } else {
      levels["Recruit"].count++;
    }
  }

  // Convert to array and filter out levels with no users
  const result = Object.entries(levels)
    .filter(([_, data]) => data.count > 0)
    .map(([name, data]) => ({
      text: `${name} - ${data.count}`,
      count: data.count,
      priority: data.priority,
    }));

  // Sort by count (descending) and then by level priority (descending)
  result.sort((a, b) => {
    if (a.count !== b.count) {
      return b.count - a.count;
    }
    return b.priority - a.priority;
  });

  // Return just the text strings
  return result.map((item) => item.text);
}

function solution(points) {
  let users = [
    { name: "Recruit", score: 0, priority: 1 },
    { name: "Soldier", score: 0, priority: 2 },
    { name: "Warrior", score: 0, priority: 3 },
    { name: "Captain", score: 0, priority: 4 },
    { name: "Ninja", score: 0, priority: 5 },
  ];

  points.forEach((element) => {
    console.log("element: ", element);
    if (element <= 999) {
      users[0].score += 1;
    } else if (element >= 1000 && element <= 4999) {
      users[1].score += 1;
    } else if (element >= 5000 && element <= 9999) {
      users[2].score += 1;
    } else if (element >= 10000 && element <= 49999) {
      users[3].score += 1;
    } else if (element >= 50000) {
      users[4].score += 1;
    }
  });

  const filteredArray = users.filter((value) => value.score > 0);
  filteredArray.sort((a, b) => {
    if (b.score === a.score) {
      return b.priority - a.priority;
    }
    return b.score - a.score;
  });
  return filteredArray.map((item) => `${item.name} - ${item.score}`);
}
