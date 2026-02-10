exports.hasCycle = (tasks) => {
  const graph = {};
  const visited = {};
  const recStack = {};

  tasks.forEach(task => {
    graph[task._id] = task.dependencies.map(dep => dep.toString());
  });

  const dfs = (node) => {
    if (!visited[node]) {
      visited[node] = true;
      recStack[node] = true;

      for (let neighbor of graph[node] || []) {
        if (!visited[neighbor] && dfs(neighbor)) return true;
        if (recStack[neighbor]) return true;
      }
    }
    recStack[node] = false;
    return false;
  };

  return Object.keys(graph).some(dfs);
};

exports.topologicalSort = (tasks) => {
  const graph = {};
  const visited = {};
  const stack = [];

  tasks.forEach(task => {
    graph[task._id] = task.dependencies.map(dep => dep.toString());
  });

  const dfs = (node) => {
    visited[node] = true;
    for (let neighbor of graph[node]) {
      if (!visited[neighbor]) dfs(neighbor);
    }
    stack.push(node);
  };

  Object.keys(graph).forEach(node => {
    if (!visited[node]) dfs(node);
  });

  return stack.reverse();
};
