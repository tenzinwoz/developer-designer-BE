import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  headline: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  profileImage: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  social: {
    linkedIn: {
      type: String,
    },
    github: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  education: [
    {
      studyType: {
        type: String,
        required: true,
      },
      fieldOfStudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  experience: [
    {
      company: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Profile = mongoose.model("Profile", ProfileSchema);
