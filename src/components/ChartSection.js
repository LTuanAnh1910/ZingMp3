import React from 'react';
import { memo, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Chart, animator } from 'chart.js/auto';
import _ from 'lodash';

import SongItem from './SongItem';

import bgChart from '../assets/bgChart.jpg';

const ChartSection = () => {
    const [data, setData] = useState(null);
    const { chart, rank } = useSelector((state) => state.app);
    const chartRef = useRef();

    const [tooltip, setTooltip] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    });
    const [tooltipData, setTooltipData] = useState(null);

    const options = {
        reponsive: true,
        pointRadius: 0,
        aspectRadio: 5,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(255,255,255,0.1', drawTicks: false },
                min: chart?.minScore,
                max: chart?.maxScore,
                border: { dash: [3, 4] },
            },
            x: {
                ticks: { color: 'white' },
                grid: { color: 'transparent' },
            },
        },
        plugins: {
            legend: false,
            toolTip: {
                enabled: false,
                external: (ctx) => {
                    const data = [];
                    for (let i = 0; i < 3; i++)
                        data.push({
                            encodeId: Object.keys(chart?.items)[i],
                            data: chart?.items[Object.keys(chart?.items)[i]]
                                ?.filter((item) => +item.hour % 2 === 0)
                                ?.map((item) => item.counter),
                        });
                    const tooltipModel = ctx.tooltip;
                    setTooltipData(
                        data.find((i) => i.data.some((n) => n === +tooltipModel.body[0].lines[0].replace(',', '')))
                            ?.encodeId,
                    );
                    if (tooltipModel.opacity === 0) {
                        if (tooltip.opacity !== 0) setTooltip((prev) => ({ ...prev, opacity: 0 }));
                        return;
                    }
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltipModel.caretX,
                        top: tooltipModel.caretY,
                    };
                    if (!_.isEqual(tooltip, newTooltipData)) setTooltip(newTooltipData);
                },
            },
        },
        hover: {
            mode: 'dataset',
            intersect: false,
        },
    };

    // console.log({ chart, rank });;
    useEffect(() => {
        const labels = chart?.times?.filter((item) => item.hour % 2 === 0)?.map((item) => `${item.hour}:00`);
        const datasets = [];

        if (chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]
                        ?.filter((item) => +item.hour % 2 === 0)
                        ?.map((item) => item.counter), //lay key trong 1 mang

                    borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    tension: 0.2,
                    borderWith: 2,
                    pointBackgroundColor: 'white',
                    pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 4,
                });
            }
            setData({ labels, datasets });
        }
    }, [chart]);

    return (
        <div className="px-[59px] mt-[12px] relative">
            <img src={bgChart} alt="bg-chart" className="w-full object-cover rounded-md max-h-[400px] " />
            <div className="absolute top-0 left-[59px] right-[59px] bottom-0 z-10 bg-[rgba(77,34,104,0.9)] "></div>
            <div className="absolute top-0 left-[59px] right-[59px] bottom-0 z-20 p-5 flex flex-col gap-8">
                <h3 className="text-2xl text-white font-bold">#zingchart</h3>
                <div className="flex gap-4 h-full ">
                    <div className="flex-4 flex flex-col gap-4  ">
                        {rank
                            ?.filter((item, index) => index < 3)
                            ?.map((item, index) => (
                                <SongItem
                                    key={item.encodeId}
                                    thumbnail={item.thumbnail}
                                    title={item.title}
                                    artists={item.artistsNames}
                                    sid={item.encodeId}
                                    order={index + 1}
                                    percent={Math.round((+item.score * 100) / chart?.totalScore)}
                                    style="text-white bg-[hsla(0,0%,100%,.07)] hover:bg-[#945EA7]"
                                />
                            ))}
                    </div>
                    {data && (
                        <div className="flex-7 h-[90%] relative">
                            <Line ref={chartRef} data={data} options={options} />
                            <div
                                className="tooltip"
                                style={{
                                    top: tooltip.top,
                                    left: tooltip.left,
                                    position: 'absolute',
                                    opacity: tooltip.opacity,
                                }}
                            >
                                <SongItem
                                    thumbnail={rank?.find((i) => i.encodeId === tooltipData)?.thumbnail}
                                    title={rank?.find((i) => i.encodeId === tooltipData)?.title}
                                    artists={rank?.find((i) => i.encodeId === tooltipData)?.artistsNames}
                                    sid={rank?.find((i) => i.encodeId === tooltipData)?.encodeId}
                                    style="bg-white"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(ChartSection);
