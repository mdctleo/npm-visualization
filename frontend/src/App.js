import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import DownloadChart from "./download-chart/index"
import Inputs from "./download-controls/index"
import Tags from "./tags";
import DependencyControls from "./dependency-controls";
import DependencyChart from "./dependency-chart";
import GithubOutlined from "@ant-design/icons/es/icons/GithubOutlined";

function App() {
  return (
    <div className="App">
        <div>
            <a href="https://github.com/mdctleo/npm-visualization" style={{color: "inherit"}}>
                <GithubOutlined />
            </a>
            <h2>Download Graph</h2>
            <p className="intro"> In this visualization,
                we compare the download amount of each package on npm within the specific time range.
                <br/>
                Date range must be within 365 days and be after 2015.
            </p>
            <Inputs/>
            <Tags/>
            <DownloadChart width={960} height={500} margin={{top: 20, right: 80, bottom: 30, left: 50}}/>
            <h2>Dependency graph</h2>
            <p className="intro"> In this visualization, we fetch a package and all its dependencies (including dependencies'
                dependencies).
                <br />
                This helps us to make a more conscious decision when deciding to use a package, the score of
                each package is a score from the npm registry.
            </p>
            <DependencyControls/>
            <DependencyChart width={960} height={600} margin={{top: 20, right: 80, bottom: 30, left: 50}}/>
        </div>
    </div>
  );
}

export default App;
