import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { API_BASE_URL } from '../../api';

function AnalyticsPage() {
  const chartRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/job-postings/stats`)
      .then((response) => response.json())
      .then((data) => {
        const jobPostingsByCompany = data.map((job) => ({
          company: job.company,
          count: job.count,
        }));

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3
          .select(chartRef.current)
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3
          .scaleBand()
          .domain(jobPostingsByCompany.map((d) => d.company))
          .range([0, width])
          .padding(0.1);

        const y = d3.scaleLinear().domain([0, d3.max(jobPostingsByCompany, (d) => d.count)]).range([height, 0]);

        svg
          .selectAll('.bar')
          .data(jobPostingsByCompany)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => x(d.company))
          .attr('y', (d) => y(d.count))
          .attr('width', x.bandwidth())
          .attr('height', (d) => height - y(d.count))
          .attr('fill', 'steelblue');

        svg
          .append('g')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(x))
          .selectAll('text')
          .style('text-anchor', 'end')
          .attr('transform', 'rotate(-45)');

        svg.append('g').call(d3.axisLeft(y));

        return () => {
          svg.selectAll('*').remove();
        };
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <div className="chart-container" ref={chartRef}></div>;
}

export default AnalyticsPage;


/**
 * 
 * 
  useEffect(() => {
    async function fetchJobCounts() {
      try {
        const response = await axios.get(`${API_BASE_URL}/job-postings/stats`);
        setJobCountsByCompany(response.data);
      } catch (error) {
        console.error('Error fetching job counts:', error);
      }
    }

    fetchJobCounts();
  }, []);
 */
