import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

import { ITask } from "@/modules/HomePage/components/TaskContext/TaskContext.types"
import { TCreateTaskDto } from "@/shared/typedefs/types"

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3333"}),
    endpoints: (builder) => ({
        getTasks: builder.query<ITask[], void>({
            query: () => '/tasks',
        }),

        createTask: builder.mutation<ITask, TCreateTaskDto>({
            query:(task) => ({
                url: "/tasks",
                method: "POST",
                body: task,
            })
        }),

        updateTask: builder.mutation<ITask, ITask>({
            query: (task) => ({
              url: `/tasks/${task.id}`,
              method: 'PUT',
              body: task,
            }),
        }),

        deleteTask: builder.mutation<void, number>({
            query: (taskId) => ({
              url: `/tasks/${taskId}`,
              method: 'DELETE',
            }),
        }),

        clearCompletedTasks: builder.mutation<void, void>({
            query: () => ({
              url: '/tasks/completed',
              method: 'DELETE',
            }),
        }),

        toggleTaskCompletion: builder.mutation<ITask, number>({
            query: (taskId) => ({
                url: `/tasks/${taskId}/complete`,
                method: 'PATCH',
            }),
        }),
    })
})

export const {useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useClearCompletedTasksMutation, useDeleteTaskMutation, useToggleTaskCompletionMutation} = apiSlice
