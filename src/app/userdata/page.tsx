"use client"
import { useEffect, useState } from "react";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; 
import { Loader } from "lucide-react";



const Users = () => {
  const [users, setUsers] = useState<DocumentData[] | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => doc.data());
      console.log(userList);
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users? users.map((user, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-md bg-black"
          >
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.number}</p>
          </div>
        )) : <Loader/>}
      </div>
    </div>
  );
};

export default Users;
