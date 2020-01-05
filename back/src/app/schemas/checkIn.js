import mongoose from 'mongoose';

const CheckInSchema = new mongoose.Schema(
  {
    student: {
      type: Number,
      required: true,
    },
    /* day: {
      type: Date,
      required: true,
    }, */
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('CheckIn', CheckInSchema);
