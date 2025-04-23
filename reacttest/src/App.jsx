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
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 max-w-5xl space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center shadow-sm py-4">Quản lý danh sách sinh viên</h1>

        {/* Add Student Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Thêm sinh viên</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Họ tên"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="text"
              placeholder="Lớp"
              value={newStudent.className}
              onChange={(e) => setNewStudent({ ...newStudent, className: e.target.value })}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="number"
              placeholder="Tuổi"
              value={newStudent.age}
              onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              onClick={addStudent}
              className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-sm hover:bg-green-700 transition"
            >
              Thêm sinh viên
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg shadow-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg shadow-sm w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Tất cả lớp</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        {/* Student List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-300">
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Họ tên</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Lớp</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Tuổi</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Hành động</th>
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
        </div>

        {/* Edit Modal */}
        {editStudent && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-md flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Sửa thông tin sinh viên</h2>
              <button
                onClick={() => setEditStudent(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={editStudent.name}
                  onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Họ tên"
                />
                <input
                  type="text"
                  value={editStudent.className}
                  onChange={(e) => setEditStudent({ ...editStudent, className: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Lớp"
                />
                <input
                  type="number"
                  value={editStudent.age}
                  onChange={(e) => setEditStudent({ ...editStudent, age: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Tuổi"
                />
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={saveEdit}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition flex-1"
                  >
                    Lưu
                  </button>
                  <button
                    onClick={() => setEditStudent(null)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-700 transition flex-1"
                  >
                    Huỷ
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App