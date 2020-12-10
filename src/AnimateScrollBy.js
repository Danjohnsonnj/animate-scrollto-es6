const animateScrollTo = require('./AnimateScrollTo')

const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;

const animateScrollBy = ({
  target = document.scrollingElement,
  x = 0,
  y = 100,
  duration = 250,
  rate = 10
}) => {

  if (isSmoothScrollSupported) {
    target.scrollBy({
      top: y,
      left: x,
      behavior: 'smooth'
    })
    return
  }

  const currentX = target.scrollLeft
  const currentY = target.scrollTop

  animateScrollTo({
    target,
    x: currentX + x,
    y: currentY + y,
    duration,
    rate
  })

}

module.exports = animateScrollBy
