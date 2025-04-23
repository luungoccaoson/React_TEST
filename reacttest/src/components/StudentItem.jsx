const StudentItem = ({ student, onDelete, onEdit }) => {
    return (
      <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
        <td className="py-3 px-4 text-gray-800 text-left">{student.name}</td>
        <td className="py-3 px-4 text-gray-800 text-left">{student.className}</td>
        <td className="py-3 px-4 text-gray-800 text-left">{student.age}</td>
        <td className="py-3 px-4 text-left">
          <button
            onClick={() => onEdit(student)}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg shadow-sm hover:bg-blue-700 transition mr-2"
          >
            Sửa
          </button>
          <button
            onClick={() => onDelete(student.id)}
            className="bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm hover:bg-red-700 transition"
          >
            Xoá
          </button>
        </td>
      </tr>
    )
  }
  
  export default StudentItem