import ApiResponse from "../utils/apiResponse.js";
import {User} from '../database/db.js'
export const updateUser = async (req,res,next) => {
    const user = await User.findOne({
        where:{
            id: req.userId
        }
    });

    if(!user)
        return next(ApiResponse.Failure(404,"User not found"));

    await user.update({name:req.body.name});
    return next(ApiResponse.Success(200, "User updated successfully"));
}