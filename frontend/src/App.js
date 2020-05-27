import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import DownloadChart from "./download-chart/DownloadChart"
import Inputs from "./inputs/index"

function App() {
  return (
    <div className="App">
        <span>Download Count</span>
        <div>
            <Inputs/>
            <DownloadChart width={960} height={500} margin={{top: 20, right: 80, bottom: 30, left: 50}}/>
        </div>
    </div>
  );
}

export default App;
