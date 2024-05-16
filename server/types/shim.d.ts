import { UserDocument } from "../models/user.model";

declare module "h3" {
    interface H3EventContext {
        user: UserDocument
    }
}
// Removed unnecessary export default
