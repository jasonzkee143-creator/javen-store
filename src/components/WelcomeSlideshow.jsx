import { useEffect, useState } from 'react'
import welcomeStillLife from '../assets/welcome-still-life.svg'
import welcomeGifting from '../assets/welcome-gifting.svg'
import welcomeDiscover from '../assets/welcome-discover.svg'
import welcomePromo from '../assets/welcome-promo.svg'

const slides = [
  {
    eyebrow: 'Javen Store / Thoughtfully picked',
    title: 'Find the little things that feel just right.',
    description: 'A considered collection of everyday essentials and unexpected favorites, made for wherever life takes you.',
    image: welcomeStillLife,
    caption: 'A little something lovely',
    theme: 'garden',
  },
  {
    eyebrow: 'A little joy, wrapped up',
    title: 'Make room for something lovely.',
    description: 'Thoughtful finds for the people you love — and a few wonderful things just for you.',
    image: welcomeGifting,
    caption: 'Made for giving',
    theme: 'terracotta',
  },
  {
    eyebrow: 'Your next favorite is here',
    title: 'Everyday, with a little more wonder.',
    description: 'Meet the useful, the beautiful, and the things you never knew you needed.',
    image: welcomeDiscover,
    caption: 'Find your new favorite',
    theme: 'olive',
  },
  {
    eyebrow: 'A little thank-you from us',
    title: 'A lovely find, for a little less.',
    description: 'Take 10% off your order with our welcome offer. Add something you love, then enter the code in your cart.',
    image: welcomePromo,
    caption: 'A little something extra',
    theme: 'promo',
    promoCode: 'WELCOME10',
  },
]

function WelcomeSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const activeSlide = slides[activeIndex]

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length)
    }, 6000)

    return () => window.clearInterval(intervalId)
  }, [isPaused])

  const showSlide = (index) => {
    setActiveIndex((index + slides.length) % slides.length)
  }

  return (
    <section
      aria-label="Welcome highlights"
      aria-roledescription="carousel"
      className={`home-hero welcome-slideshow welcome-slideshow--${activeSlide.theme} mb-9 w-full min-w-0 text-white`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false)
      }}
    >
      <div
        key={activeSlide.theme}
        className="welcome-slide"
        role="group"
        aria-roledescription="slide"
        aria-label={`${activeIndex + 1} of ${slides.length}`}
      >
        <div className="hero-copy">
          <p className="hero-eyebrow mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]">
            {activeSlide.eyebrow}
          </p>
          <h1 className="max-w-2xl text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            {activeSlide.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
            {activeSlide.description}
          </p>
          {activeSlide.promoCode && (
            <p className="promo-code-badge mt-4 inline-flex items-center gap-2">
              Use code <span>{activeSlide.promoCode}</span> in your cart
            </p>
          )}
          <a
            href="#products"
            className="home-hero-link mt-7 inline-flex min-h-11 items-center bg-white px-6 py-2.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Explore the collection <span className="ml-2" aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <img src={activeSlide.image} alt="" />
          <span className="hero-art-caption">{activeSlide.caption}</span>
        </div>
      </div>

      <div className="welcome-controls">
        <button
          type="button"
          className="welcome-arrow"
          onClick={() => showSlide(activeIndex - 1)}
          aria-label="Show previous welcome banner"
        >
          <span aria-hidden="true">←</span>
        </button>
        <div className="welcome-dots" aria-label="Choose a welcome banner">
          {slides.map((slide, index) => (
            <button
              key={slide.theme}
              type="button"
              className={`welcome-dot${activeIndex === index ? ' is-active' : ''}`}
              onClick={() => showSlide(index)}
              aria-label={`Show banner ${index + 1}: ${slide.title}`}
              aria-current={activeIndex === index ? 'true' : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          className="welcome-arrow"
          onClick={() => showSlide(activeIndex + 1)}
          aria-label="Show next welcome banner"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}

export default WelcomeSlideshow
