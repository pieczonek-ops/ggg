import React from 'react';
import { Article } from '../types';
import { motion } from 'motion/react';
import { Calendar, User, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured }: ArticleCardProps) {
  const date = article.createdAt?.toDate ? article.createdAt.toDate() : new Date();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`group bg-zinc-900/40 border border-zinc-800/50 rounded-[2rem] overflow-hidden hover:border-emerald-500/50 transition-all duration-500 flex flex-col ${
        featured ? 'md:col-span-2 lg:col-span-2 md:flex-row' : ''
      }`}
    >
      <Link to={`/article/${article.slug}`} className={`relative overflow-hidden ${featured ? 'md:w-1/2 aspect-video md:aspect-auto' : 'aspect-video'}`}>
        <img
          src={article.imageUrl || `https://picsum.photos/seed/${article.slug}/800/600`}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-xl">
            {article.category}
          </span>
        </div>
      </Link>

      <div className={`p-8 flex flex-col justify-between ${featured ? 'md:w-1/2' : ''}`}>
        <div>
          <div className="flex items-center gap-4 text-zinc-500 text-[11px] font-medium uppercase tracking-wider mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {format(date, 'd MMMM yyyy', { locale: pl })}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {article.authorName}
            </span>
          </div>
          <Link to={`/article/${article.slug}`}>
            <h3 className={`font-bold tracking-tight group-hover:text-emerald-400 transition-colors mb-4 ${
              featured ? 'text-3xl md:text-4xl' : 'text-2xl'
            }`}>
              {article.title}
            </h3>
          </Link>
          <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6">
            {article.excerpt || article.content.substring(0, 150) + '...'}
          </p>
        </div>

        <Link to={`/article/${article.slug}`} className="flex items-center text-emerald-500 font-bold text-sm group/btn">
          Czytaj więcej 
          <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
