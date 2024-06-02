import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import Header from "../components/Header/header";
import 'chart.js/auto';
import './analytics.css';

const AnalyticsPage = () => {
    const promptsData = {
        labels: ['Chat 1', 'Chat 2', 'Chat 3', 'Chat 4'],
        datasets: [
            {
                label: 'Number of Prompts',
                data: [12, 19, 3, 5],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const responseTimeData = {
        labels: ['Chat 1', 'Chat 2', 'Chat 3', 'Chat 4'],
        datasets: [
            {
                label: 'Average Response Time (s)',
                data: [1.2, 2.3, 1.8, 2.5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <div className="analytics-container" style={{ padding: '20px' }}>
                <h1>Chatbot Performance Analytics</h1>
                <div style={{ width: '50%', margin: '0 auto' }}>
                    <h2>Number of Prompts Given by User</h2>
                    <Bar data={promptsData} />

                    <h2>Average Response Time</h2>
                    <Pie data={responseTimeData} />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
