<template>
  <CPicture :src="src" class="img-responsive" />
</template>

<script>
import jpg from '../../../../assets/images/building.jpg';

export default {
  data() {
    return {
      src: jpg,
    };
  },
};
</script>
