import { View, Text, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const TaskFormScreen = () => {

    const {id} = useLocalSearchParams()
    //params.id = {id}

    const isNew = !id || id === "new" //null or id is new -> save
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
  return (
    <View>
      <Text>{isNew ? "New Task" : "Edit Task"}</Text>
      <TextInput className='border border-gray-500 rounded-md px-4 py-2 my-2' placeholder='Title' value={title} onChangeText={setTitle}/>
      <TextInput className='border border-gray-500 rounded-md px-4 py-2 my-2' placeholder='Description' value={description} onChangeText={setDescription}/>
      <TouchableOpacity className='bg-blue-600 px-6 py-3' onPress={handleSubmit}>
        <Text className='text-white text-x1 text-center'>{isNew ? "Save" : "Update"}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TaskFormScreen