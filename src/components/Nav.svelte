<script lang="ts">
	// Import components
	import FeedbackSection from '@components/sections/FeedbackSection.svelte';

	// Import static
	let logoMobile: string = './images/icons/logo-mobile.svg';
	let logoDesktop: string = './images/icons/logo-scritta.svg';

	// Font Awesome
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faFlag,
		faMapLocation,
		faBook,
		faUsers,
		faCommentDots
	} from '@fortawesome/free-solid-svg-icons/index.es';

	let open: boolean = false;
	let navIconsSize: string = 'sm';

	const handleShowMenu = () => {
		open = !open;
	};
</script>

<header class="w-full bg-light-blue z-10">
	<nav class="flex flex-col items-center mx-auto xl:max-w-6xl max-w-[90%] min-h-32">
		<!-- Upper Navbar -->

		<div class="flex justify-between items-center w-full">
			<div>
				<a href="/">
					<span class="flex gap-2 items-center">
						<img src={logoMobile} alt="paclimb logo" class="h-16 my-2" />
						<img src={logoDesktop} alt="paclimb logo scritta" class="h-16" />
					</span>
				</a>
			</div>
			<!-- <div class="md:flex items-center gap-4 hidden">
				<button>Italiano</button>
				<span> | </span>
				<button class="active">English</button>
				<Fa icon={faFlag} />
			</div> -->
		</div>
		<!-- End Upper Navbar -->
		<!-- Lower Navbar -->

		<div class="w-full md:border-t-4 border-t border-black/40">
			<!-- Mobile navbar -->
			<div
				class="min-h-[3rem] max-w-fit ml-auto relative flex flex-col gap-2 cursor-pointer py-2 items-end select-none md:hidden focus:outline-none group"
				on:click={handleShowMenu}
			>
				<span class="w-8 h-1 bg-dark-blue rounded-full" />
				<span class="w-6 h-1 bg-dark-blue rounded-full" />
				<span class="w-3 h-1 bg-dark-blue rounded-full" />
				<div
					class="absolute overscroll-contain min-w-[20rem] border-dark-blue border bg-light-blue top-[85%] -right-2 z-20 rounded-md p-6 translate-x-[110%] transition-transform  min-h-fit overflow-y-auto text-2xl text-center shadow-lg font-bold text-dark-blue"
					class:open
				>
					<ul class="flex flex-col gap-6">
						<a href="/#how-to">
							<li>Guide</li>
						</a>
						<a href="/#print-preview">
							<li>Print a preview</li>
						</a>
						<a href="/#team">
							<li>Team</li>
						</a>
						<a href="/feedback">
							<li>Leave us a Feedback</li>
						</a>
					</ul>
				</div>
			</div>

			<!-- Desktop navbar -->
			<ul
				class="hidden md:flex md:max-w-3xl w-full gap-4 justify-between mx-auto text-2xl md:text-base min-h-[3rem]"
			>
				<a
					href="/#how-to"
					class="opacity-60 hover:opacity-100 transition-opacity flex gap-2 items-center"
				>
					<Fa icon={faBook} size={navIconsSize} />
					<li class="hidden md:block">Guide</li>
				</a>
				<a
					href="/#print-preview"
					class="opacity-60 hover:opacity-100 transition-opacity flex gap-2 items-center"
				>
					<Fa icon={faMapLocation} size={navIconsSize} />
					<li class="hidden md:block">Print a preview</li>
				</a>
				<a
					href="/#team"
					class="opacity-60 hover:opacity-100 transition-opacity flex gap-2 items-center"
				>
					<Fa icon={faUsers} size={navIconsSize} />
					<li class="hidden md:block">Team</li>
				</a>
				<!-- <a
					href="/#contacts"
					class="opacity-60 hover:opacity-100 transition-opacity flex gap-2 items-center"
				>
					<Fa icon={faCommentDots} size={navIconsSize} />
					<li class="hidden md:block">Contacts</li>
				</a> -->
				<a
					href="/feedback"
					class="opacity-60 hover:opacity-100 transition-opacity flex gap-2 items-center relative group"
				>
					<Fa icon={faCommentDots} size={navIconsSize} />
					<li class="hidden md:block">Feedback</li>
					<FeedbackSection />
				</a>
			</ul>
		</div>
	</nav>
</header>

<style>
	.open {
		transform: translateX(0);
		transition: transform 0.2s ease-out;
	}
</style>
