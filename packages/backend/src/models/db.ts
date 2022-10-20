import { connect } from "mongoose"

export const setupDB = async (url: string) => {
   await connect(url)
}
