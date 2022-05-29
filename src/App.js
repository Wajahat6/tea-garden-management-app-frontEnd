import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./components/home";
import Profile from "./components/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup />}/>
        <Route path="/profile" element={<Profile />}/>
        { /*
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
  <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
