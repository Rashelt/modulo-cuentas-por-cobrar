import React from "react"

import ChartistGraph from "react-chartist";

const barchart = () => {
  const data = {
    labels: [2016, 2017, 2018, 2019, 2020],
    series: [[1, 2, 4, 8, 6]]
  };
  
  const options = {
    high: 10,
    low: -10,
    axisX: {
      labelInterpolationFnc(value, index) {
        return index % 2 === 0 ? value : null;
      }
    }
  };

  const type = "Bar";

  return (
    <React.Fragment>
      <ChartistGraph data={data} options={options} type={type} />
    </React.Fragment>
  )
}

export default barchart
