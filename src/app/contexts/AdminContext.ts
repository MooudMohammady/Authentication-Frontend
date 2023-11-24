import { createContext } from "react";

const AdminContext = createContext<{
  userId?: string;
}>({});

export default AdminContext;
