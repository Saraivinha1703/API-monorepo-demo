import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Read } from './Read';
import { Create } from './Create';
import { Home } from './Home';
import { Navbar } from '../Components/Navbar';
import { Update } from './Update';
import { Delete } from './Delete';

export function MainPage() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <BrowserRouter>
        <div className="shadow-md shadow-black/30">
          <Navbar />
        </div>
        <div className="flex h-full items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Read" element={<Read />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/Update" element={<Update />} />
            <Route path="/Delete" element={<Delete />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
