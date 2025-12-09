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
	<button>reach us</button>
</div>

<style>
	.wrapper {
		padding: 10vh 8vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image:
			url('/contribution/contributionLeftBackground.svg'),
			url('/contribution/contributionTopRightBackground.svg');
		background-repeat: no-repeat, no-repeat;
		background-position:
			left center,
			right top;

		position: relative;
	}

	.wrapper::before {
		content: '';
		position: absolute;
        background: no-repeat url('contribution/collaboration.svg');
        width: calc(max(307px, 30cqw));
        height: 96.1px;
        top: 18px;
        left: 3cqw;
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
		background: #161616;
		padding: 18px 32px;
		border-radius: 19px;
		color: white;
		cursor: pointer;
	}
</style>
