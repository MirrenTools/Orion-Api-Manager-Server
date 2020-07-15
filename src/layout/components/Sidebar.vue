<template>
	<div>
		<logo :collapse="isCollapse" title="Orion-API-Manager" />
		<SidebarItem :collapse="isCollapse" />
	</div>
</template>

<script>
import Logo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import { mapGetters } from 'vuex';
export default {
	components: { Logo, SidebarItem },
	computed: {
		...mapGetters(['sidebar']),
		isCollapse() {
			return !this.sidebar.opened;
		}
	}
};
</script>
