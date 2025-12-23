# 🚨 Relivo - AI-Powered Disaster Relief Platform

> **A platform where we can assure your donations end up in the right hands** #SaveLives

Relivo is a comprehensive full-stack web application designed to revolutionize disaster relief efforts by connecting individuals and NGOs during emergency situations. Our platform ensures complete transparency, tracks donations in real-time, and leverages AI to predict future disasters, making relief efforts more efficient and trustworthy.

## 🌟 Key Features

- **🔐 Secure Authentication** - Role-based access for users and NGOs
- **📊 Real-time Donation Tracking** - Complete transparency from donation to delivery
- **🗺️ Interactive Maps** - Visual tracking of relief efforts and affected areas
- **🤖 AI-Powered Predictions** - Disaster risk assessment and early warning system
- **💬 Communication Hub** - Direct communication between donors and relief organizations
- **📱 Responsive Design** - Mobile-friendly interface for accessibility
- **🛡️ Anti-Fraud Protection** - Prevents black market activities and scammers

## 🏗️ Project Structure

```
Relivo/
├── relivo-backend/          # Node.js/Express Backend
├── relivo-frontend/         # React Frontend
├── package.json             # Root dependencies
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Betina-Kuriakose/Relivo.git
   cd Relivo
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Setup Backend**
   ```bash
   cd relivo-backend
   npm install
   cp .env.example .env  # Configure your environment variables
   ```

4. **Setup Frontend**
   ```bash
   cd ../relivo-frontend
   npm install
   ```

5. **Start the application**
   ```bash
   # Terminal 1 - Backend
   cd relivo-backend
   npm start

   # Terminal 2 - Frontend
   cd relivo-frontend
   npm start
   ```

## 🔧 Backend Architecture

### Core Technologies
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### API Endpoints

#### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

#### Donations
- `POST /donation/` - Create donation
- `GET /donation/` - Get all donations
- `PATCH /donation/:id` - Update donation status
- `DELETE /donation/:id` - Delete donation

### Database Models

#### User Model
```javascript
{
  email: String (unique),
  password: String (hashed),
  role: Enum ['user', 'ngo'],
  timestamps: true
}
```

#### Donation Model
```javascript
{
  donorName: String,
  type: Enum ['Money', 'Food', 'Clothes'],
  amount: Number,
  status: Enum ['Pending', 'Approved', 'Assigned'],
  timestamps: true
}
```

#### Family Model
```javascript
{
  familyName: String,
  location: String,
  membersCount: Number,
  needs: {
    food: Boolean,
    clothes: Boolean,
    money: Boolean
  },
  status: Enum ['Pending', 'Assisted', 'Resolved'],
  timestamps: true
}
```

## 🎨 Frontend Architecture

### Core Technologies
- **React 19** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Leaflet** - Interactive maps
- **Framer Motion** - Animation library
- **AOS** - Scroll animations

### Key Components

#### Pages
- **Home** - Landing page with statistics and features
- **Donations** - Donation form and management
- **Map** - Interactive disaster tracking map
- **Chatbot** - AI-powered assistance
- **User Dashboard** - User-specific features
- **NGO Dashboard** - NGO management interface

#### Features
- **Real-time Statistics** - Live counters for affected people, donations, funds
- **Interactive Map** - Visual representation of relief efforts
- **Transparency Timeline** - Step-by-step donation tracking
- **Disaster Prediction** - AI-powered risk assessment
- **Responsive Design** - Mobile-first approach

## 🔐 Authentication & Security

- **JWT-based authentication** with role-based access control
- **Password hashing** using bcrypt
- **Protected routes** for sensitive operations
- **Input validation** and sanitization
- **CORS protection** for API security

## 📊 Database Seeding

The project includes seeding scripts to populate the database with test data:

```bash
# Seed donations
cd relivo-backend
node seedDonations.js

# Seed families
node seedFamilies.js
```

## 🧪 Testing

```bash
# Backend testing
cd relivo-backend
npm test

# Frontend testing
cd relivo-frontend
npm test
```

## 🌐 Environment Variables

Create a `.env` file in the backend directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 👥 Authors

- **Betina Kuriakose** - *Initial work* - [Betina-Kuriakose](https://github.com/Betina-Kuriakose)

## 🙏 Acknowledgments

- OpenStreetMap for map tiles
- React community for excellent documentation
- MongoDB for database services
- All contributors and testers

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Made with ❤️ for disaster relief and humanitarian aid**