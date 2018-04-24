/* eslint-disable */ 
export function getOptions(currentHourglass = 0) {
  return {
    title: {
        text: `第 ${currentHourglass} 关`,
        x: 'center',
        y: 'center',
        textStyle: {
            color: '#fff',
            fontSize: 14
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    calculable: true,
    series: [
        {
            type: 'gauge',
            name: 'sales',
            radius: '90%',
            min: 0,
            max: 10,
            splitNumber: 4,
            // 仪表盘轴线上分隔线设置
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#fff'
                }
            },
            // 仪表盘轴线设置
            axisLine: {
                lineStyle: {
                    color: [[currentHourglass / 10, '#283c57'], [1, '#fff']],
                    width: 8
                }
            },
            // 刻度样式
            axisTick: {
                show: false,
                lineStyle: {
                    color: '#ccc',
                    splitNumber: 100
                }
            },
            // 刻度标签
            axisLabel: {
                show: false,
                color: '#d3d9de',
                fontSize: 14,
                distance: 20,
                formatter: `{value} K`
            },
            // 仪表盘指针样式
            itemStyle: {
                normal: {
                    color: '#758390'
                }
            },
            // 仪表盘指针
            pointer: {
                show: false,
                length: '60%'
            },
            // 仪表盘详情，用于显示数据
            detail: {
                show: false,
                offsetCenter: [0, '100%'],
                color: '#a8b2bb',
                fontSize: 14
            },
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
            data: [{
                value: currentHourglass
            }]
        }
    ]
  }
}

export default {};