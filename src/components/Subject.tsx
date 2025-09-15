import React, { useState } from 'react';

// Define the type for a course
type Course ={
  name: string;
  grade: string;
};

const GradeTracker: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseName, setCourseName] = useState<string>('');
  const [courseGrade, setCourseGrade] = useState<string>('');
  const [gpa, setGpa] = useState<string | null>(null);

  const gradePoints: { [key: string]: number } = {
    'A': 4.0,
    'B+': 3.5,
    'B': 3.0,
    'C+': 2.5,
    'C': 2.0,
    'D+': 1.5,
    'D': 1.0,
    'F': 0.0,

  };

  const AddCourse = () => {
    if (courseName && courseGrade) {
      const newCourse: Course = { name: courseName, grade: courseGrade };
      setCourses([...courses, newCourse]);
      setCourseName('');
      setCourseGrade('');
      setGpa(null); // Reset GPA when a new course is added
    }
  };

  const DeleteCourse = (index: number) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
    setGpa(null); // Reset GPA when a course is deleted
  };

  const calculateGpa = () => {
    const validCourses = courses.filter(course => course.grade !== 'W' && gradePoints[course.grade] !== undefined);
    
    if (validCourses.length === 0) {
      setGpa('N/A');
      return;
    }

    const totalGradePoints = validCourses.reduce((sum, course) => {
      // Assuming all courses have 3 credits for simplicity
      const credits = 3; 
      return sum + (gradePoints[course.grade] * credits);
    }, 0);

    const totalCredits = validCourses.length * 3;
    const calculatedGpa = totalGradePoints / totalCredits;
    setGpa(calculatedGpa.toFixed(2));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>บันทึกรายวิชาและเกรด</h1>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="ชื่อวิชา"
          style={{ flex: 2, padding: '8px' }}
        />
        <select
          value={courseGrade}
          onChange={(e) => setCourseGrade(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        >
          <option value="">เลือกเกรด</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C+">C+</option>
          <option value="C">C</option>
          <option value="D+">D+</option>
          <option value="D">D</option>
          <option value="F">F</option>
        
        </select>
        
        <button onClick={AddCourse} style={{ padding: '8px 12px', cursor: 'pointer' }}>
          เพิ่มรายวิชา
        </button>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {courses.map((course, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              border: '1px solid #ddd',
              marginBottom: '10px',
              borderRadius: '5px',
              color: course.grade === 'F' ? 'red' : 'inherit'
            }}
          >
            <span>
              <strong>{course.name}</strong> - เกรด: {course.grade}
            </span>
            <button
              onClick={() => DeleteCourse(index)}
              style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
            >
              ลบ
            </button>
          </li>
        ))}
      </ul>
      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={calculateGpa} style={{ padding: '10px 15px', fontSize: '16px', cursor: 'pointer' }}>
          คำนวณ GPA
        </button>
        {gpa !== null && (
          <h2 style={{ marginTop: '15px' }}>
            GPA ของคุณ: <span style={{ color: gpa === 'N/A' ? 'black' : parseFloat(gpa) < 2.0 ? 'red' : 'green' }}>{gpa}</span>
          </h2>
        )}
      </div>
    </div>
  );
};

export default GradeTracker;