import { connect } from "mongoose"

export const setupDB = async (url: string) => {
   try {
      console.info(`Setup MongoDB connection to ${url}!`)
      await connect(url)
  } catch (e) {
      console.error("Error connecting to MongoDB!", e)
      throw e
  }
}
