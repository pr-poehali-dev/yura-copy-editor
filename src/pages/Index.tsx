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

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setProgress(0);
    
    // Имитация процесса генерации
    const steps = [
      'Анализ требований...',
      'Выбор компонентов...',
      'Генерация дизайна...',
      'Создание кода...',
      'Оптимизация...',
      'Финализация...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress((i + 1) * 16.67);
    }
    
    // Генерация простого кода
    const template = templates.find(t => t.id === selectedTemplate);
    setGeneratedCode(`// Сгенерированный сайт: ${template?.name}
// Описание: ${prompt}

import React from 'react';

const GeneratedSite = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900">
      <header className="p-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          ${prompt.split(' ').slice(0, 3).join(' ')}
        </h1>
        <p className="text-gray-300">
          Сайт создан с помощью ИИ
        </p>
      </header>
      
      <main className="container mx-auto p-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Автоматически сгенерированные секции */}
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">
              Функция 1
            </h3>
            <p className="text-gray-300">
              Описание функциональности
            </p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">
              Функция 2
            </h3>
            <p className="text-gray-300">
              Описание функциональности
            </p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">
              Функция 3
            </h3>
            <p className="text-gray-300">
              Описание функциональности
            </p>
          </div>
        </div>
      </main>
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
                        <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg p-8 text-center">
                          <h2 className="text-2xl font-bold text-white mb-4">
                            {prompt.split(' ').slice(0, 3).join(' ')}
                          </h2>
                          <p className="text-gray-300 mb-6">Сайт создан с помощью ИИ</p>
                          <div className="grid md:grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="bg-white/10 p-4 rounded-lg">
                                <div className="w-8 h-8 bg-ai-primary rounded-full mx-auto mb-2"></div>
                                <div className="text-white font-medium">Функция {i}</div>
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