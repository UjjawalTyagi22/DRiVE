import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    ArrowLeft,
    BookOpen,
    Award,
    Clock
} from 'lucide-react';
import { modules } from '../data/modules';
import { useAuth } from '../contexts/AuthContext';
import Certificate from './Certificate';

const ModuleDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, updateModuleProgress, markModuleAsAccessed } = useAuth();
    const [module, setModule] = useState(null);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [showCertificate, setShowCertificate] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        const foundModule = modules.find(m => m.id === parseInt(id));
        if (foundModule) {
            setModule(foundModule);
            // Mark module as accessed for dashbaord "Recent activity" and "Continue Learning"
            if (markModuleAsAccessed) {
                markModuleAsAccessed(foundModule.id, foundModule.title);
            }
        } else {
            navigate('/modules');
        }
    }, [id, navigate, markModuleAsAccessed]);

    if (!module) return null;

    const currentLesson = module.lessons[currentLessonIndex];
    const progress = Math.round(((currentLessonIndex + (completedLessons.includes(currentLessonIndex) ? 1 : 0)) / module.lessons.length) * 100);

    const handleNext = async () => {
        // 1. Optimistic UI update - move to next lesson or show certificate immediately
        const isLastLesson = currentLessonIndex === module.lessons.length - 1;

        if (!completedLessons.includes(currentLessonIndex)) {
            setCompletedLessons(prev => [...prev, currentLessonIndex]);
        }

        if (isLastLesson) {
            setShowCertificate(true);
            window.scrollTo(0, 0);
        } else {
            setCurrentLessonIndex(prev => prev + 1);
            window.scrollTo(0, 0);
        }

        // 2. Background sync with backend - does not block navigation
        if (updateModuleProgress && module) {
            setIsSyncing(true);
            try {
                await updateModuleProgress(
                    module.id,
                    module.title,
                    module.category || 'Natural Disasters',
                    currentLesson.title,
                    true
                );
            } catch (error) {
                console.error('Failed to sync lesson progress:', error);
            } finally {
                setIsSyncing(false);
            }
        }
    };

    const handleBack = () => {
        if (currentLessonIndex > 0) {
            setCurrentLessonIndex(currentLessonIndex - 1);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Module Header */}
            <div className={`bg-gradient-to-r ${module.color} text-white pt-8 pb-16`}>
                <div className="max-w-7xl mx-auto px-6">
                    <Link to="/modules" className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Explorer</span>
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {module.level}
                                </span>
                                <span className="flex items-center space-x-1 text-white/80 text-xs font-bold uppercase">
                                    <Clock className="w-4 h-4" />
                                    <span>{module.duration}</span>
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                                {module.title}
                            </h1>
                            <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
                                {module.description}
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 text-center min-w-[200px]">
                            <div className="text-4xl font-black mb-1">{progress}%</div>
                            <div className="text-sm font-bold uppercase tracking-widest text-white/80">Completed</div>
                            <div className="mt-4 w-full bg-white/20 rounded-full h-2">
                                <div
                                    className="bg-white h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 -mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                                <BookOpen className="w-5 h-5 mr-3 text-blue-600" />
                                Curriculum
                            </h3>
                            <div className="space-y-3">
                                {module.lessons.map((lesson, index) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setCurrentLessonIndex(index)}
                                        className={`w-full flex items-center p-4 rounded-2xl transition-all duration-200 text-left ${currentLessonIndex === index
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                            : 'hover:bg-gray-50 text-gray-700'
                                            }`}
                                    >
                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center mr-4 shrink-0 ${currentLessonIndex === index
                                            ? 'bg-white/20'
                                            : completedLessons.includes(index)
                                                ? 'bg-emerald-100 text-emerald-600'
                                                : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {completedLessons.includes(index) ? (
                                                <CheckCircle className="w-5 h-5" />
                                            ) : (
                                                <span className="text-xs font-bold">{index + 1}</span>
                                            )}
                                        </div>
                                        <div>
                                            <div className={`text-sm font-bold ${currentLessonIndex === index ? 'text-white' : 'text-gray-900'}`}>
                                                {lesson.title}
                                            </div>
                                            <div className={`text-[10px] font-medium uppercase tracking-tight ${currentLessonIndex === index ? 'text-white/60' : 'text-gray-400'}`}>
                                                {index === currentLessonIndex ? 'Current Lesson' : 'Learning Step'}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20">
                            <Award className="w-12 h-12 mb-4 text-indigo-200" />
                            <h3 className="text-xl font-bold mb-2">Earn Your Certificate</h3>
                            <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                                Complete all lessons in this module to earn a verified certificate in Disaster Preparedness.
                            </p>
                            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-indigo-300">
                                <CheckCircle className="w-4 h-4" />
                                <span>ISO 22301 Certified</span>
                            </div>
                        </div>
                    </div>

                    {/* Current Lesson View */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
                            <div className="p-8 md:p-12">
                                <div className="mb-10">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2 text-blue-600 font-bold text-sm uppercase tracking-widest">
                                            <span className="w-8 h-px bg-blue-600"></span>
                                            <span>Lesson {currentLessonIndex + 1}</span>
                                        </div>
                                        {isSyncing && (
                                            <div className="flex items-center space-x-2 text-gray-400 animate-pulse">
                                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                                <span className="text-[10px] font-black uppercase tracking-tighter">Syncing...</span>
                                            </div>
                                        )}
                                    </div>
                                    <h2 className="text-3xl font-black text-gray-900 mb-6">
                                        {currentLesson.title}
                                    </h2>
                                </div>

                                <div className="space-y-10">
                                    {currentLesson.content.map((item, idx) => (
                                        <div key={idx} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            {item.type === 'text' && (
                                                <p className="text-xl text-gray-700 leading-relaxed">
                                                    {item.text}
                                                </p>
                                            )}

                                            {item.type === 'list' && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {item.items.map((listItem, lIdx) => (
                                                        <div key={lIdx} className="flex items-start p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 hover:bg-white transition-all">
                                                            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mr-4 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                                <CheckCircle className="w-5 h-5" />
                                                            </div>
                                                            <span className="text-gray-800 font-bold">{listItem}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {item.type === 'image' && (
                                                <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                                                    <img
                                                        src={item.url}
                                                        alt={item.caption}
                                                        className="w-full h-auto"
                                                    />
                                                    {item.caption && (
                                                        <div className="bg-gray-900/5 backdrop-blur-md p-4 text-center text-sm font-bold text-gray-600 border-t border-gray-100">
                                                            {item.caption}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Navigation Buttons */}
                                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                                    <button
                                        onClick={handleBack}
                                        disabled={currentLessonIndex === 0}
                                        className={`flex items-center space-x-2 px-8 py-4 rounded-2xl font-bold transition-all ${currentLessonIndex === 0
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : 'text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                        <span>Previous Lesson</span>
                                    </button>

                                    <button
                                        onClick={handleNext}
                                        className={`flex items-center space-x-2 px-10 py-4 rounded-2xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] ${currentLessonIndex === module.lessons.length - 1 && completedLessons.includes(currentLessonIndex)
                                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                                            : 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700'
                                            }`}
                                    >
                                        {currentLessonIndex === module.lessons.length - 1 ? (
                                            <>
                                                <Award className="w-5 h-5" />
                                                <span>Finish Module</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Next Lesson</span>
                                                <ChevronRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Certificate Modal */}
            {showCertificate && (
                <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
                    <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative">
                        <button
                            onClick={() => setShowCertificate(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 z-10 p-2 hover:bg-gray-100 rounded-full transition-all"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <div className="py-12 px-6">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl mb-4 animate-bounce">
                                    <Award className="w-10 h-10" />
                                </div>
                                <h2 className="text-4xl font-black text-gray-900 mb-2">Congratulations!</h2>
                                <p className="text-gray-600 font-medium text-lg">You've successfully mastered {module.title}</p>
                            </div>

                            <Certificate
                                userName={`${user?.firstName || ''} ${user?.lastName || 'Learner'}`}
                                moduleTitle={module.title}
                                date={new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                certificateId={`SAFE-${new Date().getFullYear()}-${module.id.toString().padStart(3, '0')}-${(user?.id || 'GUEST').split('-')[0].toUpperCase()}`}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModuleDetails;
