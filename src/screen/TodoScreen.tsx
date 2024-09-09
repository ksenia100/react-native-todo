import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
const dummyData = [
    {
        id: "01",
        title: "Wash Car",
    },
    {
        id: "02",
        title: "Read A Book"
    }
];

interface Todo {
    id: string;
    title: string;
}

const TodoScreen: React.FC = (): React.JSX.Element => {
    const [todo, setTodo] = useState<string>("");
    const [todoList, setTodoList] = useState<Todo[]>(dummyData); 
    const [editedTodo, setEditedTodo] = useState<Todo | null>(null); 

    const handleAddTodo = () => {
        if (editedTodo) {
            setTodoList(todoList.map(item =>
                item.id === editedTodo.id ? { ...item, title: todo } : item
            ));
            setEditedTodo(null); 
        } else {
            setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
        }
        setTodo("");
    }

    const handleDeleteTodo = (id: string) => {
        const deleteElements = todoList.filter((todo) => todo.id !== id);
        setTodoList(deleteElements);
    };

    const handleEditTodo = (todo: Todo) => {
        setEditedTodo(todo);
        setTodo(todo.title);
    }

    const renderTodos = ({ item }: { item: Todo }) => (
        <View style={styles.todoItem} key={item.id}>
            <Text style={styles.todoText}>{item.title}</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                    <Text style={styles.icon}
                        onPress={() => handleDeleteTodo(item.id)}
                    >🗑️</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.icon}
                        onPress={() => handleEditTodo(item)}
                    >✏️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder='Add a task'
                value={todo}
                onChangeText={(userText) => setTodo(userText)}
            />
            <TouchableOpacity style={styles.addButton}
                onPress={() => handleAddTodo()}>
                <Text style={styles.addButtonText}>{editedTodo ? 'Update' : 'Add'}</Text>
            </TouchableOpacity>
            <FlatList
                data={todoList}
                renderItem={renderTodos}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default TodoScreen;


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
    },
    input: {
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    addButton: {
        backgroundColor: 'black',
        borderRadius: 6,
        paddingVertical: 8,
        alignItems: "center",
        marginBottom: 12,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    todoItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 8,
    },
    todoText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 12,
        flex: 1,
    },
    icon: {
        fontSize: 20,
        color: '#007bff',
        marginRight: 12,

    },
});
