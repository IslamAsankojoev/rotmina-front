import { api } from "@/src/app"
import { apiMap } from "@/src/shared"
import { Email } from "./types"

export const EmailService = {
  sendEmail: async (email: Email) => {
    const response = await api.post(apiMap.sendEmail, {
      json: email,
    })
    return response.json()
  },
}