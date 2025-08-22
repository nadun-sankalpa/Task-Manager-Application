import { View, Text, TextInput, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { use } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { createTask } from '@/services/taskService'
import { useEffect } from 'react'
import { getTaskById } from '@/services/taskService'
import { useRouter } from 'expo-router'


const TaskFormScreen = () => {

    const {id} = useLocalSearchParams()
    //params.id = {id}

    const isNew = !id || id === "new" //null or id is new -> save
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")


    const router = useRouter()

    useEffect(() => {
      const load = async () => {
      if(! isNew && id){
        const task = await getTaskById(id)
        if(task){
            setTitle(task.title)
            setDescription(task.description)
        }

      }

    const handleSubmit = async () => {
        if(!title.trim){
            Alert.alert("Validation", "Title is required")
            return
        }
        try {
            if(isNew){
                await createTask({title, description})
            }
            router.back()
        } catch (error) {
            console.error(error)
            Alert.alert("Error", "Failed to save task")
        }
    }
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