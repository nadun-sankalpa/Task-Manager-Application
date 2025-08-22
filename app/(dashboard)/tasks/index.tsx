import { View, Text, Pressable } from 'react-native'
import React, { use } from 'react'
import { getTasks } from '@/services/taskService'
import { useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const TaskScreen = () => {
    
    const handleFetchData = async () =>{
        await getTasks().then((data) =>{
            console.log(data)
        })
        .catch((err) => console.error(err))
    }

    useEffect(() => {
        handleFetchData()
    })

  const router = useRouter()
  return (
    <View className='flex-1 w-full justify-center align-items-center'>
      <Text className='text-center text-4xl'>TaskScreen</Text>

      <Pressable className='bg-blue-600 px-6 py-3' onPress={() => router.push("/(dashboard)/tasks/new")}/>
        <MaterialIcons name='add' size={24} color='white' />
        
    </View>
  )
}

export default TaskScreen