<footer>
	<div class="wrapper">
		<div class="logo">
			<img src="/logo.svg" alt="logo" />
		</div>

		<div class="content">
			<a href="#">go up</a>
			<a href="#">detonate (don't click!)</a>
		</div>
	</div>
</footer>

<style>
	footer {
		background: no-repeat top right url('/footer/footerBackground.svg');
	}
	.wrapper {
		display: flex;
		justify-content: space-between;
		padding: 90px 40px 45px;
	}

	.content {
		display: flex;
		gap: 8cqw;
	}

	.content > a {
		font-size: 20px;
		font-weight: 600;
	}
</style>
