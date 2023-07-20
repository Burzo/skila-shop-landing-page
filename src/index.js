import './sass/main.scss'
import Glide from '@glidejs/glide'
import { Autoplay } from '@glidejs/glide/dist/glide.modular.esm'
import throttle from 'lodash.throttle'
import emailjs from '@emailjs/browser'
import Toastify from 'toastify-js'
import 'vanilla-cookieconsent/dist/cookieconsent'

window.addEventListener('load', () => {
  try {
    const gliders = document.querySelectorAll('.glide')
    // Carousel effect for testimonies
    if (gliders[0]) {
      const glide = new Glide(gliders[0], {
        type: 'carousel',
        perView: 1,
        focusAt: 'center',
        autoplay: 5000,
      })
      glide.mount({ Autoplay })
    }
  } catch (e) {
    console.log('Glide could not mount.')
  }

  // Video autoplay
  const video = document.getElementById('promotional-video')
  const cookieButton = document.getElementById('cookie-button')
  const videoControlPlay = document.getElementById('video-controls-play')
  const videoControlPause = document.getElementById('video-controls-pause')
  const videoOverlay = document.getElementById('video-overlay')
  const hamburger = document.getElementById('hamburger-button')
  const nav = document.querySelector('nav')
  const trialForm = document.getElementById('trial-form-id')
  const contactUsForm = document.getElementById('contact-us-form-id')

  window.addEventListener('click', function () {
    if (hamburger.classList.contains('is-active')) {
      hamburger.classList.remove('is-active')
    }
  })

  // Hamburger
  hamburger.addEventListener('click', function (event) {
    event.stopPropagation()
    if (hamburger.classList.contains('is-active')) {
      hamburger.classList.remove('is-active')
      // nav.classList.add("shadow");
    } else {
      hamburger.classList.add('is-active')
      // nav.classList.remove("shadow");
    }
  })

  const switchOverlay = function (to) {
    if (to === 'play') {
      videoControlPlay.style.zIndex = '-100'
      videoControlPause.style.zIndex = '0'
    } else {
      videoControlPlay.style.zIndex = '0'
      videoControlPause.style.zIndex = '-100'
    }
  }

  let isPaused = true

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (video.muted) {
          return
        }
        if (entry.intersectionRatio !== 1 && !video.paused) {
          video.pause()
          switchOverlay('pause')
          isPaused = true
        } else if (isPaused && entry.intersectionRatio === 1) {
          video.play()
          switchOverlay('play')
          isPaused = false
        }
      })
    },
    {
      threshold: 1,
    },
  )

  if (video) {
    observer.observe(video)
  }

  // Video play
  const isVideoPlaying = (video) =>
    !!(
      video.currentTime > 0 &&
      !video.paused &&
      !video.ended &&
      video.readyState > 2
    )

  if (videoOverlay) {
    videoOverlay.addEventListener('click', function (e) {
      if (video.muted) {
        video.muted = false
        video.currentTime = 0
        console.log('Video unmuted')
      }

      if (!isVideoPlaying(video)) {
        video.play()
        switchOverlay('play')
      } else {
        video.pause()
        switchOverlay('pause')
      }
    })
  }

  const isScrollTop = () => {
    try {
      nav.toggleAttribute('stuck', window.pageYOffset > 0)
    } catch (e) {
      console.log('No nav element found.')
    }
  }

  addEventListener('scroll', throttle(isScrollTop, 100))

  if (trialForm) {
    trialForm.addEventListener('submit', (event) => {
      event.preventDefault()

      trialForm['submitButton'].toggleAttribute('loading')
      trialForm[
        'submitButton'
      ].innerHTML = `<svg class="spinner" viewBox="0 0 50 50">
      <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>`

      const prepareForNetlify = new FormData(trialForm)

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(prepareForNetlify).toString(),
        redirect: 'error',
      })
        .then((res) => {
          if (res.status === 303) {
            throw new Error('reCAPTCHA was not validated, please try again.')
          }

          if (!res.ok) {
            throw new Error('Form submission denied.')
          }

          return emailjs.sendForm(
            'service_hncoskf',
            'template_jy2bd5p',
            trialForm,
            '9fbtusTKVrlnDGa35',
          )
        })
        .then(() => {
          window.grecaptcha?.reset()
          trialForm.reset()
          trialForm['submitButton'].toggleAttribute('loading')
          trialForm['submitButton'].innerHTML = `Register`

          Toastify({
            text: 'Registration successful. Thank you.',
            duration: 5000,
            newWindow: true,
            gravity: 'top',
            position: 'center',
            className: 'toaster',
          }).showToast()
        })
        .catch(() => {
          window.grecaptcha?.reset()

          trialForm['submitButton'].toggleAttribute('loading')
          trialForm['submitButton'].innerHTML = `Register`

          Toastify({
            text: 'reCAPTCHA was not validated, please try again.',
            duration: 3000,
            newWindow: true,
            gravity: 'top',
            position: 'center',
            className: 'toaster error',
          }).showToast()
        })
    })
  }

  if (contactUsForm) {
    contactUsForm.addEventListener('submit', function (event) {
      event.preventDefault()

      contactUsForm['submitButton'].toggleAttribute('loading')
      contactUsForm[
        'submitButton'
      ].innerHTML = `<svg class="spinner" viewBox="0 0 50 50">
      <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>`

      const prepareForNetlify = new FormData(contactUsForm)

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(prepareForNetlify).toString(),
        redirect: 'error',
      })
        .then((res) => {
          if (res.status === 303) {
            throw new Error('reCAPTCHA was not validated, please try again.')
          }

          if (!res.ok) {
            throw new Error('Form submission denied.')
          }

          return emailjs.sendForm(
            'service_hncoskf',
            'template_ld8or5p',
            contactUsForm,
            '9fbtusTKVrlnDGa35',
          )
        })
        .then(() => {
          window.grecaptcha?.reset()
          contactUsForm.reset()
          contactUsForm['submitButton'].toggleAttribute('loading')
          contactUsForm['submitButton'].innerHTML = `Submit`

          Toastify({
            text: 'Message sent. We will get back to you promptly. Thank you.',
            duration: 5000,
            newWindow: true,
            gravity: 'top',
            position: 'center',
            className: 'toaster',
          }).showToast()
        })
        .catch(() => {
          window.grecaptcha?.reset()

          contactUsForm['submitButton'].toggleAttribute('loading')
          contactUsForm['submitButton'].innerHTML = `Submit`

          Toastify({
            text: 'reCAPTCHA was not validated, please try again.',
            duration: 3000,
            newWindow: true,
            gravity: 'top',
            position: 'center',
            className: 'toaster error',
          }).showToast()
        })
    })
  }

  window.addEventListener('resize', throttle(rescaleCaptcha, 100))

  rescaleCaptcha()

  function rescaleCaptcha() {
    let scale
    let reCAPTCHA = document.getElementById('custom-captcha')

    if (!reCAPTCHA) return

    let width = reCAPTCHA.parentElement.offsetWidth

    if (width < 400) {
      scale = width / 400
    } else {
      scale = 1.0
    }

    reCAPTCHA.style.transform = `scale(${scale})`
  }

  const cc = initCookieConsent()

  cc.run({
    current_lang: 'en',
    autoclear_cookies: true,
    page_scripts: true,
    languages: {
      en: {
        consent_modal: {
          title: 'We use cookies!',
          description:
            'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <button type="button" data-cc="c-settings" class="cc-link">Let me choose</button>',
          primary_btn: {
            text: 'Accept all',
            role: 'accept_all',
          },
          secondary_btn: {
            text: 'Reject all',
            role: 'accept_necessary',
          },
        },
        settings_modal: {
          title: 'Cookie preferences',
          save_settings_btn: 'Save settings',
          accept_all_btn: 'Accept all',
          reject_all_btn: 'Reject all',
          close_btn_label: 'Close',
          cookie_table_headers: [
            { col1: 'Name' },
            { col2: 'Domain' },
            { col3: 'Expiration' },
            { col4: 'Description' },
          ],
          blocks: [
            {
              title: 'Cookie usage 📢',
              description:
                'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="/privacy.html" class="cc-link">privacy policy</a>.',
            },
            {
              title: 'Performance and Analytics cookies',
              description:
                'These cookies allow the website to remember the choices you have made in the past',
              toggle: {
                value: 'analytics',
                enabled: false,
                readonly: false,
              },
              cookie_table: [
                {
                  col1: '^_ga',
                  col2: 'google.com',
                  col3: '2 years',
                  col4: 'Used to distinguish users.',
                  is_regex: true,
                },
                {
                  col1: '_ga_^',
                  col2: 'google.com',
                  col3: '2 years',
                  col4: 'Used to persist session state.',
                },
              ],
            },
            {
              title: 'More information',
              description:
                'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="/contact-us.html">contact us</a>.',
            },
          ],
        },
      },
    },
    onAccept: function () {
      if (cc.allowedCategory('analytics')) {
        gtag('consent', 'update', {
          analytics_storage: 'granted',
        })
      } else {
        gtag('consent', 'update', {
          analytics_storage: 'denied',
        })
      }

      if (cc.allowedCategory('ads')) {
        gtag('consent', 'update', {
          ad_storage: 'granted',
        })
      } else {
        gtag('consent', 'update', {
          analytics_storage: 'denied',
        })
      }
    },
    onChange: function () {
      if (cc.allowedCategory('analytics')) {
        gtag('consent', 'update', {
          analytics_storage: 'granted',
        })
      } else {
        gtag('consent', 'update', {
          analytics_storage: 'denied',
        })
      }

      if (cc.allowedCategory('ads')) {
        gtag('consent', 'update', {
          ad_storage: 'granted',
        })
      } else {
        gtag('consent', 'update', {
          analytics_storage: 'denied',
        })
      }
    },
  })

  cookieButton.addEventListener('click', function () {
    cc.showSettings()
  })
})
