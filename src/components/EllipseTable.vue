<template>
	<g>
		<ellipse :rx="width/2" :ry="height/2" stroke="black" fill="#a2d2ff" />
		<text alignment-baseline="central" text-anchor="middle">{{label}}</text>
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
  computed: {},
  mounted() {},
};
</script>

<style>
</style>
