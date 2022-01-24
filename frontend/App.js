import {View, Text, TextInput, Button, ScrollView} from 'react-native';
import React from 'react';

export default function App() {
  const [data, setData] = React.useState([
    {
      completed: true,
      text: '',
      id: '',
    },
  ]);
  const [getOneTodo, setGetOneTodo] = React.useState('');
  const [add, setAdd] = React.useState({
    text: '',
    completed: false,
  });
  React.useEffect(() => {
    getData();
  }, []);
  function getData() {
    fetch('http:192.168.18.191:3000/todos', {
      method: 'GET',
    })
      .then(response =>
        console.log(
          response.json().then(data => {
            console.log(data);
            setData(data);
          }),
        ),
      )
      .catch(error => console.error(error));
  }

  function addData() {
    fetch('http:192.168.18.191:3000/todo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: false,
        // id: ,
        text: add.text,
      }),
    })
      .then(response =>
        console.log(
          response
            .json()
            .then(data => {
              console.log(data);
              getData();
              setAdd({
                text: '',
                completed: false,  
              });
              alert('Added');
              // setData(data);
            })
            .catch(error => console.error(error)),
        ),
      )
      .catch(error => console.error(error));
  }

  function deleteData(id) {
    fetch('http:192.168.18.191:3000/todo/' + id, {
      method: 'DELETE',
    })
      .then(response => {
        console.log(response);
        getData();
        alert('Deleted');
      })
      .catch(error => console.error(error));
  }
  function updateData(id) {
    fetch('http:192.168.18.191:3000/todo/' + id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: true,
        id: id,
        text: add.text,
      }),
    })
      .then(response => {
        console.log(response);
        getData();
      })
      .catch(error => console.error(error));
  }
  function getTodo() {
    fetch('http:192.168.18.191:3000/todo/' + getOneTodo, {
      method: 'GET',
    })
      .then(response => {
        response
          .json()
          .then(data => {
            console.log(data);
            alert(data.text);
            // setAdd(data);
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }
  return (
    <View>
      <View style={{width:'80%',alignSelf:'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 26,textAlign:'center'}}>MERN ToDo</Text>
        <TextInput
          placeholder="Enter your todo"
          onChangeText={text => setAdd({text: text, completed: false})}
          value={add.text}
        />
        <Text>Todo:{add.text}</Text>
        <Button title="Add" onPress={addData} />
      </View>
      <View style={{width:'80%',alignSelf:'center'}}>
        <TextInput
          placeholder="Enter todo Id to get"
          onChangeText={text => setGetOneTodo(text)}
          value={getOneTodo}
        />
        <Button title="Get Todo" onPress={getTodo} />
      </View>
      <View style={{width:'80%',alignSelf:'center'}}>
        <ScrollView>
          {data.map(item => (
            <View
              key={item.id}
              style={{backgroundColor: 'lightblue', marginTop: 10}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>ID:{item.id}</Text>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Name:
                {item.text}
              </Text>
              {/* <Text style={{fontWeight:'bold',fontSize:26}}>{item.completed}</Text> */}
              <Text style={{fontWeight: 'bold', fontSize: 20}}>Status:
                {item.completed ? (
                  <Text>completed</Text>
                ) : (
                  <Button
                    color={'red'}
                    title="Complete"
                    onPress={() => updateData(item.id)}
                  />
                )}
              </Text>
              <Button title="Delete" onPress={() => deleteData(item.id)} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
