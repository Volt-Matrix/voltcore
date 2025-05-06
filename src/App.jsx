import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Payroll from "./pages/Payroll";
import EmpPayslips from "./pages/payroll/EmpPayslips";
import MyTeamForm from "./pages/Teams/MyTeamForm";
import TeamPerformanceForm from "./pages/Teams/TeamPerformanceForm";
import TeamRequestsForm from "./pages/Teams/TeamRequestsForm";
import TeamHierarchy from "./pages/Teams/TeamHierarchy";
import Attendance from "./pages/Attendance";
import Layout from "./components/Layout";
import BasicDetails from "./pages/profile/BasicDetails";
import ProfileList from "./pages/profile/ProfileList";
import Experience from "./pages/profile/Experience";
import Contracts from "./pages/profile/Contracts";
import Reporting from "./pages/profile/Reporting";
import AssetDashboard from "./pages/assets/AssetDashboard";
import MyAssets from "./pages/Assets/MyAssets";
import ApplyLeave from "./pages/leaves/ApplyLeave";
import LeaveList from "./pages/leaves/LeaveList";
import LeaveData from "./pages/leaves/LeaveData";
import InboxAnnouncementsForm from "./pages/inbox/InboxAnnouncements";
import InboxMessagesForm from "./pages/inbox/InboxMessage";
import InboxNotificationsForm from "./pages/Inbox/InboxNotifications";
import DocumentsForm from "./pages/profile/DocumentsForm";
import LeaveDashboard from "./pages/leaves/LeaveDashboard"; 
import LeaveManagement from "./pages/LeaveManagement/LeaveManagement";
import OrganizationHierarchy from "./pages/Organization/OrganizationHierarchy";
import AttendanceHistory from "./pages/Attendance/AttendanceHistory";



import CustomTImeSheet from './components/CustomTimesheet/CustomTImeSheet';
import EducationDocuments from './components/Profile/EducationDocuments';
import Experiences from './components/Profile/Experiences';
import BankDetails from './components/Profile/BankDetails';
import Success from './components/Profile/Success';
import OnBoarding from './components/Profile/OnBoarding';
import OnboardingTask from './components/Profile/OnboardingTask';


const ProtectedRoute = ({ children }) => {
  // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isLoggedIn = 'true';
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/home" />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="attendance" element={<Attendance />} />
         
          {/* Profile routes */}
          <Route path="profile/basic-details" element={<BasicDetails />} />
          <Route path="/basic-details" element={<BasicDetails />} />
          <Route path="/education" element={<EducationDocuments />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/bank" element={<BankDetails />} />
          <Route path="/on-board" element={<OnBoarding />} />
          <Route path="/onboard-task" element={<OnboardingTask />} />
          <Route path="/success" element={<Success />} />
          <Route path="profile/profilelist" element={<ProfileList />} />
          {/* <Route path="profile/experience" element={<Experience />} /> */}
          <Route path="profile/contracts" element={<Contracts />} />
          {/* <Route path="profile/documents" element={<DocumentsForm />} /> */}
          <Route path="profile/reporting" element={<Reporting />} />

          <Route path="/assets" element={<MyAssets />} />
          <Route path="/assets/dashboard" element={<AssetDashboard />} />
          

          {/* Leaves */}
          <Route path="leaves/dashboard" element={<LeaveDashboard />} /> 
          <Route path="leaves/apply" element={<ApplyLeave />} />
          <Route path="leaves/data" element={<LeaveData />} />
          <Route path="leaves/list" element={<LeaveList />} />

          {/* LeaveManagement */}
          <Route path="leavemanagement/leavemanagement" element={<LeaveManagement />} /> 

          {/* Organization */}
          <Route path="Organization/OrganizationHierarchy" element={<OrganizationHierarchy />} /> 

          {/* Attendance */}
          <Route path="Attendance/AttendanceHistory" element={<AttendanceHistory />} /> 

          {/* Teams*/}
          <Route path="teams/myteam" element={<MyTeamForm />} />
          <Route path="teams/teamperformance" element={<TeamPerformanceForm />} />
          <Route path="teams/teamrequest" element={<TeamRequestsForm />} />
          <Route path="teams/teamhierarchy" element={<TeamHierarchy />} />

          {/* Inbox */}
          <Route path="inbox/announcements" element={<InboxAnnouncementsForm />} />
          <Route path="inbox/messages" element={<InboxMessagesForm />} />
          <Route path="inbox/notifications" element={<InboxNotificationsForm />} />
          <Route path="attendance/daily" element={<Attendance/>}/>
          {/* Note:Should be changed */}
          <Route path="attendance/myTimeSheet" element={<CustomTImeSheet/>}/>
          
          {/* Payroll */}
          <Route path="payroll/emp/payslips" element={<EmpPayslips />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
