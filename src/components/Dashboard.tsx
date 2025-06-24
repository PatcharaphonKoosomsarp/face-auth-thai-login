
import React from 'react';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';

interface DashboardProps {
  userData: any;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userData, onLogout }) => {
  if (userData.position === 'student') {
    return <StudentDashboard userData={userData} onLogout={onLogout} />;
  } else if (userData.position === 'teacher') {
    return <TeacherDashboard userData={userData} onLogout={onLogout} />;
  }

  // Fallback for old users without position data
  return <StudentDashboard userData={userData} onLogout={onLogout} />;
};

export default Dashboard;
