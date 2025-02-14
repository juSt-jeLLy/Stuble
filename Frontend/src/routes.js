import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Research from './pages/Research/Research';
import OptionSignup from './pages/Option/OptionSignup';
import OptionLogin from './pages/Option/OptionLogin';
import LoginFarmer from './pages/Auth/Login/LoginFarmer';
import LoginCompany from './pages/Auth/Login/LoginCompany';
import LoginAdmin from './pages/Auth/Login/LoginAdmin';
import Forget from './pages/Auth/Forgot/Forgot';
import Profile from './pages/Profile/Profiles/Profile';
import SignUpFarmer from './pages/Auth/Signup/SignUpFarmer';
import SignUpCompany from './pages/Auth/Signup/SignUpCompany';
import SignUpAdmin from './pages/Auth/Signup/SignUpAdmin';
import FarmerHome from './pages/Profile/Farmer/FarmerHomePage/FarmerHome';
import CompanyHome from './pages/Profile/Company/ComapanyHomePage/CompanyHome';
import AdminHome from './pages/Profile/Admin/AdminHomePage/AdminHome';
import Service from './pages/Profile/Farmer/Service/Service';
import Auction from './components/Auction/Auction';
import ShowAuction from './pages/Profile/Admin/ShowAuctionDetails/ShowAuction';
import AuctionList from './components/Auction/AuctionList';
import CompleteRequest from './pages/Profile/Admin/FulfillRequest/CompleteRequest';
import ClearReqForm from './pages/Profile/Admin/FulfillRequest/ClearRequest';
import Roomform from './pages/Profile/Admin/Room/Roomform';
import SuccessPage from './pages/Profile/Farmer/Service/SuccessPage';
import Alert from './components/shared/Alert';
import AppContextProvider from './context/AppContextProvider';
import PrivateRoute from './components/PrivateRoute';

const MyRoutes = () => {
  return (
    <Router>
      <AppContextProvider>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/OptionSignup" element={<OptionSignup />} />
          <Route path="/OptionLogin" element={<OptionLogin />} />

          <Route path="/LoginFarmer" element={<LoginFarmer />} />
          <Route path="/LoginCompany" element={<LoginCompany />} />
          <Route path="/LoginAdmin" element={<LoginAdmin />} />

          <Route path="/SignUpFarmer" element={<SignUpFarmer />} />
          <Route path="/SignUpCompany" element={<SignUpCompany />} />
          <Route path="/SignUpAdmin" element={<SignUpAdmin />} />

          <Route
            path="/CompanyHome"
            element={<PrivateRoute component={CompanyHome} role="company" />}
          />
          <Route
            path="/FarmerHome"
            element={<PrivateRoute component={FarmerHome} role="farmer" />}
          />
          <Route
            path="/AdminHome"
            element={<PrivateRoute component={AdminHome} role="admin" />}
          />

          <Route
            path="/CompleteRequest"
            element={<PrivateRoute component={CompleteRequest} role="admin" />}
          />
          <Route
            path="/ClearReqForm"
            element={<PrivateRoute component={ClearReqForm} role="admin" />}
          />

          <Route
            path="/ShowAuction"
            element={<PrivateRoute component={ShowAuction} role="admin" />}
          />

          <Route
            path="/Auction"
            element={<PrivateRoute component={Auction} role="company" />}
          />
          <Route
            path="/AuctionList"
            element={<PrivateRoute component={AuctionList} role="admin" />}
          />
          <Route
            path="/CreateRoom"
            element={<PrivateRoute component={Roomform} role="admin" />}
          />

          <Route path="/Profile" element={<PrivateRoute component={Profile} role="farmer" />} />
          <Route path="/Service" element={<PrivateRoute component={Service} role="farmer" />} />
          <Route path="/SuccessPage" element={<PrivateRoute component={SuccessPage} role="farmer" />} />
          <Route path="/Forget" element={<Forget />} />
          <Route path="/Research" element={<Research />} />
        </Routes>
      </AppContextProvider>
    </Router>
  );
};

export default MyRoutes;
