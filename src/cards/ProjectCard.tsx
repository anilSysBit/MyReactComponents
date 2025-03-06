import React from 'react';
// import { motion } from 'framer-motion';
import { GitHub as Github, OpenInNew as ExternalLink } from '@mui/icons-material';


interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
}) => {
  return (
    <div
      className="card overflow-hidden rounded-xl flex h-full flex-col border-1"
    //   whileHover={{ y: -5 }}
    //   transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden group">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-64 object-cover object-top transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-6 w-full flex justify-between items-center">
            {liveUrl && (
              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white bg-primary-600 dark:bg-primary-500 p-2 rounded-full hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
                aria-label="View live site"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white bg-gray-800 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
                aria-label="View source code"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;