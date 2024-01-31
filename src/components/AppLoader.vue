<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<template>
  <div v-if="show" class="loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<style lang="scss" scoped>
$speed-of-animation: 0.9s;
$gap: 6px;
$first-color: white;
$second-color: white;
$third-color: white;
$fourth-color: white;
$fifth-color: white;

.loading {
  --speed-of-animation: #{$speed-of-animation};
  --gap: #{$gap};
  --first-color: #{$first-color};
  --second-color: #{$second-color};
  --third-color: #{$third-color};
  --fourth-color: #{$fourth-color};
  --fifth-color: #{$fifth-color};

  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  gap: $gap;
  height: 50px;

  span {
    width: 4px;
    height: 30px;
    background: var(--first-color);
    animation: scale var(--speed-of-animation) ease-in-out infinite;

    &:nth-child(2) {
      background: var(--second-color);
      animation-delay: -0.8s;
    }

    &:nth-child(3) {
      background: var(--third-color);
      animation-delay: -0.7s;
    }

    &:nth-child(4) {
      background: var(--fourth-color);
      animation-delay: -0.6s;
    }

    &:nth-child(5) {
      background: var(--fifth-color);
      animation-delay: -0.5s;
    }
  }
}

@keyframes scale {
  0%,
  40%,
  100% {
    transform: scaleY(0.05);
  }

  20% {
    transform: scaleY(1);
  }
}
</style>
