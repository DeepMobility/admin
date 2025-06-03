import { post, get } from "@/lib/httpMethods"

export async function getUserDetails(userId: string) {
  return await get(`get-user-details/${userId}`)
}

export async function editUser(userId: string, formData: FormData) {
  await post(`edit-user`, {
    userId,
    email: formData.get('email'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    gender: formData.get('gender'),
    birthYear: formData.get('birthYear')
  })
}

export async function removeUser(userId: string) {
  await post(`remove-user`, {
    userId,
  })
}