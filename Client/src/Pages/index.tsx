import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Read } from './Read';
import { Create } from './Create';
import { Home } from './Home';
import { Navbar } from '../Components/Navbar';
import { Update } from './Update';
import { Delete } from './Delete';

export function MainPage() {
  return (
    <BrowserRouter>
      <div className="shadow-md shadow-black/30">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Read" element={<Read />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/Update" element={<Update />} />
        <Route path="/Delete" element={<Delete />} />
      </Routes>
    </BrowserRouter>
  );
}
