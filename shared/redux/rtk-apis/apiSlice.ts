import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

import { ITask } from "@/modules/HomePage/components/TaskContext/TaskContext.types"

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3333"}),
    endpoints: (builder) => ({
        getTasks: builder.query<ITask[], void>({
            query: () => '/tasks',
        })
    })
})

export const {useGetTasksQuery} = apiSlice