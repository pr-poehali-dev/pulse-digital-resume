import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: 'Sparkles',
      title: 'AI-ассистент',
      description: 'Умный помощник переписывает текст красиво и профессионально'
    },
    {
      icon: 'Palette',
      title: 'Премиальный дизайн',
      description: 'Три стильные темы: светлая, тёмная и урбан'
    },
    {
      icon: 'QrCode',
      title: 'QR-код',
      description: 'Делитесь профилем мгновенно через QR'
    },
    {
      icon: 'Download',
      title: 'Экспорт в PDF',
      description: 'Скачайте резюме в фирменном дизайне'
    },
    {
      icon: 'Link',
      title: 'Короткая ссылка',
      description: 'Получите персональную ссылку pulse.app/ваше-имя'
    },
    {
      icon: 'TrendingUp',
      title: 'Аналитика',
      description: 'Отслеживайте просмотры и взаимодействия'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Pulse</span>
          </div>
          <Button 
            onClick={() => navigate('/builder')}
            className="bg-primary hover:bg-primary/90"
          >
            Создать профиль
          </Button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Icon name="Sparkles" size={16} />
            Цифровое резюме нового поколения
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in-up text-balance">
            Твоё резюме<br />
            <span className="text-primary">впечатляет</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up text-balance" style={{ animationDelay: '0.1s' }}>
            Создай стильное портфолио за 5 минут с помощью AI. Делись по короткой ссылке и QR-коду.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Button 
              size="lg" 
              onClick={() => navigate('/builder')}
              className="text-lg px-8 h-14 bg-primary hover:bg-primary/90"
            >
              Начать бесплатно
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/aleksey')}
              className="text-lg px-8 h-14"
            >
              Посмотреть пример
            </Button>
          </div>

          <div className="mt-20 relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <Card className="p-8 bg-card/50 backdrop-blur border-border/50 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <Icon name="User" size={80} className="text-primary/40" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Всё что нужно для идеального резюме
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Премиальные инструменты для создания резюме, которое запомнят
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/80 backdrop-blur border-border/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name={feature.icon} size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Как это работает</h2>
            <p className="text-muted-foreground text-lg">Три простых шага до идеального резюме</p>
          </div>

          <div className="space-y-8">
            {[
              { step: '01', title: 'Заполни профиль', desc: 'Добавь опыт, проекты и навыки. AI поможет с формулировками' },
              { step: '02', title: 'Выбери стиль', desc: 'Настрой дизайн под свою профессию и индивидуальность' },
              { step: '03', title: 'Поделись миром', desc: 'Получи короткую ссылку, QR-код или скачай PDF' }
            ].map((item, index) => (
              <div 
                key={index}
                className="flex gap-6 items-start animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="text-6xl font-bold text-primary/20 leading-none">{item.step}</div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Готов создать своё резюме?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
            Присоединяйся к тысячам профессионалов, которые выбрали Pulse
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/builder')}
            className="text-lg px-8 h-14 bg-primary hover:bg-primary/90"
          >
            Создать профиль бесплатно
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="Zap" size={14} className="text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Pulse</span>
          </div>
          <p>© 2025 Pulse. Твоё резюме нового поколения</p>
        </div>
      </footer>
    </div>
  );
}
