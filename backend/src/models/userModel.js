import mongoose from 'mongoose'; 
import bcrypt from 'bcryptjs';

// 1- Create schema
const userSchema = mongoose.Schema( 
    { 
        name:{ 
            type: String, 
            required: true, 
        }, 
        email:{ 
            type: String, 
            required: true, 
            unique: true, 
        }, 
        password:{ 
            type: String, 
            required: true, 
        }, 
        isAdmin:{ 
            type: Boolean, 
            required: true, 
            default: false 
        }, 
    }, 
    { 
        // Time mark: createdAt and updateAt
        timestamps: true, 
    } 
); 

// Method matchPassword 
userSchema.methods.matchPassword = async function (enteredPassword){ 
    return await bcrypt.compare(enteredPassword, this.password); 
};

//Hook pre 
//Only run this function if password was modified 
userSchema.pre('save', async function (next){ 
    if (!this.isModified('password')){ 
        return next(); 
    } 
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt); 
});


// 2- Create User model
const User = mongoose.model('User', userSchema); 

// 3- Export User model 
export default User;