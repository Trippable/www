<script>
	import { asset } from '$app/paths';
</script>

<header id="header">
	<div class="wrapper">
		<div class="logo">
			<img src={asset('/logo.svg')} alt="logo" />
		</div>
		<div class="links">
			<a href="#aboutUs">About us</a>
			<a href="#development">Development</a>
			<a href="#contribution">Contribution</a>
			<a href="#team">Team</a>
		</div>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: center;
	}

	.wrapper {
		padding: 30px 40px;
		font: 400 28.86px 'Pixelify';
		display: flex;
		justify-content: space-between;
		max-width: 1440px;
		width: 100%;
		transition: font-size 0.5s var(--transition-timing-function);
	}

	.links {
		display: flex;
		gap: calc(min(5vw, 50px));
		transition: gap 1.2s var(--transition-timing-function);
	}

	.logo {
		flex-shrink: 0;
	}

	.links {
		flex-shrink: 1;
	}

	.links a {
		position: relative;
	}

	.links a::after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 0;
		width: 0;
		border-bottom: dashed 3px var(--color-primary);
		transition:
			width 0.4s var(--transition-timing-function),
			transform 0.3s var(--transition-timing-function);
	}

	.links a:hover::after {
		width: calc(100%);
	}
	.links a:active {
		transform: scale(0.9);
	}

	@media (min-width: 1440px) {
		.links {
			gap: 118.5px;
		}
	}

	@media (max-width: 1080px) {
		.wrapper {
			font-size: 20px;
		}
	}
</style>
