import "./App.css";
import Main from "./Main";
import ViewData from "./Edit";
// import DeleteUser from "./DeleteUser";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/details" element={<ViewData></ViewData>}></Route>
        {/* <Route path="/delete" element={<DeleteUser></DeleteUser>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
