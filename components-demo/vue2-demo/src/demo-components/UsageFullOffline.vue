<template>
	<section class="icon-24">
		<h1>Usage (full module, offline mode)</h1>
		<div>
			Icon referenced by name:
			<Icon icon="demo" />
		</div>
		<div>
			Icon referenced by object:
			<Icon v-bind:icon="demoIcon" />
		</div>
		<div>
			2 icons imported from icon set:
			<Icon icon="alert1" />
			<Icon icon="link1" />
		</div>
		<div class="alert">
			<Icon :icon="alertIcon" />Important notice with alert icon!
		</div>
		<div>
			Icon without size, scaled to 48px with CSS:
			<Icon :icon="demoIcon" height="unset" style="height: 48px" />
		</div>
	</section>
</template>

<script>
import { Icon } from '@iconify/vue2';
import demoIcon from '@iconify-icons/dashicons/info-outline';
import alertIcon from '@iconify-icons/bx/bx-error';

export default {
	components: {
		Icon,
	},
	data() {
		return {
			demoIcon,
			alertIcon,
		};
	},
};
</script>
