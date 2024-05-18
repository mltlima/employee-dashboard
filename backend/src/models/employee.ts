import { Schema, model, Document } from 'mongoose';
import { isValid, parseISO } from 'date-fns';

interface IEmployee extends Document {
  name: string;
  position: string;
  department: string;
  hireDate: Date;
}

const employeeSchema = new Schema<IEmployee>({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  position: { type: String, required: [true, 'Position is required'], trim: true },
  department: { type: String, required: [true, 'Department is required'], trim: true },
  hireDate: {
    type: Date,
    required: [true, 'Hire Date is required'],
    validate: {
      validator: (value: Date) => isValid(value),
      message: 'Hire Date must be a valid date',
    },
  },
});

const Employee = model<IEmployee>('Employee', employeeSchema);

export default Employee;
