<!-- 
使用方法:
import Verification from 'VerificationCode.vue'
components: {Verification}
<Verification 
		dataUrl='[必填]请求验证码数据的路径,该路径需要返回index,data,code' 
		imgPrefix='[选填]加载图片的前缀,如:http://localhost/img/ + code' 
		imgSuffix='[选填]加载图片的后缀,如:imgPrefix + code + .jpg' 
		tipsColor='[选填]提示文字的颜色' 
		resetColor="[选填]刷新一下文字的颜色"
		:loadDataErrHandler="请求验证码数据加载失败的处理器"
		:clickFinishHandler="图片点击完成的处理器" /> 
该组件依赖axios请求验证码数据
 -->

<template>
	<div style="display: flex;flex-wrap: wrap;">
		<div class="captcha-tips" :style="{'color':tipsColor}">
			请依次选中验证码：{{imgData}}
		</div>
		<div style="display: flex;">
			<div class="captcha-img" :style="{backgroundImage:'url(' + imgUrl + ')'}">
				<div v-for="(item,index) in imgValues" :key="index" :class="['captcha-num',{'captcha-clicked':item.isCheck}]"
				 @click="click(index)"></div>
			</div>
			<div class="captcha-reset" @click="reset" :style="{'color':resetColor}">
				刷新一下
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				imgData: '',
				imgUrl: '',
				imgIndex: '',
				indexVal: '',
				imgValues: [{
						value: '00',
						isCheck: false
					},
					{
						value: '01',
						isCheck: false
					},
					{
						value: '02',
						isCheck: false
					},
					{
						value: '03',
						isCheck: false
					},
					{
						value: '04',
						isCheck: false
					}
				]
			}
		},
		props: {
			//请求图片数据的地址
			dataUrl: {
				type: String,
				required: true
			},
			//提示文字的颜色
			tipsColor:  {
				type: String,
				default: '#007bff'
			},
			//刷新一下文字的颜色
			resetColor: {
				type: String,
				default: '#007bff'
			},
			//图片路径的前缀
			imgPrefix: String,
			//图片路径的后缀
			imgSuffix: String,
			//请求图片数据失败事件
			loadDataErrHandler: Function,
			//用户点击验证码完成事件
			clickFinishHandler: Function
		},
		methods: {
			click(index) {
				if (this.imgValues[index].isCheck || this.indexVal.length === 8) {
					return;
				}
				this.imgValues[index].isCheck = true;
				this.indexVal = this.indexVal += this.imgValues[index].value;
				if (this.indexVal.length === 8) {
					this.clickFinishHandler(this.imgIndex, this.indexVal);
				}
			},
			reset() {
				this.imgValues = [{
						value: '00',
						isCheck: false
					},
					{
						value: '01',
						isCheck: false
					},
					{
						value: '02',
						isCheck: false
					},
					{
						value: '03',
						isCheck: false
					},
					{
						value: '04',
						isCheck: false
					}
				];
				this.indexVal = '';
				this.imgData = ''
				this.initImageData();
			},
			initImageData() {
				var tis = this;
				axios.get(tis.dataUrl).then((res) => {
					tis.imgIndex = res.data.index;
					tis.imgData = res.data.data;
					tis.imgUrl = (tis.imgPrefix || '') + res.data.code + (tis.imgSuffix || '');
				}).catch((err) => {
					if (tis.loadDataErrHandler) {
						tis.loadDataErrHandler(err);
					} else {
						console.log(err)
					}
				})
			}
		},
		mounted() {
			this.initImageData();
		}
	}
</script>

<style>
	.captcha-tips {
		text-align: left;
		height: 40px;
		padding-right: 0.625rem;
		display: flex;
		align-items: center;
	}

	.captcha-img {
		height: 40px;
		width: 200px;
		display: flex;
		margin-right: 0.3125rem;
	}

	.captcha-num {
		width: 2.5rem;
		height: 2.5rem;
	}

	.captcha-clicked {
		background-color: rgba(0, 0, 0, 0.4);
	}

	.captcha-reset {
		display: flex;
		align-items: flex-end;
		cursor: pointer;

	}
</style>
