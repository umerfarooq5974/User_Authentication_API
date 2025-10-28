import bcrypt from "bcrypt"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
},{timestamps: true})

userSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
})
