<script>
	import { asset } from '$app/paths';
</script>

<div class="wrapper__container">
	<div class="wrapper">
		<div class="content">
			<span>MAKE</span>
			<span>educative</span>
			<div class="linear-text bg-clip-text text-transparent">TRIP</div>
			<div class="inline"><span>in</span> <span>SAINT PETERSBOURG</span></div>
		</div>
		<div class="actions">
			<button class="codebase">
				<img src={asset('/github.svg')} alt="github" />
				<span>our codebase</span>
			</button>
			<button class="waitlist">join waitlist</button>
		</div>
	</div>
</div>

<style>
	.wrapper__container {
		padding: 0 8vw;
		display: flex;
		align-items: center;
		height: calc(max(90vh, 600px));
		position: relative;
		background: no-repeat center url('/previewBackgroundCenter.svg');
		background-size: auto;
	}
	.wrapper__container::before {
		content: '';
		position: absolute;
		z-index: 2;
		right: 0;
		bottom: -7vh;
		width: 50cqw;
		height: 100%;
		background: no-repeat right bottom url('/womanClimbingChairs.svg');
		background-size: contain;
		transition: 0.8s var(--transition-timing-function);
	}
	.wrapper__container > .wrapper {
		display: flex;
		flex-direction: column;
		gap: 50px;
		z-index: 3;
	}
	.content > span {
		display: block;
	}
	.content > span:nth-child(1) {
		font: 400 73.86px 'MonumentExtended';
		margin-bottom: -30px;
	}
	.content > span:nth-child(2) {
		font: 400 96.57px 'Pixelify';
		line-height: 116px;
	}
	.linear-text {
		font: 400 195px 'MonumentExtended';
		-webkit-text-stroke: 4px #000;
		background-image: linear-gradient(276.77deg, #ffffff -2.01%, #ffffff 51.53%, #0095ff 105.07%);
		background-color: #fff;
		width: fit-content;
		line-height: 170px;
	}
	.inline > span:nth-child(1) {
		font: 400 37.95px 'Pixelify';
	}
	.inline > span:nth-child(2) {
		font: 400 36.11px 'MonumentExtended';
	}
	.actions {
		display: flex;
		gap: 27px;
	}
	.actions button {
		padding: 15px 40px;
		border-radius: 19px;
		font: 400 22px 'MonumentExtended';
		cursor: pointer;
	}
	.actions button.codebase {
		background: #161616;
		color: white;
		display: flex;
		gap: 15px;
		align-items: center;
	}
	.actions button.codebase span {
		display: block;
		height: fit-content;
	}
	.actions button.waitlist {
		border: 5px solid rgba(16, 16, 16, 0.2);
		border-radius: 19px;
	}

	@media (min-width: 1440px) {
		.wrapper__container {
			display: flex;
			justify-content: center;
		}

		.wrapper {
			padding-right: 500px;
		}
	}

	@media (max-width: 1300px) {
		.wrapper__container::before {
			width: 35cqw;
			background-position: right center;
		}
	}
</style>
