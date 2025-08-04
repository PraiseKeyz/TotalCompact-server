import { Document } from "mongoose";

interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "New" | "In Progress" | "Replied" | "Closed";
  createdAt: Date;
  updatedAt: Date;
}

export default IContact; 