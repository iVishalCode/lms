import { useEffect, useState } from "react";
import { getALlStudent } from "../api/student.api";
import { StudentType } from "@vishaldevsx/lms-common";
import { Link } from "react-router-dom";

const StudentTable = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getALlStudent();
        setStudents(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center py-4">
        Error: {error instanceof Error ? error.message : String(error)}
      </div>
    );

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">All Students</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {students.map((student: StudentType) => (
          <Link
            key={student.rollNumber}
            to={`/students/${student.rollNumber}`}
            className="w-1/4 p-2" // if using flex-wrap for grid
          >
            <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition cursor-pointer">
              <h3 className="text-xl font-semibold mb-2">{student.name}</h3>
              <p className="text-sm text-gray-600">Grade: {student.grade}</p>
              <p className="text-sm text-gray-600">Gender: {student.gender}</p>
              <p className="text-sm text-gray-600">
                Father: {student.fatherName}
              </p>
              <p className="text-sm text-gray-600">
                Mobile: {student.mobileNumber}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StudentTable;
