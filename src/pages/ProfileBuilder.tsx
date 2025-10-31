import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

interface Education {
  school: string;
  degree: string;
  period: string;
}

interface Certificate {
  name: string;
  issuer: string;
  year: string;
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
  education: Education[];
  certificates: Certificate[];
  languages: string[];
  hobbies: string[];
  achievements: string[];
  linkedin: string;
  github: string;
  twitter: string;
  website: string;
  theme: 'light' | 'dark' | 'purple';
}

export default function ProfileBuilder() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'experience' | 'additional' | 'social'>('basic');
  const [showPreview, setShowPreview] = useState(false);
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
    projects: [],
    education: [],
    certificates: [],
    languages: [],
    hobbies: [],
    achievements: [],
    linkedin: '',
    github: '',
    twitter: '',
    website: '',
    theme: 'light'
  });

  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newHobby, setNewHobby] = useState('');
  const [newAchievement, setNewAchievement] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setProfile({ ...profile, skills: profile.skills.filter((_, i) => i !== index) });
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setProfile({ ...profile, languages: [...profile.languages, newLanguage.trim()] });
      setNewLanguage('');
    }
  };

  const removeLanguage = (index: number) => {
    setProfile({ ...profile, languages: profile.languages.filter((_, i) => i !== index) });
  };

  const addHobby = () => {
    if (newHobby.trim()) {
      setProfile({ ...profile, hobbies: [...profile.hobbies, newHobby.trim()] });
      setNewHobby('');
    }
  };

  const removeHobby = (index: number) => {
    setProfile({ ...profile, hobbies: profile.hobbies.filter((_, i) => i !== index) });
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setProfile({ ...profile, achievements: [...profile.achievements, newAchievement.trim()] });
      setNewAchievement('');
    }
  };

  const removeAchievement = (index: number) => {
    setProfile({ ...profile, achievements: profile.achievements.filter((_, i) => i !== index) });
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

  const addEducation = () => {
    setProfile({
      ...profile,
      education: [...profile.education, { school: '', degree: '', period: '' }]
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...profile.education];
    updated[index] = { ...updated[index], [field]: value };
    setProfile({ ...profile, education: updated });
  };

  const removeEducation = (index: number) => {
    setProfile({ ...profile, education: profile.education.filter((_, i) => i !== index) });
  };

  const addCertificate = () => {
    setProfile({
      ...profile,
      certificates: [...profile.certificates, { name: '', issuer: '', year: '' }]
    });
  };

  const updateCertificate = (index: number, field: keyof Certificate, value: string) => {
    const updated = [...profile.certificates];
    updated[index] = { ...updated[index], [field]: value };
    setProfile({ ...profile, certificates: updated });
  };

  const removeCertificate = (index: number) => {
    setProfile({ ...profile, certificates: profile.certificates.filter((_, i) => i !== index) });
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

  const copyLink = () => {
    const username = profile.fullName.toLowerCase().replace(/\s+/g, '-');
    const link = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(link);
    alert('Ссылка скопирована!');
  };

  const tabs = [
    { id: 'basic', label: 'Основное', icon: 'User' },
    { id: 'experience', label: 'Опыт', icon: 'Briefcase' },
    { id: 'additional', label: 'Дополнительно', icon: 'Award' },
    { id: 'social', label: 'Настройки', icon: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Главная
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
              <Icon name={showPreview ? 'Edit' : 'Eye'} size={18} className="mr-2" />
              {showPreview ? 'Редактор' : 'Превью'}
            </Button>
            <Button variant="outline" onClick={copyLink} disabled={!profile.fullName}>
              <Icon name="Link" size={18} className="mr-2" />
              Копировать ссылку
            </Button>
            <Button onClick={handleSave} disabled={!profile.fullName || !profile.bio}>
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!showPreview ? (
          <>
            <div className="mb-6">
              <div className="flex gap-2 border-b border-border overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={tab.icon} size={18} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {activeTab === 'basic' && (
                <>
                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">Фото профиля</h2>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={profile.photo} />
                        <AvatarFallback className="text-2xl">
                          {profile.fullName ? profile.fullName.split(' ').map(n => n[0]).join('') : '?'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                        <Button onClick={() => fileInputRef.current?.click()} variant="outline" size="sm">
                          <Icon name="Upload" size={16} className="mr-2" />
                          Загрузить фото
                        </Button>
                        {profile.photo && (
                          <Button 
                            onClick={() => setProfile({ ...profile, photo: '' })} 
                            variant="ghost" 
                            size="sm"
                            className="ml-2"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>

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
                </>
              )}

              {activeTab === 'experience' && (
                <>
                  <Card className="p-6 lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">Опыт работы</h2>
                      <Button onClick={addExperience} size="sm" variant="outline">
                        <Icon name="Plus" size={18} className="mr-1" />
                        Добавить
                      </Button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {profile.experience.map((exp, i) => (
                        <div key={i} className="p-4 border border-border rounded-lg space-y-3">
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-medium">Опыт {i + 1}</span>
                            <button onClick={() => removeExperience(i)}>
                              <Icon name="Trash2" size={16} className="text-muted-foreground hover:text-destructive" />
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
                        <div className="col-span-2 text-center py-12 text-muted-foreground">
                          <Icon name="Briefcase" size={48} className="mx-auto mb-3 opacity-50" />
                          <p>Добавьте опыт работы</p>
                        </div>
                      )}
                    </div>
                  </Card>

                  <Card className="p-6 lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">Проекты / Портфолио</h2>
                      <Button onClick={addProject} size="sm" variant="outline">
                        <Icon name="Plus" size={18} className="mr-1" />
                        Добавить
                      </Button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {profile.projects.map((proj, i) => (
                        <div key={i} className="p-4 border border-border rounded-lg space-y-3">
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-medium">Проект {i + 1}</span>
                            <button onClick={() => removeProject(i)}>
                              <Icon name="Trash2" size={16} className="text-muted-foreground hover:text-destructive" />
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
                        <div className="col-span-2 text-center py-12 text-muted-foreground">
                          <Icon name="FolderOpen" size={48} className="mx-auto mb-3 opacity-50" />
                          <p>Добавьте проекты из портфолио</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </>
              )}

              {activeTab === 'additional' && (
                <>
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <Icon name="GraduationCap" size={20} />
                        Образование
                      </h2>
                      <Button onClick={addEducation} size="sm" variant="outline">
                        <Icon name="Plus" size={18} />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {profile.education.map((edu, i) => (
                        <div key={i} className="p-4 border border-border rounded-lg space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Образование {i + 1}</span>
                            <button onClick={() => removeEducation(i)}>
                              <Icon name="X" size={14} className="text-muted-foreground" />
                            </button>
                          </div>
                          <Input
                            value={edu.school}
                            onChange={(e) => updateEducation(i, 'school', e.target.value)}
                            placeholder="Университет"
                          />
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(i, 'degree', e.target.value)}
                            placeholder="Степень / Специальность"
                          />
                          <Input
                            value={edu.period}
                            onChange={(e) => updateEducation(i, 'period', e.target.value)}
                            placeholder="2015 - 2019"
                          />
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <Icon name="Award" size={20} />
                        Сертификаты
                      </h2>
                      <Button onClick={addCertificate} size="sm" variant="outline">
                        <Icon name="Plus" size={18} />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {profile.certificates.map((cert, i) => (
                        <div key={i} className="p-4 border border-border rounded-lg space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Сертификат {i + 1}</span>
                            <button onClick={() => removeCertificate(i)}>
                              <Icon name="X" size={14} className="text-muted-foreground" />
                            </button>
                          </div>
                          <Input
                            value={cert.name}
                            onChange={(e) => updateCertificate(i, 'name', e.target.value)}
                            placeholder="Название сертификата"
                          />
                          <Input
                            value={cert.issuer}
                            onChange={(e) => updateCertificate(i, 'issuer', e.target.value)}
                            placeholder="Организация"
                          />
                          <Input
                            value={cert.year}
                            onChange={(e) => updateCertificate(i, 'year', e.target.value)}
                            placeholder="2023"
                          />
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Icon name="Languages" size={20} />
                      Языки
                    </h2>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                          placeholder="Русский (родной), English (C1)..."
                        />
                        <Button onClick={addLanguage} size="sm">
                          <Icon name="Plus" size={18} />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profile.languages.map((lang, i) => (
                          <Badge key={i} variant="secondary" className="gap-1">
                            {lang}
                            <button onClick={() => removeLanguage(i)}>
                              <Icon name="X" size={14} />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Icon name="Heart" size={20} />
                      Хобби
                    </h2>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          value={newHobby}
                          onChange={(e) => setNewHobby(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addHobby()}
                          placeholder="Фотография, Путешествия..."
                        />
                        <Button onClick={addHobby} size="sm">
                          <Icon name="Plus" size={18} />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profile.hobbies.map((hobby, i) => (
                          <Badge key={i} variant="outline" className="gap-1">
                            {hobby}
                            <button onClick={() => removeHobby(i)}>
                              <Icon name="X" size={14} />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 lg:col-span-2">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Icon name="Trophy" size={20} />
                      Достижения
                    </h2>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          value={newAchievement}
                          onChange={(e) => setNewAchievement(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addAchievement()}
                          placeholder="Победитель хакатона 2023, публикация в журнале..."
                        />
                        <Button onClick={addAchievement} size="sm">
                          <Icon name="Plus" size={18} />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {profile.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                            <Icon name="CheckCircle2" size={16} className="text-primary flex-shrink-0" />
                            <span className="flex-1 text-sm">{achievement}</span>
                            <button onClick={() => removeAchievement(i)}>
                              <Icon name="X" size={14} className="text-muted-foreground hover:text-destructive" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </>
              )}

              {activeTab === 'social' && (
                <>
                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Icon name="Share2" size={20} />
                      Социальные сети
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                          <Icon name="Linkedin" size={16} className="text-blue-600" />
                          LinkedIn
                        </label>
                        <Input
                          value={profile.linkedin}
                          onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                          placeholder="linkedin.com/in/username"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                          <Icon name="Github" size={16} />
                          GitHub
                        </label>
                        <Input
                          value={profile.github}
                          onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                          placeholder="github.com/username"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                          <Icon name="Twitter" size={16} className="text-blue-400" />
                          Twitter / X
                        </label>
                        <Input
                          value={profile.twitter}
                          onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                          placeholder="twitter.com/username"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                          <Icon name="Globe" size={16} />
                          Личный сайт
                        </label>
                        <Input
                          value={profile.website}
                          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                          placeholder="https://mywebsite.com"
                        />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">Тема оформления</h2>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setProfile({ ...profile, theme: 'light' })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          profile.theme === 'light' 
                            ? 'border-primary shadow-lg' 
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <div className="w-full h-20 rounded bg-white border border-border mb-2 flex items-center justify-center">
                          <Icon name="Sun" size={24} className="text-amber-500" />
                        </div>
                        <span className="text-sm font-medium">Светлая</span>
                      </button>
                      <button
                        onClick={() => setProfile({ ...profile, theme: 'dark' })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          profile.theme === 'dark' 
                            ? 'border-primary shadow-lg' 
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <div className="w-full h-20 rounded bg-zinc-900 border border-zinc-700 mb-2 flex items-center justify-center">
                          <Icon name="Moon" size={24} className="text-zinc-400" />
                        </div>
                        <span className="text-sm font-medium">Тёмная</span>
                      </button>
                      <button
                        onClick={() => setProfile({ ...profile, theme: 'purple' })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          profile.theme === 'purple' 
                            ? 'border-primary shadow-lg' 
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <div className="w-full h-20 rounded bg-gradient-to-br from-purple-500 to-pink-500 mb-2 flex items-center justify-center">
                          <Icon name="Sparkles" size={24} className="text-white" />
                        </div>
                        <span className="text-sm font-medium">Акцент</span>
                      </button>
                    </div>
                  </Card>

                  <Card className="p-6 lg:col-span-2">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Icon name="Link" size={20} />
                      Ссылка на профиль
                    </h2>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded-lg font-mono text-sm break-all">
                        {window.location.origin}/{profile.fullName.toLowerCase().replace(/\s+/g, '-') || 'username'}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={copyLink} disabled={!profile.fullName} className="flex-1">
                          <Icon name="Copy" size={16} className="mr-2" />
                          Копировать ссылку
                        </Button>
                        <Button variant="outline" disabled={!profile.fullName} className="flex-1">
                          <Icon name="QrCode" size={16} className="mr-2" />
                          QR-код
                        </Button>
                      </div>
                    </div>
                  </Card>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 mb-4">
              <div className="text-center mb-8">
                <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/20">
                  <AvatarImage src={profile.photo} />
                  <AvatarFallback className="text-4xl">
                    {profile.fullName ? profile.fullName.split(' ').map(n => n[0]).join('') : '?'}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-4xl font-bold mb-2">{profile.fullName || 'Ваше имя'}</h1>
                <p className="text-xl text-primary mb-4">{profile.title || 'Должность'}</p>
                {profile.location && (
                  <p className="text-muted-foreground flex items-center justify-center gap-2 mb-4">
                    <Icon name="MapPin" size={16} />
                    {profile.location}
                  </p>
                )}
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {profile.bio || 'Расскажите о себе...'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {profile.email && (
                  <Button variant="outline" size="sm">
                    <Icon name="Mail" size={16} className="mr-2" />
                    Email
                  </Button>
                )}
                {profile.phone && (
                  <Button variant="outline" size="sm">
                    <Icon name="Phone" size={16} className="mr-2" />
                    Телефон
                  </Button>
                )}
                {profile.linkedin && (
                  <Button variant="outline" size="sm">
                    <Icon name="Linkedin" size={16} className="mr-2" />
                    LinkedIn
                  </Button>
                )}
                {profile.github && (
                  <Button variant="outline" size="sm">
                    <Icon name="Github" size={16} className="mr-2" />
                    GitHub
                  </Button>
                )}
              </div>
            </Card>

            {profile.skills.length > 0 && (
              <Card className="p-6 mb-4">
                <h2 className="text-xl font-bold mb-4">Навыки</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </Card>
            )}

            {profile.experience.length > 0 && (
              <Card className="p-6 mb-4">
                <h2 className="text-xl font-bold mb-6">Опыт работы</h2>
                <div className="space-y-6">
                  {profile.experience.map((exp, i) => (
                    <div key={i} className="border-l-2 border-primary pl-4">
                      <h3 className="font-bold text-lg">{exp.position}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
