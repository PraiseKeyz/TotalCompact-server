import { Document } from 'mongoose';

interface ILocation {
  address: string;
  city: string;
  state: string;
  zipCode?: string;
}

interface IPriceRange {
  min?: number;
  max?: number;
}

interface IImage {
  url?: string;
  caption?: string;
}

interface IProject extends Document {
  name: string;
  description: string;
  location: ILocation;
  status: 'Planning' | 'Under Construction' | 'Completed' | 'On Hold' | 'Cancelled';
  projectType: 'Residential' | 'Commercial' | 'Mixed-Use' | 'Industrial';
  estimatedCompletionDate?: Date;
  totalUnits?: number;
  priceRange?: IPriceRange;
  images?: IImage[];
  features?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export default IProject;