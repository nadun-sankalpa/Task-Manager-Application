import { Task } from "@/types/task";
import api from "./config/api";
import {addDoc, collection, doc, getDocs, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

// export const getTasks = async () => {
//     const res = await api.get("/task");
//     return res.data

// };

// export const createTask = async (task: any) => {
//     const res = await api.post("/task", task);
//     return res.data
// };

export const taskColRef = collection(db, "tasks")
//firebase firestore
export const createTask = async (task: Task) => {
    const docRef = await addDoc(taskColRef, task);
    return docRef.id
}

export const updateTask = async (id: string, task: Task) => {
    const docRef = doc(db, "tasks", id)
    const {id: _id, ...taskData} = task
    return await updateDoc(docRef, taskData)
}

export const getAllTasks = async () => {
    const snapShot = await getDocs(taskColRef)
    const taskList : Task[] = snapShot.docs.map((taskRef) =>({
        id: taskRef.id,
        ...taskRef.data()
    }
    )) as Task[]
    return taskList
}

export const getTaskById = async (id: string) => {
    const docRef = doc(db, "tasks", id)
    const snapShot = await getDoc(docRef)
    const task = snapShot.exists() ? {id: snapShot.id, ...snapShot.data()} : null
    return task
}

export const getAllTaskByUserId = async (userId: string)=>{
    const q = query(taskColRef,where("userId","==",userId))

    const querySnapshot = await getDocs(q)
    const taskList = querySnapshot.docs.map((taskRef) =>({
        id: taskRef.id,
        ...taskRef.data()
    })) as Task[]
    return taskList
}