
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Plus, Moon, Sun } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface RestSchedule {
  id: string;
  residentName: string;
  room: string;
  morningRest: string;
  afternoonRest: string;
  eveningRest: string;
  specialInstructions: string;
}

const RestSchedule = () => {
  const [schedules, setSchedules] = useState<RestSchedule[]>([
    {
      id: '1',
      residentName: 'Maria Silva',
      room: 'A-101',
      morningRest: '10:00',
      afternoonRest: '14:00',
      eveningRest: '21:00',
      specialInstructions: 'Medicação antes do descanso vespertino'
    },
    {
      id: '2',
      residentName: 'Pedro Santos',
      room: 'B-205',
      morningRest: '09:30',
      afternoonRest: '13:30',
      eveningRest: '20:30',
      specialInstructions: 'Verificar pressão antes do descanso'
    },
    {
      id: '3',
      residentName: 'Rosa Oliveira',
      room: 'A-103',
      morningRest: '10:30',
      afternoonRest: '14:30',
      eveningRest: '21:30',
      specialInstructions: 'Ambiente silencioso necessário'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<RestSchedule | null>(null);
  const [formData, setFormData] = useState({
    residentName: '',
    room: '',
    morningRest: '',
    afternoonRest: '',
    eveningRest: '',
    specialInstructions: ''
  });

  const currentTime = new Date().toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const getNextRestTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeMinutes = currentHour * 60 + currentMinute;

    let nextRest = null;
    let minDiff = Infinity;

    schedules.forEach(schedule => {
      [schedule.morningRest, schedule.afternoonRest, schedule.eveningRest].forEach(restTime => {
        if (restTime) {
          const [hour, minute] = restTime.split(':').map(Number);
          const restTimeMinutes = hour * 60 + minute;
          
          let diff = restTimeMinutes - currentTimeMinutes;
          if (diff < 0) diff += 24 * 60; // Add 24 hours if time has passed
          
          if (diff < minDiff) {
            minDiff = diff;
            nextRest = { time: restTime, resident: schedule.residentName };
          }
        }
      });
    });

    return nextRest;
  };

  const nextRest = getNextRestTime();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.residentName || !formData.room) {
      toast({
        title: "Erro",
        description: "Por favor, preencha pelo menos o nome e quarto do residente.",
        variant: "destructive"
      });
      return;
    }

    const newSchedule: RestSchedule = {
      id: editingSchedule?.id || Date.now().toString(),
      residentName: formData.residentName,
      room: formData.room,
      morningRest: formData.morningRest,
      afternoonRest: formData.afternoonRest,
      eveningRest: formData.eveningRest,
      specialInstructions: formData.specialInstructions
    };

    if (editingSchedule) {
      setSchedules(schedules.map(s => s.id === editingSchedule.id ? newSchedule : s));
      toast({
        title: "Sucesso",
        description: "Horário de descanso atualizado com sucesso!"
      });
    } else {
      setSchedules([...schedules, newSchedule]);
      toast({
        title: "Sucesso",
        description: "Horário de descanso cadastrado com sucesso!"
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      residentName: '',
      room: '',
      morningRest: '',
      afternoonRest: '',
      eveningRest: '',
      specialInstructions: ''
    });
    setEditingSchedule(null);
  };

  const handleEdit = (schedule: RestSchedule) => {
    setEditingSchedule(schedule);
    setFormData({
      residentName: schedule.residentName,
      room: schedule.room,
      morningRest: schedule.morningRest,
      afternoonRest: schedule.afternoonRest,
      eveningRest: schedule.eveningRest,
      specialInstructions: schedule.specialInstructions
    });
    setIsDialogOpen(true);
  };

  const getPeriodIcon = (period: string) => {
    switch (period) {
      case 'morning': return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'afternoon': return <Sun className="w-4 h-4 text-orange-500" />;
      case 'evening': return <Moon className="w-4 h-4 text-blue-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Horários de Descanso</h1>
              <p className="text-gray-600">Gerenciamento dos períodos de descanso dos residentes</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Novo Horário
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingSchedule ? 'Editar Horário' : 'Cadastrar Novo Horário'}
                </DialogTitle>
                <DialogDescription>
                  Configure os horários de descanso do residente
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="residentName">Nome do Residente *</Label>
                    <Input
                      id="residentName"
                      value={formData.residentName}
                      onChange={(e) => setFormData({...formData, residentName: e.target.value})}
                      placeholder="Nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="room">Quarto *</Label>
                    <Input
                      id="room"
                      value={formData.room}
                      onChange={(e) => setFormData({...formData, room: e.target.value})}
                      placeholder="Ex: A-101"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Horários de Descanso</Label>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor="morningRest" className="text-sm flex items-center space-x-1">
                        <Sun className="w-3 h-3 text-yellow-500" />
                        <span>Manhã</span>
                      </Label>
                      <Input
                        id="morningRest"
                        type="time"
                        value={formData.morningRest}
                        onChange={(e) => setFormData({...formData, morningRest: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="afternoonRest" className="text-sm flex items-center space-x-1">
                        <Sun className="w-3 h-3 text-orange-500" />
                        <span>Tarde</span>
                      </Label>
                      <Input
                        id="afternoonRest"
                        type="time"
                        value={formData.afternoonRest}
                        onChange={(e) => setFormData({...formData, afternoonRest: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="eveningRest" className="text-sm flex items-center space-x-1">
                        <Moon className="w-3 h-3 text-blue-500" />
                        <span>Noite</span>
                      </Label>
                      <Input
                        id="eveningRest"
                        type="time"
                        value={formData.eveningRest}
                        onChange={(e) => setFormData({...formData, eveningRest: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="specialInstructions">Instruções Especiais</Label>
                  <Input
                    id="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                    placeholder="Observações especiais para o descanso"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {editingSchedule ? 'Atualizar' : 'Cadastrar'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Current Time and Next Rest */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Horário Atual</h3>
                  <p className="text-2xl font-bold text-blue-600">{currentTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Moon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Próximo Descanso</h3>
                  {nextRest ? (
                    <div>
                      <p className="text-2xl font-bold text-green-600">{nextRest.time}</p>
                      <p className="text-sm text-gray-600">{nextRest.resident}</p>
                    </div>
                  ) : (
                    <p className="text-gray-600">Nenhum horário programado</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedules List */}
        <div className="grid gap-4">
          {schedules.map((schedule) => (
            <Card key={schedule.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{schedule.residentName}</CardTitle>
                    <CardDescription>Quarto {schedule.room}</CardDescription>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(schedule)}
                  >
                    Editar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {[
                    { period: 'morning', time: schedule.morningRest, label: 'Manhã' },
                    { period: 'afternoon', time: schedule.afternoonRest, label: 'Tarde' },
                    { period: 'evening', time: schedule.eveningRest, label: 'Noite' }
                  ].map(({ period, time, label }) => (
                    <div key={period} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      {getPeriodIcon(period)}
                      <div>
                        <p className="text-sm font-medium text-gray-700">{label}</p>
                        <p className="text-lg font-bold text-gray-900">
                          {time || '--:--'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {schedule.specialInstructions && (
                  <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-sm font-medium text-yellow-800 mb-1">Instruções Especiais:</p>
                    <p className="text-sm text-yellow-700">{schedule.specialInstructions}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {schedules.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum horário cadastrado</h3>
              <p className="text-gray-600">
                Cadastre o primeiro horário de descanso para começar.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default RestSchedule;
