import { useState } from 'react';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('editor');
  const [code, setCode] = useState(`// Добро пожаловать в современный редактор!
function helloWorld() {
  console.log("Привет, мир!");
  return "Это современный веб-редактор";
}

// Автодополнение активно
const editor = {
  features: ["syntax-highlighting", "autocomplete", "smart-suggestions"],
  theme: "modern-bright"
};

helloWorld();`);

  const [suggestions, setSuggestions] = useState([
    { text: 'console.log()', type: 'function' },
    { text: 'const', type: 'keyword' },
    { text: 'function', type: 'keyword' },
    { text: 'return', type: 'keyword' }
  ]);

  const sidebarItems = [
    { id: 'editor', icon: 'Code2', label: 'Редактор', active: true },
    { id: 'settings', icon: 'Settings', label: 'Настройки' },
    { id: 'docs', icon: 'FileText', label: 'Документы' },
    { id: 'help', icon: 'HelpCircle', label: 'Помощь' }
  ];

  const handleCodeChange = (value: string) => {
    setCode(value);
    // Простая имитация автодополнения
    const words = value.split(/\s+/);
    const lastWord = words[words.length - 1];
    
    if (lastWord.length > 2) {
      const filtered = [
        { text: 'console.log()', type: 'function' },
        { text: 'const', type: 'keyword' },
        { text: 'function', type: 'keyword' },
        { text: 'return', type: 'keyword' },
        { text: 'getElementById', type: 'method' },
        { text: 'addEventListener', type: 'method' }
      ].filter(s => s.text.toLowerCase().includes(lastWord.toLowerCase()));
      setSuggestions(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-editor-bg via-gray-800 to-editor-panel">
      <SidebarProvider>
        <div className="flex w-full">
          {/* Боковая панель */}
          <Sidebar className="border-r border-editor-panel/50 bg-editor-bg/95 backdrop-blur-sm">
            <SidebarContent className="p-4">
              <div className="mb-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-editor-accent to-editor-success bg-clip-text text-transparent">
                  EDITOR
                </h1>
                <p className="text-sm text-editor-text-muted">Современный веб-редактор</p>
              </div>
              
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className={`w-full justify-start transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-editor-accent to-blue-600 text-white shadow-lg'
                        : 'text-editor-text-muted hover:text-editor-text hover:bg-editor-panel/50'
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <Icon name={item.icon as any} size={18} className="mr-3" />
                    {item.label}
                  </Button>
                ))}
              </nav>

              <div className="mt-8 p-4 bg-gradient-to-br from-editor-accent/10 to-editor-success/10 rounded-lg border border-editor-accent/20">
                <h3 className="font-semibold text-editor-text mb-2">Статистика</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-editor-text-muted">Строк кода:</span>
                    <span className="text-editor-success font-medium">{code.split('\n').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-editor-text-muted">Символов:</span>
                    <span className="text-editor-accent font-medium">{code.length}</span>
                  </div>
                </div>
              </div>
            </SidebarContent>
          </Sidebar>

          {/* Основная область */}
          <div className="flex-1 flex flex-col">
            {/* Верхняя панель */}
            <header className="bg-editor-panel/50 backdrop-blur-sm border-b border-editor-panel/50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="text-editor-text hover:text-editor-accent" />
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-editor-danger rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-editor-success rounded-full"></div>
                  </div>
                  <span className="text-editor-text font-medium">main.js</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-editor-success/20 text-editor-success border-editor-success/30">
                    Автосохранение
                  </Badge>
                  <Button size="sm" className="bg-gradient-to-r from-editor-accent to-blue-600">
                    <Icon name="Play" size={16} className="mr-2" />
                    Запустить
                  </Button>
                </div>
              </div>
            </header>

            {/* Содержимое */}
            <main className="flex-1 p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
                <TabsContent value="editor" className="mt-0 h-full">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                    {/* Редактор кода */}
                    <Card className="lg:col-span-3 bg-editor-panel/30 border-editor-panel/50 backdrop-blur-sm">
                      <CardHeader className="border-b border-editor-panel/50">
                        <CardTitle className="text-editor-text flex items-center gap-2">
                          <Icon name="Code2" size={20} />
                          Редактор кода
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="relative">
                          <Textarea
                            value={code}
                            onChange={(e) => handleCodeChange(e.target.value)}
                            className="min-h-[500px] code-font resize-none border-0 bg-transparent text-editor-text focus:ring-0 focus:outline-none p-6 leading-relaxed"
                            placeholder="Начните печатать код..."
                          />
                          {/* Подсветка синтаксиса (имитация) */}
                          <div className="absolute top-6 left-6 pointer-events-none text-transparent code-font leading-relaxed whitespace-pre-wrap">
                            {code.replace(/\/\/.*$/gm, '').replace(/function|const|let|var|return/g, '')}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Панель автодополнения */}
                    <Card className="bg-editor-panel/30 border-editor-panel/50 backdrop-blur-sm">
                      <CardHeader className="border-b border-editor-panel/50">
                        <CardTitle className="text-editor-text flex items-center gap-2">
                          <Icon name="Lightbulb" size={20} />
                          Умные подсказки
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          {suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              className="w-full text-left p-3 rounded-lg bg-editor-bg/50 hover:bg-editor-accent/20 transition-colors border border-editor-panel/30 hover:border-editor-accent/50"
                              onClick={() => {
                                const words = code.split(/\s+/);
                                words[words.length - 1] = suggestion.text;
                                setCode(words.join(' ') + ' ');
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-editor-text code-font">{suggestion.text}</span>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    suggestion.type === 'function' ? 'border-editor-success/50 text-editor-success' :
                                    suggestion.type === 'keyword' ? 'border-editor-accent/50 text-editor-accent' :
                                    'border-blue-500/50 text-blue-400'
                                  }`}
                                >
                                  {suggestion.type}
                                </Badge>
                              </div>
                            </button>
                          ))}
                        </div>
                        
                        <div className="mt-6 p-4 bg-gradient-to-r from-editor-accent/10 to-blue-600/10 rounded-lg border border-editor-accent/20">
                          <h4 className="font-semibold text-editor-text mb-2 flex items-center gap-2">
                            <Icon name="Zap" size={16} />
                            Быстрые команды
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div className="text-editor-text-muted">Ctrl+Space - Автодополнение</div>
                            <div className="text-editor-text-muted">Ctrl+/ - Комментарий</div>
                            <div className="text-editor-text-muted">Ctrl+S - Сохранить</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-0">
                  <Card className="bg-editor-panel/30 border-editor-panel/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-editor-text flex items-center gap-2">
                        <Icon name="Settings" size={20} />
                        Настройки редактора
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-editor-text-muted">
                        Здесь будут настройки темы, размера шрифта, и других параметров редактора.
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="docs" className="mt-0">
                  <Card className="bg-editor-panel/30 border-editor-panel/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-editor-text flex items-center gap-2">
                        <Icon name="FileText" size={20} />
                        Документация
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-editor-text-muted">
                        Документация по использованию редактора и примеры кода.
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="help" className="mt-0">
                  <Card className="bg-editor-panel/30 border-editor-panel/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-editor-text flex items-center gap-2">
                        <Icon name="HelpCircle" size={20} />
                        Помощь
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-editor-text-muted">
                        Справочная информация и поддержка пользователей.
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;