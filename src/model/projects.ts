import mongoose from "mongoose";
import IProject from "../interface/projects.interface";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: [100, 'Project name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Project address is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    }
  },
  status: {
    type: String,
    enum: ['Planning', 'Under Construction', 'Completed', 'On Hold', 'Cancelled'],
    default: 'Planning'
  },
  projectType: {
    type: String,
    enum: ['Residential', 'Commercial', 'Mixed-Use', 'Industrial'],
    required: [true, 'Project type is required']
  },
  estimatedCompletionDate: {
    type: Date
  },
  totalUnits: {
    type: Number,
    min: [0, 'Total units cannot be negative']
  },
  priceRange: {
    min: {
      type: Number,
      min: [0, 'Minimum price cannot be negative']
    },
    max: {
      type: Number,
      min: [0, 'Maximum price cannot be negative']
    }
  },
  images: [{
    url: {
      type: String,
      trim: true
    },
    caption: {
      type: String,
      trim: true,
      maxlength: [200, 'Image caption cannot exceed 200 characters']
    }
  }],
  features: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically updates createdAt and updatedAt
});

const Project = mongoose.model<IProject>('Project', projectSchema);

export default Project