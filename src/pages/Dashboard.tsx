
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, Calendar, Activity, Heart, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total de Residentes',
      value: '45',
      description: '3 novos este mês',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Atividades Hoje',
      value: '8',
      description: '2 em andamento',
      icon: Activity,
      color: 'text-green-600'
    },
    {
      title: 'Horário de Descanso',
      value: '14:00',
      description: 'Próximo em 2h',
      icon: Clock,
      color: 'text-purple-600'
    },
    {
      title: 'Eventos Esta Semana',
      value: '12',
      description: '4 eventos especiais',
      icon: Calendar,
      color: 'text-orange-600'
    }
  ];

  const recentActivities = [
    { time: '09:00', activity: 'Café da manhã - Refeitório' },
    { time: '10:30', activity: 'Fisioterapia - Sala de reabilitação' },
    { time: '14:00', activity: 'Horário de descanso' },
    { time: '15:30', activity: 'Atividade recreativa - Jardim' },
    { time: '18:00', activity: 'Jantar - Refeitório' }
  ];

  const alerts = [
    { type: 'info', message: 'Medicação de João Silva às 15:00' },
    { type: 'warning', message: 'Consulta médica de Maria Santos amanhã' },
    { type: 'info', message: 'Reunião familiar de Pedro Oliveira na sexta' }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <Heart className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Visão geral do Cuida Mais</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Atividades do Dia */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Atividades de Hoje</span>
              </CardTitle>
              <CardDescription>
                Cronograma das atividades programadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-16 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-700">{activity.time}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alertas e Lembretes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span>Alertas e Lembretes</span>
              </CardTitle>
              <CardDescription>
                Informações importantes para hoje
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${
                    alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' : 'bg-blue-50 border-blue-400'
                  }`}>
                    <p className="text-sm text-gray-700">{alert.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumo Rápido */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo da Semana</CardTitle>
            <CardDescription>
              Principais indicadores e métricas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <p className="text-sm text-gray-600">Taxa de Ocupação</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
                <p className="text-sm text-gray-600">Atividades Realizadas</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24</div>
                <p className="text-sm text-gray-600">Consultas Médicas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
