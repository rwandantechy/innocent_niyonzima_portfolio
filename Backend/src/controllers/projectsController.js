const projectsService = require('../services/projectsService');

// Mock projects data for fallback
const mockProjects = [
  {
    id: 'ibyapa',
    title: 'Ibyapa.com — Driving Exam Platform',
    description: 'Created to support high exam-prep demand without service instability, this platform serves 72,000+ learners with backend flows designed for reliable sessions, payments, and continuous access.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    metrics: '72K+ users, production reliability ownership',
    link: 'https://ibyapa.com',
    featured: true
  },
  {
    id: 'ai-server',
    title: 'Containerized AI Server',
    description: 'Designed for repeatable model deployment on constrained hardware, with containerized services, secure remote access, and predictable runtime behavior under limited resources.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    tags: ['Docker', 'Raspberry Pi', 'Python', 'AI/ML'],
    metrics: 'Research deployment',
    link: '#',
    featured: true
  },
  {
    id: 'budget-planner',
    title: 'Personal Budget Planner',
    description: 'Built to reduce manual tracking errors by enforcing consistent transaction rules and dependable data handling in everyday financial workflows.',
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
