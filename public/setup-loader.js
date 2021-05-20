

document.body.innerHTML += `
<div id="loader" style="display: flex; justify-content: center; align-items: center; background: rgba(255, 255, 255, 0.4); width: 100%; height: 100%; position: absolute;">
  <div style="width: 60px; height: 60px;">
    <div id="loader-elem"></div>
  </div>
</div>
`

setTimeout(() => {
  let lottieAnimationData = {
    container: document.getElementById('loader-elem'), // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
  }
  if (window.LOTTIE_LOADER_DATA) {
    lottieAnimationData.animationData = window.LOTTIE_LOADER_DATA;
  } else if (window.LOTTIE_LOADER_SRC) {
    lottieAnimationData.path = window.LOTTIE_LOADER_SRC;
  } else {
    lottieAnimationData.path = 'https://ic-projects-file-uploads.s3.us-east-2.amazonaws.com/702926627029266270292662/609984c1467c28000980c845';
  }
  lottie.loadAnimation(lottieAnimationData);
  if (window.LOTTIE_LOADER_SPEED) {
    lottie.setSpeed(window.LOTTIE_LOADER_SPEED);
  }
})