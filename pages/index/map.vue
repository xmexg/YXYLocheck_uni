<template>
	<view class="content">
		<map id="map" class="map" :show-location="true" :latitude="latitude" :longitude="longitude" tap="handleTap"></map>
	</view>
</template>

<script>
	const img = '/static/logo.png';
	export default {
		data() {
			return {
				latitude: "35.861264",
				longitude: "104.200775",
			}
		},
		onReady() {
			this._mapContext = uni.createMapContext("map", this);
			let that = this;
			// uni.getLocation({
			// 	type: "gcj02",
			// 	success: function (res) {
			// 		console.log('当前位置的经度：' + res.longitude);
			// 		console.log('当前位置的纬度：' + res.latitude);
			// 		that.latitude = res.latitude;
			// 		that.longitude = res.longitude;
					
			// 		// uni.openLocation({
			// 		// 			latitude: res.latitude,
			// 		// 			longitude: res.longitude,
			// 		// 			success: function () {
			// 		// 				console.log('success');
			// 		// 			}
			// 		// 		});
			// 	}
			// });
			
			// 坐标拾取器，这有问题，无法使用
			uni.chooseLocation({
				success: function (res) {
					console.log('位置名称：' + res.name);
					console.log('详细地址：' + res.address);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
					that.toSign(res.longitude, res.latitude);//开始签到
				}
			});

			// 仅调用初始化，才会触发 on.("markerClusterCreate", (e) => {})
			// this._mapContext.initMarkerCluster({
			// 	enableDefaultStyle: false,
			// 	zoomOnClick: true,
			// 	gridSize: 60,
			// 	complete(res) {
			// 		console.log('initMarkerCluster', res)
			// 	}
			// });

			// this._mapContext.on("markerClusterCreate", (e) => {
			// 	console.log("markerClusterCreate", e);
			// });

			// this.addMarkers();
		},
		methods: {
			 handleTap(e) {
			      var id = e.markerId;
			      var mapCtx = uni.createMapContext("myMap", this);
			      mapCtx.getCenterLocation({
			        success: function(res) {
						console.log(e)
			          // console.log("拾取坐标："+res.longitude + ", " + res.latitude);
			        }
			      });
			    },
				toSign(longitude, latitude){
					let lonlat = {
						"longitude": longitude,
						"latitude": latitude
					};
					const eventChannel = this.getOpenerEventChannel();
					eventChannel.emit('Sign', lonlat);
					eventChannel.on('Sign', data => {
					    console.log(data) // 在控制台输出接收到的数据
					  })
				}
		// 	addMarkers() {
		// 		const positions = [{
		// 			latitude: 23.099994,
		// 			longitude: 113.324520,
		// 		}, {
		// 			latitude: 23.099994,
		// 			longitude: 113.322520,
		// 		}, {
		// 			latitude: 23.099994,
		// 			longitude: 113.326520,
		// 		}, {
		// 			latitude: 23.096994,
		// 			longitude: 113.329520,
		// 		}]

		// 		const markers = []

		// 		positions.forEach((p, i) => {
		// 			console.log(i)
		// 			markers.push(
		// 				Object.assign({}, {
		// 					id: i + 1,
		// 					iconPath: img,
		// 					width: 50,
		// 					height: 50,
		// 					joinCluster: true, // 指定了该参数才会参与聚合
		// 					label: {
		// 						width: 50,
		// 						height: 30,
		// 						borderWidth: 1,
		// 						borderRadius: 10,
		// 						bgColor: '#ffffff',
		// 						content: `label ${i + 1}`
		// 					}
		// 				}, p)
		// 			)
		// 		})
		// 		this._mapContext.addMarkers({
		// 			markers,
		// 			clear: false,
		// 			complete(res) {
		// 				console.log('addMarkers', res)
		// 			}
		// 		})
		// 	}
		}
	}
</script>

<style>
	.content {
		/* 只能这样写才有效 */
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}

	.map {
		width: 100%;
		height: 100%;
	}
</style>
