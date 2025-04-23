const StudentItem = ({ student, onDelete, onEdit }) => {
    return (
      <tr className="border-b">
        <td className="py-2 px-4 text-left">{student.name}</td>
        <td className="py-2 px-4 text-left">{student.className}</td>
        <td className="py-2 px-4 text-left">{student.age}</td>
        <td className="py-2 px-4 text-left">
          <button
            onClick={() => onEdit(student)}
            className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
          >
            Sửa
          </button>
          <button
            onClick={() => onDelete(student.id)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Xoá
          </button>
        </td>
      </tr>
    )
  }
  
  export default StudentItem