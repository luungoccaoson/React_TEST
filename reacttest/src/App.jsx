import { useState } from 'react'
import './App.css'

function App() {

  const [students] = useState([
    { id: 1, name: 'Lưu Ngọc Cao Sơn', className: 'DHKTPM18ATT', age: 22 },
    { id: 2, name: 'Trần Thị B', className: 'CNTT2', age: 21 },
  ])

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Quản lý danh sách sinh viên</h1>

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
              <td className="py-2 px-4 text-left">{student.age}</td>
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
