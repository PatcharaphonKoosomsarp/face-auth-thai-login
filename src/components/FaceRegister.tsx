
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import CameraCapture from './CameraCapture';

interface FaceRegisterProps {
  onComplete: () => void;
}

const FaceRegister: React.FC<FaceRegisterProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    faceData: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFaceCapture = (imageData: string) => {
    setFormData(prev => ({
      ...prev,
      faceData: imageData
    }));
    
    setTimeout(() => {
      toast({
        title: "สำเร็จ!",
        description: "ลงทะเบียนใบหน้าเรียบร้อยแล้ว",
      });
      onComplete();
    }, 2000);
  };

  const handleNextStep = () => {
    if (formData.name && formData.email) {
      setStep(2);
    } else {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกชื่อและอีเมลให้ครบถ้วน",
        variant: "destructive"
      });
    }
  };

  if (step === 1) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-600">ลงทะเบียนผู้ใช้ใหม่</CardTitle>
          <CardDescription>กรอกข้อมูลส่วนตัวของคุณ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">ชื่อ-นามสกุล</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="กรอกชื่อ-นามสกุล"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">อีเมล</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="กรอกอีเมล"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          
          <Button 
            onClick={handleNextStep}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            ถัดไป
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <CameraCapture
      onCapture={handleFaceCapture}
      title="ลงทะเบียนใบหน้า"
      description="จัดตำแหน่งใบหน้าให้อยู่ในกรอบและกดสแกน"
    />
  );
};

export default FaceRegister;
