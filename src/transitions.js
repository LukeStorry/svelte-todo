import {crossfade, scale} from 'svelte/transition';

export const [sendSlide, receiveSlide] = crossfade({
    duration: d => d * 2,
    fallback: scale
});


