
export function parseDataToChart(sensorsData){
  console.log(sensorsData)
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
  console.log(res);
  return JSON.parse(res);
}


