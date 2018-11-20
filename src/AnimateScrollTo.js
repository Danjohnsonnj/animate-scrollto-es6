const animateScrollTo = ({
  wrapper = document.scrollingElement,
  targetX = 0,
  targetY = 100,
  duration = 500,
  rate = 10,
}) => {
  const currentX = wrapper.scrollLeft
  const currentY = wrapper.scrollTop
  const horizontalDirection = currentX < targetX ? 'right' : 'left'
  const verticalDirection = currentY < targetY ? 'down' : 'up'
  const horizontalDistance = Math.abs(currentX - targetX)
  const verticalDistance = Math.abs(currentY - targetY)
  const win = wrapper.ownerDocument.defaultView

  let horizontalStepAmount = horizontalDistance / (duration / rate)
  horizontalStepAmount = horizontalDirection === 'left' ? -horizontalStepAmount : horizontalStepAmount

  let verticalStepAmount = verticalDistance / (duration / rate)
  verticalStepAmount = verticalDirection === 'up' ? -verticalStepAmount : verticalStepAmount

  let animationId
  let count = 0

  const mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel'
  const cancelAnimation = () => {
    if (animationId !== undefined){
      win.cancelAnimationFrame(animationId)
      animationId = undefined
    }
  }
  win.document.addEventListener(mousewheelevt, cancelAnimation, false)

  const stepScroll = () => {
    animationId = win.requestAnimationFrame(() => {
      setTimeout(() => {
        win.scrollBy(horizontalStepAmount, verticalStepAmount)
        count += 1
        if (count < duration / rate) {
          stepScroll()
        } else {
          win.scrollTo(targetX, targetY)
        }
      }, rate)
    })
  }
  stepScroll()
}

module.exports = animateScrollTo
