import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import Draggable from 'gsap/Draggable';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import Flip from 'gsap/Flip';
import InertiaPlugin from 'gsap/InertiaPlugin';

gsap.registerPlugin(CustomEase, Draggable, DrawSVGPlugin, Flip, InertiaPlugin);

declare global {
  interface Window {
    gsap: typeof gsap;
    CustomEase: typeof CustomEase;
    Draggable: typeof Draggable;
    DrawSVGPlugin: typeof DrawSVGPlugin;
    Flip: typeof Flip;
    InertiaPlugin: typeof InertiaPlugin;
  }
}

if (typeof window !== 'undefined') {
  window.gsap = gsap;
  window.CustomEase = CustomEase;
  window.Draggable = Draggable;
  window.DrawSVGPlugin = DrawSVGPlugin;
  window.Flip = Flip;
  window.InertiaPlugin = InertiaPlugin;
}

export { gsap };
