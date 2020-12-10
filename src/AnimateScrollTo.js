const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;

const animateScrollTo = ({
  target = document.scrollingElement,
  x = 0,
  y = 100,
  duration = 250,
  rate = 10
}) => {

  if (isSmoothScrollSupported) {
    target.scrollTo({
      top: y,
      left: x,
      behavior: 'smooth'
    })
    return
  }

  const currentX = target.scrollLeft
  const currentY = target.scrollTop
  const horizontalDirection = currentX < x ? 'right' : 'left'
  const verticalDirection = currentY < y ? 'down' : 'up'
  const horizontalDistance = Math.abs(currentX - x)
  const verticalDistance = Math.abs(currentY - y)
  const win = target.ownerDocument.defaultView

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
          win.scrollTo(x, y)
        }
      }, rate)
    })
  }
  stepScroll()
}

module.exports = animateScrollTo
