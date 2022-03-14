import './App.css';
import Tree from "./Tree";
import { data } from "./data";

function App() {
  return (
    <div>
      <Tree data={data} />
    </div>
  );
}

export default App;
