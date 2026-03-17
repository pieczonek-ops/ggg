import React from 'react';
import { Github, Twitter, Instagram, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-zinc-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-xl tracking-tighter">CINEGAME</span>
            </div>
            <p className="text-zinc-500 max-w-sm leading-relaxed">
              Twoje źródło rzetelnych informacji ze świata rozrywki. 
              Gry, filmy i seriale w nowoczesnym wydaniu. 
              Dołącz do naszej społeczności i bądź na bieżąco.
            </p>
          </div>

          <div>
            <h5 className="text-zinc-200 font-bold mb-6 uppercase tracking-widest text-xs">Kategorie</h5>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Wszystkie</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Gry Wideo</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Kino</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Seriale TV</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-zinc-200 font-bold mb-6 uppercase tracking-widest text-xs">Kontakt</h5>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                kontakt@cinegame.pl
              </li>
              <li className="flex gap-4 pt-2">
                <Twitter className="w-5 h-5 hover:text-emerald-500 cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 hover:text-emerald-500 cursor-pointer transition-colors" />
                <Github className="w-5 h-5 hover:text-emerald-500 cursor-pointer transition-colors" />
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-xs font-medium uppercase tracking-widest">
          <p>© 2026 CineGame Hub. Wszystkie prawa zastrzeżone.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-zinc-400 transition-colors">Polityka Prywatności</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Regulamin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
