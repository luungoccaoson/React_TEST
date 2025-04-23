import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

function App() {

  const [students, setStudents] = useState([
    { id: uuidv4(), name: 'Lưu Ngọc Cao Sơn', className: 'DHKTPM18ATT', age: 22 },
    { id: uuidv4(), name: 'Trần Thị B', className: 'CNTT2', age: 21 },
  ])

  const [newStudent, setNewStudent] = useState({ name: '', className: '', age: '' })

  // Handle adding a new student
  const addStudent = () => {
    if (newStudent.name && newStudent.className && newStudent.age) {
      setStudents([...students, { ...newStudent, id: uuidv4(), age: parseInt(newStudent.age) }])
      setNewStudent({ name: '', className: '', age: '' })
    }
  }

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
          {students.map((student) => (
            <tr key={student.id} className="border-b">
              <td className="py-2 px-4 text-left">{student.name}</td>
              <td className="py-2 px-4 text-left">{student.className}</td>
              <td className="py-2 px-4 text-left ">{student.age}</td>
              <td className="py-2 px-4 text-left">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  disabled
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
