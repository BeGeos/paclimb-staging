<script>
	// Import components
	import FeedbackSection from '@components/sections/FeedbackSection.svelte';

	// Import static
	let logoMobile = './images/icons/logo-mobile.svg';
	let logoDesktop = './images/icons/logo-scritta.svg';

	// Font Awesome
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faFlag,
		faMapLocation,
		faBook,
		faUsers,
		faCommentDots
	} from '@fortawesome/free-solid-svg-icons/index.es';

	let navIconsSize = 'sm';
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
			<ul
				class="flex md:max-w-3xl w-full gap-4 justify-between mx-auto text-2xl md:text-base min-h-[3rem]"
			>
				<a
					href="/#how-to"
					class="opacity-60 hover:opacity-100 transition-opacity flex gap-2 items-center"
				>
					<Fa icon={faBook} size={navIconsSize} />
					<li class="hidden md:block">How to use the MAP</li>
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
					<span class="flex h-3 w-3">
						<span
							class="animate-ping absolute left-4 md:left-2 bottom-3 inline-flex h-3 w-3 rounded-full bg-danger-red"
						/>
						<span
							class="absolute left-4 md:left-2 bottom-3 inline-flex rounded-full h-3 w-3 bg-danger-red"
						/>
					</span>
					<FeedbackSection />
				</a>
			</ul>
		</div>
	</nav>
</header>
