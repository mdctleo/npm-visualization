import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import DownloadChart from "./download-chart/DownloadChart"
import Inputs from "./inputs/index"
import Tags from "./tags";
import DependencyControls from "./dependency-controls";
import DependencyChart from "./dependency-chart";

function App() {
  return (
    <div className="App">
        <span>Download Count</span>
        <div>
            <Inputs/>
            <Tags/>
            <DownloadChart width={960} height={500} margin={{top: 20, right: 80, bottom: 30, left: 50}}/>
            <span>Dependency graph</span>
            <DependencyControls/>
            <DependencyChart width={960} height={600} margin={{top: 20, right: 80, bottom: 30, left: 50}}/>
        </div>
    </div>
  );
}

export default App;
