import { ApexOptions } from "apexcharts";

const primary = "#7A70BA";
const secondary = "#48A3D7";


export const MonthlyHistoryChart: ApexOptions = {
    series: [
        {
            name: "Appels",
            data: [100, 50, 25, 50, 30, 50, 70],
        },
        {
            name: "Utilisateurs",
            data: [70, 20, 55, 45, 35, 110, 85],
        },
        {
            name: "Solutions",
            data: [85, 55, 100, 35, 90, 60, 80],
        },
    ],
    chart: {
        type: "bar",
        height: 380,
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "30%",
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
        curve: "smooth",
        lineCap: "butt",
    },
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        floating: false,
        axisTicks: {
            show: false,
        },
        axisBorder: {
            color: "#C4C4C4",
        },
    },
    yaxis: {
        title: {
            text: "",
            style: {
                fontSize: "14px",
                fontFamily: "Roboto, sans-serif",
                fontWeight: 500,
            },
        },
    },
    colors: [primary, "#51bb25", secondary],
    fill: {
        type: "gradient",
        gradient: {
            shade: "light",
            type: "vertical",
            shadeIntensity: 0.1,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100],
        },
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return "$ " + val + " thousands";
            },
        },
    },
    responsive: [
        {
            breakpoint: 576,
            options: {
                chart: {
                    height: 200,
                },
            },
        },
    ],
};