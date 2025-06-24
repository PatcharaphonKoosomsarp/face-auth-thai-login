
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Clock, LogOut, Plus, BookOpen, Calendar, MapPin, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeacherDashboardProps {
  userData: any;
  onLogout: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ userData, onLogout }) => {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [examRooms, setExamRooms] = useState([
    {
      id: 1,
      subjectName: "คณิตศาสตร์ขั้นสูง",
      subjectCode: "MATH301",
      examDate: "2024-06-30",
      examTime: "09:00-12:00",
      room: "ห้อง A201",
      supervisor: "อ.สมชาย ใจดี",
      supervisorCode: "T001",
      rows: 6,
      columns: 5,
      session: "เช้า"
    }
  ]);

  const [newExam, setNewExam] = useState({
    subjectName: '',
    subjectCode: '',
    examDate: '',
    examTime: '',
    room: '',
    supervisor: '',
    supervisorCode: '',
    rows: '',
    columns: '',
    session: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewExam(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddExam = () => {
    if (Object.values(newExam).every(value => value !== '')) {
      const exam = {
        id: examRooms.length + 1,
        ...newExam,
        rows: parseInt(newExam.rows),
        columns: parseInt(newExam.columns)
      };
      setExamRooms(prev => [...prev, exam]);
      setNewExam({
        subjectName: '',
        subjectCode: '',
        examDate: '',
        examTime: '',
        room: '',
        supervisor: '',
        supervisorCode: '',
        rows: '',
        columns: '',
        session: ''
      });
      setShowAddForm(false);
      toast({
        title: "เพิ่มห้องสอบสำเร็จ!",
        description: "ข้อมูลห้องสอบถูกเพิ่มเรียบร้อยแล้ว",
      });
    } else {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลให้ครบถ้วน",
        variant: "destructive"
      });
    }
  };

  const handleDeleteExam = (id: number) => {
    setExamRooms(prev => prev.filter(exam => exam.id !== id));
    toast({
      title: "ลบห้องสอบสำเร็จ!",
      description: "ข้อมูลห้องสอบถูกลบเรียบร้อยแล้ว",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">แดชบอร์ดอาจารย์</h1>
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
                <User className="h-5 w-5 text-green-600" />
                ข้อมูลอาจารย์
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>ชื่อ:</strong> {userData.name}</p>
              <p><strong>อีเมล:</strong> {userData.email}</p>
              <p><strong>ตำแหน่ง:</strong> อาจารย์</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
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
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  จัดการห้องสอบ
                </CardTitle>
                <CardDescription>
                  เพิ่ม แก้ไข และจัดการข้อมูลห้องสอบ
                </CardDescription>
              </div>
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                เพิ่มห้องสอบ
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showAddForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">เพิ่มห้องสอบใหม่</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subjectName">ชื่อวิชา</Label>
                      <Input
                        id="subjectName"
                        name="subjectName"
                        value={newExam.subjectName}
                        onChange={handleInputChange}
                        placeholder="ชื่อวิชา"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subjectCode">รหัสวิชา</Label>
                      <Input
                        id="subjectCode"
                        name="subjectCode"
                        value={newExam.subjectCode}
                        onChange={handleInputChange}
                        placeholder="รหัสวิชา"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="examDate">วันสอบ</Label>
                      <Input
                        id="examDate"
                        name="examDate"
                        type="date"
                        value={newExam.examDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="examTime">เวลาสอบ</Label>
                      <Input
                        id="examTime"
                        name="examTime"
                        value={newExam.examTime}
                        onChange={handleInputChange}
                        placeholder="เช่น 09:00-12:00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="room">ชื่อห้อง</Label>
                      <Input
                        id="room"
                        name="room"
                        value={newExam.room}
                        onChange={handleInputChange}
                        placeholder="ชื่อห้อง"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supervisor">ชื่อผู้คุมสอบ</Label>
                      <Input
                        id="supervisor"
                        name="supervisor"
                        value={newExam.supervisor}
                        onChange={handleInputChange}
                        placeholder="ชื่อผู้คุมสอบ"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supervisorCode">รหัสผู้คุมสอบ</Label>
                      <Input
                        id="supervisorCode"
                        name="supervisorCode"
                        value={newExam.supervisorCode}
                        onChange={handleInputChange}
                        placeholder="รหัสผู้คุมสอบ"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="session">ตอน</Label>
                      <Input
                        id="session"
                        name="session"
                        value={newExam.session}
                        onChange={handleInputChange}
                        placeholder="เช่น เช้า, บ่าย, เย็น"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rows">จำนวนแถว</Label>
                      <Input
                        id="rows"
                        name="rows"
                        type="number"
                        value={newExam.rows}
                        onChange={handleInputChange}
                        placeholder="จำนวนแถว"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="columns">จำนวนคอลัมน์</Label>
                      <Input
                        id="columns"
                        name="columns"
                        type="number"
                        value={newExam.columns}
                        onChange={handleInputChange}
                        placeholder="จำนวนคอลัมน์"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button onClick={handleAddExam} className="bg-green-600 hover:bg-green-700">
                      บันทึก
                    </Button>
                    <Button onClick={() => setShowAddForm(false)} variant="outline">
                      ยกเลิก
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อวิชา</TableHead>
                  <TableHead>รหัสวิชา</TableHead>
                  <TableHead>วันสอบ</TableHead>
                  <TableHead>เวลา</TableHead>
                  <TableHead>ห้อง</TableHead>
                  <TableHead>ผู้คุมสอบ</TableHead>
                  <TableHead>ที่นั่ง</TableHead>
                  <TableHead>ตอน</TableHead>
                  <TableHead>จัดการ</TableHead>
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
                    <TableCell>
                      <div>
                        <div>{exam.supervisor}</div>
                        <div className="text-sm text-gray-500">({exam.supervisorCode})</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {exam.rows} × {exam.columns} = {exam.rows * exam.columns} ที่นั่ง
                      </span>
                    </TableCell>
                    <TableCell>{exam.session}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteExam(exam.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

export default TeacherDashboard;
