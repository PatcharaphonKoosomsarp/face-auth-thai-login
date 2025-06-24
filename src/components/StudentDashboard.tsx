
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Clock, LogOut, BookOpen, Calendar, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudentDashboardProps {
  userData: any;
  onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ userData, onLogout }) => {
  const { toast } = useToast();
  const [examRooms] = useState([
    {
      id: 1,
      subjectName: "คณิตศาสตร์ขั้นสูง",
      subjectCode: "MATH301",
      examDate: "2024-06-30",
      examTime: "09:00-12:00",
      room: "ห้อง A201",
      supervisor: "อ.สมชาย ใจดี",
      availableSeats: 15,
      totalSeats: 30
    },
    {
      id: 2,
      subjectName: "ฟิสิกส์ทั่วไป",
      subjectCode: "PHYS101",
      examDate: "2024-07-02",
      examTime: "13:00-16:00",
      room: "ห้อง B105",
      supervisor: "อ.สุดา แสงใส",
      availableSeats: 8,
      totalSeats: 25
    },
    {
      id: 3,
      subjectName: "เคมีอินทรีย์",
      subjectCode: "CHEM205",
      examDate: "2024-07-05",
      examTime: "09:00-11:00",
      room: "ห้อง C301",
      supervisor: "อ.วิชัย มั่นคง",
      availableSeats: 20,
      totalSeats: 40
    }
  ]);

  const handleBookSeat = (examId: number, subjectName: string) => {
    toast({
      title: "จองที่นั่งสำเร็จ!",
      description: `จองที่นั่งสอบวิชา ${subjectName} เรียบร้อยแล้ว`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">แดชบอร์ดนักศึกษา</h1>
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
                ข้อมูลนักศึกษา
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>ชื่อ:</strong> {userData.name}</p>
              <p><strong>อีเมล:</strong> {userData.email}</p>
              <p><strong>ตำแหน่ง:</strong> นักศึกษา</p>
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
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              ห้องสอบที่เปิดให้จองที่นั่ง
            </CardTitle>
            <CardDescription>
              เลือกห้องสอบที่ต้องการจองที่นั่ง
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>วิชา</TableHead>
                  <TableHead>รหัสวิชา</TableHead>
                  <TableHead>วันสอบ</TableHead>
                  <TableHead>เวลา</TableHead>
                  <TableHead>ห้อง</TableHead>
                  <TableHead>ผู้คุมสอบ</TableHead>
                  <TableHead>ที่นั่งเหลือ</TableHead>
                  <TableHead>การจอง</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {examRooms.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell className="font-medium">{exam.subjectName}</TableCell>
                    <TableCell>{exam.subjectCode}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        {exam.examDate}
                      </div>
                    </TableCell>
                    <TableCell>{exam.examTime}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        {exam.room}
                      </div>
                    </TableCell>
                    <TableCell>{exam.supervisor}</TableCell>
                    <TableCell>
                      <span className={`font-semibold ${exam.availableSeats > 10 ? 'text-green-600' : exam.availableSeats > 5 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {exam.availableSeats}/{exam.totalSeats}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleBookSeat(exam.id, exam.subjectName)}
                        disabled={exam.availableSeats === 0}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {exam.availableSeats === 0 ? 'เต็ม' : 'จองที่นั่ง'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
