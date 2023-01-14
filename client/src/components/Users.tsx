import React from "react";

interface UsersProps {
  id: string;
  email: string;
}

const Users = ({ id, email }: UsersProps) => {
  return (
    <div className="flex flex-row justify-between text-gray-700 text-sm font-bold mt-4 mx-4">
      <div>- Email: {email}</div>
      <div> Id: {id}</div>
    </div>
  );
};

export default Users;
