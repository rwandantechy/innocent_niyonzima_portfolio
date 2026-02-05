import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Simple Icons CDN: https://cdn.simpleicons.org/
const logoMap = {
  'C#': 'csharp',
  'Python': 'python',
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'C': 'c',
  'C++': 'cplusplus',
  'PHP': 'php',
  'React': 'react',
  'HTML5': 'html5',
  'CSS3': 'css3',
  'Tailwind': 'tailwindcss',
  'Bootstrap': 'bootstrap',
  'Redux': 'redux',
  'Node.js': 'nodedotjs',
  'ASP.NET Core': 'dotnet',
  'Express': 'express',
  'Laravel': 'laravel',
  'REST APIs': 'swagger',
  'SQL Server': 'microsoftsqlserver',
  'MySQL': 'mysql',
  'PostgreSQL': 'postgresql',
  'MongoDB': 'mongodb',
  'Redis': 'redis',
  'Docker': 'docker',
  'Git': 'git',
  'CI/CD': 'githubactions',
  'VPS': 'linode',
  'NGINX': 'nginx',
  'PM2': 'nodedotjs',
  'Linux': 'linux'
};

const SkillCategory = ({ title, skills, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <motion.div 
      ref={ref}
      className="skill-category"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <div className="skill-category-header">
        <h3>{title}</h3>
      </div>
      <div className="skill-tags">
        {skills.map((skill, idx) => {
          const iconName = logoMap[skill] || skill.toLowerCase();
          const iconUrl = `https://cdn.simpleicons.org/${iconName}/fd961a`;
          
          return (
            <motion.div
              key={idx} 
              className="skill-tag-with-logo"
              whileHover={{ scale: 1.1, y: -4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <img 
                src={iconUrl} 
                alt={skill} 
                className="skill-logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="skill-tag">{skill}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default function SkillsGrid() {
  const skillCategories = [
    {
      title: 'Languages',
      skills: ['C#', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'PHP']
    },
    {
      title: 'Frontend',
      skills: ['React', 'HTML5', 'CSS3', 'Tailwind', 'Bootstrap', 'Redux']
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'ASP.NET Core', 'Express', 'Laravel', 'REST APIs']
    },
    {
      title: 'Databases',
      skills: ['SQL Server', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis']
    },
    {
      title: 'DevOps & Cloud',
      skills: ['Docker', 'Git', 'CI/CD', 'VPS', 'NGINX', 'PM2', 'Linux']
    },
    {
      title: 'Theory & Algorithms',
      skills: ['Automata Theory', 'Data Structures', 'Algorithms', 'OOP', 'Design Patterns']
    }
  ];

  return (
    <div className="skills-grid">
      {skillCategories.map((category, idx) => (
        <SkillCategory key={idx} {...category} index={idx} />
      ))}
    </div>
  );
}
