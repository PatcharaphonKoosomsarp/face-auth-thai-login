
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScanFace, Shield, Zap } from 'lucide-react';
import FaceRegister from '@/components/FaceRegister';
import FaceLogin from '@/components/FaceLogin';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'register' | 'login' | 'dashboard'>('home');
  const [userData, setUserData] = useState<any>(null);

  const handleLoginSuccess = (data: any) => {
    setUserData(data);
    setCurrentView('dashboard');
  };

  const handleRegisterComplete = () => {
    setCurrentView('home');
  };

  const handleLogout = () => {
    setUserData(null);
    setCurrentView('home');
  };

  if (currentView === 'dashboard' && userData) {
    return <Dashboard userData={userData} onLogout={handleLogout} />;
  }

  if (currentView === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button 
            onClick={() => setCurrentView('home')}
            variant="ghost" 
            className="mb-4"
          >
            ← กลับหน้าหลัก
          </Button>
          <FaceRegister onComplete={handleRegisterComplete} />
        </div>
      </div>
    );
  }

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button 
            onClick={() => setCurrentView('home')}
            variant="ghost" 
            className="mb-4"
          >
            ← กลับหน้าหลัก
          </Button>
          <FaceLogin onSuccess={handleLoginSuccess} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 rounded-full p-6">
              <ScanFace className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            ระบบยืนยันตัวตน
            <span className="block text-blue-600">ด้วยใบหน้า</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            เข้าสู่ระบบได้อย่างรวดเร็วและปลอดภัยด้วยเทคโนโลジีการจดจำใบหน้าขั้นสูง
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>ปลอดภัยสูง</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                ใช้เทคโนโลยี AI ขั้นสูงในการจดจำใบหน้าที่แม่นยำและปลอดภัย
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>รวดเร็ว</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                เข้าสู่ระบบได้ภายในไม่กี่วินาที ไม่ต้องจำรหัสผ่าน
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <ScanFace className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>ใช้งานง่าย</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                อินเทอร์เฟซที่ใช้งานง่าย เพียงแค่มองกล้องก็เข้าสู่ระบบได้
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">เข้าสู่ระบบ</TabsTrigger>
              <TabsTrigger value="register">ลงทะเบียน</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-6">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>เข้าสู่ระบบ</CardTitle>
                  <CardDescription>
                    ใช้ใบหน้าของคุณเพื่อเข้าสู่ระบบ
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setCurrentView('login')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                  >
                    <ScanFace className="mr-2 h-5 w-5" />
                    เริ่มสแกนใบหน้า
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register" className="mt-6">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>ลงทะเบียน</CardTitle>
                  <CardDescription>
                    สร้างบัญชีใหม่ด้วยการสแกนใบหน้า
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setCurrentView('register')}
                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                  >
                    <ScanFace className="mr-2 h-5 w-5" />
                    ลงทะเบียนใหม่
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>ระบบจดจำใบหน้าขั้นสูง | ปลอดภัย รวดเร็ว ใช้งานง่าย</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
