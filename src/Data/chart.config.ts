import ApexOptions from "apexcharts"

export const totalRevenueSeries = [
    {
        name: 'Last Month',
        data: [183, 124, 115, 85, 143, 143, 96],
    },
    {
        name: 'Running Month',
        data: [95, 84, 72, 44, 108, 108, 47],
    },
]

export const TotalRevenueOptions : ApexOptions = {
    charts : {
        type : 'bar',
        toolbar : {
            shaw : false
        }
    },
    colors: ['#475BE8', '#CFC8FF'],
    dataLabels : { enabled: false, },
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: false,
            columnWidth: '55%',
        },
    },
    grid: {
        show: false,
    },
    stroke: {
        colors: ['transparent'],
        width: 4,
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    yaxis: {
        title: {
            text: '$ (thousands)',
        },
    },
    fill: {
        opacity: 1,
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
    },
    tooltip: {
        y: {
            formatter(val: number) {
                return `$ ${val} thousands`;
            },
        },
    }
}