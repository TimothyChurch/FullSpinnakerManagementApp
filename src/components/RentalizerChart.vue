<script setup>
import { defineProps, ref } from "vue";
const props = defineProps({ data: Object });

const toMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString("en-US", {
    month: "long",
  });
};

const processData = () => {
  const years = Object.keys(props.data.revenue);
  years.splice(-1);
  let monthsNum = [];
  let revenueData = [];
  let adrData = [];
  let occupancyData = [];

  years.forEach((year) => {
    const months = Object.keys(props.data.revenue[year]);
    monthsNum = [...monthsNum, ...months];
    const tempRevenueData = Object.values(props.data.revenue[year]);
    const tempAdrData = Object.values(props.data.adr[year]);
    const tempOccupancyData = Object.values(props.data.occupancy[year]);
    revenueData = [...revenueData, ...tempRevenueData];
    adrData = [...adrData, ...tempAdrData];
    occupancyData = [...occupancyData, ...tempOccupancyData];
  });
  const labels = monthsNum.map((month) => {
    return toMonthName(month);
  });
  return { labels, revenueData, adrData, occupancyData };
};

const { labels, revenueData, adrData, occupancyData } = processData();

const revenueChartData = ref({
  labels: labels,
  datasets: [
    {
      label: "Revenue",
      data: revenueData,
      fill: false,
      borderColor: "#42A5F5",
      tension: 0.4,
    },
  ],
});
const adrChartData = ref({
  labels: labels,
  datasets: [
    {
      label: "ADR",
      data: adrData,
      fill: false,
      borderColor: "#42A5F5",
      tension: 0.4,
    },
  ],
});
const occupancyChartData = ref({
  labels: labels,
  datasets: [
    {
      label: "Occupancy",
      data: occupancyData,
      fill: false,
      borderColor: "#42A5F5",
      tension: 0.4,
    },
  ],
});

const chartOptions = ref({
  plugins: {
    legend: {
      labels: {
        color: "#495057",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#495057",
      },
      grid: {
        color: "#ebedef",
      },
    },
    y: {
      ticks: {
        color: "#495057",
      },
      grid: {
        color: "#ebedef",
      },
      min: 0,
    },
  },
});
</script>

<template>
  <div>
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8 h-xl">
      <div class="grid">
        <div class="col-12 md:col-12 lg:col-12">
          <Chart
            type="line"
            :data="revenueChartData"
            :options="chartOptions"
            :height="100"
          />
        </div>
        <div class="col-12 md:col-12 lg:col-6">
          <Chart type="line" :data="adrChartData" :options="chartOptions" />
        </div>
        <div class="col-12 md:col-12 lg:col-6">
          <Chart
            type="line"
            :data="occupancyChartData"
            :options="chartOptions"
          />
        </div>
      </div>
    </div>
  </div>
</template>
