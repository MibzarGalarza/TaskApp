
import React from 'react';
import { View, Text, Switch, TouchableOpacity, FlatList, StyleSheet, RefreshControl } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../styles/globalStyles';

const TaskCards = ({ tasks, onToggleCompleted, onDeleteTask, handleRefresh }) => {
  const renderTask = ({ item }) => (
    <View style={[styles.taskItem, item.completed && styles.completedTaskItem]}>
      <Switch
        value={item.completed}
        onValueChange={() => onToggleCompleted(item.id, item.completed)}
        thumbColor={item.completed ? '#6200EE' : '#FFF'}
        trackColor={{ false: '#CCC', true: '#B39DDB' }}
      />
      <Text
        style={[
          globalStyles.normal,
          styles.taskText,
          item.completed && styles.completedText
        ]}
        numberOfLines={2}
      >
        {item.title}
      </Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDeleteTask(item.id)}>
        <MaterialIcons name="delete" size={22} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={renderTask}
      contentContainerStyle={{ paddingBottom: 100 }}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <MaterialIcons name="inbox" size={48} color="#BDBDBD" />
          <Text style={styles.emptyText}>No hay tareas</Text>
        </View>
      }
      refreshControl={
        <RefreshControl
          onRefresh={handleRefresh} // Implementar la lógica de refresco si es necesario
          tintColor="#6200EE"
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 18,
    marginVertical: 7,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: '#6200EE',
  },
  completedTaskItem: {
    borderLeftColor: '#BDBDBD',
    backgroundColor: '#F3F3F3',
  },
  taskText: {
    flex: 1,
    fontSize: 17,
    color: '#222',
    marginHorizontal: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#BDBDBD',
    fontStyle: 'italic',
  },
  deleteButton: {
    backgroundColor: '#B00020',
    borderRadius: 20,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    shadowColor: '#B00020',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
    opacity: 0.7,
  },
  emptyText: {
    color: '#888',
    fontSize: 17,
    marginTop: 10,
    fontWeight: '500',
  },
});

export default TaskCards;
