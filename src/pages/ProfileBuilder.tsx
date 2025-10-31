import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
  link: string;
}

interface ProfileData {
  fullName: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  photo: string;
  skills: string[];
  experience: Experience[];
  projects: Project[];
}

export default function ProfileBuilder() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData>({
    fullName: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    photo: '',
    skills: [],
    experience: [],
    projects: []
  });

  const [newSkill, setNewSkill] = useState('');
  
  const addSkill = () => {
    if (newSkill.trim() && profile.skills.length < 20) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setProfile({ ...profile, skills: profile.skills.filter((_, i) => i !== index) });
  };

  const addExperience = () => {
    setProfile({
      ...profile,
      experience: [...profile.experience, { company: '', position: '', period: '', description: '' }]
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...profile.experience];
    updated[index] = { ...updated[index], [field]: value };
    setProfile({ ...profile, experience: updated });
  };

  const removeExperience = (index: number) => {
    setProfile({ ...profile, experience: profile.experience.filter((_, i) => i !== index) });
  };

  const addProject = () => {
    setProfile({
      ...profile,
      projects: [...profile.projects, { title: '', description: '', link: '' }]
    });
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = [...profile.projects];
    updated[index] = { ...updated[index], [field]: value };
    setProfile({ ...profile, projects: updated });
  };

  const removeProject = (index: number) => {
    setProfile({ ...profile, projects: profile.projects.filter((_, i) => i !== index) });
  };

  const handleSave = () => {
    if (!profile.fullName || !profile.bio) {
      alert('Заполните имя и описание');
      return;
    }
    const username = profile.fullName.toLowerCase().replace(/\s+/g, '-');
    localStorage.setItem(`pulse_profile_${username}`, JSON.stringify(profile));
    navigate(`/${username}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Главная
          </Button>
          <Button onClick={handleSave} disabled={!profile.fullName || !profile.bio}>
            Сохранить и просмотреть
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Основная информация</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Полное имя *</label>
                  <Input
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    placeholder="Алексей Иванов"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Должность</label>
                  <Input
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    placeholder="Senior Product Designer"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">О себе *</label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Расскажите о своем опыте и навыках..."
                    rows={4}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Контакты</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="alex@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Телефон</label>
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+7 900 123-45-67"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Город</label>
                  <Input
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    placeholder="Москва"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Навыки</h2>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="React, Figma, Python..."
                  />
                  <Button onClick={addSkill} size="sm">
                    <Icon name="Plus" size={18} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="gap-1">
                      {skill}
                      <button onClick={() => removeSkill(i)}>
                        <Icon name="X" size={14} />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Опыт работы</h2>
                <Button onClick={addExperience} size="sm" variant="outline">
                  <Icon name="Plus" size={18} className="mr-1" />
                  Добавить
                </Button>
              </div>
              <div className="space-y-6">
                {profile.experience.map((exp, i) => (
                  <div key={i} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium">Опыт {i + 1}</span>
                      <button onClick={() => removeExperience(i)}>
                        <Icon name="Trash2" size={16} className="text-muted-foreground" />
                      </button>
                    </div>
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(i, 'position', e.target.value)}
                      placeholder="Должность"
                    />
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(i, 'company', e.target.value)}
                      placeholder="Компания"
                    />
                    <Input
                      value={exp.period}
                      onChange={(e) => updateExperience(i, 'period', e.target.value)}
                      placeholder="2020 - 2023"
                    />
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(i, 'description', e.target.value)}
                      placeholder="Описание обязанностей..."
                      rows={3}
                    />
                  </div>
                ))}
                {profile.experience.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="Briefcase" size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Добавьте опыт работы</p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Проекты</h2>
                <Button onClick={addProject} size="sm" variant="outline">
                  <Icon name="Plus" size={18} className="mr-1" />
                  Добавить
                </Button>
              </div>
              <div className="space-y-6">
                {profile.projects.map((proj, i) => (
                  <div key={i} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium">Проект {i + 1}</span>
                      <button onClick={() => removeProject(i)}>
                        <Icon name="Trash2" size={16} className="text-muted-foreground" />
                      </button>
                    </div>
                    <Input
                      value={proj.title}
                      onChange={(e) => updateProject(i, 'title', e.target.value)}
                      placeholder="Название проекта"
                    />
                    <Textarea
                      value={proj.description}
                      onChange={(e) => updateProject(i, 'description', e.target.value)}
                      placeholder="Описание проекта..."
                      rows={3}
                    />
                    <Input
                      value={proj.link}
                      onChange={(e) => updateProject(i, 'link', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                ))}
                {profile.projects.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="FolderOpen" size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Добавьте портфолио</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
