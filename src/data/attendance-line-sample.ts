const sampleLineData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Present',
      data: [85, 89, 88, 90, 87, 85, 88],
      borderColor: 'rgba(41,122,255,0.95)',
      backgroundColor: 'rgba(41,122,255,0.12)',
      tension: 0.35,
      fill: true,
      pointRadius: 2
    },
    {
      label: 'Absent',
      data: [15, 11, 12, 10, 13, 15, 12],
      borderColor: 'rgba(230,57,70,0.9)',
      backgroundColor: 'rgba(230,57,70,0.08)',
      tension: 0.35,
      fill: false,
      pointRadius: 2
    }
  ]
};
export default sampleLineData;
