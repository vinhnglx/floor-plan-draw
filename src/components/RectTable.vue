<template>
	<g>
		<rect :width="width" :height="height" stroke="black" fill="#a2d2ff" />
		<svg :width="width" :height="height">
			<text x="50%" y="50%" alignment-baseline="central" text-anchor="middle">{{label}}</text>
		</svg>
	</g>

</template>
<script>
export default {
  name: "RectTable",
  props: {
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    label: {
      type: String,
    },
  },
  mounted() {},
};
</script>

<style>
</style>
