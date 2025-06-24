
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import CameraCapture from './CameraCapture';

interface FaceLoginProps {
  onSuccess: (userData: any) => void;
}

const FaceLogin: React.FC<FaceLoginProps> = ({ onSuccess }) => {
  const { toast } = useToast();

  const handleFaceCapture = (imageData: string) => {
    // Simulate face recognition processing
    setTimeout(() => {
      const isRecognized = Math.random() > 0.3; // 70% success rate for demo
      
      if (isRecognized) {
        toast({
          title: "เข้าสู่ระบบสำเร็จ!",
          description: "ยินดีต้อนรับกลับมา",
        });
        
        // Simulate user data with random position for demo
        const position = Math.random() > 0.5 ? 'student' : 'teacher';
        
        onSuccess({
          name: "ผู้ใช้ตัวอย่าง",
          email: "user@example.com",
          position: position,
          loginTime: new Date().toLocaleString('th-TH')
        });
      } else {
        toast({
          title: "ไม่พบข้อมูลใบหน้า",
          description: "กรุณาลองใหม่อีกครั้ง หรือลงทะเบียนก่อน",
          variant: "destructive"
        });
      }
    }, 2000);
  };

  return (
    <CameraCapture
      onCapture={handleFaceCapture}
      title="เข้าสู่ระบบ"
      description="จัดตำแหน่งใบหน้าให้อยู่ในกรอบเพื่อเข้าสู่ระบบ"
    />
  );
};

export default FaceLogin;
