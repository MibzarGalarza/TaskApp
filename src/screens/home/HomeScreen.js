
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import TaskCards from '../../components/TaskCards';
import { getTasks, createNewTask, updateTask, deleteTask } from '../../services/api';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnimationLoading from '../../animations/AnimationLoading';


const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('TODAS');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(false);

  // Cargar tareas al enfocar la pantalla
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
        setTimeout(() => {
          setLoading(false);
        }, 2000); // Simular un pequeño retraso para la animación de carga
      };
      fetchData();
    }, [])
  );

  // Filtrar tareas según el filtro seleccionado
  const filteredTasks = tasks.filter(task => {
    if (filter === 'TODAS') return true;
    if (filter === 'COMPLETADAS') return task.completed;
    if (filter === 'PENDIENTES') return !task.completed;
    return true;
  });

  // Agregar nueva tarea
  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      completed: false
    };
    const created = await createNewTask(newTask);
    if (created) {
      setTasks(prev => [...prev, created]);
      setNewTaskTitle('');
    }
  };

  // Cambiar estado completado
  const handleToggleCompleted = async (taskId, currentCompleted) => {
    const updated = await updateTask(taskId, { completed: !currentCompleted });
    if (updated) {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !currentCompleted } : t));
    }
  };

  // Eliminar tarea
  const handleDeleteTask = async (taskId) => {
    Alert.alert('Eliminar tarea', '¿Estás seguro de eliminar esta tarea?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar', style: 'destructive', onPress: async () => {
          const updated = await deleteTask(taskId);
          if (updated) setTasks(updated);
        }
      }
    ]);
  };

  const handleRefresh = async () => {
    setLoading(true);
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simular un pequeño retraso para la animación de carga
  };

  if (loading) {
    return <AnimationLoading />;
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      {/* Filtros */}
      <View style={globalStyles.card}>
        <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity style={[globalStyles.button, filter === 'TODAS' && styles.selectedButton]} onPress={() => setFilter('TODAS')}>
            <Text style={[globalStyles.normal, { color: '#FFF' }]}>Todas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[globalStyles.button, filter === 'PENDIENTES' && styles.selectedButton]} onPress={() => setFilter('PENDIENTES')}>
            <Text style={[globalStyles.normal, { color: '#FFF' }]}>Pendientes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[globalStyles.button, filter === 'COMPLETADAS' && styles.selectedButton]} onPress={() => setFilter('COMPLETADAS')}>
            <Text style={[globalStyles.normal, { color: '#FFF' }]}>Completadas</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Campo para agregar nueva tarea */}
      <View style={styles.addTaskContainer}>
        <View style={{ flex: 1 }}>
          <Text style={[globalStyles.normal, { marginRight: 10, marginBottom: 10 }]}>
            Escribe aqui tu nueva tarea
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nueva tarea..."
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
            onSubmitEditing={handleAddTask}
            returnKeyType="done"
          />
        </View>
        <TouchableOpacity style={[styles.addButton, newTaskTitle === "" && { backgroundColor: "#CCC" }]} onPress={handleAddTask}>
          <MaterialIcons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Lista de tareas */}
      <TaskCards
        tasks={filteredTasks}
        onToggleCompleted={handleToggleCompleted}
        onDeleteTask={handleDeleteTask}
        handleRefresh={handleRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    gap: 10
  },
  input: {
    fontSize: 16,
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    height: 50,
  },
  addButton: {
    backgroundColor: '#6200EE',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    gap: 10,
    elevation: 2
  },
  selectedButton: {
    backgroundColor: '#3700B3',
  }
});

export default HomeScreen;