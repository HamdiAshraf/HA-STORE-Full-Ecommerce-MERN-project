import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../utils/baseURL";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/auth`,
    credentials: 'include',
  }),
  
  tagTypes:["User"],

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logoutUser:builder.mutation({
        query:()=>({
            url:"/logout",
            method:"POST"
        })
    }),
    getUsers:builder.query({
        query:()=>({
            url:`/users`,
            method:"GET"
        }),
        refetchOnMount:true,
        invalidatesTags:["User"]
    }),

    deleteUser:builder.mutation({
        query:(userId)=>({
            url:`/users/${userId}`,
            method:"DELETE"
        }),
        
        invalidatesTags:["User"]
    }),

    updateUserRole:builder.mutation({
        query:({userId,role})=>({
            url:`/users/${userId}`,
            method:"PUT",
            body: {role}
        }),
        refetchOnMount:true,
        invalidatesTags:["User"]
    }),

    editProfile:builder.mutation({
        query:(profileData)=>({
            url:`/edit-profile`,
            method:'PATCH',
            body:profileData

        })
    })
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation,useLogoutUserMutation,
    useDeleteUserMutation,useEditProfileMutation,useGetUsersQuery,useUpdateUserRoleMutation,
    
 } = authApi;
export default authApi;
