const scrollToAnimated = (wrapper, targetX, targetY, durationMilliseconds, rate) => {
  const currentX = wrapper.scrollLeft;
  const currentY = wrapper.scrollTop;
  const duration = durationMilliseconds || 250;
  const stepRate = rate || 10;
  const horizontalDirection = currentX < targetX ? 'right' : 'left';
  const verticalDirection = currentY < targetY ? 'down' : 'up';
  const horizontalDistance = Math.abs(currentX - targetX);
  const verticalDistance = Math.abs(currentY - targetY);

  let horizontalStepAmount = horizontalDistance / (duration / stepRate);
  horizontalStepAmount = horizontalDirection === 'left' ? -horizontalStepAmount : horizontalStepAmount;

  let verticalStepAmount = verticalDistance / (duration / stepRate);
  verticalStepAmount = verticalDirection === 'up' ? -verticalStepAmount : verticalStepAmount;

  let animationId;
  let count = 0;

  const mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel';
  const cancelAnimation = () => {
    if (animationId !== undefined){
      window.cancelAnimationFrame(animationId);
      animationId = undefined;
    }
  };
  window.document.addEventListener(mousewheelevt, cancelAnimation, false);

  const stepScroll = () => {
    animationId = window.requestAnimationFrame(() => {
      window.animating = true;
      setTimeout(() => {
        window.scrollBy(horizontalStepAmount, verticalStepAmount);
        count += 1;
        if (count < duration / stepRate) {
          stepScroll();
        } else {
          window.scrollTo(targetX, targetY);
          window.animating = false;
        }
      }, stepRate);
    });
  };
  stepScroll();
};

try {
  module.exports = scrollToAnimated;
} catch (err) {
  console.error(err);
}
