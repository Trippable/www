<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { API_URL } from '$lib/config.js';

	type Mode = 'join' | 'confirmed';
	type JoinStatus = 'idle' | 'submitting' | 'success' | 'error';

	let mode = $state<Mode>('join');

	// join
	let email = $state('');
	let status = $state<JoinStatus>('idle');
	let message = $state('');
	let devConfirmUrl = $state<string | null>(null);

	// confirmed
	let token = $state<string | null>(null);
	let version = $state<string | null>(null);

	const emailValid = $derived(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()));
	const downloadUrl = $derived(
		token ? `${API_URL}/app/download?token=${encodeURIComponent(token)}` : '#'
	);

	onMount(async () => {
		const t = new URLSearchParams(window.location.search).get('token');
		if (t) {
			token = t;
			mode = 'confirmed';
			try {
				const res = await fetch(`${API_URL}/app/releases/latest`);
				if (res.ok) {
					const body = await res.json().catch(() => null);
					const data = body?.data ?? body;
					version = data?.version ?? null;
				}
			} catch {
				// metadata is best-effort
			}
		}
	});

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		if (status === 'submitting' || !emailValid) return;
		status = 'submitting';
		message = '';
		devConfirmUrl = null;
		try {
			const res = await fetch(`${API_URL}/waitlist`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: email.trim() })
			});
			const body = await res.json().catch(() => null);
			if (!res.ok) {
				throw new Error(body?.error?.message ?? 'Не удалось отправить заявку');
			}
			const data = body?.data ?? body ?? {};
			status = 'success';
			message = 'Письмо отправлено. Перейди по ссылке из письма, чтобы подтвердить почту.';
			devConfirmUrl = data?.confirm_url ?? null; // backend returns this only in non-prod
		} catch (err) {
			status = 'error';
			message = err instanceof Error ? err.message : 'Что-то пошло не так';
		}
	}
</script>

<svelte:head>
	<title>tripovik — ранний доступ</title>
	<meta name="description" content="Присоединяйся к раннему дистрибуту приложения tripovik." />
</svelte:head>

<div class="screen">
	<div class="grain" aria-hidden="true"></div>
	<div class="scan" aria-hidden="true"></div>
	<div class="vignette" aria-hidden="true"></div>

	<header class="top">
		<a class="brand" href={`${base}/`}>tripovik<span class="caret">_</span></a>
		<a class="back" href={`${base}/`}>← на сайт</a>
	</header>

	<main class="main">
		{#if mode === 'join'}
			<p class="kicker">// early access · ранний дистрибут</p>
			<h1 class="title">РАННИЙ<br />ДОСТУП</h1>
			<p class="lead">
				Мы раздаём приложение <b>tripovik</b> ограниченному кругу первых пользователей. Оставь почту —
				пришлём ссылку для подтверждения, а после ты сможешь скачать <span class="mono">.apk</span> прямо
				с нашего сайта.
			</p>

			<ul class="bullets">
				<li><span class="mark">▸</span> приоритетная сборка раньше всех</li>
				<li><span class="mark">▸</span> безопасная загрузка с tripovik, без GitHub</li>
				<li><span class="mark">▸</span> прямое влияние на то, каким станет продукт</li>
			</ul>

			<section class="terminal">
				<div class="bar">
					<span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
					<span class="path">~/early-access</span>
				</div>
				<div class="body">
					{#if status === 'success'}
						<p class="ok"><span class="prompt">$</span> готово. {message}</p>
						{#if devConfirmUrl}
							<p class="devhint">
								dev-режим: подтвердить вручную →
								<a href={devConfirmUrl}>{devConfirmUrl}</a>
							</p>
						{/if}
						<button
							class="ghost"
							type="button"
							onclick={() => {
								status = 'idle';
								email = '';
							}}>← добавить ещё одну почту</button
						>
					{:else}
						<form class="form" onsubmit={submit}>
							<label class="field">
								<span class="prompt">$</span>
								<input
									bind:value={email}
									type="email"
									inputmode="email"
									autocomplete="email"
									placeholder="you@example.com"
									aria-label="Email"
									spellcheck="false"
								/>
							</label>
							<button class="cta" type="submit" disabled={!emailValid || status === 'submitting'}>
								{status === 'submitting' ? 'отправляем…' : 'запросить доступ →'}
							</button>
						</form>
						{#if status === 'error'}
							<p class="err"><span class="prompt">!</span> {message}</p>
						{/if}
					{/if}
				</div>
			</section>
		{:else}
			<p class="kicker">// access granted</p>
			<h1 class="title ok-title">ДОСТУП<br />ОТКРЫТ</h1>
			<p class="lead">
				Почта подтверждена. Скачивай свежую сборку <b>tripovik</b>
				{#if version}<span class="mono">v{version}</span>{/if} — файл отдаётся напрямую с нашего сайта.
			</p>

			<div class="download">
				<a class="cta big" href={downloadUrl}>↓ скачать .apk</a>
				<p class="fineprint">
					Android · загрузка с tripovik.ru · ссылка персональная, не делись ею.
				</p>
			</div>
		{/if}
	</main>

	<footer class="foot">
		<span class="mono">tripovik © early distribution</span>
	</footer>
</div>

<style>
	.screen {
		position: relative;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background:
			radial-gradient(1200px 600px at 50% -10%, #15181f 0%, #0a0b0f 55%, #07080b 100%);
		color: #e7e9ee;
		overflow: hidden;
	}

	/* film grain */
	.grain {
		position: fixed;
		inset: 0;
		z-index: 2;
		pointer-events: none;
		opacity: 0.06;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
	}
	/* scanlines */
	.scan {
		position: fixed;
		inset: 0;
		z-index: 2;
		pointer-events: none;
		opacity: 0.5;
		background: repeating-linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0.025) 0,
			rgba(255, 255, 255, 0.025) 1px,
			transparent 1px,
			transparent 3px
		);
	}
	.vignette {
		position: fixed;
		inset: 0;
		z-index: 2;
		pointer-events: none;
		background: radial-gradient(120% 120% at 50% 30%, transparent 55%, rgba(0, 0, 0, 0.55) 100%);
	}

	.top,
	.main,
	.foot {
		position: relative;
		z-index: 3;
		width: 100%;
		max-width: 920px;
		margin: 0 auto;
		padding-left: 24px;
		padding-right: 24px;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 24px;
		padding-bottom: 24px;
	}
	.brand {
		font-family: 'Pixelify', monospace;
		font-size: 28px;
		color: #fff;
		letter-spacing: 1px;
	}
	.caret {
		color: #3ddc84;
		animation: blink 1.1s steps(1) infinite;
	}
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
	.back {
		font-family: 'SourceCode', monospace;
		font-size: 14px;
		color: #8b93a3;
		transition: color 0.2s;
	}
	.back:hover {
		color: #e7e9ee;
	}

	.main {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-top: 40px;
		padding-bottom: 56px;
	}

	.kicker {
		font-family: 'SourceCode', monospace;
		font-size: 14px;
		letter-spacing: 2px;
		text-transform: uppercase;
		color: #3ddc84;
		margin: 0 0 14px;
	}

	.title {
		font-family: 'Pixelify', monospace;
		font-weight: 400;
		font-size: clamp(56px, 13vw, 132px);
		line-height: 0.92;
		margin: 0 0 24px;
		color: #fff;
		text-shadow:
			3px 0 rgba(61, 220, 132, 0.45),
			-3px 0 rgba(120, 150, 255, 0.35);
	}
	.ok-title {
		text-shadow:
			3px 0 rgba(61, 220, 132, 0.6),
			-2px 0 rgba(61, 220, 132, 0.25);
	}

	.lead {
		font-family: 'SourceCode', monospace;
		font-size: clamp(15px, 2.2vw, 19px);
		line-height: 1.6;
		max-width: 620px;
		color: #c4cad6;
		margin: 0 0 22px;
	}
	.lead b {
		color: #fff;
	}
	.mono {
		font-family: 'SourceCode', monospace;
		color: #3ddc84;
	}

	.bullets {
		list-style: none;
		padding: 0;
		margin: 0 0 34px;
		font-family: 'SourceCode', monospace;
		font-size: 15px;
		color: #aeb6c4;
		display: grid;
		gap: 8px;
	}
	.mark {
		color: #3ddc84;
		margin-right: 10px;
	}

	/* terminal card */
	.terminal {
		max-width: 560px;
		border: 1px solid #232734;
		border-radius: 10px;
		background: rgba(15, 17, 23, 0.72);
		backdrop-filter: blur(2px);
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.02) inset,
			0 24px 60px -30px rgba(0, 0, 0, 0.8);
		overflow: hidden;
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 10px 14px;
		border-bottom: 1px solid #232734;
		background: rgba(255, 255, 255, 0.02);
	}
	.dot {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		display: inline-block;
	}
	.dot.r {
		background: #ff5f57;
	}
	.dot.y {
		background: #febc2e;
	}
	.dot.g {
		background: #28c840;
	}
	.path {
		margin-left: 8px;
		font-family: 'SourceCode', monospace;
		font-size: 12px;
		color: #6b7280;
	}
	.body {
		padding: 18px 16px;
		font-family: 'SourceCode', monospace;
	}
	.form {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}
	.field {
		flex: 1 1 240px;
		display: flex;
		align-items: center;
		gap: 8px;
		border: 1px solid #2a2f3d;
		border-radius: 8px;
		padding: 0 12px;
		background: #0c0e13;
		transition: border-color 0.2s;
	}
	.field:focus-within {
		border-color: #3ddc84;
	}
	.prompt {
		color: #3ddc84;
		font-weight: 700;
	}
	.field input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: #e7e9ee;
		font-family: 'SourceCode', monospace;
		font-size: 15px;
		padding: 12px 0;
	}
	.field input::placeholder {
		color: #5b6473;
	}
	.cta {
		font-family: 'SourceCode', monospace;
		font-size: 15px;
		font-weight: 700;
		color: #07080b;
		background: #3ddc84;
		border: none;
		border-radius: 8px;
		padding: 12px 18px;
		cursor: pointer;
		transition:
			transform 0.12s,
			box-shadow 0.2s,
			opacity 0.2s;
		box-shadow: 0 8px 24px -10px rgba(61, 220, 132, 0.7);
	}
	.cta:hover:not(:disabled) {
		transform: translateY(-1px);
	}
	.cta:disabled {
		opacity: 0.45;
		cursor: not-allowed;
		box-shadow: none;
	}
	.cta.big {
		font-size: 18px;
		padding: 16px 26px;
	}

	.ok {
		color: #9fe7bf;
		margin: 0;
	}
	.err {
		color: #ff7a7a;
		margin: 10px 0 0;
	}
	.devhint {
		margin: 12px 0 0;
		font-size: 13px;
		color: #8b93a3;
		word-break: break-all;
	}
	.devhint a {
		color: #3ddc84;
	}
	.ghost {
		margin-top: 14px;
		background: none;
		border: none;
		color: #8b93a3;
		font-family: 'SourceCode', monospace;
		font-size: 14px;
		cursor: pointer;
		padding: 0;
	}
	.ghost:hover {
		color: #e7e9ee;
	}

	.download {
		display: flex;
		flex-direction: column;
		gap: 14px;
		align-items: flex-start;
	}
	.fineprint {
		font-family: 'SourceCode', monospace;
		font-size: 13px;
		color: #6b7280;
		margin: 0;
	}

	.foot {
		padding-top: 18px;
		padding-bottom: 26px;
		font-size: 12px;
		color: #4b5263;
	}
</style>
