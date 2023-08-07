export {}

declare global {
  interface User {
  id: string
  email: string
  emailVerified: Date
	name: string
	password: string
	emailVerified?: Date
  }
   interface List {
  id: string
  createdAt: Date
  updatedAt: Date
	title: string
	private: boolean
	ownerId: string
  } 
   interface Todo {
  id: string
  createdAt: Date
  updatedAt: Date
	title: string
  priority: string
	listId: string
	completedAt: Date
	ownerId: string
  } 
}



