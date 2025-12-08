<div class="wrapper">
	<h2 class="linear-text bg-clip-text text-transparent">Development</h2>

	<div class="steps">
		<div class="step active">
			<div class="block">
				<div class="title">1/ Architecture</div>
				<div class="description">
					Infrastructure and core concept building. Planning and discuss solutions. Brainstorm.
				</div>
			</div>
		</div>
		<div class="step">
			<div class="block">
				<div class="title">2/ Core development</div>
				<div class="description">
					Create a stable, functional, ready to stay face anything - computer machine.
				</div>
			</div>
		</div>
		<div class="step">
			<div class="block">
				<div class="title">3/ Feature enrichment</div>
				<div class="description">Complete the system to create a MPV project.</div>
			</div>
		</div>
		<div class="step">
			<div class="block">
				<div class="title">4/ Beta testing</div>
				<div class="description">
					Take the project ready to production phase. Debug and optimize.
				</div>
			</div>
		</div>
		<div class="step">
			<div class="block">
				<div class="title">5/ Deploy</div>
				<div class="description">Finalise & take the project high load ready. Born ITMO Trip.</div>
			</div>
		</div>
	</div>
</div>

<style>
	.wrapper {
		background: #121212;
		color: white;
		padding: 15vh 2vw 8vh;
	}

	h2 {
		font: 400 126.92px 'Pixelify Sans';
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

	.step.active::after {
		background: linear-gradient(180deg, rgba(44, 255, 0, 0.54) 30.45%, rgba(0, 0, 0, 0.432) 83.89%);
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
	}
	.step:nth-child(2n) .block {
		padding-left: 140px;
		padding-right: 40px;
		margin-left: auto;
	}

	.step.active .block {
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
	}
	.step:nth-child(2n) .block::after {
		right: unset;
		left: 34px;
	}

	.step.active .block::after {
		background-color: #9bff84;
	}
</style>
