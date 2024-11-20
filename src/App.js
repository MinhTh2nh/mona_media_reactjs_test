import CreateOrder from './components/CreateOrder';
import { BrowserView, MobileView } from "react-device-detect";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserView>
        <Router>
          <Routes>
            <Route path="/" element={<CreateOrder />} />
          </Routes>
        </Router>
      </BrowserView>
      <MobileView>
        <h1> Not Rendered on Mobile, Please check via Desktop/PC. </h1>
      </MobileView>
    </div>
  );
}

export default App;
