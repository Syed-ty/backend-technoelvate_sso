const {Register}  = require ('../model/auth-model')

const getAllUser = async (req, res, next) => {
    try {
        const userData = await Register.find({});
        res.status(200).json({
            error: false,
            message: "all user list",
            userData
        })
    } catch (err) {
        next(err)
    }
}



const getUserById =  async (req,res,next)=>{
    try {
        let user = await Register.findOne({_id:req.params.id})
        res.status(200).json({error:false,message:'User fetched successfully',response:user})
    } catch (error) {
        next(err)
    }
}

const getUserByEmail =  async (req,res,next)=>{
    try {
        let user = await Register.findOne({email:req.params.email})
        res.status(200).json({
            error:false,
            message:'User fetched successfully based on Email',
            response:user})
    } catch (error) {
        next(err)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const {
            fullName,
            email,
            employeeId,
            role
        } = req.body;

        const updateUserdata = await Register.findOneAndUpdate({
            _id: req.params.id
        }, {
            fullName,
            email,
            employeeId,
            role
        }, {
            new: true
        });
        if (updateUserdata) {
            res.status(200).json({
                error: false,
                message: "User Updated Successfully",
                response: updateUserdata
            })

        } else {
            res.status(200).json({
                error: true,
                message: "Some thing went wrong",
            })
        }
    } catch (err) {
        next(err)
    }
};


const deleteUser = async(req,res,next)=>{
    try{
      const deleteUserData = await Register.deleteOne({_id:req.params.id})
      if(deleteUserData){
        res.status(200).json({
            error:false,
            message:'User Deleted Successfully',
            response: deleteUserData
        })
      }else{
        res.status(400).json({
            error:true,
            message:'Something Went Wrong'
        })
      }
    }catch(error){
      next(error)
    }
  }

  const UserPagination = async (req, res, next) => {
    try {
        const {
            currentPage,
            pageSize
        } = req.query;

        const skip = parseInt(pageSize) * (parseInt(currentPage) - 1);
        const limit = parseInt(pageSize);
        let mixed = await Register.find().limit(limit).skip(skip).exec();
        let totalmixed = await Register.find();
        let totalLength = totalmixed.length;
        if ((totalmixed, mixed)) {
            res
                .status(200)
                .json({
                    error: false,
                    message: "Register data Fetched Successfully",
                    response: mixed,
                    totalmixed: totalLength,
                });
        } else {
            res.status(404).json({
                error: true,
                message: "No Register Data Found",
            });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail,
    UserPagination
}