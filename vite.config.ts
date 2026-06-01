import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { parse as parseToml } from 'smol-toml';

// Импорт `*.toml` как обычного JS-объекта. Парсинг происходит на этапе сборки:
// `import cfg from '...toml'` превращается в готовый объект, рантайм-парсера нет.
function toml(): Plugin {
	return {
		name: 'toml-loader',
		transform(code, id) {
			if (!id.split('?', 1)[0].endsWith('.toml')) return null;
			return { code: `export default ${JSON.stringify(parseToml(code))};`, map: null };
		}
	};
}

export default defineConfig({
	plugins: [tailwindcss(), toml(), sveltekit()]
});
