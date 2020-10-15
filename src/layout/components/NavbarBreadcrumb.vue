<template>
	<el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
		<el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
			<router-link :to="{ path: item.path }">{{ item.title }}</router-link>
		</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script>
export default {
	data() {
		return {
			breadcrumbList: null
		};
	},
	watch: {
		$route() {
			this.getBreadcrumb();
		}
	},
	created() {
		this.getBreadcrumb();
	},
	methods: {
		getBreadcrumb() {
			this.breadcrumbList = [];
			var meta = this.$route.meta;
			var query = this.$route.query;
			var params = this.$route.params;
			if (meta != null && meta.breadcrumb != null) {
				for (var i = 0; i < meta.breadcrumb.length; i++) {
					var route = meta.breadcrumb[i];
					var queryParams = null;
					if (route.queryKeys != null) {
						var flag = true;
						for (var j = 0; j < route.queryKeys.length; j++) {
							var k = route.queryKeys[j];
							if (query[k] == null || query[k] == '') {
								continue;
							}
							if (flag) {
								queryParams = '?';
								flag = false;
							} else {
								queryParams += '&';
							}
							queryParams += k + '=' + query[k];
						}
					}
					var breadcrumb = {};
					var breadcrumbPath = route.path;
					if (route.pathKeys != null) {
						for (var j = 0; j < route.pathKeys.length; j++) {
							var k = route.pathKeys[j];
							var val = null;
							if (params[k] != null && params[k] != '') {
								val = params[k];
							} else if (query[k] != null && query[k] != '') {
								val = query[k];
							}
							if (val != null) {
								if (breadcrumbPath.endsWith(k)) {
									var reg = new RegExp('(.*):' + k);
									breadcrumbPath = breadcrumbPath.replace(reg, '$1' + val);
								} else {
									breadcrumbPath = breadcrumbPath.replace(':' + k + '/', val);
								}
							}
						}
					}
					breadcrumb.path = breadcrumbPath + (queryParams || '');

					breadcrumb.title = this.$t(route.title);
					this.breadcrumbList.push(breadcrumb);
				}
			}
			var name = this.$t(this.$route.name);
			var breadcrumb = { title: name };
			this.breadcrumbList.push(breadcrumb);
		}
	}
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
	display: inline-block;
	font-size: 14px;
	line-height: 50px;
	margin-left: 8px;

	.no-redirect {
		color: #97a8be;
		cursor: text;
	}
}
</style>
