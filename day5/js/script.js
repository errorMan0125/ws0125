// 图片DOM
const imgViewDom = $('#picture-view-img');

// 模态框内 和 上/下一张 图片切换
function modalShowPicture(targetDom) {
	// 图片
	imgViewDom.attr('data-imgCard', targetDom.getAttribute('data-imgCard'));
	imgViewDom.attr('src', targetDom.src);
	// 下载按钮
	let linkDom = $('#picture-show-modal .download-link');
	linkDom[0].href = targetDom.src;
	linkDom[0].download = targetDom.src.replace(new RegExp('.*?images/'), '');
}

// 全屏
function fullScreen() {
	imgViewDom[0].requestFullscreen()
		.then(()=>{
			/* null */
		});
}
// 图片缩放
function pictureScale(scale) {
	let nowScale = Number(imgViewDom.attr('data-scale'));

	scale = nowScale * scale;
	if (scale < 1) {
		scale = 1;
	}

	imgViewDom.css('transform', `scale(${scale})`);
	imgViewDom.attr('data-scale', scale);
}

let cardImgList = $('.card-list img');
// 点击图片 打开图片浏览器
cardImgList.click((event) => {
	modalShowPicture(event.target);
	// 展示模态框
	$('#picture-show-modal').modal('show');

})

// 图片拖曳
// let nowMouseX = null;
// let nowMouseY = null;
/*
imgViewDom[0].addEventListener('drag', (event) => {
	let nowScale = Number(imgViewDom.attr('data-scale'));
	if (nowMouseX == null || nowMouseY == null) {
		nowMouseX = event.clientX;
		nowMouseY = event.clientY;
		return;
	}
	nowMouseX = event.clientX;
	nowMouseY = event.clientY;
	if (!(nowMouseX && nowMouseY)) {
		return;
	}

	let whileDom = imgViewDom[0];
	let imgOffsetX = whileDom.offsetLeft;
	let imgOffsetY = whileDom.offsetTop;
	while (whileDom.offsetParent !== null) {
		imgOffsetX += Number(whileDom.offsetLeft);
		imgOffsetY += Number(whileDom.offsetTop);
		whileDom = whileDom.offsetParent
	}
	console.log(imgOffsetX + ' ' + imgOffsetY + ' XX ' + nowMouseX + ' ' + nowMouseY)

	let imgWidth = Number(imgViewDom[0].offsetWidth);
	let imgHeight = Number(imgViewDom[0].offsetHeight);

	imgViewDom.css('transform', `scale(${nowScale}) translateX(${(nowMouseX - imgOffsetX - imgWidth / 2)}px) translateY(${(nowMouseY - imgOffsetY - imgHeight / 2)}px)`);
	let translateX = nowMouseX - imgOffsetX - imgWidth / 2;
	let translateY = nowMouseY - imgOffsetY - imgHeight / 2;
	imgViewDom.css('transform', `scale(${nowScale}) translateX(${translateX}px) translateY(${translateY}px)`);
});
$('#picture-show-modal').on('hidden.bs.modal', function (event) {
	let nowScale = Number(imgViewDom.attr('data-scale'));
	imgViewDom.css('transform', `scale(${nowScale})`);
})
*/

// 上一页 下一页
function pictureToggle(number) {
	number = Number(number);
	let nowNumber = Number(imgViewDom.attr('data-imgCard'));
	let nextPictureNumber = nowNumber + number;
	if (nextPictureNumber > cardImgList.length - 1) {
		nextPictureNumber = 0;
	}
	if (nextPictureNumber < 0) {
		nextPictureNumber = cardImgList.length - 1;
	}
	modalShowPicture(cardImgList[nextPictureNumber]);
}