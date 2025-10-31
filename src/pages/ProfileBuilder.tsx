import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface ProfileData {
  fullName: string;
  bio: string;
  goal: string;
  industry: string;
  experience: string;
  instagram: string;
  linkedin: string;
  github: string;
}

export default function ProfileBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<ProfileData>({
    fullName: '',
    bio: '',
    goal: '',
    industry: '',
    experience: '',
    instagram: '',
    linkedin: '',
    github: ''
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      const username = profile.fullName.toLowerCase().replace(/\s+/g, '-') || 'user';
      navigate(`/${username}`);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/');
  };

  const canProceed = () => {
    switch (step) {
      case 1: return profile.fullName.length > 0;
      case 2: return profile.bio.length > 10;
      case 3: return profile.goal.length > 0;
      case 4: return profile.industry.length > 0;
      case 5: return profile.experience.length > 0;
      case 6: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-zinc-950 dark:via-violet-950/20 dark:to-zinc-950 relative overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-400/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-400/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="p-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <button 
              onClick={handleBack}
              className="w-10 h-10 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-violet-200/50 dark:border-violet-800/50 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div 
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i + 1 === step 
                      ? 'w-8 bg-gradient-to-r from-violet-600 to-fuchsia-600' 
                      : i + 1 < step 
                      ? 'w-1.5 bg-violet-400' 
                      : 'w-1.5 bg-zinc-300 dark:bg-zinc-700'
                  }`}
                />
              ))}
            </div>
            <div className="w-10" />
          </div>
        </header>

        <main className="flex-1 px-4 pb-32 pt-8">
          <div className="max-w-2xl mx-auto">
            {step === 1 && (
              <div className="space-y-8 animate-fade-in-up">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-medium mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                    Шаг {step} из {totalSteps}
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight">
                    Как вас<br />зовут?
                  </h1>
                  <p className="text-xl text-zinc-600 dark:text-zinc-400">Полное имя</p>
                </div>
                
                <div className="relative">
                  <Input
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    placeholder="Алексей Иванов"
                    className="h-16 text-2xl border-2 border-violet-200 dark:border-violet-900 focus:border-violet-500 dark:focus:border-violet-400 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl px-6 transition-all"
                    autoFocus
                  />
                  {profile.fullName && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center animate-scale-in">
                        <Icon name="Check" size={16} className="text-white" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-200/50 dark:border-violet-800/50 backdrop-blur-xl">
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center flex-shrink-0">
                      <Icon name="Shield" size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">Безопасность профиля</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Настоящее имя помогает работодателям находить вас и повышает доверие
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-fade-in-up">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-medium mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                    Шаг {step} из {totalSteps}
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight">
                    О себе
                  </h1>
                  <p className="text-xl text-zinc-600 dark:text-zinc-400">Кто вы и чем занимаетесь?</p>
                </div>
                
                <div className="relative">
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Frontend-разработчик с опытом 5+ лет. Создаю веб-приложения на React..."
                    className="min-h-[240px] text-lg border-2 border-violet-200 dark:border-violet-900 focus:border-violet-500 dark:focus:border-violet-400 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-6 resize-none transition-all"
                    autoFocus
                  />
                  <div className="absolute bottom-4 right-4 text-sm text-zinc-400">
                    {profile.bio.length}/500
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-200/50 dark:border-amber-800/50 backdrop-blur-xl">
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                      <Icon name="Sparkles" size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">AI улучшит текст</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Скоро ИИ предложит более профессиональную формулировку
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-fade-in-up">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-medium mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                    Шаг {step} из {totalSteps}
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight">
                    Ваша цель?
                  </h1>
                  <p className="text-xl text-zinc-600 dark:text-zinc-400">Для чего создаёте профиль</p>
                </div>
                
                <div className="grid gap-3">
                  {[
                    { icon: 'Briefcase', label: 'Найти работу', value: 'job', gradient: 'from-blue-500 to-cyan-500' },
                    { icon: 'Users', label: 'Нетворкинг', value: 'network', gradient: 'from-purple-500 to-pink-500' },
                    { icon: 'Rocket', label: 'Показать портфолио', value: 'portfolio', gradient: 'from-orange-500 to-red-500' },
                    { icon: 'Target', label: 'Фриланс проекты', value: 'freelance', gradient: 'from-green-500 to-emerald-500' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setProfile({ ...profile, goal: option.value })}
                      className={`group relative p-5 rounded-2xl text-left flex items-center gap-4 transition-all duration-300 ${
                        profile.goal === option.value 
                          ? 'bg-white dark:bg-zinc-900 shadow-xl shadow-violet-500/20 scale-[1.02]' 
                          : 'bg-white/60 dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-lg'
                      } backdrop-blur-xl border-2 ${
                        profile.goal === option.value 
                          ? 'border-violet-500' 
                          : 'border-violet-200/50 dark:border-violet-900/50'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <Icon name={option.icon} size={24} className="text-white" />
                      </div>
                      <span className="font-semibold text-lg flex-1">{option.label}</span>
                      {profile.goal === option.value && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center animate-scale-in">
                          <Icon name="Check" size={14} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8 animate-fade-in-up">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-medium mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                    Шаг {step} из {totalSteps}
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight">
                    Ваша сфера?
                  </h1>
                  <p className="text-xl text-zinc-600 dark:text-zinc-400">Выберите индустрию</p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { icon: 'Code', label: 'IT', value: 'it', gradient: 'from-violet-500 to-purple-500' },
                    { icon: 'Palette', label: 'Дизайн', value: 'design', gradient: 'from-pink-500 to-rose-500' },
                    { icon: 'TrendingUp', label: 'Маркетинг', value: 'marketing', gradient: 'from-blue-500 to-cyan-500' },
                    { icon: 'Briefcase', label: 'Менеджмент', value: 'management', gradient: 'from-amber-500 to-orange-500' },
                    { icon: 'DollarSign', label: 'Финансы', value: 'finance', gradient: 'from-green-500 to-emerald-500' },
                    { icon: 'Camera', label: 'Контент', value: 'content', gradient: 'from-fuchsia-500 to-pink-500' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setProfile({ ...profile, industry: option.value })}
                      className={`group relative p-5 rounded-2xl text-left flex items-center gap-4 transition-all duration-300 ${
                        profile.industry === option.value 
                          ? 'bg-white dark:bg-zinc-900 shadow-xl shadow-violet-500/20 scale-[1.02]' 
                          : 'bg-white/60 dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-lg'
                      } backdrop-blur-xl border-2 ${
                        profile.industry === option.value 
                          ? 'border-violet-500' 
                          : 'border-violet-200/50 dark:border-violet-900/50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <Icon name={option.icon} size={20} className="text-white" />
                      </div>
                      <span className="font-semibold flex-1">{option.label}</span>
                      {profile.industry === option.value && (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center animate-scale-in">
                          <Icon name="Check" size={12} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-8 animate-fade-in-up">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-medium mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                    Шаг {step} из {totalSteps}
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight">
                    Ваш опыт?
                  </h1>
                  <p className="text-xl text-zinc-600 dark:text-zinc-400">Сколько лет работаете</p>
                </div>
                
                <div className="grid gap-3">
                  {[
                    { icon: 'Sparkle', label: 'Без опыта', sub: 'Начинаю карьеру', value: 'none', gradient: 'from-zinc-500 to-slate-500' },
                    { icon: 'BookOpen', label: '1-2 года', sub: 'Junior уровень', value: 'junior', gradient: 'from-blue-500 to-cyan-500' },
                    { icon: 'Award', label: '3-5 лет', sub: 'Middle уровень', value: 'middle', gradient: 'from-purple-500 to-violet-500' },
                    { icon: 'Trophy', label: '5+ лет', sub: 'Senior уровень', value: 'senior', gradient: 'from-amber-500 to-orange-500' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setProfile({ ...profile, experience: option.value })}
                      className={`group relative p-5 rounded-2xl text-left flex items-center gap-4 transition-all duration-300 ${
                        profile.experience === option.value 
                          ? 'bg-white dark:bg-zinc-900 shadow-xl shadow-violet-500/20 scale-[1.02]' 
                          : 'bg-white/60 dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-lg'
                      } backdrop-blur-xl border-2 ${
                        profile.experience === option.value 
                          ? 'border-violet-500' 
                          : 'border-violet-200/50 dark:border-violet-900/50'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <Icon name={option.icon} size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-lg">{option.label}</div>
                        <div className="text-sm text-zinc-500">{option.sub}</div>
                      </div>
                      {profile.experience === option.value && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center animate-scale-in">
                          <Icon name="Check" size={14} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-8 animate-fade-in-up">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-medium mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                    Финальный шаг
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight">
                    Соцсети
                  </h1>
                  <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-2">Необязательно, но полезно</p>
                  <p className="text-sm text-zinc-500">Видны только заинтересованным</p>
                </div>
                
                <div className="space-y-3">
                  {[
                    { icon: 'Instagram', placeholder: '@username', field: 'instagram', gradient: 'from-pink-500 to-rose-500' },
                    { icon: 'Linkedin', placeholder: 'linkedin.com/in/username', field: 'linkedin', gradient: 'from-blue-600 to-blue-700' },
                    { icon: 'Github', placeholder: 'github.com/username', field: 'github', gradient: 'from-zinc-700 to-zinc-900' }
                  ].map((social) => (
                    <div key={social.field} className="relative group">
                      <div className={`absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-gradient-to-br ${social.gradient} flex items-center justify-center shadow-lg z-10`}>
                        <Icon name={social.icon} size={20} className="text-white" />
                      </div>
                      <Input
                        value={profile[social.field as keyof ProfileData] as string}
                        onChange={(e) => setProfile({ ...profile, [social.field]: e.target.value })}
                        placeholder={social.placeholder}
                        className="h-16 pl-20 text-lg border-2 border-violet-200 dark:border-violet-900 focus:border-violet-500 dark:focus:border-violet-400 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white text-center shadow-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 to-transparent" />
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                      <Icon name="Sparkles" size={36} />
                    </div>
                    <h2 className="text-3xl font-bold mb-3">Почти готово!</h2>
                    <p className="text-white/90 text-lg">
                      Профиль будет доступен по короткой ссылке
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent dark:from-zinc-950 dark:via-zinc-950 dark:to-transparent pointer-events-none">
          <div className="max-w-2xl mx-auto pointer-events-auto">
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`w-full h-16 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                canProceed()
                  ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/50 hover:shadow-xl hover:shadow-violet-500/60 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
              }`}
            >
              {step === totalSteps ? '🚀 Завершить' : 'Продолжить'}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
