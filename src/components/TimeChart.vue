<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  name: "TimeChart",
  mounted() {
    this.renderChart(this.chartData, {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 50,
      });
  },
};
</script>
