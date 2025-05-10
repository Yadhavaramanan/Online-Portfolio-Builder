const mongoose = require('mongoose');
const validator = require('validator');

const portfolioSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'User ID is required'],
    index: true
  },
  templateId: { 
    type: String, 
    required: [true, 'Template ID is required'],
    enum: [
      'developer',
      'designer',
      'minimal',
      'classic',
      'modern',
      'elegant',
      'creative',
      'professional'
    ],
    trim: true
  },
  name: { 
    type: String, 
    default: 'My Portfolio',
    trim: true,
    maxlength: [100, 'Portfolio name cannot exceed 100 characters'],
    minlength: [3, 'Portfolio name must be at least 3 characters']
  },
  title: {
    type: String,
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [1000, 'Bio cannot exceed 1000 characters']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[\d\s\-\(\)\+]{10,15}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  skills: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length <= 20;
      },
      message: 'Cannot have more than 20 skills'
    }
  },
  experience: [{
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
      maxlength: [100, 'Position cannot exceed 100 characters']
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
      maxlength: [50, 'Duration cannot exceed 50 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    _id: false
  }],
  education: [{
    institution: {
      type: String,
      required: [true, 'Institution name is required'],
      trim: true,
      maxlength: [100, 'Institution name cannot exceed 100 characters']
    },
    degree: {
      type: String,
      required: [true, 'Degree is required'],
      trim: true,
      maxlength: [100, 'Degree cannot exceed 100 characters']
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
      trim: true,
      maxlength: [20, 'Year cannot exceed 20 characters']
    },
    _id: false
  }],
  projects: [{
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Project title cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Project description cannot exceed 500 characters']
    },
    imageUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return validator.isURL(v, {
            protocols: ['http','https'],
            require_protocol: true
          });
        },
        message: 'Invalid image URL'
      }
    },
    link: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return validator.isURL(v, {
            protocols: ['http','https'],
            require_protocol: true
          });
        },
        message: 'Invalid project link'
      }
    },
    _id: false
  }],
  thumbnail: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return validator.isURL(v, {
          protocols: ['http','https'],
          require_protocol: true
        });
      },
      message: 'Invalid thumbnail URL'
    }
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedUrl: {
    type: String,
    trim: true,
    unique: true,
    sparse: true,
    validate: {
      validator: function(v) {
        if (!v) return true; // Allow empty
        return validator.isURL(v, {
          protocols: ['http','https'],
          require_protocol: true
        });
      },
      message: 'Invalid published URL'
    }
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
portfolioSchema.index({ userId: 1, templateId: 1 });
portfolioSchema.index({ isPublished: 1, publishedUrl: 1 });

// Virtual for formatted date
portfolioSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Pre-save hook to ensure clean data
portfolioSchema.pre('save', function(next) {
  // Trim all string fields
  for (const [key, value] of Object.entries(this._doc)) {
    if (typeof value === 'string') {
      this[key] = value.trim();
    }
  }
  
  // Ensure skills are unique
  if (this.skills && Array.isArray(this.skills)) {
    this.skills = [...new Set(this.skills)];
  }
  
  next();
});

// Static method to find by user
portfolioSchema.statics.findByUser = function(userId) {
  return this.find({ userId }).sort({ updatedAt: -1 });
};

// Instance method to get public view
portfolioSchema.methods.getPublicView = function() {
  const portfolio = this.toObject();
  delete portfolio.userId;
  delete portfolio.__v;
  delete portfolio.createdAt;
  delete portfolio.updatedAt;
  return portfolio;
};

module.exports = mongoose.model('Portfolio', portfolioSchema);