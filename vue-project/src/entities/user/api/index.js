import mainJson from '@/shared/documents/main.json'

export const userLogin = (login, password) => mainJson.users.find(user => user.email === login & user.password === password)


