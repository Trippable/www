<script lang="ts">
	import Icon from '@iconify/svelte';

	interface Props {
		/** Имя участника (выводится капсом). */
		name: string;
		/** Роли-теги: 'Teamlead' | 'Frontend' | 'Backend' | 'Deploy' | 'Designer' | 'Architect' | 'Database' | ... */
		tags?: string[];
		/** URL фотографии (фон карточки). */
		photo: string;
		/** Базовый акцент карточки (hex). Из него считаются плашка, тень и светлые подложки. */
		accent?: string;
		/** Сердечко-капитан в углу плашки имени. */
		isCaptain?: boolean;
		/** Текст блока «Вообщем». Если пусто — блок скрыт. */
		about?: string;
		/** Заголовок блока «Вообщем». */
		aboutTitle?: string;
		/** Приписка после заголовка, более лёгким начертанием. */
		aboutNote?: string;
		/** Слаги иконок iconify, напр. ['devicon:flutter', 'logos:figma']. Если пусто — блок скрыт. */
		stack?: string[];
		/** Заголовок блока стека. */
		stackTitle?: string;
		/** Ссылка кнопки «reach me». Если пусто — кнопки нет. */
		reachMe?: string;
		/** Подпись кнопки. */
		reachMeLabel?: string;
	}

	let {
		name,
		tags = [],
		photo,
		accent = '#77a1dd',
		isCaptain = false,
		about = '',
		aboutTitle = 'Вообщем',
		aboutNote = '(и целом)',
		stack = [],
		stackTitle = 'Стек',
		reachMe = '',
		reachMeLabel = 'reach me'
	}: Props = $props();

	// Плашка имени физически переезжает снизу вверх. Чтобы переход был плавным
	// (translate, а не прыжок top/bottom), считаем дистанцию из реальных высот.
	let cardH = $state(0);
	let nameH = $state(0);
	const PAD = 15; // отступ сверху (и желаемый зазор снизу) — те самые «15/10»
	let drop = $derived(Math.max(cardH - nameH - PAD * 2, 0));

	// Сетка «пикселей» для эффекта замостения кнопки reach me.
	const PX_COLS = 26;
	const PX_ROWS = 5;
	const pixels = Array.from({ length: PX_COLS * PX_ROWS }, (_, i) => {
		const col = i % PX_COLS;
		const row = Math.floor(i / PX_COLS);
		const parity = (col + row) % 2; // полушахматный порядок
		// Волна слева направо: основной шаг по колонке + сдвиг шахматной клетки + лёгкий джиттер.
		const delay = col * 13 + parity * 7 + Math.random() * 16;
		return { light: parity === 0, delay };
	});
</script>

<article
	class="card"
	class:captain={isCaptain}
	style="--accent: {accent}; --drop: {drop}px; background-image: url({photo});"
	bind:clientHeight={cardH}
>
	<!-- Solid плашка цвета, выезжающая снизу -->
	<div class="plate" aria-hidden="true"></div>

	<!-- Контент, проявляющийся при наведении -->
	<div class="reveal">
		{#if about}
			<section class="about">
				<h3 class="block-title"><b>{aboutTitle}</b> <span>{aboutNote}</span></h3>
				<p class="about__body">{about}</p>
			</section>
		{/if}

		{#if stack.length}
			<section class="stack">
				<h3 class="block-title"><b>{stackTitle}</b></h3>
				<div class="stack__icons">
					{#each stack as slug (slug)}
						<span class="stack__icon"><Icon icon={slug} width="32" height="32" /></span>
					{/each}
				</div>
			</section>
		{/if}

		{#if reachMe}
			<!-- Внешняя ссылка (telegram/почта/соцсеть), поэтому resolve() не нужен -->
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a class="reach" href={reachMe} target="_blank" rel="noreferrer noopener">
				<span class="reach__pixels" aria-hidden="true">
					{#each pixels as px, i (i)}
						<span class="px" class:light={px.light} style="--d: {px.delay}ms"></span>
					{/each}
				</span>
				<span class="reach__label">{reachMeLabel}</span>
			</a>
		{/if}
	</div>

	<!-- Плашка имени: снизу в покое, вверх при наведении -->
	<div class="name-pill" bind:clientHeight={nameH}>
		<span class="name">{name}</span>
		{#if tags.length}
			<span class="tags">
				{#each tags as tag (tag)}
					<span class="tag tag-{tag.toLowerCase()}">{tag}</span>
				{/each}
			</span>
		{/if}
	</div>
</article>

<style>
	.card {
		/* Производные цвета из одного акцента */
		--plate: color-mix(in srgb, var(--accent), #000 28%);
		--plate-soft: color-mix(in srgb, var(--accent), #fff 62%);
		--plate-line: color-mix(in srgb, var(--accent), #fff 30%);
		--shadow: color-mix(in srgb, var(--accent) 38%, transparent);
		--shadow-hover: color-mix(in srgb, var(--accent) 70%, transparent);

		/* Сочные, плавные кривые */
		--ease: cubic-bezier(0.16, 1, 0.3, 1);

		position: relative;
		width: 350px;
		height: 440px;
		border: solid 2px #fff;
		border-radius: 18px;
		overflow: hidden;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		box-shadow: 15px 15px var(--shadow);
		transition:
			box-shadow 0.6s var(--ease),
			transform 0.6s var(--ease);
	}

	.card:hover {
		box-shadow: 18px 18px var(--shadow-hover);
		transform: translate(-2px, -2px);
	}

	/* ── Выезжающая плашка ───────────────────────────── */
	.plate {
		position: absolute;
		inset: 0;
		background: var(--plate);
		transform: translateY(101%);
		transition: transform 0.6s var(--ease);
		z-index: 1;
	}
	.card:hover .plate,
	.card:focus-within .plate {
		transform: translateY(0);
	}

	/* ── Контент при наведении ───────────────────────── */
	.reveal {
		position: absolute;
		left: 10px;
		right: 10px;
		top: 78px;
		bottom: 15px;
		z-index: 2;
		display: flex;
		flex-direction: column;
		gap: 14px;
		opacity: 0;
		transform: translateY(12px);
		pointer-events: none;
		transition:
			opacity 0.4s var(--ease) 0.12s,
			transform 0.5s var(--ease) 0.12s;
	}
	.card:hover .reveal,
	.card:focus-within .reveal {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}

	.block-title {
		margin: 0 0 8px;
		color: #fff;
		font-size: 21px;
		font-weight: 400;
	}
	.block-title b {
		font-weight: 900;
	}
	.block-title span {
		opacity: 0.7;
		font-weight: 400;
		font-size: 17px;
	}

	.about__body {
		margin: 0;
		padding: 12px 14px;
		border-radius: 12px;
		background: var(--plate-soft);
		color: #1f1f1f;
		font-size: 16px;
		line-height: 1.35;
	}

	.stack__icons {
		display: flex;
		gap: 10px;
		padding: 12px;
		border: 2px solid var(--plate-line);
		border-radius: 14px;
	}
	.stack__icon {
		display: grid;
		place-items: center;
		width: 52px;
		height: 52px;
		border-radius: 12px;
		background: #fff;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
	}

	/* ── Кнопка reach me + пиксельное замостение ─────── */
	.reach {
		position: relative;
		overflow: hidden;
		margin-top: auto;
		height: 48px;
		border-radius: 12px;
		background: #161616;
		display: grid;
		place-items: center;
		cursor: pointer;
	}
	.reach__pixels {
		position: absolute;
		inset: 0;
		display: grid;
		grid-template-columns: repeat(26, 1fr);
		grid-template-rows: repeat(5, 1fr);
	}
	.px {
		background: #8f8f8f;
		opacity: 0;
		transition: opacity 0.12s linear;
		transition-delay: var(--d);
	}
	.px.light {
		background: #c6c6c6;
	}
	.reach:hover .px,
	.reach:focus-visible .px {
		opacity: 1;
	}
	.reach__label {
		position: relative;
		z-index: 1;
		font: 400 22px 'Pixelify';
		color: #fff;
	}

	/* ── Плашка имени ────────────────────────────────── */
	.name-pill {
		position: absolute;
		left: 10px;
		right: 10px;
		top: 15px;
		z-index: 3;
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 12px 18px;
		border-radius: 16px;
		background-color: rgba(0, 0, 0, 0.18);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		box-shadow:
			0.5px 0.5px #fff,
			-0.5px -0.5px #fff;
		transform: translateY(var(--drop));
		transition:
			transform 0.55s var(--ease),
			background-color 0.45s var(--ease),
			backdrop-filter 0.45s var(--ease),
			box-shadow 0.45s var(--ease);
	}
	.card:hover .name-pill,
	.card:focus-within .name-pill {
		transform: translateY(0);
		background-color: #fff;
		backdrop-filter: blur(0);
		-webkit-backdrop-filter: blur(0);
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
	}

	.card.captain .name-pill::after {
		content: url('/heart.svg');
		position: absolute;
		top: -8px;
		left: -6px;
	}

	.name {
		font-weight: 900;
		font-size: 24px;
		text-transform: uppercase;
		color: #fff;
		transition: color 0.45s var(--ease);
	}
	.card:hover .name,
	.card:focus-within .name {
		color: #161616;
	}

	.tags {
		display: flex;
		gap: 10px;
	}
	.tag {
		font: 400 16px 'Pixelify';
		color: #fff;
		background-color: grey;
		padding: 5px 10px;
		border-radius: 5px;
		white-space: nowrap;
	}
	.tag-teamlead {
		background-color: #ff5c33;
	}
	.tag-frontend {
		background-color: #77a1dd;
		color: #1f1f1f;
	}
	.tag-backend {
		background-color: #cc6eff;
		color: #1f1f1f;
	}
	.tag-deploy {
		background-color: #ffc73c;
		color: #1f1f1f;
	}
	.tag-designer {
		background-color: #2d881a;
	}
	.tag-architect {
		background-color: #000;
	}
	.tag-database {
		background-color: #f2efff;
		color: #1f1f1f;
	}

	@media (prefers-reduced-motion: reduce) {
		.card,
		.plate,
		.reveal,
		.name-pill,
		.name,
		.px {
			transition-duration: 0.001s;
		}
	}
</style>
