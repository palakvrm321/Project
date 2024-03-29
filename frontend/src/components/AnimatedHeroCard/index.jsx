import React, { useEffect } from 'react';
import classes from './animatedCard.module.css';
import { gsap } from "gsap";
import {MotionPathPlugin} from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

const AnimatedHeroCard = () => {


  useEffect(() => {
    const tl = gsap.timeline()
      .set('svg', { opacity: 1 })
      .set('.scratches', { rotation: 70, x: 450, y: -10 })
      .set('#tri2', { scale: 0.5 })
      // .from('#cardMask rect', { scale: 0, rotation: -20, duration: 2, transformOrigin: '50% 50%', ease: 'expo.inOut' }, 0)
      .to('#tri1', {
        motionPath: {
          path: "#midC",
          align: "#midC",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 1,
          end: 0
        }, duration: 6, repeat: -1, ease: 'none', repeatDelay: 1
      }, 0.5)
      .to('#tri2', {
        motionPath: {
          path: "#innerC",
          align: "#innerC",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: 1
        }, duration: 5, repeat: -1, ease: 'none', repeatDelay: 1
      }, 1.5)
      .from('.coil', { attr: { 'stroke-dashoffset': (i) => (i == 1) ? -28 : 28 }, ease: 'none', duration: 1, repeat: -1 }, 1)
      .fromTo('#orb1', { y: 160 }, { y: -20, ease: 'circ', repeat: -1, yoyo: true, duration: 1 }, 0.8)
      .from('.logoPt', { x: (i) => [18, -10][i], duration: 1.2, ease: 'expo.inOut' }, 0.9)
      .from('svg text', { x: -40, duration: 1.1, ease: 'expo.inOut', stagger: 0.2 }, 1)
      .from('.txtBox', { scaleX: 0, transformOrigin: '100% 0', duration: 1.1, ease: 'expo.inOut', stagger: 0.2 }, 1)
      .fromTo('#wave1', { x: 0, y: 0 }, { duration: 5, x: -701, y: 815, repeat: -1, ease: 'none' }, 0)
      .fromTo('#wave2', { x: 0, y: 0 }, { duration: 6, x: 804, y: -917, repeat: -1, ease: 'none', onRepeat: () => starShine.play(0) }, 0)

    const starShine = gsap.timeline()
      .set('#star', { scale: 0, transformOrigin: '50% 50%', x: 2, y: 10 })
      .to('#star', { scale: 1, repeat: 1, yoyo: true, yoyoEase: true, duration: 0.4, ease: 'power4' }, 0)
      .fromTo('#star', { rotate: -20 }, { rotate: 120, duration: 0.8, ease: 'none' }, 0)

    tl.play(0);

    return () => {
      tl.kill();
      starShine.kill();
    };
  }, [])


  return (
    <svg
      className="hero-svg"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 600 368"
    >
      <defs>
        <mask id="chipMask">
          <rect width="100%" height="100%" fill="#fff" />
          <path
            fill="none"
            stroke="#000"
            strokeWidth={3}
            d="M98,133c0,0,4.3,0,7.2,0c2.8,0,3.8,2,3.8,4s-1,6-4,6H89 M109,176.2c0,0,3.5-2.7,3.5-8.7c0-4-4-10-9-10 s-15,0-15,0 M103.5,143.5V156 M136.8,133c0,0-7.3-0.5-7.1,5c0.1,2.6,1.8,5.5,6.3,5.5c5.3-0.1,14.9-0.5,14.9-0.5 M150.4,157.5 c0,0-10.1,0-15.1,0s-9.1,6-9.1,10c0,6,3.5,8.7,3.5,8.7 M135.3,143.5V156"
          />
        </mask>
        <mask id="cardMask">
          <rect rx={20} ry={20} fill="#fff" width={600} height={368} />
        </mask>
        <clipPath id="txtBoxes">
          <rect className="txtBox" x={40} y={37} width={90} height={35} />
          <rect className="txtBox" x={40} y={300} width={195} height={35} />
          <rect className="txtBox" x={470} y={290} width={80} height={35} />
        </clipPath>
        <clipPath id="orbClip1">
          <use href="#orb1" />
          <use href="#orb2" />
        </clipPath>
      </defs>
      <g mask="url(#cardMask)">
        <rect className="bg" fill="#271b13" width="100%" height="100%" />
        <g
          fill="none"
          stroke="#fff"
          strokeWidth={2}
          strokeDasharray="6 2 4 2.5 4 3 3.5 3"
        >
          <path
            className="coil"
            d="M306.1,671.4C62.6,602.5-79.4,350.4-10.9,108.3s295.2-372.5,538.7-303.6"
          />
          <path
            id="midC"
            className="coil"
            d="M352.7,333.4c-79.2-30.9-137.8-142.9-100.6-235.7S386.5-16.5,449.6-11.7"
          />
          <path
            id="innerC"
            className="coil"
            d="M404.4,221c-39.6-7.4-65.7-45.6-58.3-85.2s41.6-63.7,81.2-56.3"
          />
        </g>
        <polygon id="tri1" fill="#424d9b" points="0,47 0,0 44,22" />
        <polygon id="tri2" fill="#424d9b" points="0,47 0,0 44,22" />
        <g fill="#424d9b">
          <circle id="orb1" cx={123} cy={410} r={105} />
          <circle id="orb2" cx={540} cy={45} r={134} />
        </g>
        <g fill="#f9bb4b">
          <path
            id="wave2"
            d="M-941,1510c89-58,147-115,211-201s142-153,210-195s144-42,208-86s69-130,70-173s5-129,38-193 c0,0,17.5-27.5,30.9-40.1C-159.6,609.4-137,593-137,593c89-58,147-115,211-201s142-153,210-195s144-42,208-86s69-130,70-173 s5-129,38-193v1765H-941z"
          />
        </g>
        <g fill="#f9503e">
          <path
            id="wave1"
            d="M1551.5-1044.5c0,0-63,27-131,91s-122,185-186,244s-163,152.7-206,263.3s-90,162.7-128,189.7c0,0-14,10-26,16 c-16,8-24,11-24,11s-63,27-131,91s-122,185-186,244s-163,152.7-206,263.3c-9,23.2-18.2,43.9-27.5,62.3c56.5,0,1255.5-0.1,1255.5-0.1 L1551.5-1044.5z"
          />
        </g>
        <g clipPath="url(#orbClip1)">
          <image
            className="scratches"
            width={150}
            href="https://assets.codepen.io/721952/scratches2.png"
          />
          <use href="#wave2" fill="#3f7773" />
          <use href="#wave1" fill="#271b13" />
        </g>
        <path
          id="star"
          fill="#fff"
          d="M397,17.6c3-3,6.1-9.1,6.1-9.1s0.8,3.8,4.5,7.6c6.1,6.1,9.1,6.1,9.1,6.1s-3,1.5-7.6,6.1 s-6.1,9.1-6.1,9.1s-2.3-5.3-6.1-9.1s-8.3-5.3-8.3-5.3S394,20.6,397,17.6z"
        />
        <g id="logo">
          <circle className="logoPt" fill="#fff" cx={503} cy={67} r={25} />
          <circle
            className="logoPt"
            fill="none"
            stroke="#fff"
            strokeWidth="4.5"
            cx={533}
            cy={67}
            r="22.5"
          />
        </g>
        <g fill="#fff" strokeLinecap="round">
          <g clipPath="url(#txtBoxes)">
            <text x={45} y={60} fontSize={26}>
              Debit
            </text>
            <text x={45} y={320} fontSize={21}>
              Gail Bell
            </text>
            <text x={470} y={320} fontSize={26}>
              02/30
            </text>
          </g>
          <path
            fill="none"
            stroke="#fff"
            strokeWidth="2.4"
            d="M42.5,146.5c2,2,2,6.3,0,8.2 M57,163.7c5.1-5.9,5.1-19.8,0-26.3 M52.1,160.7c4.4-4.5,4.9-15.2,0-20.2
     M47.8,157.2c2.9-3,2.9-10,0-13.2"
          />
          <rect
            mask="url(#chipMask)"
            rx={5}
            ry={5}
            x={89}
            y={125}
            width={61}
            height="50.2"
          />
        </g>
      </g>
    </svg>

  )
}

export default AnimatedHeroCard;