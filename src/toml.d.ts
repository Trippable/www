// Импорт `*.toml` обрабатывает плагин в vite.config.ts (парсинг при сборке).
declare module '*.toml' {
	const value: unknown;
	export default value;
}
