
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Plus, Clock, Users, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'consulta' | 'atividade' | 'visita' | 'reuniao' | 'medicacao';
  description: string;
  location: string;
  participants: string;
}

const Calendar = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Consulta Médica - Dr. Silva',
      date: '2024-01-15',
      time: '09:00',
      type: 'consulta',
      description: 'Consulta de rotina com cardiologista',
      location: 'Consultório Médico',
      participants: 'Maria Silva'
    },
    {
      id: '2',
      title: 'Fisioterapia em Grupo',
      date: '2024-01-15',
      time: '15:00',
      type: 'atividade',
      description: 'Sessão de fisioterapia coletiva',
      location: 'Sala de Fisioterapia',
      participants: 'Grupo A - 8 residentes'
    },
    {
      id: '3',
      title: 'Visita Familiar',
      date: '2024-01-16',
      time: '14:00',
      type: 'visita',
      description: 'Visita da família Santos',
      location: 'Sala de Visitas',
      participants: 'Pedro Santos'
    },
    {
      id: '4',
      title: 'Atividade Musical',
      date: '2024-01-17',
      time: '16:00',
      type: 'atividade',
      description: 'Apresentação musical com violão',
      location: 'Salão Principal',
      participants: 'Todos os residentes'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    type: 'atividade' as const,
    description: '',
    location: '',
    participants: ''
  });

  const today = new Date().toISOString().split('T')[0];
  const currentWeek = getCurrentWeekEvents();

  function getCurrentWeekEvents() {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= weekStart && eventDate <= weekEnd;
    });
  }

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.time) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newEvent: Event = {
      id: editingEvent?.id || Date.now().toString(),
      title: formData.title,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      description: formData.description,
      location: formData.location,
      participants: formData.participants
    };

    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? newEvent : e));
      toast({
        title: "Sucesso",
        description: "Evento atualizado com sucesso!"
      });
    } else {
      setEvents([...events, newEvent]);
      toast({
        title: "Sucesso",
        description: "Evento cadastrado com sucesso!"
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: selectedDate,
      time: '',
      type: 'atividade',
      description: '',
      location: '',
      participants: ''
    });
    setEditingEvent(null);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      type: event.type,
      description: event.description,
      location: event.location,
      participants: event.participants
    });
    setIsDialogOpen(true);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consulta': return 'bg-red-100 text-red-800';
      case 'atividade': return 'bg-blue-100 text-blue-800';
      case 'visita': return 'bg-green-100 text-green-800';
      case 'reuniao': return 'bg-purple-100 text-purple-800';
      case 'medicacao': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'consulta': return 'Consulta';
      case 'atividade': return 'Atividade';
      case 'visita': return 'Visita';
      case 'reuniao': return 'Reunião';
      case 'medicacao': return 'Medicação';
      default: return type;
    }
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Calendário</h1>
              <p className="text-gray-600">Agenda de eventos e atividades</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Novo Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingEvent ? 'Editar Evento' : 'Cadastrar Novo Evento'}
                </DialogTitle>
                <DialogDescription>
                  Preencha as informações do evento
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Título do Evento *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Digite o título do evento"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Data *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Horário *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="type">Tipo de Evento</Label>
                  <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="atividade">Atividade</SelectItem>
                      <SelectItem value="consulta">Consulta Médica</SelectItem>
                      <SelectItem value="visita">Visita</SelectItem>
                      <SelectItem value="reuniao">Reunião</SelectItem>
                      <SelectItem value="medicacao">Medicação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Local</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Onde será realizado o evento"
                  />
                </div>

                <div>
                  <Label htmlFor="participants">Participantes</Label>
                  <Input
                    id="participants"
                    value={formData.participants}
                    onChange={(e) => setFormData({...formData, participants: e.target.value})}
                    placeholder="Quem participará do evento"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Descreva o evento"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {editingEvent ? 'Atualizar' : 'Cadastrar'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((date, index) => {
                    const dateStr = date.toISOString().split('T')[0];
                    const dayEvents = getEventsForDate(dateStr);
                    const isToday = dateStr === today;
                    const isCurrentMonth = date.getMonth() === new Date().getMonth();
                    
                    return (
                      <div
                        key={index}
                        className={`min-h-[80px] p-1 border rounded cursor-pointer hover:bg-gray-50 ${
                          isToday ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                        } ${!isCurrentMonth ? 'text-gray-400' : ''}`}
                        onClick={() => setSelectedDate(dateStr)}
                      >
                        <div className={`text-sm ${isToday ? 'font-bold text-blue-600' : ''}`}>
                          {date.getDate()}
                        </div>
                        <div className="space-y-1 mt-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className="text-xs p-1 rounded bg-blue-100 text-blue-800 truncate"
                            >
                              {event.time} {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{dayEvents.length - 2} mais
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events Today */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Eventos de Hoje</CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getEventsForDate(today).length > 0 ? (
                    getEventsForDate(today).map((event) => (
                      <div key={event.id} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getTypeColor(event.type)}>
                            {getTypeLabel(event.type)}
                          </Badge>
                          <span className="text-sm text-gray-500">{event.time}</span>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                        {event.location && (
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {event.location}
                          </p>
                        )}
                        {event.participants && (
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <Users className="w-3 h-3 mr-1" />
                            {event.participants}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      Nenhum evento hoje
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Próximos Eventos</CardTitle>
                <CardDescription>Esta semana</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentWeek.slice(0, 5).map((event) => (
                    <div key={event.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer" onClick={() => handleEdit(event)}>
                      <div className="text-center">
                        <div className="text-sm font-medium">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(event.date).toLocaleDateString('pt-BR', { weekday: 'short' })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{event.title}</h4>
                        <p className="text-xs text-gray-500">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
