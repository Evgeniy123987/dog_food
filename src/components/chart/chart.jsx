import * as echarts from 'echarts';
import { useEffect } from 'react';
import '../chart/style.css'

export const Charts = ({cards}) => {
    
    useEffect(()=>{
        const chartDom = document.getElementById('main')
        const myChart = echarts.init(chartDom)
        let option = {}
        
        option = {
            tooltip: {},
            xAxis: {
                type: 'category',
                data: cards.sort((a,b) => a.name - b.name).map(e => e.name.slice(0, e.name.indexOf(' ')))
                
            },
            yAxis: {
                name: "dgfsdlkh",
                type: 'value'
            },
            series: [
                {
                    
                    data:cards.sort((a,b) => a.likes.length - b.likes.length).map(e => e.likes.length),
                    type: 'line'
                }
            ]
        };
        
        option && myChart.setOption(option);
    }, [])
    
    
    return (
        <>
            <div className='chart__name'>График популярности товара по количеству лайков</div>
            <div className='chart' id='main'></div>
        </>
    )
}