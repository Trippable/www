<script>
	// @ts-nocheck

	import { asset } from '$app/paths';
	import CoolMode from './CoolMode.svelte';
</script>

<footer>
	<div class="wrapper">
		<div class="logo">
			<img src={asset('/logo.svg')} alt="logo" />
		</div>

		<div class="content">
			<a href="#header">go up</a>
			<button>
				<CoolMode>detonate (don't click!)</CoolMode>
			</button>
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

	.content > * {
		font-size: 20px;
		font-weight: 600;
	}
	.content > button {
		cursor: pointer;
	}

	@media (min-width: 1440px) {
		footer {
			display: flex;
			justify-content: center;
		}
		.wrapper {
			width: 1440px;
		}
	}
</style>
