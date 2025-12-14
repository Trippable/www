<script lang="ts">
	$effect(() => {
		var observedBlocks = document.querySelectorAll<Element>('.step.observed');

		const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
			console.log(entries);
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('active');
					observer.unobserve(entry.target);
				}
			});
		};

		const observer = new IntersectionObserver(callback);
		console.log(observer);

		observedBlocks.forEach((block) => observer.observe(block));

		console.log('asdfasdf');
		return () => observer.disconnect();
	});
</script>

<div class="wrapper__container">
	<div class="wrapper">
		<h2 class="linear-text bg-clip-text text-transparent">Development</h2>

		{#snippet block(title: string, description: string, isObserved = false, artText = '')}
			<div class="step {isObserved ? 'observed' : ''}">
				<div class="block">
					<div class="title">{title}</div>
					<div class="description">{description}</div>
				</div>
				<div class="art">{artText}</div>
			</div>
		{/snippet}

		<div class="steps">
			{@render block(
				'1/ Architecture',
				'Infrastructure and core concept building. Planning and discuss solutions. Brainstorm.',
				true,
				'<- we are here'
			)}
			{@render block(
				'2/ Core development',
				'Create a stable, functional, ready to stay face anything - computer machine.'
			)}
			{@render block('3/ Feature enrichment', 'Complete the system to create a MPV project.')}
			{@render block(
				'4/ Beta testing',
				'Take the project ready to production phase. Debug and optimize.'
			)}
			{@render block('5/ Deploy', 'Finalise & take the project high load ready. Born ITMO Trip.')}
		</div>
	</div>
</div>

<style>
	.wrapper__container {
		background: #121212;
		color: white;
		padding: 15vh 2vw 8vh;
		position: relative;
	}

	.wrapper__container::before {
		content: '';
		position: absolute;
		top: 0;
		left: 2vw;
		width: calc(max(30cqw, 574px));
		height: 127px;
		background: no-repeat left top url('/development/developmentBackgroundTopLeft.svg');
	}

	h2 {
		font: 400 126.92px 'Pixelify';
		background-image: linear-gradient(90deg, #ffffff 50.96%, #999999 100%);
		width: fit-content;
		margin-left: auto;
	}

	.steps {
		margin-top: 20vh;
	}

	.step {
		padding-bottom: 250px;
		position: relative;
		display: flex;
		gap: 60px;
		align-items: center;
	}
	.step:nth-child(2n) {
		flex-direction: row-reverse;
	}

	.step::after {
		content: '';
		width: 20px;
		height: 100%;
		position: absolute;
		border: 5px solid #ffffff;
		border-top: none;
		border-bottom: none;

		top: 56px;
		left: calc(50% - 8.5px);

		z-index: 1;
	}

	:global(.step.active::after) {
		background-image: linear-gradient(
			180deg,
			rgba(44, 255, 0, 0.54) 30.45%,
			rgba(0, 0, 0, 0.432) 83.89%
		);
	}

	.step:last-child {
		padding-bottom: 0;
	}
	.step:last-child::after {
		content: none;
	}

	.block {
		width: calc(50% + 70px);
		padding: 40px;
		padding-right: 140px;
		background: rgba(0, 0, 0, 0.8);
		border: 5px dashed #ffffff;
		border-radius: 48px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		position: relative;
		z-index: 2;
		transition:
			background 0.4s var(--transition-timing-function),
			border 0.3s var(--transition-timing-function),
			box-shadow 0.5s var(--transition-timing-function);
		transition-delay: 0.8s, 0.8s, 0.8s;
	}
	.step:nth-child(2n) .block {
		padding-left: 140px;
		padding-right: 40px;
	}

	:global(.step.active .block) {
		background: rgba(45, 136, 26, 0.54);
		border: 5px solid #ffffff;
		box-shadow: 0px 0px 50px #2cff00;
	}

	.block > .title {
		font: 400 50px 'Pixelify';
	}

	.block::after {
		content: '';
		width: 64px;
		height: 64px;
		position: absolute;
		top: 32px;
		right: 32px;
		border-radius: 100%;
		border: 5px solid #ffffff;
		z-index: 2;
		background-color: #121212;
		transition: background-color 0.6s var(--transition-timing-function);
		transition-delay: 0.8s;
	}
	.step:nth-child(2n) .block::after {
		right: unset;
		left: 34px;
	}

	:global(.step.active .block::after) {
		background-color: #9bff84;
	}

	.art {
		font: 400 44px 'Pixelify';
		position: relative;
	}

	.step:nth-child(2) .art::after,
	.step:nth-child(3) .art::after,
	.step:nth-child(4) .art::after,
	.step:nth-child(5) .art::after {
		content: '';
		position: absolute;
		top: calc(0px - max(20vh, 150px));
		background-size: contain;
		width: 30cqw;
		height: calc(max(40vh, 300px));
		background-repeat: no-repeat;
		background-position: center;
	}

	.step:nth-child(2) .art::after {
		right: 0;
		background-image: url('/development/art-2.svg');
	}
	.step:nth-child(3) .art::after {
		left: 0;
		background-image: url('/development/art-3.svg');
	}
	.step:nth-child(4) .art::after {
		right: 0;
		background-image: url('/development/art-4.svg');
	}
	.step:nth-child(5) .art::after {
		left: 0;
		background-image: url('/development/art-5.svg');
	}

	@media (min-width: 1440px) {
		.wrapper__container {
			display: flex;
			justify-content: center;
		}

		.wrapper {
			width: 1440px;
		}

		.step:nth-child(2) .art::after,
		.step:nth-child(3) .art::after,
		.step:nth-child(4) .art::after,
		.step:nth-child(5) .art::after {
			max-width: 450px;
			max-height: 450px;
			top: -220px;
		}
	}

	@media (max-width: 1300px) {
		h2 {
			font-size: 100px;
		}

		.steps {
			margin-top: 10vh;
		}

		.block > .title {
			font-size: 40px;
		}
		.block > .description {
			font-size: 20px;
		}
	}
</style>
