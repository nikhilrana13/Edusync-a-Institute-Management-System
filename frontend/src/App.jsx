import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ErrorBoundary from './pages/Errorboundary'
import Login from './components/Login'
import Signup from './components/Signup'
import { Toaster } from './components/ui/sonner'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/protectedRoute'
import AddCourse from './components/AddCourse'
import AllCourses from './components/AllCourses'
import AddStudent from './components/AddStudent'
import PaymentHistory from './components/PaymentHistory'
import DashboardHome from './components/dashboardHome'
import CollectFees from './components/CollectFees'
import AllStudents from './components/AllStudents'
import StudentProfile from './components/StudentProfile'
import CourseDetail from './components/CourseDetail'


function App() {


  return (
    <ErrorBoundary>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
           
            <Route path="home" element={<DashboardHome />} />
            <Route path="addcourse" element={<AddCourse />} />
            <Route path="courses" element={<AllCourses />} />
            <Route path="courses/:id" element={<CourseDetail />} />

            {/* students routes */}
            <Route path="addstudent" element={<AddStudent />} />
            <Route path="students" element={<AllStudents />} />
            <Route path="students/:id" element={<StudentProfile />} />
            {/* payment routes */}
            <Route path="collectfees" element={<CollectFees />} />
            <Route path='paymenthistory' element={<PaymentHistory />} />
          </Route>
          {/* Course details */}


        </Routes>
        <Toaster />

      </div>

    </ErrorBoundary>



  )
}

export default App
