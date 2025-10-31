import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface ProfileData {
  fullName: string;
  bio: string;
  goal: string;
  industry: string;
  experience: string;
  email: string;
  phone: string;
  location: string;
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
    email: '',
    phone: '',
    location: ''
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      const username = profile.fullName.toLowerCase().replace(/\s+/g, '-') || 'user';
      localStorage.setItem(`pulse_profile_${username}`, JSON.stringify(profile));
      navigate(`/${username}`);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return profile.fullName.length > 1;
      case 2: return profile.bio.length > 10;
      case 3: return profile.goal.length > 0;
      case 4: return profile.industry.length > 0 && profile.experience.length > 0;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
          >
            <Icon name="ArrowLeft" size={18} />
            <span>Назад</span>
          </button>
          <div className="text-sm text-muted-foreground">
            Шаг {step} из {totalSteps}
          </div>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 pb-32">
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-3">Как вас зовут?</h1>
              <p className="text-muted-foreground text-lg">Это будет отображаться в вашем профиле</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Полное имя</label>
                <Input
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  placeholder="Алексей Иванов"
                  className="h-12 text-base"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="h-12 text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Телефон</label>
                <Input
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+7 900 123-45-67"
                  className="h-12 text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Город</label>
                <Input
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="Москва"
                  className="h-12 text-base"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-3">Расскажите о себе</h1>
              <p className="text-muted-foreground text-lg">Опишите свой опыт и навыки</p>
            </div>
            
            <div>
              <Textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Frontend-разработчик с опытом 5+ лет. Специализируюсь на React, TypeScript и создании масштабируемых веб-приложений..."
                className="min-h-[240px] text-base"
                autoFocus
              />
              <div className="text-sm text-muted-foreground mt-2">
                {profile.bio.length} символов
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-3">Какая ваша цель?</h1>
              <p className="text-muted-foreground text-lg">Для чего создаёте профиль</p>
            </div>
            
            <div className="space-y-3">
              {[
                { icon: 'Briefcase', label: 'Найти работу', value: 'job' },
                { icon: 'Users', label: 'Нетворкинг', value: 'network' },
                { icon: 'Rocket', label: 'Показать портфолио', value: 'portfolio' },
                { icon: 'Target', label: 'Найти фриланс проекты', value: 'freelance' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setProfile({ ...profile, goal: option.value })}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-4 ${
                    profile.goal === option.value 
                      ? 'border-foreground bg-muted' 
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Icon name={option.icon} size={20} />
                  </div>
                  <span className="font-medium">{option.label}</span>
                  {profile.goal === option.value && (
                    <Icon name="Check" size={18} className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-3">Последние детали</h1>
              <p className="text-muted-foreground text-lg">Расскажите о своей сфере и опыте</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Ваша сфера деятельности</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: 'Code', label: 'IT', value: 'it' },
                    { icon: 'Palette', label: 'Дизайн', value: 'design' },
                    { icon: 'TrendingUp', label: 'Маркетинг', value: 'marketing' },
                    { icon: 'Briefcase', label: 'Менеджмент', value: 'management' },
                    { icon: 'DollarSign', label: 'Финансы', value: 'finance' },
                    { icon: 'Camera', label: 'Контент', value: 'content' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setProfile({ ...profile, industry: option.value })}
                      className={`p-4 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
                        profile.industry === option.value 
                          ? 'border-foreground bg-muted' 
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <Icon name={option.icon} size={18} />
                      <span className="font-medium text-sm">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Опыт работы</label>
                <div className="space-y-3">
                  {[
                    { label: 'Без опыта', value: 'none' },
                    { label: '1-2 года', value: 'junior' },
                    { label: '3-5 лет', value: 'middle' },
                    { label: '5+ лет', value: 'senior' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setProfile({ ...profile, experience: option.value })}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        profile.experience === option.value 
                          ? 'border-foreground bg-muted' 
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <span className="font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-6">
        <div className="max-w-3xl mx-auto">
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full h-12 text-base"
          >
            {step === totalSteps ? 'Создать профиль' : 'Продолжить'}
          </Button>
        </div>
      </footer>
    </div>
  );
}
