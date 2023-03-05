import React, { useState } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
function App() {
  const [data, setData] = useState<ServerRespond[]>([]);
  const [showGraph, setShowGraph] = useState(false);

  /**
   * Get new data from server and update the state with the new data
   */
  const getDataFromServer = () => {
    let x = 0;
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        setData([...data, ...serverResponds]);
        setShowGraph(true);
      });
      x++;
      if (x > 1000) {
        clearInterval(interval);
      }
    }, 100);
  };

  /**
   * Render Graph react component with state.data parse as property data
   */
  const renderGraph = () => {
    if (showGraph) {
      return <Graph data={data} />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">Bank & Merge Co Task 2</header>
      <div className="App-content">
        <button
          className="btn btn-primary Stream-button"
          onClick={getDataFromServer}
        >
          Start Streaming Data
        </button>
        <div className="Graph">{renderGraph()}</div>
      </div>
    </div>
  );
}

export default App;
