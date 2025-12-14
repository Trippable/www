<script>
	import { asset } from '$app/paths';
</script>

<header>
	<div class="wrapper">
		<div class="logo">
			<img src={asset('/logo.svg')} alt="logo" />
		</div>
		<div class="content">
			<a href="#">About us</a>
			<a href="#">Development</a>
			<a href="#">Contribution</a>
			<a href="#">Team</a>
		</div>
	</div>
</header>

<style>
	.wrapper {
		padding: 30px 40px;
		font: 400 28.86px 'Pixelify';
		display: flex;
		justify-content: space-between;
	}

	.content {
		display: flex;
		gap: 5vw;
	}
</style>
