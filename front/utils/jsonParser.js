
export function parseDataToChart(sensorsData){
  let xaxis = [];
  let yaxis = [];
  sensorsData.forEach((value, index) => {
    xaxis[index]= value.createdAt;
    yaxis[index]= value.sensorValue;
  });
  let res = `{
    "xaxis":${JSON.stringify(xaxis)},
    "yaxis":${JSON.stringify(yaxis)}
  }`;
  return JSON.parse(res);
}


