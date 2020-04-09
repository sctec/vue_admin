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
                    citys: [],
                    currentConfirmedCount: []
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
                let citys = [];
                let currentConfirmedCounts = [];
                let api = "http://127.0.0.1:3001/api/city?province=黑龙江省";
                Axios.get(api).then((response) => {
                    let data = response.data.data;
                    console.log(data);
                    for (let item of data) {
                        citys.push((item.cityName));
                        currentConfirmedCounts.push(item.currentConfirmedCount);
                    }
                    this.chartData.citys = citys;
                    this.chartData.currentConfirmedCount = currentConfirmedCounts;
                    console.log(this.chartData.citys);
                    console.log(this.chartData.currentConfirmedCount);
                    this.initEcharts()
                }).catch((error) => {
                    console.log(error);
                });
            },
            initEcharts() {
                this.mycharts = echarts.init(this.$refs.myCharts, 'macarons');
                this.mycharts.setOption({
                    title: {
                        text: '城市疫情图',
                        // left: '16'
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
                    // grid: {
                    //     left: '20',
                    //     right: '20',
                    //     bottom: '30',
                    //     containLabel: true
                    // },
                    xAxis: {
                        type: 'category',
                        name: "城市",
                        axisLabel: {
                            show: true,
                            interval: 0
                        },
                        // boundaryGap: false,
                        data: this.chartData.citys
                    },
                    yAxis: {
                        type: 'value',
                        // boundaryGap: [0, '100%']
                    }
                    ,
                    // dataZoom: [
                    //     {
                    //         type: 'inside',
                    //         start: 0,
                    //         end: 80
                    //     },
                    //     {
                    //         start: 0,
                    //         end: 50,
                    //         handleSize: '80%',
                    //         handleStyle: {
                    //             color: '#fff',
                    //             shadowBlur: 3,
                    //             shadowColor: 'rgba(0, 0, 0, 0.6)',
                    //             shadowOffsetX: 2,
                    //             shadowOffsetY: 2
                    //         },
                    //         bottom: 0
                    //     }
                    // ],
                    series: [
                        {
                            name: '现存确诊',
                            type: 'bar',
                            // areaStyle: {
                            //     color: '#55a8fd',
                            //     opacity: 0.3
                            // },
                            // itemStyle: {
                            //     color: '#55a8fd'
                            // },
                            // lineStyle: {
                            //     color: '#55a8fd'
                            // },
                            // smooth: true,
                            // data: chartData.currentConfirmedCount,
                            data: this.chartData.currentConfirmedCount,
                            // animationDuration: 2800,
                            // animationEasing: 'quadraticOut'
                        }
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
        position: relative;

        .chartBox_d {
            height: 100%;
            box-sizing: border-box;
            padding: 30px 20px 30px 20px;
        }

        .btns {
            position: absolute;
            right: 40px;
            top: 20px;
            z-index: 99;

            .el-button.active {
                color: #3a8ee6;
                background: #ddeeff;
            }
        }
    }
</style>
