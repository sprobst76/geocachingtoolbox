const plugins = [];
export function register(plugin) { plugins.push(plugin); }
export function list(category) { return category ? plugins.filter(p => p.category === category) : plugins; }
