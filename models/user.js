var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
mongoose.connect('mongodb://localhost/login_database',{useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=> console.log('Connection Established'))
    .catch((err)=>console.log(err))
var db=mongoose.connection;
var userSchema=mongoose.Schema({
    name:{
        type:String,
        index:true
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    profileimage:{
        type:String
    },
    uname:{
        type:String
    },
    contact:{
        type:Number
    }
});
var User=module.exports=mongoose.model('user',userSchema);
module.exports.getUserById=function(id,callback){
    User.findById(id,callback);
};
module.exports.getUserByUsername=function(username,callback){
    var query={uname:username}
    User.findOne(query,callback);
};
module.exports.comparePassword=function(candidatepassword,hash,callback){
    bcrypt.compare(candidatepassword,hash,function(err,isMatch){
        callback(null,isMatch);
    }); 
};
module.exports.createUser=function(newUser,callback){
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newUser.password,salt,function(err,hash){
            newUser.password= hash
            try {
                newUser.save()
                callback(true)
            } catch(error) {
                console.error(error);
                callback(false);
            }
        });
    });
}
 