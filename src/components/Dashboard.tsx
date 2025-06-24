
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScanFace, User, Clock, LogOut } from 'lucide-react';

interface DashboardProps {
  userData: any;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userData, onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">แดชบอร์ด</h1>
          <Button 
            onClick={onLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            ออกจากระบบ
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                ข้อมูลผู้ใช้
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>ชื่อ:</strong> {userData.name}</p>
              <p><strong>อีเมล:</strong> {userData.email}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                การเข้าสู่ระบบ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>เวลาล่าสุด:</strong> {userData.loginTime}</p>
              <div className="mt-4 flex items-center gap-2 text-green-600">
                <ScanFace className="h-5 w-5" />
                <span className="text-sm">เข้าสู่ระบบด้วยใบหน้า</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>ความปลอดภัย</CardTitle>
            <CardDescription>
              ระบบของเราใช้เทคโนโลยีการจดจำใบหน้าขั้นสูงเพื่อรักษาความปลอดภัยของข้อมูลคุณ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-700">
                <ScanFace className="h-5 w-5" />
                <span className="font-medium">ระบบจดจำใบหน้าทำงานได้ปกติ</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
