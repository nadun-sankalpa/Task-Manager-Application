import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { use } from 'react'
import { getAllTasks } from '@/services/taskService'
import { useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router' 
import { Task } from '@/types/task'

const TaskScreen = () => {

  const [tasks, setTasks] = React.useState<Task[]>([])
    
    const handleFetchData = async () =>{

       await getAllTasks().then((data) =>{
            setTasks(data)
            console.log(data)
       })
        // await getTasks().then((data) =>{
        //     console.log(data)
        // })
         .catch((err) => console.error(err))
    }

    useEffect(() => {
        handleFetchData()
    }, [])

    const router = useRouter()
  return (
    <View className='flex-1 w-full justify-center align-items-center'>
      <Text className='text-center text-4xl'>TaskScreen</Text>

      <View className='absolute top-5 right-5'>
        <Pressable className='bg-blue-600 px-6 py-3 rounded-full' onPress={() => router.push("/(dashboard)/tasks/new")}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </Pressable>
      </View>
      <ScrollView className = "mt-8">
        {tasks.map((task) => {
          return (
            <View key={task.id} className='bg-white p-4 m-2 rounded-lg shadow'>
              <Text>{task.title}</Text>
              <Text>{task.description}</Text>
              <View className='flex-row justify-end mt-2'>
                <Pressable className='bg-blue-600 px-6 py-3 rounded-full mr-2' onPress={() => router.push(`/(dashboard)/tasks/${task.id}`)}>
                  <MaterialIcons name="edit" size={24} color="#fff" />
                </Pressable>
                <Pressable className='bg-red-600 px-6 py-3 rounded-full'>
                  <MaterialIcons name="delete" size={24} color="#fff" />
                </Pressable>
              </View>
            </View>
          )
})}
      </ScrollView>

    </View>
  )
}

export default TaskScreen