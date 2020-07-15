<template>
	<div class="p404-container">
		<div class="img">
			<div class="img-404" id="img-404-1" style="color: #f56c6c;">4</div>
			<div class="img-404" id="img-404-2" style="color: #36b455">0</div>
			<div class="img-404" id="img-404-3" style="color: #409eff">4</div>
		</div>
		<div class="msg">
			<div>
				<p class="msg-title">内容不存在</p>
				<div>
					<el-button type="primary" @click="$router.back(-1)">返回上一页</el-button>
					<router-link to="/" style="margin-left: 0.5rem;"><el-button type="primary">返回首页</el-button></router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped="scoped">
.p404-container {
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	background-color: #283443;
}
.img {
	width: 55%;
	height: 49%;
	display: flex;
	align-items: center;
	justify-content: right;
}
.img-404 {
	font-size: 20rem;
	font-family: sans-serif;
}

.img-404 {
	-webkit-animation: float 1s infinite ease-in-out alternate;
	animation: float 1s infinite ease-in-out alternate;
}
#img-404-1 {
	-webkit-animation-delay: 0.1s;
	animation-delay: 0.1s;
}
#img-404-2 {
	-webkit-animation-delay: 0.3s;
	animation-delay: 0.3s;
}
#img-404-3 {
	-webkit-animation-delay: 0.6s;
	animation-delay: 0.6s;
}
.msg {
	width: 44%;
	height: 49%;
	display: flex;
	align-items: center;
	justify-content: left;
}
.msg .msg-title {
	font-size: 2rem;
	color: white;
	text-align: left;
}
@-webkit-keyframes float {
	100% {
		-webkit-transform: translateY(30px);
		transform: translateY(30px);
	}
}

@keyframes float {
	100% {
		-webkit-transform: translateY(30px);
		transform: translateY(30px);
	}
}
@media (max-width: 1024px) {
	.img-404 {
		font-size: 13rem;
	}
}
@media (max-width: 768px) {
	.img {
		width: 100%;
		align-items: flex-end;
		justify-content: center;
	}
	.img-404 {
		font-size: 10rem;
	}
	.msg {
		width: 100%;
		align-items: flex-start;
		justify-content: center;
	}
	.msg .msg-title {
		text-align: center;
	}
}
</style>
