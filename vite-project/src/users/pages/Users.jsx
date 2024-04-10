import React from "react";
import UserList from "../components/UserList";

const Users = () => {
  const UsersItem = [
    {
      id: "u1",
      name: "Ejiro",
      places: 3,
      image:
        "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU",
    },
  ];
  return <UserList items={UsersItem} />;
};

export default Users;
