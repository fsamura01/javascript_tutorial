const canVisitAllRooms = (rooms) => {
  const n = rooms.length;
  const visited = new Set();

  const dfs = (room) => {
    visited.add(room);

    for (const key of rooms[room]) {
      if (!visited.has(key)) {
        dfs(key);
      }
    }
  };

  dfs(0);

  return visited.size === n;
};

const rooms = [[1, 3], [3, 0, 1], [2], [0]];
/* const rooms = [[1, 3], [3, 0, 1], [2], [0]]; */
canVisitAllRooms(rooms);
