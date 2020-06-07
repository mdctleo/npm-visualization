import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import DownloadChart from "./download-chart/index"
import Inputs from "./inputs/index"
import Tags from "./tags";
import DependencyControls from "./dependency-controls";
import DependencyChart from "./dependency-chart";
import {Tooltip} from "antd";

function App() {
  return (
    <div className="App">
        <div>
            <h2>Download Graph</h2>
            <p className="intro"> In this visualization,
                we compare the download amount of each package on npm in a specified timeline.
                <br/>
                Date range must be within 365 days and be after 2015.
            </p>
            <Inputs/>
            <Tags/>
            <DownloadChart width={960} height={500} margin={{top: 20, right: 80, bottom: 30, left: 50}}/>
            <h2>Dependency graph</h2>
            <p className="intro"> In this visualization, we visualize a pacakge and all its dependencies (including dependencies'
                dependencies).
                <br />
                This helps users make a more conscious decisions when deciding to use a package, the score of
                each package is a score from npm registry.
            </p>
            <DependencyControls/>
            <DependencyChart width={960} height={600} margin={{top: 20, right: 80, bottom: 30, left: 50}}/>
        </div>
    </div>
  );
}

export default App;
