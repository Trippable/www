<div class="container">
	<div class="wrapper">
		<h2>About Us</h2>

		<div class="text__container">
			<div class="text">
				<mark>
					We’re a young software command located in Saint Petersbourg. Motivated, creative and
					furious.
				</mark>
			</div>
			<div class="text">
				<mark>
					All of us currently study at ITMO university, one of the most advanced IT community in
					Russia.
				</mark>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		background-image: url('/aboutUsBackgroundBottomRight.svg');
		background-position: 100% -10%;
		background-repeat: no-repeat;
		position: relative;
	}
	.container::before {
		content: '';
		position: absolute;
		top: -30vh;
		left: 0;
		width: 60vw;
		height: calc(max(50vh, 850px));
		background: no-repeat top left url('/aboutUsBackgroundTopLeft.svg');
		background-size: contain;
		z-index: 1;
	}

    .container::after {
        content: 'System.Console.WriteLine(‘about us’)';
		position: absolute;
        bottom: 35px;
		right: 40px;
        font: 400 41.36px 'Pixelify';
        color: rgba(0, 0, 0, 0.3);
		z-index: 1;
    }

	.wrapper {
		padding: 10vh 8vw;
		padding-bottom: 25vh;
		z-index: 3;
		position: relative;
	}

	.wrapper::before {
		content: '';
		position: absolute;
		z-index: 2;
		right: 0;
		top: -50px;
		width: 40cqw;
		height: 650px;
		background: no-repeat center url('/peopleInACafeWindow.svg');
		background-size: contain;
	}

	.wrapper::after {
		content: '';
		position: absolute;
		z-index: 2;
		left: 0;
		bottom: 10px;
		width: 35cqw;
		height: 300px;
		background: no-repeat center url('/plantAndHearts.svg');
		background-size: contain;
	}

	h2 {
		font: 400 127px 'Pixelify';
		margin-bottom: 60px;
	}

	.text__container {
		display: flex;
		flex-direction: column;
		gap: 120px;
	}

	.text:nth-child(1) {
		max-width: 560px;
	}
	.text:nth-child(1) > mark {
		background-color: white;
	}

	.text:nth-child(2) {
		max-width: 500px;
		align-self: flex-end;
	}
	.text:nth-child(2) > mark {
		background-color: rgba(255, 160, 193, 0.7);
	}
</style>
