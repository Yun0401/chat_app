import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

// import App from './App';
import HomePage from './HomePage';
import Doctor from './Doctor';
import Patient from './Patient';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>{/* 換成奇怪的主頁 */}
          <Route path="Doctor" element={<Doctor />}/>
          <Route path="Patient" element={<Patient/>}/>
        {/* 可變成亂碼 */}
      </Routes>
    
    </BrowserRouter>
);
reportWebVitals();

//加密方法、名字、網址名、HomePage、連線問題
