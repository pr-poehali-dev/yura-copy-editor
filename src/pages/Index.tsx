import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('landing');
  const [generatedCode, setGeneratedCode] = useState('');

  const templates = [
    { id: 'landing', name: 'Лендинг', icon: 'Rocket', description: 'Продающая посадочная страница' },
    { id: 'portfolio', name: 'Портфолио', icon: 'User', description: 'Персональное портфолио' },
    { id: 'blog', name: 'Блог', icon: 'FileText', description: 'Блог или новостной сайт' },
    { id: 'ecommerce', name: 'Магазин', icon: 'ShoppingCart', description: 'Интернет-магазин' },
    { id: 'corporate', name: 'Корпоративный', icon: 'Building', description: 'Сайт компании' },
    { id: 'creative', name: 'Креативный', icon: 'Palette', description: 'Творческий проект' }
  ];

  const features = [
    { icon: 'Brain', title: 'ИИ-Анализ', description: 'Умный анализ требований' },
    { icon: 'Zap', title: 'Быстрая генерация', description: 'Сайт за 30 секунд' },
    { icon: 'Smartphone', title: 'Адаптивность', description: 'Автоматическая мобильная версия' },
    { icon: 'Sparkles', title: 'Современный дизайн', description: 'Актуальные тренды UX/UI' }
  ];

  // Умный ИИ-анализатор текста
  const analyzePrompt = (text: string) => {
    const words = text.toLowerCase();
    
    // Анализ типа бизнеса
    const businessTypes = {
      restaurant: ['ресторан', 'кафе', 'столовая', 'бар', 'пиццерия', 'суши', 'еда', 'меню'],
      fitness: ['фитнес', 'спортзал', 'йога', 'тренажер', 'спорт', 'тренировка'],
      portfolio: ['портфолио', 'дизайнер', 'фотограф', 'художник', 'творчество'],
      medical: ['клиника', 'врач', 'медицина', 'лечение', 'здоровье', 'больница'],
      education: ['школа', 'курсы', 'обучение', 'университет', 'образование'],
      beauty: ['салон красоты', 'парикмахерская', 'маникюр', 'косметология'],
      travel: ['туризм', 'путешествия', 'отель', 'гостиница'],
      tech: ['it', 'технологии', 'разработка', 'программирование', 'стартап']
    };
    
    // Анализ цветовой схемы
    const colors = {
      blue: ['синий', 'голубой', 'небесный'],
      green: ['зеленый', 'природный', 'эко'],
      red: ['красный', 'яркий', 'энергичный'],
      purple: ['фиолетовый', 'сиреневый', 'креативный'],
      orange: ['оранжевый', 'теплый', 'солнечный']
    };
    
    // Анализ необходимых секций
    const sections = {
      about: ['о нас', 'о компании', 'история'],
      services: ['услуги', 'сервисы', 'что мы делаем'],
      portfolio: ['портфолио', 'работы', 'примеры', 'галерея'],
      contact: ['контакты', 'связь', 'адрес', 'телефон'],
      team: ['команда', 'сотрудники', 'наша команда'],
      testimonials: ['отзывы', 'рекомендации', 'клиенты'],
      pricing: ['цены', 'стоимость', 'тарифы'],
      faq: ['вопросы', 'faq', 'часто задаваемые']
    };
    
    let detectedBusiness = 'general';
    let detectedColor = 'blue';
    const detectedSections = [];
    
    // Определяем тип бизнеса
    for (const [type, keywords] of Object.entries(businessTypes)) {
      if (keywords.some(keyword => words.includes(keyword))) {
        detectedBusiness = type;
        break;
      }
    }
    
    // Определяем цветовую схему
    for (const [color, keywords] of Object.entries(colors)) {
      if (keywords.some(keyword => words.includes(keyword))) {
        detectedColor = color;
        break;
      }
    }
    
    // Определяем нужные секции
    for (const [section, keywords] of Object.entries(sections)) {
      if (keywords.some(keyword => words.includes(keyword))) {
        detectedSections.push(section);
      }
    }
    
    // Если секции не найдены, добавляем базовые
    if (detectedSections.length === 0) {
      detectedSections.push('about', 'services', 'contact');
    }
    
    return { businessType: detectedBusiness, colorScheme: detectedColor, sections: detectedSections };
  };

  const generateSmartContent = (analysis: any, prompt: string) => {
    const { businessType, colorScheme, sections } = analysis;
    
    // Умные названия и контент по типу бизнеса
    const businessContent = {
      restaurant: {
        title: 'Добро пожаловать в наш ресторан',
        subtitle: 'Изысканная кухня и уютная атмосфера',
        sections: {
          about: { title: 'О нашем ресторане', content: 'Уже 15 лет мы радуем гостей изысканными блюдами из свежих продуктов' },
          services: { title: 'Наше меню', content: 'Авторские блюда европейской кухни • Сезонные деликатесы • Винная карта' },
          contact: { title: 'Бронирование столика', content: '+7 (999) 123-45-67 • ул. Центральная, 1 • Работаем до 23:00' }
        }
      },
      fitness: {
        title: 'Фитнес-клуб премиум класса',
        subtitle: 'Ваше здоровье - наша миссия',
        sections: {
          about: { title: 'О нашем клубе', content: 'Современное оборудование и профессиональные тренеры с международными сертификатами' },
          services: { title: 'Наши услуги', content: 'Тренажерный зал • Групповые занятия • Персональные тренировки • SPA-зона' },
          contact: { title: 'Записаться на тренировку', content: '+7 (999) 123-45-67 • Пробное занятие бесплатно • Гибкие абонементы' }
        }
      },
      portfolio: {
        title: 'Творческое портфолио',
        subtitle: 'Дизайн, который вдохновляет',
        sections: {
          about: { title: 'Обо мне', content: 'Графический дизайнер с 8-летним опытом и 200+ успешными проектами' },
          portfolio: { title: 'Мои работы', content: 'Брендинг • Веб-дизайн • Печатная продукция • Упаковка • Иллюстрации' },
          contact: { title: 'Связаться со мной', content: 'hello@designer.com • Обсудим ваш проект • Бесплатная консультация' }
        }
      },
      medical: {
        title: 'Медицинский центр',
        subtitle: 'Забота о вашем здоровье',
        sections: {
          about: { title: 'О клинике', content: 'Современная медицина, опытные врачи и европейские стандарты качества' },
          services: { title: 'Наши услуги', content: 'Диагностика • Лечение • Профилактика • Реабилитация • Онлайн консультации' },
          contact: { title: 'Записаться на прием', content: '+7 (999) 123-45-67 • Работаем 24/7 • Онлайн запись' }
        }
      },
      default: {
        title: prompt.split(' ').slice(0, 4).join(' '),
        subtitle: 'Профессиональные решения для вашего бизнеса',
        sections: {
          about: { title: 'О нас', content: 'Мы предоставляем качественные услуги и индивидуальный подход к каждому клиенту' },
          services: { title: 'Наши услуги', content: 'Полный спектр профессиональных решений • Консультации • Поддержка 24/7' },
          contact: { title: 'Связаться с нами', content: '+7 (999) 123-45-67 • info@company.com • Бесплатная консультация' }
        }
      }
    };
    
    const content = businessContent[businessType] || businessContent.default;
    
    // Цветовые схемы
    const colorSchemes = {
      blue: { primary: 'from-blue-600 to-blue-800', accent: 'bg-blue-500', text: 'text-blue-600' },
      green: { primary: 'from-green-600 to-green-800', accent: 'bg-green-500', text: 'text-green-600' },
      red: { primary: 'from-red-600 to-red-800', accent: 'bg-red-500', text: 'text-red-600' },
      purple: { primary: 'from-purple-600 to-purple-800', accent: 'bg-purple-500', text: 'text-purple-600' },
      orange: { primary: 'from-orange-600 to-orange-800', accent: 'bg-orange-500', text: 'text-orange-600' }
    };
    
    const selectedColors = colorSchemes[colorScheme] || colorSchemes.blue;
    
    return { content, colors: selectedColors, detectedSections: sections };
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setProgress(0);
    
    // Шаги умной генерации
    const steps = [
      'ИИ анализирует описание...',
      'Определяю тип бизнеса...',
      'Подбираю цветовую схему...',
      'Генерирую умный контент...',
      'Создаю адаптивную верстку...',
      'Финализирую дизайн...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress((i + 1) * 16.67);
    }
    
    // Умный анализ промпта
    const analysis = analyzePrompt(prompt);
    const smartContent = generateSmartContent(analysis, prompt);
    
    // Генерация умного кода
    const template = templates.find(t => t.id === selectedTemplate);
    const sectionsCode = smartContent.detectedSections.map(section => {
      const sectionData = smartContent.content.sections[section];
      if (!sectionData) return '';
      
      return `
          <section className="py-16 px-8" id="${section}">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold ${smartContent.colors.text} mb-8 text-center">
                ${sectionData.title}
              </h2>
              <div className="text-center text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                ${sectionData.content}
              </div>
            </div>
          </section>`;
    }).join('');
    
    setGeneratedCode(`// Умно сгенерированный сайт: ${template?.name}
// ИИ-анализ: Тип бизнеса - ${analysis.businessType}, Цвета - ${analysis.colorScheme}
// Определенные секции: ${analysis.sections.join(', ')}

import React from 'react';

const GeneratedSite = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero секция */}
      <header className="bg-gradient-to-r ${smartContent.colors.primary} text-white">
        <div className="container mx-auto px-8 py-24 text-center">
          <h1 className="text-5xl font-bold mb-6">
            ${smartContent.content.title}
          </h1>
          <p className="text-xl opacity-90 mb-8">
            ${smartContent.content.subtitle}
          </p>
          <button className="bg-white ${smartContent.colors.text} px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105">
            Узнать больше
          </button>
        </div>
      </header>
      
      {/* Навигация */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-8 py-4">
          <div className="flex justify-center space-x-8">
            ${smartContent.detectedSections.map(section => {
              const sectionData = smartContent.content.sections[section];
              return `<a href="#${section}" className="text-gray-600 hover:${smartContent.colors.text} transition-colors font-medium">${sectionData?.title || section}</a>`;
            }).join('\n            ')}
          </div>
        </div>
      </nav>
      
      {/* Основной контент */}
      <main>
        ${sectionsCode}
        
        {/* Призыв к действию */}
        <section className="bg-gradient-to-r ${smartContent.colors.primary} text-white py-16">
          <div className="container mx-auto px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Готовы начать?</h2>
            <p className="text-xl opacity-90 mb-8">Свяжитесь с нами сегодня</p>
            <button className="bg-white ${smartContent.colors.text} px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105">
              Связаться сейчас
            </button>
          </div>
        </section>
      </main>
      
      {/* Футер */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">${smartContent.content.title}</h3>
              <p className="text-gray-400">${smartContent.content.subtitle}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
              <div className="space-y-2">
                ${smartContent.detectedSections.map(section => {
                  const sectionData = smartContent.content.sections[section];
                  return `<a href="#${section}" className="block text-gray-400 hover:text-white transition-colors">${sectionData?.title || section}</a>`;
                }).join('\n                ')}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="text-gray-400 space-y-2">
                <div>+7 (999) 123-45-67</div>
                <div>info@company.com</div>
                <div>ул. Центральная, 1</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>© 2024 ${smartContent.content.title}. Все права защищены. Сайт создан с помощью умного ИИ.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GeneratedSite;`);
    
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ai-bg via-ai-panel to-ai-surface">
      {/* Заголовок */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-ai-primary to-ai-secondary rounded-lg flex items-center justify-center">
                <Icon name="Brain" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-ai-primary to-ai-secondary bg-clip-text text-transparent">
                  AI Website Generator
                </h1>
                <p className="text-sm text-gray-400">Нейросеть для создания сайтов</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className="bg-ai-accent/20 text-ai-accent border-ai-accent/30">
                <Icon name="Sparkles" size={14} className="mr-1" />
                Beta v2.0
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Панель ввода */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-ai-panel/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="MessageSquare" size={20} />
                  Опишите желаемый сайт
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Например: Создай лендинг для IT-студии с современным дизайном, секциями услуг, портфолио и контактами. Используй синий и белый цвета."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] bg-black/20 border-white/20 text-white placeholder-gray-400 focus:border-ai-primary"
                />
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    {prompt.length}/500 символов
                  </div>
                  <Button 
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="bg-gradient-to-r from-ai-primary to-ai-secondary hover:from-ai-primary/80 hover:to-ai-secondary/80"
                  >
                    {isGenerating ? (
                      <>
                        <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                        Генерирую...
                      </>
                    ) : (
                      <>
                        <Icon name="Wand2" size={16} className="mr-2" />
                        Создать сайт
                      </>
                    )}
                  </Button>
                </div>

                {isGenerating && (
                  <div className="space-y-2">
                    <Progress value={progress} className="bg-black/20" />
                    <div className="text-sm text-ai-primary">
                      Обработка запроса... {Math.round(progress)}%
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Шаблоны */}
            <Card className="bg-ai-panel/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Layout" size={20} />
                  Выберите тип сайта
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedTemplate === template.id
                          ? 'border-ai-primary bg-ai-primary/20'
                          : 'border-white/20 bg-black/20 hover:border-ai-primary/50'
                      }`}
                    >
                      <Icon name={template.icon as any} size={24} className="text-ai-primary mb-2 mx-auto" />
                      <div className="text-white font-medium text-sm">{template.name}</div>
                      <div className="text-gray-400 text-xs mt-1">{template.description}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Результат */}
            {generatedCode && (
              <Card className="bg-ai-panel/50 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="Code2" size={20} />
                    Сгенерированный код
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="preview" className="w-full">
                    <TabsList className="bg-black/20 border-white/10">
                      <TabsTrigger value="preview" className="text-white">Превью</TabsTrigger>
                      <TabsTrigger value="code" className="text-white">Код</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="preview" className="mt-4">
                      <div className="bg-black/20 rounded-lg p-6 border border-white/10">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-8 text-center text-white">
                          <h2 className="text-3xl font-bold mb-4">
                            {prompt ? (analyzePrompt(prompt).businessType === 'restaurant' ? 'Добро пожаловать в наш ресторан' :
                             analyzePrompt(prompt).businessType === 'fitness' ? 'Фитнес-клуб премиум класса' :
                             analyzePrompt(prompt).businessType === 'portfolio' ? 'Творческое портфолио' :
                             analyzePrompt(prompt).businessType === 'medical' ? 'Медицинский центр' :
                             prompt.split(' ').slice(0, 4).join(' ')) : 'Ваш новый сайт'}
                          </h2>
                          <p className="text-blue-100 mb-6">
                            {prompt ? (analyzePrompt(prompt).businessType === 'restaurant' ? 'Изысканная кухня и уютная атмосфера' :
                             analyzePrompt(prompt).businessType === 'fitness' ? 'Ваше здоровье - наша миссия' :
                             analyzePrompt(prompt).businessType === 'portfolio' ? 'Дизайн, который вдохновляет' :
                             analyzePrompt(prompt).businessType === 'medical' ? 'Забота о вашем здоровье' :
                             'Профессиональные решения для вашего бизнеса') : 'Создан с помощью умного ИИ'}
                          </p>
                          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold mb-8 hover:shadow-lg transition-all">
                            Узнать больше
                          </button>
                          <div className="grid md:grid-cols-3 gap-6 mt-8">
                            {prompt && analyzePrompt(prompt).sections.slice(0, 3).map((section, i) => (
                              <div key={i} className="bg-white/10 p-6 rounded-lg">
                                <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                                  <Icon name={section === 'about' ? 'Info' : section === 'services' ? 'Settings' : section === 'contact' ? 'Phone' : 'Star'} size={20} />
                                </div>
                                <h3 className="font-semibold mb-2">
                                  {section === 'about' ? 'О нас' : section === 'services' ? 'Услуги' : section === 'contact' ? 'Контакты' : 
                                   section === 'portfolio' ? 'Портфолио' : section === 'team' ? 'Команда' : 'Раздел'}
                                </h3>
                                <p className="text-blue-100 text-sm">
                                  {section === 'about' ? 'Наша история и миссия' : section === 'services' ? 'Что мы предлагаем' : 
                                   section === 'contact' ? 'Как с нами связаться' : 'Подробная информация'}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="code" className="mt-4">
                      <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>{generatedCode}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Возможности ИИ */}
            <Card className="bg-ai-panel/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Sparkles" size={20} />
                  Возможности ИИ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-ai-primary to-ai-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={feature.icon as any} size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{feature.title}</div>
                      <div className="text-gray-400 text-sm">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Статистика */}
            <Card className="bg-ai-panel/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="BarChart3" size={20} />
                  Статистика
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Сайтов создано:</span>
                  <span className="text-ai-accent font-bold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Активных пользователей:</span>
                  <span className="text-ai-secondary font-bold">342</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Время генерации:</span>
                  <span className="text-ai-primary font-bold">~28 сек</span>
                </div>
              </CardContent>
            </Card>

            {/* Примеры промптов */}
            <Card className="bg-ai-panel/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Lightbulb" size={20} />
                  Примеры описаний
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Лендинг для фитнес-студии с расписанием и записью",
                  "Портфолио дизайнера с галереей работ",
                  "Сайт ресторана с меню и бронированием",
                  "Блог о путешествиях с картой"
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="w-full text-left p-3 bg-black/20 rounded-lg hover:bg-black/40 transition-colors border border-white/10"
                  >
                    <div className="text-gray-300 text-sm">{example}</div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;