import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessagesPerDay, fetchResponseTime } from '../reducers/analyticsSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './analytics.css';
import moment from 'moment';

const Analytics = () => {
  const dispatch = useDispatch();
  const { messagesPerDay, responseTimes, status, error } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchMessagesPerDay());
    dispatch(fetchResponseTime());
  }, [dispatch]);

  const formattedResponseTimes = responseTimes.map((session) => ({
    date: moment(session.date).format('YYYY-MM-DD'),
    responseTime: session.averageResponseTime / 1000, // converting ms to seconds
  }));

  return (
    <div className="analytics-container">
      <h2>Analytics Dashboard</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      {status === 'succeeded' && (
        <>
          <div className="analytics-item">
            <h3>Messages Per Day</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={messagesPerDay}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="analytics-item">
            <h3>Response Time Per Day</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={formattedResponseTimes}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name, props) => [`${value.toFixed(2)} seconds`, "Response Time"]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Line type="monotone" dataKey="responseTime" stroke="#82ca9d" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;