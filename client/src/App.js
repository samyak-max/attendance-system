import CurrentAttendance from "./components/CurrentAttendance";
import Layout from "./components/Layout"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Layout />}/>
        <Route path="/attendance" element={<CurrentAttendance />}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
