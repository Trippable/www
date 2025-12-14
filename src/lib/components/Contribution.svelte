<div class="wrapper__container" id="contribution">
	<div class="wrapper">
		<h2>Contribution</h2>
		<div class="text__wrapper">
			<div class="header">We’re looking for ambitious and talented ITMO students.</div>
			<div class="text">
				<p>
					Unfortunately, we don’t offer now an employment, but call you to take part of an immense
					perspective project at ITMO.
				</p>
				<p>
					Tell about this in your CV, develop our university, or just get so valuable experience -
					your choice.
				</p>
			</div>
		</div>
		<button onclick={() => (location.href = 'https://t.me/axondee')}>reach us</button>
	</div>
</div>

<style>
	.wrapper__container {
		background-image:
			url('/contribution/contributionLeftBackground.svg'),
			url('/contribution/contributionTopRightBackground.svg');
		background-repeat: no-repeat, no-repeat;
		background-position:
			left center,
			right top;

		position: relative;
	}

	.wrapper__container::before {
		content: '';
		position: absolute;
		background: no-repeat url('contribution/collaboration.svg');
		width: calc(max(307px, 30cqw));
		height: 96.1px;
		top: 18px;
		left: 3cqw;
	}

	.wrapper {
		padding: 10vh 8vw;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h2 {
		font: 400 126.92px 'Pixelify';
		text-align: center;
		margin-bottom: 100px;
	}

	.text__wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 12vh;
	}

	.header {
		max-width: 45%;
		font: 400 45px 'MonumentExtended';
	}

	.text {
		display: flex;
		flex-direction: column;
		gap: 26.7px;
		max-width: 45%;
	}

	button {
		font: 400 18px 'MonumentExtended';
		background-color: #161616;
		padding: 18px 32px;
		border-radius: 19px;
		color: white;
		cursor: pointer;
		transition:
			background-color 0.4s var(--transition-timing-function),
			box-shadow 0.3s var(--transition-timing-function),
			transform 0.2s var(--transition-timing-function);
	}

	button:hover {
		background-color: #ff5c33;
		box-shadow: 0px 0px 10px #ff5c33;
	}

	button:active {
		transform: scale(0.9);
	}

	@media (min-width: 1440px) {
		.wrapper__container {
			display: flex;
			justify-content: center;
		}
		.wrapper {
			width: 1440px;
		}
	}

	@media (max-width: 1300px) {
		.wrapper__container {
			background-position:
				left center,
				right -50px top -130px;
		}

		h2 {
			font-size: 100px;
			margin-bottom: 50px;
		}

		.text__wrapper {
			padding-bottom: 6vh;
		}
	}
</style>
