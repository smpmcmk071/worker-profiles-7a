import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Users, Briefcase, Scale, Home } from 'lucide-react';
import Landing from './pages/Landing';
import WorkerDashboard from './pages/WorkerDashboard';
import TeamBuilder from './pages/TeamBuilder';
import HonestCourt from './pages/HonestCourt';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950">
        <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-purple-400" />
              <span className="text-white font-bold text-xl">Worker Profiles 7A</span>
            </Link>
            
            <div className="flex gap-6">
              <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link to="/workers" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <Users className="w-4 h-4" />
                <span>Workers</span>
              </Link>
              <Link to="/teams" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <Users className="w-4 h-4" />
                <span>Teams</span>
              </Link>
              <Link to="/court" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <Scale className="w-4 h-4" />
                <span>Honest Court</span>
              </Link>
            </div>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/workers" element={<WorkerDashboard />} />
          <Route path="/teams" element={<TeamBuilder />} />
          <Route path="/court" element={<HonestCourt />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}