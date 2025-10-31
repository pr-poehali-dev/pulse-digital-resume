import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

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

export default function ProfileBuilder() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
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
  const [showPreview, setShowPreview] = useState(false);

  const updateField = (field: keyof ProfileData, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      updateField('skills', [...profile.skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    updateField('skills', profile.skills.filter((_, i) => i !== index));
  };

  const addExperience = () => {
    updateField('experience', [...profile.experience, {
      company: '',
      position: '',
      period: '',
      description: ''
    }]);
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const updated = [...profile.experience];
    updated[index] = { ...updated[index], [field]: value };
    updateField('experience', updated);
  };

  const addProject = () => {
    updateField('projects', [...profile.projects, {
      title: '',
      description: '',
      link: ''
    }]);
  };

  const updateProject = (index: number, field: string, value: string) => {
    const updated = [...profile.projects];
    updated[index] = { ...updated[index], [field]: value };
    updateField('projects', updated);
  };

  const handleSave = () => {
    const username = profile.fullName.toLowerCase().replace(/\s+/g, '');
    localStorage.setItem(`pulse_profile_${username}`, JSON.stringify(profile));
    navigate(`/${username}`);
  };

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
            Назад
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Icon name="Eye" size={20} className="mr-2" />
              Превью
            </Button>
            <Button onClick={handleSave} className="bg-primary">
              <Icon name="Save" size={20} className="mr-2" />
              Сохранить
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Создай свой профиль</h1>
            <p className="text-muted-foreground mb-8">Заполни информацию о себе, AI поможет с текстом</p>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="basic">Основное</TabsTrigger>
                <TabsTrigger value="skills">Навыки</TabsTrigger>
                <TabsTrigger value="experience">Опыт</TabsTrigger>
                <TabsTrigger value="projects">Проекты</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card className="p-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Полное имя</Label>
                      <Input
                        id="fullName"
                        value={profile.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        placeholder="Алексей Иванов"
                      />
                    </div>

                    <div>
                      <Label htmlFor="title">Должность</Label>
                      <Input
                        id="title"
                        value={profile.title}
                        onChange={(e) => updateField('title', e.target.value)}
                        placeholder="Senior Product Designer"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio">О себе</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => updateField('bio', e.target.value)}
                        placeholder="Расскажи о себе..."
                        rows={4}
                      />
                      <Button variant="ghost" size="sm" className="mt-2">
                        <Icon name="Sparkles" size={16} className="mr-2" />
                        Улучшить текст с AI
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder="hello@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          placeholder="+7 900 123-45-67"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Город</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => updateField('location', e.target.value)}
                        placeholder="Москва, Россия"
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Твои навыки</h3>
                  <div className="flex gap-2 mb-4">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Например: Figma, React..."
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill}>
                      <Icon name="Plus" size={20} />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="gap-2">
                        {skill}
                        <button onClick={() => removeSkill(index)}>
                          <Icon name="X" size={14} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                <Button onClick={addExperience} variant="outline" className="w-full">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить опыт
                </Button>
                {profile.experience.map((exp, index) => (
                  <Card key={index} className="p-6">
                    <div className="space-y-4">
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        placeholder="Название компании"
                      />
                      <Input
                        value={exp.position}
                        onChange={(e) => updateExperience(index, 'position', e.target.value)}
                        placeholder="Должность"
                      />
                      <Input
                        value={exp.period}
                        onChange={(e) => updateExperience(index, 'period', e.target.value)}
                        placeholder="2020 - 2023"
                      />
                      <Textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(index, 'description', e.target.value)}
                        placeholder="Описание обязанностей"
                        rows={3}
                      />
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                <Button onClick={addProject} variant="outline" className="w-full">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить проект
                </Button>
                {profile.projects.map((project, index) => (
                  <Card key={index} className="p-6">
                    <div className="space-y-4">
                      <Input
                        value={project.title}
                        onChange={(e) => updateProject(index, 'title', e.target.value)}
                        placeholder="Название проекта"
                      />
                      <Textarea
                        value={project.description}
                        onChange={(e) => updateProject(index, 'description', e.target.value)}
                        placeholder="Описание проекта"
                        rows={3}
                      />
                      <Input
                        value={project.link}
                        onChange={(e) => updateProject(index, 'link', e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {showPreview && (
            <div className="lg:sticky lg:top-24 h-fit">
              <Card className="p-8">
                <div className="text-center mb-8">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={profile.photo} />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {profile.fullName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold mb-1">{profile.fullName || 'Твоё имя'}</h2>
                  <p className="text-muted-foreground mb-4">{profile.title || 'Твоя должность'}</p>
                  <p className="text-sm">{profile.bio || 'Расскажи о себе...'}</p>
                </div>

                {profile.skills.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Навыки</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4 justify-center pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <Icon name="QrCode" size={16} className="mr-2" />
                    QR-код
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Download" size={16} className="mr-2" />
                    PDF
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
