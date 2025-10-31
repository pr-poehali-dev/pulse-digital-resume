import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ProfileData {
  fullName: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  photo: string;
  skills: string[];
  experience: Array<{
    company: string;
    position: string;
    period: string;
    description: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    link: string;
  }>;
}

const demoProfile: ProfileData = {
  fullName: 'Алексей Морозов',
  title: 'Senior Product Designer',
  bio: 'Создаю цифровые продукты, которые люди любят использовать. 7 лет опыта в дизайне интерфейсов и исследованиях пользователей. Работал с международными стартапами и крупными корпорациями.',
  email: 'aleksey@example.com',
  phone: '+7 900 123-45-67',
  location: 'Москва, Россия',
  photo: '',
  skills: ['Figma', 'Sketch', 'Prototyping', 'User Research', 'Design Systems', 'React', 'TypeScript'],
  experience: [
    {
      company: 'Tech Startup',
      position: 'Lead Product Designer',
      period: '2021 - Настоящее время',
      description: 'Руковожу командой из 5 дизайнеров. Создал дизайн-систему с нуля, которая используется в 12 продуктах. Повысил конверсию на 45% через редизайн онбординга.'
    },
    {
      company: 'Digital Agency',
      position: 'Senior UI/UX Designer',
      period: '2018 - 2021',
      description: 'Разработал более 30 проектов для клиентов из финтеха, e-commerce и EdTech. Внедрил процессы user research в компании.'
    }
  ],
  projects: [
    {
      title: 'Finance App Redesign',
      description: 'Полный редизайн мобильного банковского приложения. Увеличил retention на 60%.',
      link: 'https://behance.net'
    },
    {
      title: 'Design System "Aurora"',
      description: 'Создал масштабируемую дизайн-систему для B2B SaaS продукта с 200+ компонентами.',
      link: 'https://figma.com'
    }
  ]
};

export default function PublicProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (username === 'aleksey') {
      setProfile(demoProfile);
    } else {
      const stored = localStorage.getItem(`pulse_profile_${username}`);
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    }
  }, [username]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="User" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Профиль не найден</h2>
          <p className="text-muted-foreground mb-6">Такого пользователя не существует</p>
          <Button onClick={() => navigate('/')}>На главную</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <Icon name="ArrowLeft" size={20} />
            Главная
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowQR(true)}>
              <Icon name="QrCode" size={16} />
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} />
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Share2" size={16} />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="p-8 md:p-12 mb-8 animate-fade-in">
          <div className="text-center mb-8">
            <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-primary/20">
              <AvatarImage src={profile.photo} />
              <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                {profile.fullName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <h1 className="text-4xl font-bold mb-2">{profile.fullName}</h1>
            <p className="text-xl text-primary mb-4">{profile.title}</p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} />
                {profile.location}
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={16} />
                {profile.email}
              </div>
            </div>
            
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {profile.bio}
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="default" className="bg-primary">
              <Icon name="Mail" size={18} className="mr-2" />
              Написать
            </Button>
            <Button variant="outline">
              <Icon name="Phone" size={18} className="mr-2" />
              Позвонить
            </Button>
            <Button variant="outline">
              <Icon name="Download" size={18} className="mr-2" />
              Скачать PDF
            </Button>
          </div>
        </Card>

        {profile.skills.length > 0 && (
          <Card className="p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Sparkles" size={24} className="text-primary" />
              Навыки
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        )}

        {profile.experience.length > 0 && (
          <Card className="p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Briefcase" size={24} className="text-primary" />
              Опыт работы
            </h2>
            <div className="space-y-8">
              {profile.experience.map((exp, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-primary/20">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
                  <h3 className="text-xl font-semibold mb-1">{exp.position}</h3>
                  <p className="text-primary font-medium mb-2">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-3">{exp.period}</p>
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {profile.projects.length > 0 && (
          <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="FolderOpen" size={24} className="text-primary" />
              Проекты
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {profile.projects.map((project, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                  <Button variant="ghost" size="sm" className="gap-2">
                    Посмотреть
                    <Icon name="ExternalLink" size={14} />
                  </Button>
                </Card>
              ))}
            </div>
          </Card>
        )}
      </div>

      <div className="border-t border-border py-12 mt-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">Создай своё резюме в Pulse</p>
          <Button onClick={() => navigate('/builder')} className="bg-primary">
            Создать профиль бесплатно
            <Icon name="ArrowRight" size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
