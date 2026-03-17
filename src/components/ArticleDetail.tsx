import React from 'react';
import { Article } from '../types';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';
import { ArrowLeft, Calendar, User, Share2, Bookmark } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

export function ArticleDetail({ article, onBack }: ArticleDetailProps) {
  const date = article.createdAt?.toDate ? article.createdAt.toDate() : new Date();

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors mb-12 group"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        Wróć do listy
      </button>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-4 py-1.5 bg-emerald-600/10 text-emerald-500 text-xs font-bold uppercase tracking-widest rounded-full border border-emerald-500/20">
            {article.category}
          </span>
          <div className="h-px flex-1 bg-zinc-800"></div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-[1.1]">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-zinc-800">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Autor</p>
                <p className="font-medium">{article.authorName}</p>
              </div>
            </div>
            <div className="h-10 w-px bg-zinc-800 hidden sm:block"></div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Data</p>
              <p className="font-medium">{format(date, 'd MMMM yyyy', { locale: pl })}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl">
        <img
          src={article.imageUrl || `https://picsum.photos/seed/${article.slug}/1200/600`}
          alt={article.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="prose prose-invert prose-emerald max-w-none">
        <div className="markdown-body text-zinc-300 leading-relaxed text-lg space-y-6">
          <Markdown>{article.content}</Markdown>
        </div>
      </div>

      <footer className="mt-20 pt-12 border-t border-zinc-800">
        <div className="bg-zinc-900/50 p-8 rounded-[2rem] border border-zinc-800 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-emerald-600 flex items-center justify-center text-4xl font-bold">
            {article.authorName[0]}
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-2">{article.authorName}</h4>
            <p className="text-zinc-400 text-sm max-w-md">
              Pasjonat technologii i popkultury. Od lat śledzi najnowsze trendy w świecie gier i kina, dzieląc się swoimi spostrzeżeniami z czytelnikami.
            </p>
          </div>
        </div>
      </footer>
    </motion.article>
  );
}
