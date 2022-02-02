<template>
  <CPicture
    :sources="sources"
    :src="src"
    alt="Sky view from the middle of a C shaped building."
    width="825"
    height="550"
    loading="lazy"
  />
</template>

<script>
import jpg from '@/assets/images/building.jpg';
import webp from '@/assets/images/building.webp';
import jpg2x from '@/assets/images/building@2x.jpg';
import webp2x from '@/assets/images/building@2x.webp';

export default {
  data() {
    return {
      src: jpg,
      sources: [
        {
          srcset: `${webp2x} 2x, ${webp}`,
          type: 'image/webp',
        },
        {
          srcset: `${jpg2x} 2x, ${jpg}`,
          type: 'image/jpeg',
        },
      ],
    };
  },
};
</script>
