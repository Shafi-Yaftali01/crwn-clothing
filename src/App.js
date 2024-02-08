import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";



const Shopping = () => {
  return(
    <h1>This is Shopping Page</h1>
  )
}
const App = () => {
  return (
   <Routes>
    <Route path="/" element={<Navigation />} >
    <Route index element={<Home />} />
    <Route path="shop" element={<Shopping />} />
    <Route path="auth" element={<Authentication />} />
     </Route>
   </Routes>
  );
}
export default App;
