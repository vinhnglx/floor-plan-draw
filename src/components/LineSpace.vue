<template>
	<line :x1="x" :y1="y" :x2="x2" :y2="y2" :stroke-width="strokeWidth" stroke="black" />
</template>
<script>
export default {
  name: "LineSpace",
  data() {
    return {
      x2: 0,
      y2: 0,
      strokeWidth: 0,
    };
  },
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
    shape: {
      type: String,
    },
  },
  computed: {
    x1() {
      return this.x;
    },
    y1() {
      return this.y;
    },
  },
  methods: {
    getCoordinate() {
      if (this.shape === "horizontal") {
        this.x2 = this.x + this.width;
        this.y2 = this.y;
        this.strokeWidth = this.height;
      } else {
        this.x2 = this.x;
        this.y2 = this.y + this.height;
        this.strokeWidth = this.width;
      }
    },
  },
  mounted() {
    this.getCoordinate();
  },
};
</script>