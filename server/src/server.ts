import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/authRoutes';
import mealsRoutes from './routes/mealsRoutes';
import { specs, swaggerUi } from './config/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://beyoglu-karshi.com',
  'https://www.beyoglu-karshi.com',
  'https://admin.beyoglu-karshi.com',
  'https://api.beyoglu-karshi.com',
  'https://api.beyoglu-karshi.com/api',
];

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Middleware
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Beyougli Karshi API Documentation'
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/meals', mealsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server ishlayapti' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Yo\'nalish topilmadi' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Server xatosi', error: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishga tushdi`);
  console.log(`📍 API: http://localhost:${PORT}/api`);
  console.log(`📚 Swagger UI: http://localhost:${PORT}/api-docs`);
});

export default app;

