import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Category } from '../types';
import { motion } from 'motion/react';
import { X, Send, Image as ImageIcon, Type, AlignLeft, Hash } from 'lucide-react';

interface EditorProps {
  user: User;
  onClose: () => void;
}

export function Editor({ user, onClose }: EditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState<Category>('games');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setSubmitting(true);
    try {
      const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      await addDoc(collection(db, 'articles'), {
        title,
        slug,
        content,
        excerpt,
        category,
        imageUrl: imageUrl || null,
        authorName: user.displayName,
        authorUid: user.uid,
        createdAt: serverTimestamp(),
      });
      onClose();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'articles');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl"
    >
      <div className="p-8 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Nowy Artykuł</h2>
          <p className="text-zinc-500 text-sm">Podziel się swoją pasją ze światem.</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Type className="w-3.5 h-3.5" /> Tytuł
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Np. Recenzja Elden Ring: Shadow of the Erdtree"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Hash className="w-3.5 h-3.5" /> Kategoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-3 focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
            >
              <option value="games">Gry</option>
              <option value="movies">Filmy</option>
              <option value="series">Seriale</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <ImageIcon className="w-3.5 h-3.5" /> URL Obrazka (opcjonalnie)
          </label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <AlignLeft className="w-3.5 h-3.5" /> Krótki opis (Excerpt)
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Krótkie podsumowanie widoczne na liście..."
            rows={2}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-3 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <AlignLeft className="w-3.5 h-3.5" /> Treść (Markdown)
          </label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Użyj Markdown do formatowania treści..."
            rows={12}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500 transition-colors font-mono text-sm"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            disabled={submitting}
            type="submit"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-10 py-4 rounded-full transition-all font-bold shadow-lg shadow-emerald-900/20"
          >
            {submitting ? 'Publikowanie...' : (
              <>
                <Send className="w-5 h-5" />
                Opublikuj Artykuł
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
