<script lang="ts"></script>

<div class="wrapper">
	<h2>Team</h2>

	{#snippet member(name: string, tags: string[], photo: string, isCaptain = false)}
		<div class="member {isCaptain ? 'captain' : ''}" style="background-image: url({photo});">
			<div class="info">
				<div class="name">{name}</div>
				<div class="tags">
					{#each tags as tag (tag)}
						<div class="tag tag-{tag.toLowerCase()}">{tag}</div>
					{/each}
				</div>
			</div>
		</div>
	{/snippet}

	<div class="team">
		{@render member('Саша', ['Teamlid', 'Frontend'], '/members/alex.png', true)}
		{@render member('Артем', ['Backend'], '/members/artyom.png')}
		{@render member('Илья', ['Backend', 'Deploy'], '/members/iliya.png')}
		{@render member('Ильяс', ['Designer'], '/members/iliyas.png')}
		{@render member('Ксения', ['Frontend'], '/members/ksenia.png')}
		{@render member('Эмилия', ['Backend'], '/members/emiliya.png')}
	</div>
</div>

<style>
	.wrapper {
		padding: 20vh 8vw 15vh;
		background: linear-gradient(141.12deg, rgba(255, 160, 193, 0.3) -3.01%, #ffffff 71.54%);
		background-repeat: no-repeat, no-repeat;
		background-position:
			top left,
			top right;
		background-image:
			url('/team/backgroundTopLeft.svg'), url('/team/backgroundTopRight.svg'),
			linear-gradient(141.12deg, rgba(255, 160, 193, 0.3) -3.01%, #ffffff 71.54%);
		position: relative;
	}

	.wrapper::before {
		content: url('/team/blobRightBottom.svg');
		position: absolute;
		bottom: 0;
		right: 0;
		height: 216px;
	}

	.wrapper::after {
		content: 'list.append<string>(‘Kitty’);';
		font: 400 84.7px 'Pixelify';
		color: rgba(32, 32, 32, 0.2);
		position: absolute;
		bottom: 0;
		left: 2vw;
	}

	h2 {
		font: 400 126.92px 'Pixelify';
	}

	.team {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
		justify-items: center;
		column-gap: 30px;
		row-gap: 30px;
		padding: 50px 0;
	}

	.member {
		width: 350px;
		height: 440px;
		border: solid 2px #fff;
		border-radius: 18px;
		box-shadow: 10px 10px #000;
		padding: 30px 10px;
		display: flex;
		flex-direction: column-reverse;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}

	.member:nth-child(6n - 5) {
		box-shadow: 15px 15px rgba(255, 160, 193, 0.3);
	}
	.member:nth-child(6n - 4) {
		box-shadow: 15px 15px rgba(255, 199, 60, 0.3);
	}
	.member:nth-child(6n - 3) {
		box-shadow: 15px 15px rgba(45, 136, 26, 0.3);
	}
	.member:nth-child(6n - 2) {
		box-shadow: 15px 15px rgba(119, 161, 221, 0.3);
	}
	.member:nth-child(6n - 1) {
		box-shadow: 15px 15px rgba(255, 92, 51, 0.3);
	}
	.member:nth-child(6n) {
		box-shadow: 15px 15px rgba(204, 110, 255, 0.3);
	}

	.info {
		padding: 15px 25px;
		border-radius: 23px;
		backdrop-filter: blur(3px);
		background-color: rgba(0, 0, 0, 0.01);
		-webkit-backdrop-filter: blur(3px);
		display: flex;
		gap: 20px;
		box-shadow:
			0.5px 0.5px #fff,
			-0.5px -0.5px #fff;
		position: relative;
	}

	.member.captain .info::after {
		content: url('/heart.svg');
		position: absolute;
		top: -3px;
		left: -2px;
	}

	.info > .name {
		font-weight: 900;
		font-size: 24px;
		text-transform: uppercase;
		color: white;
	}

	.tags {
		display: flex;
		gap: 10px;
	}

	.tags > div {
		font: 400 16px 'Pixelify';
		color: white;
		background-color: grey;
		padding: 5px 10px;
		border-radius: 5px;
	}

	.tag.tag-teamlid {
		background-color: #ff5c33;
	}
	.tag.tag-frontend {
		background-color: #77a1dd;
		color: #1f1f1f;
	}
	.tag.tag-backend {
		background-color: #cc6eff;
		color: #1f1f1f;
	}
	.tag.tag-deploy {
		background-color: #ffc73c;
		color: #1f1f1f;
	}
	.tag.tag-designer {
		background-color: #2d881a;
	}
</style>
