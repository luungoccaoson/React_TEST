import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import StudentItem from './components/StudentItem'
import './App.css'

function App() {
  // Initialize students from localStorage or use sample data
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students')
    return savedStudents
      ? JSON.parse(savedStudents)
      : [
          { id: uuidv4(), name: 'Lưu Ngọc Cao Sơn', className: 'DHKTPM18ATT', age: 22 },
          { id: uuidv4(), name: 'Trần Thị B', className: 'CNTT2', age: 21 },
        ]
  })

  const [editStudent, setEditStudent] = useState(null)
  const [newStudent, setNewStudent] = useState({ name: '', className: '', age: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('')

  // Save students to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
  }, [students])

  // Handle adding a new student
  const addStudent = () => {
    if (newStudent.name && newStudent.className && newStudent.age) {
      setStudents([...students, { ...newStudent, id: uuidv4(), age: parseInt(newStudent.age) }])
      setNewStudent({ name: '', className: '', age: '' })
    }
  }

  // Handle deleting a student
  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id))
  }

  // Handle starting edit
  const startEdit = (student) => {
    setEditStudent(student)
  }

  // Handle saving edited student
  const saveEdit = () => {
    if (editStudent.name && editStudent.className && editStudent.age) {
      setStudents(students.map((s) => (s.id === editStudent.id ? { ...editStudent, age: parseInt(editStudent.age) } : s)))
      setEditStudent(null)
    }
  }

  // Get unique class names for dropdown
  const classes = [...new Set(students.map((student) => student.className))]

  // Filter students based on search term and selected class
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedClass === '' || student.className === selectedClass)
  )

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Quản lý danh sách sinh viên</h1>

      {/* Add Student Form */}
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Thêm sinh viên</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Họ tên"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            placeholder="Lớp"
            value={newStudent.className}
            onChange={(e) => setNewStudent({ ...newStudent, className: e.target.value })}
            className="border p-2 rounded flex-1"
          />
          <input
            type="number"
            placeholder="Tuổi"
            value={newStudent.age}
            onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
            className="border p-2 rounded w-24"
          />
          <button
            onClick={addStudent}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Thêm sinh viên
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border p-2 rounded w-48"
        >
          <option value="">Tất cả lớp</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>

      {/* Student List */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Họ tên</th>
            <th className="py-2 px-4 text-left">Lớp</th>
            <th className="py-2 px-4 text-left">Tuổi</th>
            <th className="py-2 px-4 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <StudentItem
              key={student.id}
              student={student}
              onDelete={deleteStudent}
              onEdit={startEdit}
            />
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editStudent && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white p-6 rounded max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Sửa thông tin sinh viên</h2>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={editStudent.name}
                onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
                className="border p-2 rounded"
                placeholder="Họ tên"
              />
              <input
                type="text"
                value={editStudent.className}
                onChange={(e) => setEditStudent({ ...editStudent, className: e.target.value })}
                className="border p-2 rounded"
                placeholder="Lớp"
              />
              <input
                type="number"
                value={editStudent.age}
                onChange={(e) => setEditStudent({ ...editStudent, age: e.target.value })}
                className="border p-2 rounded"
                placeholder="Tuổi"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={saveEdit}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Lưu
                </button>
                <button
                  onClick={() => setEditStudent(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Huỷ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App