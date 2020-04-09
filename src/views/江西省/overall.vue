<template>
    <div class="slideCharts">
        <div class="chartBox">
            <div ref="myCharts" class="chartBox_d"></div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import resize from '@/mixins/resize'
    import Axios from "axios"
    import {formatDate} from "../../../public/utils";

    require('echarts/theme/macarons');
    export default {
        mixins: [resize],
        data() {
            return {
                mycharts: null,
                chartData: {
                    dateId: [],
                    currentConfirmedCount: [],
                    confirmedIncr: []
                }
            }
        },
        mounted() {
            this.getData();
            // this.$nextTick().then(() => {
            //     this.initEcharts()
            // })
        },
        methods: {
            getData() {
                let dateIds = [];
                let currentConfirmedCounts = [];
                let confirmedIncrs = [];
                let api = "https://file1.dxycdn.com/2020/0223/161/3398299751673072165-135.json";

                Axios.get(api).then((response) => {
                    let data = response.data.data;
                    for (let item of data) {
                        dateIds.push(formatDate(item.dateId));
                        currentConfirmedCounts.push(item.currentConfirmedCount);
                        confirmedIncrs.push(item.confirmedIncr);
                    }
                    this.chartData.dateId = dateIds;
                    this.chartData.currentConfirmedCount = currentConfirmedCounts;
                    this.chartData.confirmedIncr = confirmedIncrs;
                    console.log(this.chartData.dateId);
                    console.log(this.chartData.currentConfirmedCount);
                    console.log(this.chartData.confirmedIncr);
                    this.initEcharts()
                }).catch((error) => {
                    console.log(error);
                });


            },
            initEcharts() {
                this.mycharts = echarts.init(this.$refs.myCharts, 'macarons');
                this.mycharts.setOption({
                    title: {
                        text: '疫情变动图',
                        left: '16'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                background: '#6a7985'
                            }
                        }
                    },
                    legend: {data: ['现存确诊', '新增确诊']},
                    grid: {
                        left: '20',
                        right: '20',
                        bottom: '30',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: this.chartData.dateId
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            boundaryGap: [0, '100%']
                        }
                    ],
                    dataZoom: [
                        {
                            type: 'inside',
                            start: 0,
                            end: 80
                        },
                        {
                            start: 0,
                            end: 50,
                            handleSize: '80%',
                            handleStyle: {
                                color: '#fff',
                                shadowBlur: 3,
                                shadowColor: 'rgba(0, 0, 0, 0.6)',
                                shadowOffsetX: 2,
                                shadowOffsetY: 2
                            },
                            bottom: 0
                        }
                    ],
                    series: [
                        {
                            name: '现存确诊',
                            type: 'line',
                            areaStyle: {
                                color: '#55a8fd',
                                opacity: 0.3
                            },
                            itemStyle: {
                                color: '#55a8fd'
                            },
                            lineStyle: {
                                color: '#55a8fd'
                            },
                            smooth: true,
                            // data: chartData.currentConfirmedCount,
                            data: this.chartData.currentConfirmedCount,
                            animationDuration: 2800,
                            animationEasing: 'quadraticOut'
                        },
                        {
                            name: '新增确诊',
                            type: 'line',
                            areaStyle: {
                                color: 'rgb(40, 183, 163)',
                                opacity: 0.3
                            },
                            itemStyle: {
                                color: 'rgb(40, 183, 163)'
                            },
                            lineStyle: {
                                color: 'rgb(40, 183, 163)'
                            },
                            smooth: true,
                            // data: chartData.currentConfirmedCount,
                            data: this.chartData.confirmedIncr,
                            animationDuration: 2800,
                            animationEasing: 'quadraticOut'
                        },

                    ]
                })
            },
        }
    }
</script>
<style lang="scss" scoped>
    .slideCharts {
        height: calc(100% - 72px);
    }

    .chartBox {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        background: #fff;
        height: 100%;

        .chartBox_d {
            height: 100%;
            box-sizing: border-box;
            padding: 30px 20px 30px 20px;
        }
    }
</style>
