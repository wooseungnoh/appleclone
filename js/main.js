(() => {

	let yOffset = 0; //pageYoffset 대신 쓰일 변수
	let prevScrollHeight = 0; //현재 스크롤 위치보다 이전에 위치한 스크롤 섹션 스크롤높이의 합
	let currentScene = 0; // 현재 눈앞에 보이고 있는 씬

	const sceneInfo = [
		{
			//0
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-0')
			}
		},
		{
			//1
			type: 'normal',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-1')
			}
		},
		{
			//2
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-2')
			}
		},
		{
			//3
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-3')
			}
		},
	]


	const setLayout = () => {
		//각 스크롤 섹션의 높이 생성
		for (let i = 0; i < sceneInfo.length; i++) {
			//i가 총 씬의 갯수(sceneInfo.length)보다 작을때 실행
			sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
			//i번째 sceneInfo의 scrollHeight(씬의 높이) 를 브라우저의 innerHeight * heightNum(5) 로 저장
			sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
			//i번째 sceneInfo 의 실제 오브젝트(section)의 높이를 앞서 저장한 scrollHeight 로 지정
		}
		let yOffset = window.pageYOffset;
		//yOffset = 현재 윈도우의 스크롤의 위치

		let totalScrollHeight = 0;
		//모든 씬 높이의 합이 저장될 변수

		for (let i = 0; i < sceneInfo.length; i++) {
			//i 가 씬들의 갯수보다 작을때실행
			//새로고침 되었을때 현재의 씬이 어디인지를 알기위한 반복문

			totalScrollHeight += sceneInfo[i].scrollHeight;
			//totalScrollHeight 에 각 씬들의 높이를 계속 더하여 총 합을 구함.

			if (yOffset <= totalScrollHeight) {
				//totalScrollHeight 가 현재 윈도우 스크롤 위치보다 크거나 같을때
				//
				currentScene = i;
				//현재 보고있는 씬을 i 로 설정
				console.log(currentScene)
				break
			}
		}
		document.body.setAttribute('id', `show-scene-${currentScene}`)
	};



	const scrollLoop = () => {
		//스크롤될때마다 실행되는 함수

		prevScrollHeight = 0;
		//이전 씬들의 높이의 합이 저장될 변수

		for (let i = 0; i < currentScene; i++) {
			prevScrollHeight += sceneInfo[i].scrollHeight;
			//지금 보고있는 씬 이전의 씬들의 scrollHeight 의 합을 저장
		}
		if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			//지금 스크롤 위치가 이전씬의 높이의 합+i번째 씬의 scrollHeight 보다 크다면
			currentScene++
			//지금 보고있는 씬을 ++ 함.
			
			document.body.setAttribute('id', `show-scene-${currentScene}`)
		}
		if (yOffset < prevScrollHeight) {
			if (currentScene === 0) return
			currentScene--
			document.body.setAttribute('id', `show-scene-${currentScene}`)
		}


	};
	window.addEventListener('resize', setLayout);
	window.addEventListener('scroll', () => {
		yOffset = window.pageYOffset;
		scrollLoop()
	});
	window.addEventListener('load', setLayout)

})()