<template>
	<main>
		<div v-if="isLoading">
			Loading...
		</div>
		<div v-else>
			<svg class="canvas">
				<g v-for="table in tables" :key="`table-${table.id}`" :ref="`table-${table.id}`" :transform="table.transform">
					<component :is="table.component" :width="table.width" :height="table.height" :label="table.label" />
				</g>
				<g v-for="line in lines" :key="`line-${line.id}`">
					<line-space :x="line.x" :y="line.y" :width="line.width" :height="line.height" :shape="line.shape" />
				</g>

			</svg>
			<div class="error-message">{{errorMessage}}</div>
			<div>
				<div v-for="table in tables" :key="`table-${table.id}-coordinates`">
					<div>{{table.label}}: x: {{table.x}} - y: {{table.y}} =
						{{table.transform}}
					</div>
				</div>
			</div>
		</div>

	</main>
</template>
<script>
import RectTable from "./components/RectTable";
import EllipseTable from "./components/EllipseTable";
import LineSpace from "./components/LineSpace";
import Draggable from "gsap/Draggable";
import restaurantData from "./components/restaurantData";

export default {
  components: {
    RectTable,
    EllipseTable,
    LineSpace,
  },
  data() {
    return {
      isLoading: true,
      tables: restaurantData.tables,
      lines: restaurantData.lines,
      errorMessage: "",
    };
  },
  computed: {},
  methods: {
    modifyData() {
      console.log("tables", this.tables)
      this.tables.map((table) => this.addonDataForTable(table));
      this.isLoading = false;
    },
    addonDataForTable(table) {
      const { x, y, shape, width, height } = table;
      if (shape === "square" || shape === "rectangle") {
        table.component = "rect-table";
        table.type = "rectangle";
        table.transform = `translate(${x},${y})`;
        table.x1 = x;
        table.y1 = y;
        table.x2 = x + width;
        table.y2 = y + height;
        return table;
      } else if (shape === "circle" || shape === "ellipse") {
        const cx = x + width / 2;
        const cy = y + height / 2;
        table.component = "ellipse-table";
        table.type = "ellipse";
        table.transform = `translate(${cx},${cy})`;
        table.x1 = x;
        table.y1 = y;
        table.x2 = x + width;
        table.y2 = y + height;
        return table;
      } else {
        table.component = "";
        table.type = "";
        table.transform = `translate(${0},${0})`;
        return table;
      }
    },
    isInRange(n, min, max) {
      return n >= min && n <= max;
    },
    dragTable(self, table, i) {
      const { id, width, height, label } = table;
      Draggable.create(this.$refs[`table-${id}`], {
        cursor: "pointer",
        onDragEnd() {
          const currentX1 = this.x;
          const currentY1 = this.y;
          const currentX2 = this.x + width;
          const currentY2 = this.y + height;
          const isDraggable = self.isDraggablePosition(
            i,
            currentX1,
            currentY1,
            currentX2,
            currentY2,
            label
          );
          if (isDraggable) {
            self.tables[i]["x"] = this.x;
            self.tables[i]["y"] = this.y;
          } else {
            console.warn("can not drag table");
          }
        },
      });
    },
    isDraggablePosition(
      index,
      currentX1,
      currentY1,
      currentX2,
      currentY2,
      currentTable
    ) {
      let restTableList = [...this.tables];
      restTableList.splice(index, 1);
      let isDraggable = true;
      for (let i = 0; i < restTableList.length; i++) {
        const currentRestTable = restTableList[i];
        const { x1, y1, x2, y2, label } = currentRestTable;
        const isX1InRange = this.isInRange(currentX1, x1, y1);
        const isX2InRange = this.isInRange(currentX2, x1, x2);
        const isY1InRange = this.isInRange(currentY1, y1, y2);
        const isY2InRange = this.isInRange(currentY2, y1, y2);
        // console.log(
        //   `${label} isX1InRange ${isX1InRange} isX2InRange ${isX2InRange} isY1InRange ${isY1InRange} isY2InRange ${isY2InRange}`
        // );

        const draggableArr = [
          isX1InRange,
          isX2InRange,
          isY1InRange,
          isY2InRange,
        ];

        const countDraggableItem = draggableArr.filter((value) => {
          return value;
        }).length;

        if (
          countDraggableItem >= 2 &&
          (isX1InRange || isX2InRange) &&
          (isY1InRange || isY2InRange)
        ) {
          // console.log("current index table over", label);
          isDraggable = false;
          this.errorMessage = `Can not drag this table. ${currentTable} is overring table ${label}`;
          break;
        }
      }
      return isDraggable;
    },
  },
  watch: {},
  mounted() {
    this.modifyData();
  },
  updated() {
    this.$nextTick(function () {
      const tables = this.tables;
      for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        this.dragTable(this, table, i);
      }
    })
  }
};
</script>

<style>
.canvas {
  background: #ccc;
  width: 100vw;
  height: 80vh;
}

.error-message {
  color: red;
}
</style>
