const projectsService = require('../services/projectsService');

// Mock projects data for fallback
const mockProjects = [
  {
    id: 'ibyapa',
    title: 'Ibyapa.com — Driving Exam Platform',
    description: 'Educational platform serving 40,000+ learners in Rwanda. Built with MERN stack, featuring adaptive exam analytics and real-time performance tracking.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    metrics: '40K+ users, 25% pass rate increase',
    link: 'https://ibyapa.com',
    featured: true
  },
  {
    id: 'ai-server',
    title: 'Containerized AI Server',
    description: 'Secure ARM64-based inference platform on Raspberry Pi 5. Docker orchestration with persistent storage, VPN security, and multimodal model deployment.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    tags: ['Docker', 'Raspberry Pi', 'Python', 'AI/ML'],
    metrics: 'Research deployment',
    link: '#',
    featured: true
  },
  {
    id: 'budget-planner',
    title: 'Personal Budget Planner',
    description: 'OOP-based financial management application with transaction classification algorithms and secure data protocols. Built with .NET Core and SQL Server.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    tags: ['C#', '.NET Core', 'SQL Server'],
    metrics: 'Production-ready',
    link: '#',
    featured: false
  }
];

exports.getAll = async (req, res, next) => {
  try {
    let items = await projectsService.getAll();
    // Fallback to mock data if database is empty or unavailable
    if (!items || items.length === 0) {
      items = mockProjects;
    }
    res.json(items);
  } catch (err) {
    // Return mock data on error
    res.json(mockProjects);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const item = await projectsService.getById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const created = await projectsService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};
