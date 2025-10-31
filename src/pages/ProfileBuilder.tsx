import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface ProfileData {
  fullName: string;
  title: string;
  bio: string;
  avatar: string;
  goal: string;
  industry: string;
  experience: string;
  location: string;
  skills: string[];
  instagram: string;
  linkedin: string;
  github: string;
}

export default function ProfileBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<ProfileData>({
    fullName: '',
    title: '',
    bio: '',
    avatar: '',
    goal: '',
    industry: '',
    experience: '',
    location: '',
    skills: [],
    instagram: '',
    linkedin: '',
    github: ''
  });

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      const username = profile.fullName.toLowerCase().replace(/\s+/g, '-');
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
      case 1: return profile.fullName.length > 0;
      case 2: return profile.bio.length > 0;
      case 3: return profile.goal.length > 0;
      case 4: return profile.industry.length > 0;
      case 5: return profile.experience.length > 0;
      case 6: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-2xl">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <Icon name="ArrowLeft" size={24} />
          </button>
          <span className="font-semibold">Pulse</span>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <Icon name="MoreVertical" size={24} />
          </button>
        </div>
        <div className="h-1 bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="flex-1 pt-20 pb-24 px-4">
        <div className="container mx-auto max-w-2xl">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-4">О ВАС</p>
                <h1 className="text-3xl font-bold mb-2">Как вас зовут?</h1>
                <p className="text-muted-foreground mb-6">Укажите ваше полное имя</p>
                
                <Input
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  placeholder="Алексей Иванов"
                  className="text-lg h-14"
                  autoFocus
                />
                <p className="text-sm text-muted-foreground mt-2 text-right">
                  {profile.fullName.length} / 50
                </p>
              </div>

              <Card className="p-6 bg-muted/50 border-border/50">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Shield" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Важность верификации</h3>
                    <p className="text-sm text-muted-foreground">
                      Полное имя помогает работодателям найти вас и создает доверительное общение
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-4">О ВАС</p>
                <h1 className="text-3xl font-bold mb-2">Расскажите о себе</h1>
                <p className="text-muted-foreground mb-6">Кто вы и чем занимаетесь?</p>
                
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Я Frontend-разработчик с опытом 5+ лет. Создаю современные веб-приложения на React и TypeScript..."
                  className="min-h-[200px] text-base resize-none"
                  autoFocus
                />
                <p className="text-sm text-muted-foreground mt-2 text-right">
                  {profile.bio.length} / 500
                </p>
              </div>

              <Card className="p-6 bg-muted/50 border-border/50">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Sparkles" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">AI поможет улучшить</h3>
                    <p className="text-sm text-muted-foreground">
                      После заполнения ИИ-ассистент предложит более профессиональную формулировку
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-4">ДОПОЛНИТЕЛЬНО</p>
                <h1 className="text-3xl font-bold mb-6">Какая ваша цель?</h1>
                
                <div className="space-y-3">
                  {[
                    { icon: 'Briefcase', label: 'Найти работу', value: 'job' },
                    { icon: 'Users', label: 'Нетворкинг', value: 'network' },
                    { icon: 'Rocket', label: 'Показать портфолио', value: 'portfolio' },
                    { icon: 'Target', label: 'Фриланс проекты', value: 'freelance' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setProfile({ ...profile, goal: option.value })}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                        profile.goal === option.value 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <Icon name={option.icon} size={24} />
                      </div>
                      <span className="font-medium text-lg">{option.label}</span>
                      {profile.goal === option.value && (
                        <Icon name="Check" size={20} className="ml-auto text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-4">ДОПОЛНИТЕЛЬНО</p>
                <h1 className="text-3xl font-bold mb-6">Ваша сфера деятельности?</h1>
                
                <div className="space-y-3">
                  {[
                    { icon: 'Code', label: 'IT и разработка', value: 'it' },
                    { icon: 'Palette', label: 'Дизайн', value: 'design' },
                    { icon: 'TrendingUp', label: 'Маркетинг', value: 'marketing' },
                    { icon: 'Briefcase', label: 'Менеджмент', value: 'management' },
                    { icon: 'DollarSign', label: 'Финансы', value: 'finance' },
                    { icon: 'Camera', label: 'Контент', value: 'content' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setProfile({ ...profile, industry: option.value })}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                        profile.industry === option.value 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <Icon name={option.icon} size={24} />
                      </div>
                      <span className="font-medium text-lg">{option.label}</span>
                      {profile.industry === option.value && (
                        <Icon name="Check" size={20} className="ml-auto text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-4">ДОПОЛНИТЕЛЬНО</p>
                <h1 className="text-3xl font-bold mb-6">Ваш опыт работы?</h1>
                
                <div className="space-y-3">
                  {[
                    { icon: 'Star', label: 'Без опыта', value: 'none' },
                    { icon: 'BookOpen', label: '1-2 года', value: 'junior' },
                    { icon: 'Award', label: '3-5 лет', value: 'middle' },
                    { icon: 'Trophy', label: '5+ лет', value: 'senior' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setProfile({ ...profile, experience: option.value })}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                        profile.experience === option.value 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <Icon name={option.icon} size={24} />
                      </div>
                      <span className="font-medium text-lg">{option.label}</span>
                      {profile.experience === option.value && (
                        <Icon name="Check" size={20} className="ml-auto text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-4">СОЦ. СЕТИ (НЕОБЯЗАТЕЛЬНО)</p>
                <h1 className="text-3xl font-bold mb-2">Добавьте соцсети</h1>
                <p className="text-muted-foreground mb-6">
                  Соц. сети видны только тем, с кем у вас возникла взаимная симпатия
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Icon name="Instagram" size={24} />
                    </div>
                    <Input
                      value={profile.instagram}
                      onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                      placeholder="Instagram"
                      className="flex-1 h-12"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Icon name="Linkedin" size={24} />
                    </div>
                    <Input
                      value={profile.linkedin}
                      onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      placeholder="LinkedIn"
                      className="flex-1 h-12"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Icon name="Github" size={24} />
                    </div>
                    <Input
                      value={profile.github}
                      onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                      placeholder="GitHub"
                      className="flex-1 h-12"
                    />
                  </div>
                </div>
              </div>

              <Card className="p-8 text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle2" size={32} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Подтвердить профиль</h2>
                <p className="text-muted-foreground mb-4">
                  Все профили в нашем сообществе подтверждены
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
                  <Icon name="Shield" size={16} />
                  <span>Безопасно и быстро</span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="container mx-auto max-w-2xl">
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full h-14 text-lg rounded-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === totalSteps ? 'Завершить' : 'Продолжить'}
          </Button>
        </div>
      </footer>
    </div>
  );
}
