import { Schema, model, Document } from 'mongoose';

interface IEmployee extends Document {
  name: string;
  position: string;
  department: string;
  hireDate: Date;
}

const employeeSchema = new Schema<IEmployee>({
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  hireDate: { type: Date, required: true },
});

const Employee = model<IEmployee>('Employee', employeeSchema);

export default Employee;
