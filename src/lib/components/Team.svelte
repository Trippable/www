<script lang="ts">
	import { asset } from '$app/paths';
	import MemberCard from './MemberCard.svelte';

	// Палитра акцентов (она же задаёт цвет тени и выезжающей плашки у карточки).
	const palette = ['#ffa0c1', '#ffc73c', '#2d881a', '#77a1dd', '#ff5c33', '#cc6eff'];

	type Member = {
		name: string;
		tags: string[];
		photo: string;
		isCaptain?: boolean;
		about?: string;
		stack?: string[];
		reachMe?: string;
	};

	// TODO(team): заполнить about / stack / reachMe реальными данными по каждому.
	// Слаги иконок берутся с https://icon-sets.iconify.design (напр. 'devicon:flutter', 'logos:figma').
	const members: Member[] = [
		{
			name: 'Сашка',
			tags: ['Teamlead', 'Frontend'],
			photo: asset('/members/alex.png'),
			isCaptain: true,
			about: 'TODO: пара слов о себе.',
			stack: ['devicon:svelte', 'devicon:typescript', 'devicon:figma'],
			reachMe: 'https://t.me/'
		},
		{
			name: 'Артём',
			tags: ['Backend', 'Frontend'],
			photo: asset('/members/artyom-o.png'),
			about: 'Играю в шахматы, пью пиво. Евелина — люблю тебя!',
			stack: ['devicon:flutter', 'devicon:dart', 'devicon:figma', 'devicon:firebase'],
			reachMe: 'https://t.me/'
		},
		{
			name: 'Илья',
			tags: ['Deploy'],
			photo: asset('/members/iliya.png'),
			about: 'TODO: пара слов о себе.',
			stack: ['devicon:docker', 'devicon:nginx', 'devicon:linux'],
			reachMe: 'https://t.me/'
		},
		{
			name: 'Лёня',
			tags: ['Backend', 'Database'],
			photo: asset('/members/lenya.jpeg'),
			about: 'TODO: пара слов о себе.',
			stack: ['devicon:postgresql', 'devicon:python', 'devicon:redis'],
			reachMe: 'https://t.me/'
		},
		{
			name: 'Тёмыч',
			tags: ['Architect'],
			photo: asset('/members/artyom-s.jpeg'),
			about: 'TODO: пара слов о себе.',
			stack: ['devicon:go', 'devicon:kubernetes', 'devicon:grafana'],
			reachMe: 'https://t.me/'
		}
	];
</script>

<div class="wrapper__container" id="team">
	<div class="wrapper">
		<h2>Team</h2>

		<div class="team">
			{#each members as member, i (member.name)}
				<MemberCard
					name={member.name}
					tags={member.tags}
					photo={member.photo}
					accent={palette[i % palette.length]}
					isCaptain={member.isCaptain}
					about={member.about}
					stack={member.stack}
					reachMe={member.reachMe}
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	.wrapper__container {
		background-repeat: no-repeat, no-repeat;
		background-position:
			top left,
			top right;
		background-image:
			url('/team/backgroundTopLeft.svg'), url('/team/backgroundTopRight.svg'),
			linear-gradient(141.12deg, rgba(255, 160, 193, 0.3) -3.01%, #ffffff 71.54%);
		position: relative;
	}

	.wrapper__container::before {
		content: url('/team/blobRightBottom.svg');
		position: absolute;
		bottom: 0;
		right: 0;
		height: 216px;
	}

	.wrapper__container::after {
		content: 'list.append<string>(‘Kitty’);';
		font: 400 84.7px 'Pixelify';
		color: rgba(32, 32, 32, 0.2);
		position: absolute;
		bottom: 0;
		left: 2vw;
	}

	.wrapper {
		padding: 20vh 8vw 15vh;
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
				top -20px left -10px,
				top -100px right -300px;
		}
		.wrapper {
			padding: 10vh 8vw 15vh;
		}
		.team {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
