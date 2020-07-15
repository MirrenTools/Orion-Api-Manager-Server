<template>
	<div>
		this is client id: {{ id }} , token: {{ token }}
		<div><button @click="setId">set id</button></div>
		<div><button @click="setToken">set token</button></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			token: this.$store.getters.token
		};
	},
	methods: {
		setId() {
			this.$store.dispatch('mydata/setId', 2);
		},
		setToken() {}
	},
	computed: {
		id() {
			return this.$store.getters.id;
		}
	}
};
</script>
