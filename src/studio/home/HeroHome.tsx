import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { studioHome } from '../content';
import { SplitTextShuffle } from './SplitTextShuffle';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_START_RATIO = 0.25;
const LOGO_RATIO = 22 / 214;

type LogoMetrics = {
  sw: number;
  ew: number;
  sh: number;
  eh: number;
  pt: number;
  vh: number;
};

type VideoMetrics = {
  sw: number;
  ew: number;
  sh: number;
  eh: number;
};

function lerp(start: number, end: number, t: number) {
  return start + t * (end - start);
}

export function HeroHome() {
  const reduced = usePrefersReducedMotion();
  const innerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [parallax, setParallax] = useState(0);
  const [videoDone, setVideoDone] = useState(false);
  const [ready, setReady] = useState(false);
  const [logo, setLogo] = useState<LogoMetrics | null>(null);
  const [video, setVideo] = useState<VideoMetrics | null>(null);

  const measure = useCallback(() => {
    const headerLogo = document.querySelector<HTMLElement>('.wkhs-header__logo img');
    const brand = brandRef.current;
    if (!brand || !headerLogo) return;

    const brandWidth = brand.getBoundingClientRect().width;
    setLogo({
      sw: brandWidth,
      ew: headerLogo.clientWidth,
      sh: brandWidth * LOGO_RATIO,
      eh: headerLogo.clientHeight,
      pt: headerLogo.getBoundingClientRect().top,
      vh: window.innerHeight * 0.97,
    });
    setVideo({
      sw: window.innerWidth * VIDEO_START_RATIO,
      ew: window.innerWidth,
      sh: window.innerWidth * VIDEO_START_RATIO * (9 / 16),
      eh: window.innerHeight,
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    const boot = window.setTimeout(() => setReady(true), 40);
    return () => {
      window.removeEventListener('resize', onResize);
      window.clearTimeout(boot);
    };
  }, [measure]);

  useEffect(() => {
    void videoRef.current?.play().catch(() => undefined);
  }, []);

  useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner || !logo || !video) return;

    if (reduced) {
      setProgress(0);
      setParallax(0);
      setVideoDone(false);
      setReady(true);
      return;
    }

    const expand = ScrollTrigger.create({
      trigger: inner,
      start: '0',
      end: '50%',
      onUpdate: ({ progress: next }) => {
        setVideoDone(false);
        setProgress(next);
      },
      onLeave: () => setVideoDone(true),
      onEnterBack: () => setVideoDone(false),
    });

    const shift = ScrollTrigger.create({
      trigger: inner,
      start: '100% 100%',
      end: '100% 0%',
      onUpdate: ({ progress: next }) => setParallax(next),
    });

    return () => {
      expand.kill();
      shift.kill();
    };
  }, [logo, video, reduced]);

  const t = reduced ? 0 : progress;
  const videoWidth = video ? lerp(video.sw, video.ew, t) : 0;
  const videoHeight = video ? lerp(video.sh, video.eh, t) : 0;
  const logoWidth = logo ? `${lerp(logo.sw, logo.ew, t)}px` : '100%';
  const logoHeight = logo ? `${lerp(logo.sh, logo.eh, t)}px` : 'auto';
  const logoPt = logo ? `${logo.pt}px` : '0px';
  const logoTranslation = logo
    ? `${(logo.vh - lerp(logo.sh, logo.eh, t) - logo.pt) * (1 - t)}px`
    : '0px';

  return (
    <header
      className={[
        'hero-home',
        t > 0.2 ? 'hero-home--controls-hidden hero-home--claim-hidden' : '',
        videoDone ? 'hero-home--video-scroll-completed' : '',
        ready ? 'hero-home--initialized' : '',
      ].join(' ')}
      style={
        {
          '--progress': t,
          '--parallax-progress': parallax,
          '--video-width': videoWidth,
          '--video-height': videoHeight,
          '--logo-width': logoWidth,
          '--logo-height': logoHeight,
          '--logo-pt': logoPt,
          '--logo-translation': logoTranslation,
        } as CSSProperties
      }
    >
      <div className="hero-home__inner" ref={innerRef}>
        <div className="hero-home__reel">
          <div className="video-player video-player--playing">
            <div className="video-player__video mouse-tracker-trigger mouse-tracker-trigger--video">
              <video ref={videoRef} src="/studio/reel/wkhs-reel.webm" loop muted playsInline autoPlay />
            </div>
            <div className="video-player__controls">
              <div className="video-player__controls-start">
                <div className="video-player__caption">WKHS Reel</div>
              </div>
              <div className="video-player__controls-end">
                <div className="video-player__duration">[1:20min]</div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-home__brand-claim">
          <div className="hero-home__claim">
            <p className="hero-home__claim-text">
              <SplitTextShuffle text={studioHome.intro} lines={studioHome.introLines} />
            </p>
          </div>
          <div className="hero-home__brand" ref={brandRef}>
            <span className="hero-home__wordmark">
              <img src="/studio/svg/logo.svg" alt="Workoholics" />
            </span>
          </div>
        </div>
      </div>
      <div className="hero-home__cta">
        <Link className="button button--icon" to="/studio/work">
          <span className="button__inner">
            <span className="button__text">{studioHome.viewProjects}</span>
            <span className="button__icon">
              <img src="/studio/svg/arrow-right.svg" alt="" />
            </span>
          </span>
        </Link>
      </div>
    </header>
  );
}

export function HeroHomeMobile() {
  return (
    <>
      <div className="pre-hero-home-mobile">
        <div className="pre-hero-home-mobile__inner">
          <p className="pre-hero-home-mobile__claim">
            <SplitTextShuffle text={studioHome.intro} />
          </p>
          <div className="pre-hero-home-mobile__brand">
            <img src="/studio/svg/logo.svg" alt="Workoholics" />
          </div>
        </div>
      </div>
      <div className="hero-home-mobile">
        <div className="hero-home-mobile__inner">
          <div className="video-player video-player--playing video-player--rounded">
            <div className="video-player__video">
              <video src="/studio/reel/wkhs-reel.webm" loop muted playsInline autoPlay />
            </div>
            <div className="video-player__controls">
              <div className="video-player__caption">WKHS Reel</div>
              <div className="video-player__duration">[1:20min]</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
