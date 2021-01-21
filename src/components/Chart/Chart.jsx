import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length // = 0
        ? (<Line
            data = {{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: 'rgba(153, 102, 255)',
                    backgroundColor: 'rgba(153, 102, 255, .25)',
                    hoverBackgroundColor: 'rgba(153, 102, 255, .4)',
                    fill: true
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, .25)',
                    hoverBackgroundColor: 'rgba(255, 99, 132, .4)',
                    fill: true
                }]
            }}
            options={{
                legend: {
                    labels: {
                        fontColor: "white",
                        fontSize: 16
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: 'rgba(255,255,255,.72)',
                            fontSize: 12
                        },
                        gridLines: {
                            color: 'rgba(255,255,255,.05)'
                        }
                    }],
                  xAxes: [{
                        ticks: {
                            fontColor: 'rgba(255,255,255,.72)',
                            fontSize: 12
                        },
                        gridLines: {
                            color: ['white', 'rgba(255,255,255,.05)']
                        }
                    }]
                }
            }}
        />) : null
    );

    const barChart = (
        confirmed
        ? (
            <Bar
                data={{
                    labels: [`Infected`, 'Recovered', `Deaths`],
                    datasets: [{
                        label: 'People',
                        borderColor: [
                            'rgba(153, 102, 255)',
                            'rgb(75, 192, 192)',
                            'rgb(255, 99, 132)'
                        ],
                        backgroundColor: [
                            'rgba(153, 102, 255, .25)',
                            'rgb(75, 192, 192, .25)',
                            'rgb(255, 99, 132, .25)'
                        ],
                        hoverBackgroundColor: [
                            'rgba(153, 102, 255, .4)',
                            'rgb(75, 192, 192, .4)',
                            'rgb(255, 99, 132, .4)'
                        ],
                        borderWidth: [
                            2, 2, 2
                        ],
                        data:[confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: 'rgba(255,255,255,.85)',
                                fontSize: 12
                            },
                            gridLines: {
                                color: 'rgba(255,255,255,.05)'
                            }
                        }],
                      xAxes: [{
                            ticks: {
                                fontColor: 'rgba(255,255,255,.85)',
                                fontSize: 12
                            },
                            gridLines: {
                                color: ['white', 'rgba(255,255,255,.05)']
                            }
                        }]
                    },
                    title: { display: true, fontColor: 'white', fontSize: 20, text:`Current state in ${country}` }
                }}
            />
        ) : null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;