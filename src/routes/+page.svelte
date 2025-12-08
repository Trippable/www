<script>
	import AboutUs from '$lib/components/AboutUs.svelte';
	import Contribution from '$lib/components/Contribution.svelte';
	import Development from '$lib/components/Development.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import Team from '$lib/components/Team.svelte';
</script>

<!-- <h1>Welcome to your library project</h1> -->
<!-- <p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p> -->
<!-- <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->

<Header />

<Preview />

<div class="transition__previewAboutUs"></div>

<AboutUs />

<Development />

<Contribution />

<Team />

<Footer />

<style>
    :global(body) {
        background: no-repeat top left url('/pageBackgroundTopLeft.svg');
        bacgkround-size: auto;
    }

	.transition__previewAboutUs {
		width: 100%;
		height: 10px;
		background: no-repeat url('/transitionPreviewAboutUs.svg');
	}
</style>
