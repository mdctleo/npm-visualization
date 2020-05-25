import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as api from './API'
import DownloadChart from "./download-chart/DownloadChart";

function App() {
  return (
    <div className="App">
        <span>Download Count</span>
        <div>
            {/*<DownloadChart data={{start: new Date('2020-04-20'), end: new Date('2020-04-21'), maxDownload: 4, packages: [{name: "express", values: [{date: new Date('2020-04-20'), value: 2}, {date: new Date('2020-04-21'), value: 4}]}, {name: "jquery", values: [{date: new Date('2020-04-20'), value: 1}, {date: new Date('2020-04-21'), value: 2}]}]}}*/}
                           {/*width={960} height={500}*/}
                            {/*margin={{top: 20, right: 80, bottom: 30, left: 50}}/>*/}
            <DownloadChart width={960} height={500} margin={{top: 20, right: 80, bottom: 30, left: 50}}/>
        </div>
    </div>
  );
}

export default App;
